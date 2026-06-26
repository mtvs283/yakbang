-- 출석/격상 적립 중복 반영 방지
-- 003에서 point_transactions INSERT 트리거가 users.points를 자동 반영하므로,
-- 반복 지급 가능성이 있는 출석/격상 RPC는 거래 원장 INSERT에만 적립을 맡긴다.
--
-- 의도적으로 유지:
-- - claim_patient_bonus()의 등록 보너스는 1회성 재미 요소로 기존 동작을 유지한다.
-- - 기존 users.points 잔액 보정은 하지 않는다.

create or replace function public.daily_attendance()
returns integer language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  u_tier text;
  pts integer;
  today_count integer;
begin
  if uid is null then return 0; end if;
  select tier into u_tier from public.users where id = uid;
  if u_tier is null then return 0; end if;

  pts := case
           when u_tier = 'visitor' then 100
           when u_tier = 'patient' then 300
           else 500
         end;

  insert into public.attendance (user_id, date, tier, points_earned)
    values (uid, current_date, u_tier, pts)
    on conflict (user_id, date) do nothing;

  if not found then
    return 0; -- 이미 오늘 출석함
  end if;

  -- 오늘 입장 누적 순번 = 오늘 출석 인원 수(본인 포함).
  select count(*) into today_count
    from public.attendance
   where date = current_date;

  update public.users
     set daily_number = today_count,
         daily_number_date = current_date,
         updated_at = now()
   where id = uid;

  -- users.points는 trg_apply_point_transaction이 delta를 자동 반영한다.
  insert into public.point_transactions (user_id, delta, reason)
    values (uid, pts, 'daily_attendance');

  return pts;
end;
$$;

grant execute on function public.daily_attendance() to authenticated, anon;

create or replace function public.upgrade_to_gwanggaeto()
returns void language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  cur text;
begin
  if uid is null then return; end if;

  select tier into cur from public.users where id = uid;

  if cur = 'patient' then
    update public.users
       set tier = 'nangdo',
           updated_at = now()
     where id = uid;

    -- users.points는 trg_apply_point_transaction이 delta를 자동 반영한다.
    insert into public.point_transactions (user_id, delta, reason)
      values
        (uid, 5000, 'gwanggaeto_signup_bonus'),
        (uid, 3000, 'transfer_bonus');
  end if;
end;
$$;

grant execute on function public.upgrade_to_gwanggaeto() to authenticated;
