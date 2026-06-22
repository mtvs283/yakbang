"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "../supabase/client";

export interface PointTransaction {
  id: string;
  delta: number;
  reason: string;
  related_id: string | null;
  created_at: string;
}

export function usePoints() {
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState<PointTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    const [{ data: profile }, { data: tx }] = await Promise.all([
      supabase.from("users").select("points").eq("id", user.id).single(),
      supabase
        .from("point_transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50)
    ]);
    setBalance((profile?.points as number) ?? 0);
    setHistory((tx as PointTransaction[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance, history, loading, refresh };
}
