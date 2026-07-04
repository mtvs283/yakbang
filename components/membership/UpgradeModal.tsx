"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { formatStageMessage, stageMessages } from "../../data/membership";
import { useUpgrade } from "../../lib/hooks/useUpgrade";
import { useLocale } from "../LocaleProvider";

interface Props {
  name: string;
  onClose: () => void;
  onDone: () => void; // 격상 성공 시 (상위에서 refresh + 알림)
}

export default function UpgradeModal({ name, onClose, onDone }: Props) {
  const { t } = useLocale();
  const copy = t.auth.upgrade;
  const { upgrade, loading, error } = useUpgrade();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError(null);
    if (password.length < 6) {
      setLocalError(copy.passwordTooShort);
      return;
    }
    if (password !== confirm) {
      setLocalError(copy.passwordMismatch);
      return;
    }
    try {
      await upgrade(password);
      onDone();
    } catch {
      // error는 훅에서 표시
    }
  }

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/72 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-md rounded-lg border-4 border-yakbangGold bg-[#1a140c] p-6 text-yakbangPaper shadow-[0_0_42px_rgba(212,175,55,0.3)] sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          aria-label={copy.closeAria}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-yakbangGold/60 text-xl leading-none text-yakbangGold transition hover:bg-yakbangGold hover:text-black"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <header className="mb-5 border-b border-yakbangGold/30 pb-4">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-yakbangGold">
            {copy.eyebrow}
          </p>
          <h1 className="font-script text-3xl font-bold text-yakbangGold">
            {copy.title}
          </h1>
          <p className="mt-2 font-script text-base leading-relaxed text-yakbangPaper/90">
            {copy.intro}
          </p>
        </header>

        <form className="space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-yakbangGold">
              {copy.passwordLabel}
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
              {copy.confirmLabel}
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
            {loading ? copy.submitting : copy.submit}
          </button>
        </form>

        <p className="mt-4 font-script text-xs leading-relaxed text-yakbangPaper/60">
          {formatStageMessage(stageMessages.upgradeTo.nangdo, name || "그대")}
        </p>
      </section>
    </div>,
    document.body
  );
}
