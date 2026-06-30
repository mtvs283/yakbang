# 약방광개토 — Supabase 설정 (Phase 2.1)

회원/적립/배달 인프라. Anonymous Auth + Email Auth 기반.

## 1. Supabase 프로젝트 + 환경 변수

1. https://supabase.com 에서 프로젝트 생성
2. Project Settings → API 에서 값 복사
3. 프로젝트 루트에 `.env.local` 생성 (`.env.local.example` 참고):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...      # 공개 anon key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...          # ⚠️ 서버 전용, 절대 클라이언트 노출 금지
```

> `NEXT_PUBLIC_` 접두사가 붙은 두 개만 브라우저에 노출됨. `SUPABASE_SERVICE_ROLE_KEY`는 서버(Edge Function / route handler)에서만 사용.

## 2. Auth 활성화

Dashboard → Authentication → Providers:

- **Anonymous** 사용 설정 ON (방문자 자동 발급)
- **Email** 사용 설정 ON (환자 등록 / 광개토 격상)
  - 개발 편의상 "Confirm email" OFF 가능 (운영은 ON 권장)

Authentication → URL Configuration: Site URL에 배포 도메인(예: `https://yakbang.kr`) 추가.

## 3. 마이그레이션 실행

테이블 6개 + RLS + 트리거 + 적립 RPC 생성.

**방법 A — Dashboard SQL Editor:** `supabase/migrations/001_initial.sql` 내용을 붙여넣고 Run.

**방법 B — Supabase CLI:**
```bash
supabase link --project-ref <project-ref>
supabase db push
```

실행 후 SQL 끝의 RLS 점검 블록이 통과하면 6개 테이블 모두 RLS가 켜진 것.

## 4. 적립은 RPC로만 (어뷰징 방지)

클라이언트는 points/tier를 직접 수정 못 함 (트리거 `guard_user_sensitive`가 차단).
적립은 SECURITY DEFINER 함수로만:

- `daily_attendance()` — 당일 1회 출석 적립 (비회원100 / 환자300 / 광개토500)
- `claim_patient_bonus()` — 환자 등록 +1,000
- `upgrade_to_gwanggaeto()` — 낭도 격상 +5,000(가입) +3,000(이사)

## 5. (선택) 배달 이메일 Edge Function

```bash
supabase functions deploy send-delivery-email
supabase secrets set RESEND_API_KEY=re_xxx
# (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY는 보통 자동 주입)
supabase secrets set DELIVERY_FROM="광개토약방 <noreply@yakbang.kr>"
```

- Resend(https://resend.com) 가입 + 도메인 인증 후 API 키 발급
- **cron 스케줄:** Dashboard → Edge Functions → `send-delivery-email` → Schedule → 매일 1회 (예: `0 0 * * *`)
- `delivery_emails` 의 `status='pending'` & `scheduled_at <= now()` 건을 처리

## 6. 배지 이미지

`public/images/badges/` 에 placeholder PNG 4장이 들어가 있음 (1x1 투명).
실제 모자 그림으로 교체:
- `satgat.png` (낭도 — 삿갓)
- `yugeon.png` (화랑 — 유건)
- `jeongjagwan.png` (풍월주 — 정자관)
- `baekjeollip.png` (국선 — 백전립)

## 확인 체크리스트

- [ ] Anonymous + Email Auth 활성화
- [ ] `001_initial.sql` 실행 (RLS 점검 통과)
- [ ] `.env.local` 3개 변수 설정
- [ ] (선택) Edge Function 배포 + cron
- [ ] 배지 이미지 교체
