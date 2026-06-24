"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { updateReceiptRecipient } from "../../lib/recordUserReceipt";
import { requestReceiptEmail } from "../../lib/sendReceiptEmail";

interface Props {
  receiptId: string;
  onDone: () => void;
}

export default function ReceiptIssuanceModal({ receiptId, onDone }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailNote, setEmailNote] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("성함과 서신 주소를 모두 적어 주시오.");
      return;
    }
    setLoading(true);
    setError(null);
    setEmailNote(null);
    const ok = await updateReceiptRecipient(receiptId, name, email);
    if (!ok) {
      setLoading(false);
      setError("영수증 정보를 남기지 못했소. 잠시 후 다시 시도하시오.");
      return;
    }
    setLoading(false);
    setSending(true);
    const sent = await requestReceiptEmail(receiptId);
    setSending(false);
    if (!sent.ok) {
      setEmailNote(
        `${sent.message} 영수증함에서 ‘서신 보내기’로 다시 시도하실 수 있소.`
      );
      return;
    }
    onDone();
  }

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[95] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <section
        className="relative w-full max-w-md rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-6 text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)] sm:p-8"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(122,79,40,0.05) 0px, rgba(122,79,40,0.05) 1px, transparent 1px, transparent 22px)"
        }}
      >
        <div className="mb-5 space-y-2 text-center font-script leading-relaxed">
          <p className="text-lg font-bold text-[#3d2b1a]">
            환자 양반, 성함과 서신 주소를 남기시오.
          </p>
          <p className="text-base text-[#7a4f28]">
            영수증을 서신으로 보내드리리다.
          </p>
          <p className="text-sm text-[#8a3a1a]">
            ※ 영수증함에는 이미 들어가 있소
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-1 block text-sm font-bold text-[#7a4f28]">
              성함
            </span>
            <input
              className="w-full rounded-md border border-[#7a4f28]/40 bg-[#f5e6c8] px-3 py-2 font-script text-base outline-none focus:ring-2 focus:ring-[#7a4f28]"
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              type="text"
              value={name}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-bold text-[#7a4f28]">
              서신 주소
            </span>
            <input
              autoComplete="email"
              className="w-full rounded-md border border-[#7a4f28]/40 bg-[#f5e6c8] px-3 py-2 font-script text-base outline-none focus:ring-2 focus:ring-[#7a4f28]"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
              value={email}
            />
          </label>

          {error ? (
            <p className="text-center text-sm font-bold text-red-700">{error}</p>
          ) : null}

          {emailNote ? (
            <p className="text-center text-sm font-bold leading-relaxed text-[#8a3a1a]">
              {emailNote}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 pt-2">
            <button
              className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] disabled:opacity-60"
              disabled={loading || sending}
              type="submit"
            >
              {loading
                ? "기록 중…"
                : sending
                  ? "서신 보내는 중…"
                  : "영수증 받기"}
            </button>
            <button
              className="w-full rounded-md border border-[#7a4f28]/50 bg-transparent px-4 py-2.5 font-script text-base font-bold text-[#7a4f28] transition hover:bg-[#7a4f28]/10"
              disabled={loading}
              onClick={onDone}
              type="button"
            >
              건너뛰기
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs leading-relaxed text-[#7a4f28]/80">
          ※ 가입하지 않으면 영수증함이 사라질 수 있소
        </p>
      </section>
    </div>,
    document.body
  );
}
