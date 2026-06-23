"use client";

import { useCallback, useEffect, useState } from "react";
import type { Tier } from "../../data/membership";
import { ensureAnonymousUser } from "../supabase/auth";
import { createClient } from "../supabase/client";

export interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  tier: Tier;
  points: number;
  learning_progress: string;
  daily_number: number | null;
}

export function useUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      setUserId(null);
      setProfile(null);
      setLoading(false);
      return;
    }
    setUserId(user.id);
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();
    setProfile((data as Profile) ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await ensureAnonymousUser();
      } catch {
        // Supabase 미설정 시 조용히 무시 (방문자 UI는 그대로)
      }
      if (active) await refresh();
    })();
    return () => {
      active = false;
    };
  }, [refresh]);

  // 이메일이 있으면 등록된 환자(이상), 없으면 익명 방문자
  const isRegistered = Boolean(profile?.email);

  return { userId, profile, loading, refresh, isRegistered };
}
