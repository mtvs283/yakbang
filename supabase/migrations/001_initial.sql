-- 약방광개토 Phase 2.1 — 회원/적립/배달 인프라
-- tier: visitor | patient | nangdo | hwarang | pungwolju | guksun (한 컬럼 통합)

-- ──────────────────────────────────────────────
-- 1) TABLES
-- ──────────────────────────────────────────────

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  email text,
  tier text not null default 'visitor'
    check (tier in ('visitor','patient','nangdo','hwarang','pungwolju','guksun')),
  points integer not null default 0 check (points >= 0),
  learning_progress text not null default 'A',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.attendance (
  user_id uuid not null references public.users (id) on delete cascade,
  date date not null default current_date,
  tier text not null,
  points_earned integer not null default 0,
  primary key (user_id, date)
);

create table if not exists public.point_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  delta integer not null,
  reason text not null,
  related_id uuid,
  created_at timestamptz not null default now()
);

create sequence if not exists public.receipt_seq;

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  remedy_id text not null,
  price integer not null,
  points_earned integer not null default 0,
  receipt_number text unique not null
    default ('YK-' || to_char(now(),'YYYYMM') || '-' || lpad(nextval('public.receipt_seq')::text, 4, '0')),
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  remedy_id text not null,
  rating integer not null check (rating between 1 and 5),
  content text,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.delivery_emails (
  id uuid primary key default gen_random_uuid(),
  purchase_id uuid references public.purchases (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  scheduled_at timestamptz,
  sent_at timestamptz,
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  template_type text,
  created_at timestamptz not null default now()
);

-- ──────────────────────────────────────────────
-- 2) auth.users → public.users 동기화 트리거
-- ──────────────────────────────────────────────

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, display_name)
  values (new.id, new.email, new.raw_user_meta_data->>'display_name')
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.handle_user_update()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.users
     set email = new.email,
         display_name = coalesce(new.raw_user_meta_data->>'display_name', display_name),
         updated_at = now()
   where id = new.id;
  return new;
end; $$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_user_update();

-- points/tier 직접 변경 차단 (RPC=SECURITY DEFINER만 허용, 어뷰징 방지)
create or replace function public.guard_user_sensitive()
returns trigger language plpgsql as $$
begin
  if (new.points is distinct from old.points or new.tier is distinct from old.tier)
     and current_user in ('authenticated','anon') then
    raise exception 'points/tier는 직접 변경할 수 없소이다 (RPC만 허용)';
  end if;
  return new;
end; $$;

drop trigger if exists trg_guard_user_sensitive on public.users;
create trigger trg_guard_user_sensitive
  before update on public.users
  for each row execute function public.guard_user_sensitive();

-- ──────────────────────────────────────────────
-- 3) 적립 RPC (SECURITY DEFINER)
-- ──────────────────────────────────────────────

-- 일일 출석: 당일 1회만, 등급별 적립 (비회원100/환자300/광개토500). 적립액 반환.
create or replace function public.daily_attendance()
returns integer language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  u_tier text;
  pts integer;
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
  update public.users set points = points + pts, updated_at = now() where id = uid;
  insert into public.point_transactions (user_id, delta, reason)
    values (uid, pts, 'daily_attendance');
  return pts;
end; $$;

-- 환자 등록 보너스: visitor → patient, +1000 (1회)
create or replace function public.claim_patient_bonus()
returns void language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); cur text;
begin
  if uid is null then return; end if;
  select tier into cur from public.users where id = uid;
  if cur = 'visitor' then
    update public.users set tier = 'patient', points = points + 1000, updated_at = now() where id = uid;
    insert into public.point_transactions (user_id, delta, reason)
      values (uid, 1000, 'patient_signup_bonus');
  end if;
end; $$;

-- 광개토 격상: patient → nangdo, +5000 가입 +3000 이사 (적립금 자동 승계)
create or replace function public.upgrade_to_gwanggaeto()
returns void language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); cur text;
begin
  if uid is null then return; end if;
  select tier into cur from public.users where id = uid;
  if cur = 'patient' then
    update public.users
       set tier = 'nangdo', points = points + 5000 + 3000, updated_at = now()
     where id = uid;
    insert into public.point_transactions (user_id, delta, reason)
      values (uid, 5000, 'gwanggaeto_signup_bonus'), (uid, 3000, 'transfer_bonus');
  end if;
end; $$;

grant execute on function public.daily_attendance() to authenticated, anon;
grant execute on function public.claim_patient_bonus() to authenticated, anon;
grant execute on function public.upgrade_to_gwanggaeto() to authenticated;

-- ──────────────────────────────────────────────
-- 4) RLS
-- ──────────────────────────────────────────────

alter table public.users enable row level security;
alter table public.attendance enable row level security;
alter table public.point_transactions enable row level security;
alter table public.purchases enable row level security;
alter table public.reviews enable row level security;
alter table public.delivery_emails enable row level security;

-- users: 본인 row만 SELECT/UPDATE (points/tier는 위 트리거가 차단)
create policy "users_select_own" on public.users for select using (auth.uid() = id);
create policy "users_update_own" on public.users for update
  using (auth.uid() = id) with check (auth.uid() = id);

-- attendance: 본인만
create policy "attendance_select_own" on public.attendance for select using (auth.uid() = user_id);
create policy "attendance_insert_own" on public.attendance for insert with check (auth.uid() = user_id);

-- point_transactions: 본인 SELECT만 (INSERT는 RPC=definer만 — 클라 직접 적립 금지)
create policy "ptx_select_own" on public.point_transactions for select using (auth.uid() = user_id);

-- purchases: 본인만
create policy "purchases_select_own" on public.purchases for select using (auth.uid() = user_id);
create policy "purchases_insert_own" on public.purchases for insert with check (auth.uid() = user_id);

-- reviews: 본인 INSERT, 공개 리뷰는 누구나 SELECT
create policy "reviews_insert_own" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews_select_public_or_own" on public.reviews for select
  using (is_public = true or auth.uid() = user_id);
create policy "reviews_update_own" on public.reviews for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- delivery_emails: 본인 SELECT만 (INSERT는 service_role/Edge Function)
create policy "delivery_select_own" on public.delivery_emails for select using (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 5) RLS 누락 점검 (모든 public 테이블 RLS 켜졌는지)
-- ──────────────────────────────────────────────
do $$
declare t record;
begin
  for t in
    select tablename from pg_tables
    where schemaname = 'public'
      and tablename in ('users','attendance','point_transactions','purchases','reviews','delivery_emails')
  loop
    if not exists (
      select 1 from pg_class c join pg_namespace n on n.oid = c.relnamespace
      where n.nspname='public' and c.relname=t.tablename and c.relrowsecurity
    ) then
      raise exception 'RLS 누락: %', t.tablename;
    end if;
  end loop;
end $$;
