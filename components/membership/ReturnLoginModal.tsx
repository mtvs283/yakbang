"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { sendMagicLink } from "../../lib/supabase/auth";

interface Props {
  onClose: () => void;
  initialEmail?: string;
}

// 재진 입장: 등록 이메일 → 매직링크 발송. 링크 클릭 시 원래 환자 계정으로 입장.
export default function ReturnLoginModal({ onClose, initialEmail }: Props) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await sendMagicLink(email.trim());
      setSent(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /not found|signups not allowed|user/i.test(msg)
          ? "그 거처로 등록된 환자가 없소이다. 이메일을 확인하거나 새로 진료 등록하시오."
          : "입장 서신을 보내지 못했소. 잠시 후 다시 청하시오."
      );
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/72 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative w-full max-w-md rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-6 text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)] sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          aria-label="닫기"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#7a4f28]/60 text-xl leading-none text-[#7a4f28] transition hover:bg-[#7a4f28] hover:text-[#f5e6c8]"
          onClick={onClose}
          type="button"
        >
          ×
        </button>

        <header className="mb-5 border-b-2 border-dashed border-[#7a4f28]/40 pb-4">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-[#7a4f28]">
            재 진 입 장
          </p>
          <h1 className="font-script text-3xl font-bold">재진 입장</h1>
          <p className="mt-2 font-script text-base leading-relaxed">
            전에 등록하신 거처(이메일)를 적으시오. 그리로 입장 서신을 보내드리오.
          </p>
        </header>

        {sent ? (
          <div className="rounded-md border-2 border-dashed border-[#7a4f28]/50 bg-[#7a4f28]/8 p-5 text-center">
            <p className="font-script text-xl font-bold text-[#8a3a1a]">
              서신을 보냈소이다.
            </p>
            <p className="mt-2 font-script text-base leading-relaxed">
              <b>{email}</b> 의 서신함을 열어, 안의 <b>입장 링크</b>를 누르시면
              약방으로 드시오.
            </p>
            <button
              className="mt-5 w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a]"
              onClick={onClose}
              type="button"
            >
              알겠소
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={submit}>
            <label className="block">
              <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
                등록 이메일
              </span>
              <input
                autoFocus
                className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="등록한 이메일을 적으시오"
                type="email"
                value={email}
              />
            </label>

            {error ? (
              <p className="text-sm font-semibold text-red-700">{error}</p>
            ) : null}

            <button
              className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              {loading ? "서신 보내는 중…" : "입장 서신 받기"}
            </button>
          </form>
        )}
      </section>
    </div>,
    document.body
  );
}
