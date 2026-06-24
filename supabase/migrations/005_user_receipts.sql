-- user_receipts: 약방 영수증함 (익명·가입 환자 공통)
-- 001~004 실행 후 SQL Editor에서 추가 실행

create table if not exists public.user_receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  prescription_slug text not null,
  issued_at timestamptz not null default now(),
  receipt_data jsonb not null default '{}'::jsonb,
  recipient_name text,
  recipient_email text,
  email_sent boolean not null default false
);

create index if not exists user_receipts_user_id_idx
  on public.user_receipts (user_id, issued_at desc);

create index if not exists user_receipts_slug_idx
  on public.user_receipts (prescription_slug);

alter table public.user_receipts enable row level security;

create policy "user_receipts_select_own"
  on public.user_receipts for select
  using (auth.uid() = user_id);

create policy "user_receipts_insert_own"
  on public.user_receipts for insert
  with check (auth.uid() = user_id);

create policy "user_receipts_update_own"
  on public.user_receipts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 가입·재로그인 시 localStorage에 남은 영수증 id를 이전 세션에서 이관 (보험)
create or replace function public.transfer_receipts(
  p_receipt_ids uuid[],
  p_from_user_id uuid
)
returns void language plpgsql security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null or p_from_user_id is null or p_receipt_ids is null then
    return;
  end if;
  if uid = p_from_user_id then
    return;
  end if;
  update public.user_receipts
     set user_id = uid
   where id = any (p_receipt_ids)
     and user_id = p_from_user_id;
end;
$$;

grant execute on function public.transfer_receipts(uuid[], uuid) to authenticated, anon;
