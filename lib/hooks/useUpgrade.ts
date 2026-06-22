"use client";

import { useState } from "react";
import { upgradeToEmailAuth } from "../supabase/auth";
import { createClient } from "../supabase/client";

// 환자 → 광개토 낭도 격상.
// 1) 기존 이메일에 비밀번호 추가(Email Auth 통합)
// 2) 서버 RPC(upgrade_to_gwanggaeto)가 tier=nangdo + 가입5000 + 이사3000 트랜잭션 처리
export function useUpgrade() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upgrade(password: string) {
    setLoading(true);
    setError(null);
    try {
      await upgradeToEmailAuth(password);
      const supabase = createClient();
      const { error: rpcError } = await supabase.rpc("upgrade_to_gwanggaeto");
      if (rpcError) throw rpcError;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "격상 중 오류가 났소이다.";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { upgrade, loading, error };
}
