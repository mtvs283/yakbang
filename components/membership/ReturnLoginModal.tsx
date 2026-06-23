"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { loginWithPassword } from "../../lib/supabase/auth";

interface Props {
  onClose: () => void;
  initialEmail?: string;
}

// 재진 입장: 등록 이메일 + 비밀번호로 즉시 로그인 (메일 불필요).
export default function ReturnLoginModal({ onClose, initialEmail }: Props) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError(null);
    try {
      await loginWithPassword(email.trim(), password);
      window.location.reload(); // 세션 반영 (잠금 해제 + 상태 표시)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /invalid login|invalid credentials|password/i.test(msg)
          ? "이메일 또는 비밀번호가 맞지 않소이다."
          : /not confirmed/i.test(msg)
            ? "거처(이메일) 인증이 안 됐소. 관리자에게 청하시오."
            : `입장 실패: ${msg || "원인 불명"}`
      );
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
            전에 등록하신 거처(이메일)와 비밀번호로 드시오.
          </p>
        </header>

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
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
              비밀번호
            </span>
            <input
              className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 적으시오"
              type="password"
              value={password}
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
            {loading ? "입장 중…" : "입장하기"}
          </button>
        </form>
      </section>
    </div>,
    document.body
  );
}
