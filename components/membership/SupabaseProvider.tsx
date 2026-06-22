"use client";

import { useEffect, type ReactNode } from "react";
import { ensureAnonymousUser } from "../../lib/supabase/auth";

// 앱 진입 시 익명 유저 자동 발급 (방문자 단계). Supabase 미설정 시 조용히 무시.
export default function SupabaseProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureAnonymousUser().catch(() => {});
  }, []);
  return <>{children}</>;
}
