"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatPrice, statusLabel, type Remedy } from "../data/remedies";

interface PrescriptionModalProps {
  remedy: Remedy;
  onClose: () => void;
}

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, "");
}

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function PrescriptionModal({
  remedy,
  onClose
}: PrescriptionModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hintsShown, setHintsShown] = useState<Record<number, boolean>>({});

  const quiz = remedy.prescription.quiz;
  const isUnavailable = remedy.status === "unavailable";

  const correctness = useMemo(
    () =>
      quiz.map((item, index) => {
        const given = answers[index];
        if (given === undefined || given === "") {
          return null;
        }
        return normalize(given) === normalize(item.answer);
      }),
    [answers, quiz]
  );

  const allCorrect =
    quiz.length > 0 && correctness.every((value) => value === true);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const callback = remedy.prescription.callback;
  const callbackIsLive = isExternalUrl(callback.url);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
    >
      <section
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg border-4 border-[#7a4f28] bg-[#f5e6c8] p-6 text-[#3d2b1a] shadow-[0_0_42px_rgba(0,0,0,0.55)] sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(122,79,40,0.05) 0px, rgba(122,79,40,0.05) 1px, transparent 1px, transparent 22px)"
        }}
      >
        <button
          aria-label="처방전 닫기"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#7a4f28]/60 text-xl leading-none text-[#7a4f28] transition hover:bg-[#7a4f28] hover:text-[#f5e6c8] focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          ×
        </button>

        {allCorrect ? (
          <div
            aria-hidden="true"
            className="animate-stamp pointer-events-none absolute right-6 top-16 rotate-[-14deg] rounded-md border-4 border-red-700 px-4 py-2 text-2xl font-black tracking-[0.2em] text-red-700 sm:text-3xl"
          >
            처방 완료
          </div>
        ) : null}

        <header className="mb-5 border-b-2 border-dashed border-[#7a4f28]/40 pb-4 pr-12">
          <p className="mb-2 text-xs font-bold tracking-[0.24em] text-[#7a4f28]">
            처 방 전 · 藥房廣開土
          </p>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="font-script text-4xl font-bold leading-tight sm:text-5xl">
              {remedy.name}
            </h1>
            <span className="text-xl font-black text-[#8a3a1a]">
              {formatPrice(remedy.price)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full border border-[#7a4f28]/50 bg-[#7a4f28]/10 px-3 py-0.5 text-xs font-bold text-[#7a4f28]">
              {statusLabel(remedy.status)}
            </span>
            {remedy.status === "limited" && remedy.stock !== undefined ? (
              <span className="text-xs font-semibold text-[#8a3a1a]">
                남은 수량 {remedy.stock}첩
              </span>
            ) : null}
          </div>
        </header>

        {/* 진단 */}
        <div className="mb-4">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-[#7a4f28]">
            진단
          </p>
          <p className="font-script text-lg leading-relaxed">
            {remedy.prescription.diagnosis}
          </p>
        </div>

        {/* 인포 */}
        <div className="mb-5 rounded-md bg-[#7a4f28]/8 p-3">
          <p className="mb-1 text-xs font-bold tracking-[0.2em] text-[#7a4f28]">
            약 설명
          </p>
          <p className="text-sm leading-7">{remedy.prescription.info}</p>
        </div>

        {isUnavailable ? (
          /* 왕실 비방 — 거절 */
          <div className="mb-5 rounded-md border-2 border-dashed border-[#8a3a1a]/50 bg-[#8a3a1a]/8 p-4 text-center">
            <p className="font-script text-xl font-bold text-[#8a3a1a]">
              이 약은 그대의 손이 닿지 않소
            </p>
          </div>
        ) : (
          /* 처방 — 미니 퀴즈 */
          <div className="mb-5">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#7a4f28]">
              처방 (빈칸을 채우시오)
            </p>
            <ol className="space-y-4">
              {quiz.map((item, index) => {
                const result = correctness[index];
                const given = answers[index] ?? "";
                return (
                  <li
                    className="rounded-md border border-[#7a4f28]/30 bg-white/40 p-3"
                    key={index}
                  >
                    <p className="mb-2 text-sm font-semibold leading-6">
                      {index + 1}. {item.question}
                    </p>

                    {item.options ? (
                      <div className="flex flex-wrap gap-2">
                        {item.options.map((option) => {
                          const selected = given === option;
                          const optionIsAnswer =
                            normalize(option) === normalize(item.answer);
                          let tone =
                            "border-[#7a4f28]/40 bg-[#f5e6c8] text-[#3d2b1a] hover:border-[#7a4f28]";
                          if (selected && result === true) {
                            tone =
                              "border-green-700 bg-green-700/15 text-green-800";
                          } else if (selected && result === false) {
                            tone = "border-red-700 bg-red-700/15 text-red-800";
                          } else if (result !== null && optionIsAnswer) {
                            tone =
                              "border-green-700 bg-green-700/10 text-green-800";
                          }
                          return (
                            <button
                              className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7a4f28] ${tone}`}
                              key={option}
                              onClick={() =>
                                setAnswers((prev) => ({
                                  ...prev,
                                  [index]: option
                                }))
                              }
                              type="button"
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          aria-label={`${index + 1}번 답 입력`}
                          className={`w-40 rounded-md border bg-[#f5e6c8] px-3 py-1.5 text-sm font-semibold outline-none transition focus:ring-2 focus:ring-[#7a4f28] ${
                            result === true
                              ? "border-green-700"
                              : result === false
                                ? "border-red-700"
                                : "border-[#7a4f28]/40"
                          }`}
                          onChange={(event) =>
                            setAnswers((prev) => ({
                              ...prev,
                              [index]: event.target.value
                            }))
                          }
                          placeholder="답을 적으시오"
                          type="text"
                          value={given}
                        />
                        {result === true ? (
                          <span className="text-sm font-bold text-green-700">
                            ✓ 정답이오
                          </span>
                        ) : null}
                        {result === false ? (
                          <span className="text-sm font-bold text-red-700">
                            ✗ 다시 보시오
                          </span>
                        ) : null}
                      </div>
                    )}

                    {item.hint ? (
                      <div className="mt-2">
                        {hintsShown[index] ? (
                          <p className="text-xs italic text-[#7a4f28]">
                            힌트: {item.hint}
                          </p>
                        ) : (
                          <button
                            className="text-xs font-semibold text-[#7a4f28] underline underline-offset-2 hover:text-[#8a3a1a] focus:outline-none"
                            onClick={() =>
                              setHintsShown((prev) => ({
                                ...prev,
                                [index]: true
                              }))
                            }
                            type="button"
                          >
                            힌트 보기
                          </button>
                        )}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {allCorrect ? (
              <p className="mt-4 text-center font-script text-lg font-bold text-[#8a3a1a]">
                처방을 모두 익혔소. 이 약, 그대의 것이오.
              </p>
            ) : null}
          </div>
        )}

        {/* 콜백 링크 */}
        {callbackIsLive ? (
          <a
            className="block w-full rounded-md border border-[#7a4f28] bg-[#7a4f28] px-4 py-3 text-center text-sm font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
            href={callback.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {callback.label}
          </a>
        ) : (
          <div className="w-full rounded-md border border-dashed border-[#7a4f28]/50 bg-[#7a4f28]/8 px-4 py-3 text-center text-sm font-bold text-[#7a4f28]">
            {callback.label}
            <span className="ml-1 font-normal opacity-70">(연결 준비 중)</span>
          </div>
        )}
      </section>
    </div>
  );
}
