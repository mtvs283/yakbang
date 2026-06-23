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
