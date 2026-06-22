"use client";

import { useState } from "react";
import type { Tier } from "../../data/membership";
import { useDailyAttendance } from "../../lib/hooks/useDailyAttendance";
import { useUser } from "../../lib/hooks/useUser";
import PointDisplay from "./PointDisplay";
import RegisterModal from "./RegisterModal";
import StageBadge from "./StageBadge";
import StageUpgradeNotification from "./StageUpgradeNotification";
import UpgradeModal from "./UpgradeModal";

export default function PharmacyHeader() {
  const { profile, loading, refresh, isRegistered } = useUser();
  useDailyAttendance(); // 약방 진입 시 당일 자동 출석

  const [showRegister, setShowRegister] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [notif, setNotif] = useState<{ from: Tier; to: Tier } | null>(null);

  const tier: Tier = profile?.tier ?? "visitor";
  const name = profile?.display_name ?? "";

  return (
    <header className="relative z-20 flex w-full items-center gap-3 border-b border-yakbangGold/20 bg-[#100b07] px-4 py-2 text-yakbangPaper sm:px-6">
      {loading ? (
        <span className="font-script text-sm text-yakbangPaper/50">…</span>
      ) : isRegistered ? (
        <div className="flex items-center gap-3">
          <StageBadge size={22} tier={tier} />
          {name ? (
            <span className="font-script text-sm text-yakbangPaper/90">
              {name}
            </span>
          ) : null}
          <PointDisplay points={profile?.points ?? 0} tier={tier} />
          {tier === "patient" ? (
            <button
              className="rounded-full border border-yakbangGold/70 px-3 py-1 font-script text-xs font-bold text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
              onClick={() => setShowUpgrade(true)}
              type="button"
            >
              광개토 회원 격상
            </button>
          ) : null}
        </div>
      ) : (
        <button
          className="rounded-full border border-yakbangGold/70 px-4 py-1.5 font-script text-sm font-bold text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
          onClick={() => setShowRegister(true)}
          type="button"
        >
          진료 등록
        </button>
      )}

      {showRegister ? (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onDone={async () => {
            setShowRegister(false);
            await refresh();
            setNotif({ from: "visitor", to: "patient" });
          }}
        />
      ) : null}

      {showUpgrade ? (
        <UpgradeModal
          name={name}
          onClose={() => setShowUpgrade(false)}
          onDone={async () => {
            setShowUpgrade(false);
            await refresh();
            setNotif({ from: "patient", to: "nangdo" });
          }}
        />
      ) : null}

      {notif ? (
        <StageUpgradeNotification
          fromTier={notif.from}
          name={name}
          onDismiss={() => setNotif(null)}
          toTier={notif.to}
        />
      ) : null}
    </header>
  );
}
