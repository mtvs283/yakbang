"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { sendMagicLink, verifyLoginCode } from "../../lib/supabase/auth";

interface Props {
  onClose: () => void;
  initialEmail?: string;
}

// 재진 입장(코드 방식): 등록 이메일 → 메일로 온 6자리 코드 입력 → 로그인.
// 링크 대신 코드라 지메일의 링크 선(先)소모(otp_expired) 문제를 피함.
export default function ReturnLoginModal({ onClose, initialEmail }: Props) {
  const [email, setEmail] = useState(initialEmail ?? "");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await sendMagicLink(email.trim());
      setStep("code");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /rate|too many|429/i.test(msg)
          ? "코드를 너무 자주 청했소. 잠시(약 1시간) 후 다시 청하시오. (메일 한도)"
          : /not found|user not found/i.test(msg)
            ? "그 거처로 등록된 환자가 없소이다. 이메일을 확인하거나 새로 진료 등록하시오."
            : `코드 발송 실패: ${msg || "원인 불명"}`
      );
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await verifyLoginCode(email.trim(), code.trim());
      window.location.reload(); // 세션 반영 (잠금 해제 + 상태 표시)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        /expired|invalid|token/i.test(msg)
          ? "코드가 틀렸거나 만료됐소. '코드 다시 받기'로 새로 받으시오."
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
            전에 등록하신 거처(이메일)로 입장 코드를 보내드리오.
          </p>
        </header>

        {step === "email" ? (
          <form className="space-y-4" onSubmit={sendCode}>
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
              {loading ? "코드 보내는 중…" : "입장 코드 받기"}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={verify}>
            <p className="font-script text-base leading-relaxed">
              <b>{email}</b> 의 메일로 보낸 <b>숫자 코드</b>를 적으시오.
            </p>
            <input
              autoFocus
              className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-center text-2xl font-bold tracking-[0.4em] outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
              inputMode="numeric"
              onChange={(e) => setCode(e.target.value)}
              placeholder="● ● ● ● ● ●"
              value={code}
            />
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
            <button
              className="w-full font-script text-sm font-bold text-[#7a4f28] underline underline-offset-2"
              onClick={() => {
                setStep("email");
                setCode("");
                setError(null);
              }}
              type="button"
            >
              코드 다시 받기
            </button>
          </form>
        )}
      </section>
    </div>,
    document.body
  );
}
