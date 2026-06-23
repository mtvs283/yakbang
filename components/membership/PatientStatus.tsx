"use client";

import { tiers } from "../../data/membership";
import { useUser } from "../../lib/hooks/useUser";

// 우상단 다국어 토글 아래에 "환자 N : 지갑" 표시 (등록 환자만).
// N = 오늘 입장 순번(daily_attendance가 부여). 당일 고정.
export default function PatientStatus() {
  const { profile, isRegistered } = useUser();
  if (!isRegistered || !profile) return null;
  const tierKo = tiers[profile.tier].ko;
  const num = profile.daily_number;
  return (
    <div className="fixed right-4 top-[68px] z-40 rounded-full border border-yakbangGold/50 bg-yakbangBlack/70 px-4 py-1.5 text-sm font-bold text-yakbangGold backdrop-blur">
      {tierKo}
      {num != null ? ` ${num}` : ""} : {profile.points.toLocaleString("ko-KR")}원
    </div>
  );
}
