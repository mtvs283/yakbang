"use client";

import { clearReceiptStash } from "../receiptStorage";
import { createClient } from "./client";

const HAS_ACCOUNT_KEY = "yakbang-has-account";

export function hasStoredAccountHint(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(HAS_ACCOUNT_KEY) === "1";
  } catch {
    return false;
  }
}

export function markStoredAccountHint() {
  try {
    localStorage.setItem(HAS_ACCOUNT_KEY, "1");
  } catch {
    /* noop */
  }
}

export function clearLocalPatientFlags() {
  try {
    localStorage.removeItem(HAS_ACCOUNT_KEY);
    clearReceiptStash();
  } catch {
    /* noop */
  }
}

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

// 환자 등록: 익명 유저에 이메일+비밀번호를 붙여 영구 계정화 (재방문 로그인용).
// 성별·연세는 메타데이터에 저장 (진료증 항목).
export async function registerPatient(
  displayName: string,
  email: string,
  password: string,
  gender?: string,
  age?: number
) {
  const supabase = createClient();
  const { error: updateError } = await supabase.auth.updateUser({
    email,
    password,
    data: { display_name: displayName, gender, age }
  });
  if (updateError) throw updateError;
}

// 재진 입장: 이메일+비밀번호로 로그인 (메일 불필요).
export async function loginWithPassword(email: string, password: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
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
  clearLocalPatientFlags();
}

/** 다른 이메일로 새 환자 등록 — 세션·로컬 힌트 초기화 후 익명 유저 발급 */
export async function prepareNewPatientRegistration() {
  const supabase = createClient();
  await supabase.auth.signOut();
  clearLocalPatientFlags();
  await ensureAnonymousUser();
}
