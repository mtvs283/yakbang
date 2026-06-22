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
    <>
      {/* 책상 위에 떠 있는 진료등록/회원 표시. transform이 걸려 있으므로
          모달(fixed)은 이 박스 밖(아래)에 둬야 화면 기준으로 정상 표시됨 */}
      <div className="absolute left-1/2 top-[80%] z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-3 text-yakbangPaper">
      {loading ? (
        <span className="font-script text-sm text-yakbangPaper/50">…</span>
      ) : isRegistered ? (
        <div className="flex items-center gap-3 rounded-full border border-yakbangGold/40 bg-black/70 px-4 py-1.5 backdrop-blur-sm">
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
          className="rounded-full border-2 border-yakbangGold bg-yakbangGold px-10 py-4 font-script text-[42px] font-bold text-black shadow-[0_4px_16px_rgba(0,0,0,0.55)] transition hover:brightness-110"
          onClick={() => setShowRegister(true)}
          type="button"
        >
          진료 등록
        </button>
      )}
      </div>

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
    </>
  );
}
