"use client";

import { getDisplayTitle, type Tier } from "../../data/membership";

interface Props {
  tier: Tier;
  points: number;
}

// 적립금 + 단계 (한약방 톤, 황금 텍스트)
export default function PointDisplay({ tier, points }: Props) {
  return (
    <span className="inline-flex items-baseline gap-2 font-script text-yakbangGold">
      <span className="text-sm opacity-90">{getDisplayTitle(tier)}</span>
      <span className="font-bold">
        {points.toLocaleString("ko-KR")}원
      </span>
    </span>
  );
}
