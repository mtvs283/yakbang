"use client";

import { useEffect, useState } from "react";
import {
  formatStageMessage,
  stageMessages,
  type Tier
} from "../../data/membership";
import { useLocale } from "../LocaleProvider";
import StageBadge from "./StageBadge";

const PUMGYE_RANK_COLORS = [
  { border: "#6B6B6B", color: "#6B6B6B", bg: "rgba(107,107,107,0.1)" },
  { border: "#3E8E5A", color: "#3E8E5A", bg: "rgba(62,142,90,0.1)" },
  { border: "#2C5F8D", color: "#2C5F8D", bg: "rgba(44,95,141,0.1)" },
  { border: "#B91C2C", color: "#B91C2C", bg: "rgba(185,28,44,0.12)" }
];

interface Props {
  fromTier: Tier;
  toTier: Tier;
  name: string;
  onDismiss: () => void;
}

export default function StageUpgradeNotification({
  fromTier,
  toTier,
  name,
  onDismiss
}: Props) {
  const { t } = useLocale();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setShown(true), 120);
    const auto = setTimeout(onDismiss, 12000);
    return () => {
      clearTimeout(fade);
      clearTimeout(auto);
    };
  }, [onDismiss]);

  const upgradeKey = toTier as keyof typeof stageMessages.upgradeTo;
  const raw =
    toTier === "patient"
      ? stageMessages.patientWelcome
      : stageMessages.upgradeTo[upgradeKey] ?? "";
  const message = formatStageMessage(raw, name || "그대");

  const p = t.pumgye;
  const pumgyeRanks = [
    { ...PUMGYE_RANK_COLORS[0], ...p.patient },
    { ...PUMGYE_RANK_COLORS[1], ...p.regular },
    { ...PUMGYE_RANK_COLORS[2], ...p.physician },
    { ...PUMGYE_RANK_COLORS[3], ...p.royal }
  ];

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4"
      onClick={onDismiss}
      role="dialog"
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border-4 border-yakbangGold bg-[#1a140c] p-7 text-center text-yakbangPaper shadow-[0_0_42px_rgba(212,175,55,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 배지 전환: 이전 → 다음 (1.5초 fade) */}
        <div className="mx-auto mb-5 flex items-center justify-center gap-3">
          <span className="relative inline-flex h-12 w-12 items-center justify-center">
            <span
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-[1500ms]"
              style={{ opacity: shown ? 0 : 1 }}
            >
              <StageBadge size={44} tier={fromTier} />
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-[1500ms]"
              style={{ opacity: shown ? 1 : 0 }}
            >
              <StageBadge size={48} tier={toTier} />
            </span>
          </span>
        </div>

        <p className="font-script text-lg font-bold leading-relaxed text-yakbangGold">
          {message}
        </p>

        <div className="mt-6 border-t border-yakbangGold/30 pt-5 text-left">
          <p className="mb-3 text-center font-shilla text-lg font-bold tracking-[0.16em] text-yakbangGold">
            {p.title}
          </p>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {pumgyeRanks.map((rank) => (
              <li className="flex items-center gap-3" key={rank.stamp}>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.18em] font-shilla text-sm font-bold tracking-[0.06em]"
                  style={{
                    border: `2px solid ${rank.border}`,
                    color: rank.color,
                    background: rank.bg,
                    transform: "rotate(-3deg)"
                  }}
                >
                  {rank.stamp}
                </span>
                <span className="flex-1 text-sm font-semibold leading-snug text-yakbangPaper/90">
                  {rank.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mt-5 rounded-md border border-yakbangGold/60 px-5 py-2 font-script text-sm font-bold text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
          onClick={onDismiss}
          type="button"
        >
          알겠소
        </button>
      </div>
    </div>
  );
}
