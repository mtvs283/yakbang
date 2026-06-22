"use client";

import { useEffect, useState } from "react";
import {
  formatStageMessage,
  stageMessages,
  type Tier
} from "../../data/membership";
import StageBadge from "./StageBadge";

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
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setShown(true), 120);
    const auto = setTimeout(onDismiss, 5000);
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

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4"
      onClick={onDismiss}
      role="dialog"
    >
      <div
        className="w-full max-w-sm rounded-lg border-4 border-yakbangGold bg-[#1a140c] p-7 text-center text-yakbangPaper shadow-[0_0_42px_rgba(212,175,55,0.4)]"
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
