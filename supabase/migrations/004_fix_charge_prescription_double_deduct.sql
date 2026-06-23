-- charge_prescription: users.points 이중 차감 방지 (트리거가 delta만 반영)
create or replace function public.charge_prescription(p_slug text, p_price integer)
returns json language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  u_points integer;
  rx_id uuid;
  new_balance integer;
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

  insert into public.point_transactions (user_id, delta, reason, related_id)
    values (uid, -p_price, 'prescription_purchase', rx_id);

  new_balance := u_points - p_price;

  return json_build_object('success', true, 'newBalance', new_balance);
end;
$$;

grant execute on function public.charge_prescription(text, integer) to authenticated, anon;
