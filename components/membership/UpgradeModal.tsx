"use client";

import { useState } from "react";
import { formatStageMessage, stageMessages } from "../../data/membership";
import { useUpgrade } from "../../lib/hooks/useUpgrade";

interface Props {
  name: string;
  onClose: () => void;
  onDone: () => void; // 격상 성공 시 (상위에서 refresh + 알림)
}

export default function UpgradeModal({ name, onClose, onDone }: Props) {
  const { upgrade, loading, error } = useUpgrade();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);
    if (password.length < 6) {
      setLocalError("암호는 6자 이상이어야 하오.");
      return;
    }
    if (password !== confirm) {
      setLocalError("암호가 서로 다르오.");
      return;
    }
    try {
      await upgrade(password);
      onDone();
    } catch {
      // error는 훅에서 표시
    }
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-md rounded-lg border-4 border-yakbangGold bg-[#1a140c] p-6 text-yakbangPaper shadow-[0_0_42px_rgba(212,175,55,0.3)] sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-yakbangGold/60 text-xl leading-none text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <header className="mb-5 border-b border-yakbangGold/30 pb-4">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-yakbangGold">
            광 개 토 화 랑 도
          </p>
          <h1 className="font-script text-3xl font-bold text-yakbangGold">
            광개토 회원 격상
          </h1>
          <p className="mt-2 font-script text-base leading-relaxed text-yakbangPaper/90">
            암호를 정하여 광개토 낭도로 입문하시오. 약방 적립금은 그대로
            이어지고, 가입 보너스 5,000원 + 이사 보너스 3,000원을 드리오.
          </p>
        </header>

        <form className="space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-yakbangGold">
              암호 (6자 이상)
            </span>
            <input
              className="w-full rounded-md border border-yakbangGold/40 bg-black/40 px-3 py-2 text-base text-yakbangPaper outline-none focus:border-yakbangGold focus:ring-2 focus:ring-yakbangGold/40"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-yakbangGold">
              암호 확인
            </span>
            <input
              className="w-full rounded-md border border-yakbangGold/40 bg-black/40 px-3 py-2 text-base text-yakbangPaper outline-none focus:border-yakbangGold focus:ring-2 focus:ring-yakbangGold/40"
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              value={confirm}
            />
          </label>

          {localError || error ? (
            <p className="text-sm font-semibold text-red-400">
              {localError ?? error}
            </p>
          ) : null}

          <button
            className="w-full rounded-md border-2 border-yakbangGold bg-yakbangGold px-4 py-3 font-script text-lg font-bold text-black transition hover:bg-[#e6c34d] disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "격상 중…" : "광개토 낭도로 격상"}
          </button>
        </form>

        <p className="mt-4 font-script text-xs leading-relaxed text-yakbangPaper/60">
          {formatStageMessage(stageMessages.upgradeTo.nangdo, name || "그대")}
        </p>
      </section>
    </div>
  );
}
