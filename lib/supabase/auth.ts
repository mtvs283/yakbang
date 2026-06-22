"use client";

import { createClient } from "./client";

// 사이트 진입 시 익명 유저 자동 발급 (없을 때만)
export async function ensureAnonymousUser() {
  const supabase = createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (session) return session.user;
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
}

// 환자 등록: 익명 유저에 이메일 정보만 붙이고 프로필 갱신 (비밀번호는 격상 때)
export async function registerPatient(displayName: string, email: string) {
  const supabase = createClient();
  const { error: updateError } = await supabase.auth.updateUser({
    email,
    data: { display_name: displayName }
  });
  if (updateError) throw updateError;
}

// 광개토 회원 격상: 기존 이메일에 비밀번호를 추가해 Email Auth 통합
export async function upgradeToEmailAuth(password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
