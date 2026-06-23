"use client";

import { createClient } from "./client";

// 사이트 진입 시 익명 유저 자동 발급 (없을 때만).
// 여러 컴포넌트가 동시에 불러도 익명 로그인은 1번만 일어나도록 in-flight 디듀프.
let ensureInFlight: Promise<unknown> | null = null;

export async function ensureAnonymousUser() {
  if (ensureInFlight) return ensureInFlight;
  ensureInFlight = (async () => {
    const supabase = createClient();
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (session) return session.user;
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    return data.user;
  })().finally(() => {
    ensureInFlight = null;
  });
  return ensureInFlight;
}

// 환자 등록: 익명 유저에 이메일 정보만 붙이고 프로필 갱신 (비밀번호는 격상 때)
// 성별·연세는 auth 유저 메타데이터에 저장 (진료증 항목)
export async function registerPatient(
  displayName: string,
  email: string,
  gender?: string,
  age?: number
) {
  const supabase = createClient();
  const { error: updateError } = await supabase.auth.updateUser({
    email,
    data: { display_name: displayName, gender, age }
  });
  if (updateError) throw updateError;
}

// 광개토 회원 격상: 기존 이메일에 비밀번호를 추가해 Email Auth 통합
export async function upgradeToEmailAuth(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

// 재진 입장: 등록된 이메일로 매직링크 발송 (비밀번호 없는 환자 재로그인).
// shouldCreateUser:false → 신규 생성 막고 기존 환자만. 링크 클릭 → /auth/callback.
export async function sendMagicLink(email: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${window.location.origin}/auth/callback?next=/shop`
    }
  });
  if (error) throw error;
}

// 재진 입장 2단계: 메일로 받은 6자리 코드 검증 → 로그인. (링크 대신 코드 — 지메일 링크 선소모 회피)
export async function verifyLoginCode(email: string, code: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token: code.trim(),
    type: "email"
  });
  if (error) throw error;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
