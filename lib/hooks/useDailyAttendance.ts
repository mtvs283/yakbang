"use client";

import { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

// 약방 진입 시 당일 1회 자동 출석 처리. 적립은 서버 RPC(daily_attendance)가
// UPSERT로 멱등 처리하므로 클라이언트가 직접 적립하지 않음(어뷰징 방지).
export function useDailyAttendance() {
  const [checked, setChecked] = useState(false);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        if (active) setChecked(true);
        return;
      }
      const { data, error } = await supabase.rpc("daily_attendance");
      if (active) {
        if (!error && typeof data === "number") setPointsEarned(data);
        setChecked(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return { checked, pointsEarned };
}
