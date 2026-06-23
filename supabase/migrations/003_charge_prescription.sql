-- 약방광개토 — 처방 구매 차감 (클라이언트 INSERT 금지 → SECURITY DEFINER RPC)
-- 001_initial.sql 실행 후 추가 실행.

create or replace function public.charge_prescription(p_slug text, p_price integer)
returns json language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  u_points integer;
  rx_id uuid;
begin
  if uid is null then
    return json_build_object('error', 'no_user');
  end if;

  select id into rx_id
    from public.user_prescriptions
   where user_id = uid and prescription_slug = p_slug;

  select points into u_points from public.users where id = uid;

  if u_points is null then
    return json_build_object('error', 'no_user');
  end if;

  if u_points < p_price then
    return json_build_object('error', 'insufficient', 'balance', u_points);
  end if;

  update public.users
     set points = points - p_price,
         updated_at = now()
   where id = uid;

  insert into public.point_transactions (user_id, delta, reason, related_id)
    values (uid, -p_price, 'prescription_purchase', rx_id);

  return json_build_object('success', true, 'newBalance', u_points - p_price);
end;
$$;

grant execute on function public.charge_prescription(text, integer) to authenticated, anon;

-- RPC 미배포 시 클라이언트 fallback: 구매 차감 INSERT + users.points 동기화
create or replace function public.apply_point_transaction()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.users
     set points = points + new.delta,
         updated_at = now()
   where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists trg_apply_point_transaction on public.point_transactions;
create trigger trg_apply_point_transaction
  after insert on public.point_transactions
  for each row execute function public.apply_point_transaction();

drop policy if exists "ptx_insert_purchase" on public.point_transactions;
create policy "ptx_insert_purchase" on public.point_transactions
  for insert to authenticated
  with check (
    auth.uid() = user_id
    and delta < 0
    and reason = 'prescription_purchase'
  );
