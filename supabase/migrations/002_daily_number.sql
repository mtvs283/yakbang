-- 약방광개토 — 환자 "오늘 입장 순번" (당일 누적 순번)
-- 규칙: 오늘 첫 출석(입장) 시 번호 부여 = 오늘 출석한 인원 수(본인 포함).
--       한 번 받으면 당일 고정 (앞사람이 나가도 안 바뀜). 다음 날 재부여.
-- 001_initial.sql 을 이미 실행한 프로젝트에 "추가로" 실행하면 됩니다.

-- 1) users 에 순번 컬럼 추가 (이미 있으면 무시)
alter table public.users add column if not exists daily_number integer;
alter table public.users add column if not exists daily_number_date date;

-- 2) daily_attendance() 교체 — 출석 적립 + 오늘 입장 순번 부여
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
    return 0; -- 이미 오늘 출석함 → 순번/적립 유지
  end if;
  -- 오늘 입장 누적 순번 = 오늘 출석 인원 수(본인 포함). definer라 전체 집계 가능.
  select count(*) into today_count
    from public.attendance where date = current_date;
  update public.users
     set points = points + pts,
         daily_number = today_count,
         daily_number_date = current_date,
         updated_at = now()
   where id = uid;
  insert into public.point_transactions (user_id, delta, reason)
    values (uid, pts, 'daily_attendance');
  return pts;
end; $$;

-- (CREATE OR REPLACE는 기존 권한을 유지하지만 안전하게 재부여)
grant execute on function public.daily_attendance() to authenticated, anon;
