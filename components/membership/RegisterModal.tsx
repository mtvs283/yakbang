"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  markStoredAccountHint,
  registerPatient
} from "../../lib/supabase/auth";
import { createClient } from "../../lib/supabase/client";
import { migrateStashedReceipts } from "../../lib/migrateReceiptsOnAuth";
import KoreanTermTooltip from "../KoreanTermTooltip";

interface Props {
  onClose: () => void;
  onDone: () => void; // 등록 성공 시 (상위에서 refresh + 환영)
  onSwitchToLogin?: (email: string) => void; // 이미 등록된 이메일 → 재진 입장으로
}

export default function RegisterModal({
  onClose,
  onDone,
  onSwitchToLogin
}: Props) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"남" | "여" | "">("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !gender || !age.trim() || !email.trim()) return;
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 하오. (재방문 입장에 쓰임)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await registerPatient(
        name.trim(),
        email.trim(),
        password,
        gender,
        Number(age) || undefined
      );
      const supabase = createClient();
      const { error: rpcError } = await supabase.rpc("claim_patient_bonus");
      if (rpcError) throw rpcError;
      await migrateStashedReceipts();
      markStoredAccountHint();
      onDone();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (/registered|already|exist/i.test(msg)) {
        // 이미 등록된 거처 → 재진 입장 모달로 전환 (이메일 prefill)
        if (onSwitchToLogin) {
          onSwitchToLogin(email.trim());
          return;
        }
        setError("이미 등록된 거처요. 좌상단 '재진 입장'으로 드시오.");
      } else {
        setError(msg || "진료 등록 중 탈이 났소이다.");
      }
    } finally {
      setLoading(false);
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
            진 료 접 수
          </p>
          <h1 className="font-script text-3xl font-bold">진료 등록</h1>
          <p className="mt-2 font-script text-base leading-relaxed">
            약방에 어서 오시오.{" "}
            <KoreanTermTooltip term="환자">환자</KoreanTermTooltip>로
            등록하면 적립금 1,000원을 드리오.
          </p>
        </header>

        <form className="space-y-4" onSubmit={submit}>
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
              <KoreanTermTooltip term="환자">환자</KoreanTermTooltip> 성함
            </span>
            <input
              className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
              onChange={(e) => setName(e.target.value)}
              placeholder="성함을 적으시오"
              type="text"
              value={name}
            />
          </label>

          <div className="flex gap-4">
            <div className="flex-1">
              <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
                성별
              </span>
              <div className="flex gap-2">
                {(["남", "여"] as const).map((g) => (
                  <button
                    className={`flex-1 rounded-md border-2 px-3 py-2 font-script text-base font-bold transition ${
                      gender === g
                        ? "border-[#7a4f28] bg-[#7a4f28] text-[#f5e6c8]"
                        : "border-[#7a4f28]/40 bg-white/70 text-[#7a4f28] hover:border-[#7a4f28]"
                    }`}
                    key={g}
                    onClick={() => setGender(g)}
                    type="button"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <label className="block w-28">
              <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
                연세
              </span>
              <input
                className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
                inputMode="numeric"
                min={1}
                onChange={(e) => setAge(e.target.value)}
                placeholder="나이"
                type="number"
                value={age}
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
              <KoreanTermTooltip term="서신">서신</KoreanTermTooltip> 받을 거처
            </span>
            <input
              className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 적으시오"
              type="email"
              value={email}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-script text-sm font-bold text-[#7a4f28]">
              비밀번호 <span className="font-normal">(6자 이상, 재방문 입장에 쓰임)</span>
            </span>
            <input
              className="w-full rounded-md border-2 border-[#7a4f28]/40 bg-white/70 px-3 py-2 text-base outline-none focus:border-[#7a4f28] focus:ring-2 focus:ring-[#7a4f28]/40"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 정하시오"
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
            {loading ? "접수 중…" : "진료 등록하기"}
          </button>
        </form>
      </section>
    </div>,
    document.body
  );
}
