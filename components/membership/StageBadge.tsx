"use client";

import { tiers, type Tier } from "../../data/membership";

interface Props {
  tier: Tier;
  size?: number;
}

// 배지: 이모지(환자) 또는 모자 PNG(낭도+). 호버 시 단계명 + 한자 툴팁.
export default function StageBadge({ tier, size = 24 }: Props) {
  const info = tiers[tier];
  if (!info.badge) return null;
  const isImage = info.badge.startsWith("/");
  const title = info.hanja ? `${info.ko} (${info.hanja})` : info.ko;

  return (
    <span
      aria-label={title}
      className="inline-flex items-center align-middle"
      title={title}
    >
      {isImage ? (
        <img
          alt={info.ko}
          className="object-contain"
          height={size}
          src={info.badge}
          width={size}
        />
      ) : (
        <span style={{ fontSize: size, lineHeight: 1 }}>{info.badge}</span>
      )}
    </span>
  );
}
