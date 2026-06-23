"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import type { Tier } from "../../data/membership";
import { ensureAnonymousUser } from "../../lib/supabase/auth";
import { createClient } from "../../lib/supabase/client";

export interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  tier: Tier;
  points: number;
  learning_progress: string;
  daily_number: number | null;
}

interface UserContextValue {
  userId: string | null;
  profile: Profile | null;
  loading: boolean;
  admissionDays: number | null;
  refresh: () => Promise<void>;
  isRegistered: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [admissionDays, setAdmissionDays] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      setUserId(null);
      setProfile(null);
      setAdmissionDays(null);
      setLoading(false);
      return;
    }
    setUserId(user.id);
    const [{ data }, { count }] = await Promise.all([
      supabase.from("users").select("*").eq("id", user.id).single(),
      supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
    ]);
    setProfile((data as Profile) ?? null);
    setAdmissionDays(count ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await ensureAnonymousUser();
      } catch {
        // Supabase 미설정 시 조용히 무시
      }
      if (active) await refresh();
    })();
    return () => {
      active = false;
    };
  }, [refresh]);

  const isRegistered = Boolean(profile?.email);

  return (
    <UserContext.Provider
      value={{ userId, profile, loading, admissionDays, refresh, isRegistered }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}
