"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getRemedyText } from "../data/i18n";
import { formatPrice, type Remedy } from "../data/remedies";
import { useLocale } from "./LocaleProvider";

interface PrescriptionModalProps {
  remedy: Remedy;
  onClose: () => void;
  onComplete?: () => void; // 퀴즈 전부 정답 시 1회 호출 (가입 전환 유도용)
}

function normalize(value: string): string {
  return value.trim().replace(/\s+/g, "");
}

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function PrescriptionModal({
  remedy,
  onClose,
  onComplete
}: PrescriptionModalProps) {
  const { locale, t } = useLocale();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const completedRef = useRef(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hintsShown, setHintsShown] = useState<Record<number, boolean>>({});

  const text = getRemedyText(remedy, locale);
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

  // 전부 정답이면 합격 도장을 보여준 뒤(1.5초) 완료 콜백 1회 — 가치 체험 직후 전환
  useEffect(() => {
    if (!allCorrect || completedRef.current || !onComplete) return;
    completedRef.current = true;
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [allCorrect, onComplete]);

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
          aria-label={t.closeAria}
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
            {t.stamp}
          </div>
        ) : null}

        <header className="mb-5 border-b-2 border-dashed border-[#7a4f28]/40 pb-4 pr-12">
          <p className="mb-2 text-sm font-bold tracking-[0.24em] text-[#7a4f28]">
            {t.modalLabel}
          </p>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h1 className="font-sanskr text-4xl font-bold leading-tight sm:text-5xl">
              {text.name}
            </h1>
            <span className="text-2xl font-black text-[#8a3a1a]">
              {formatPrice(remedy.price)}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-full border border-[#7a4f28]/50 bg-[#7a4f28]/10 px-3 py-0.5 text-xs font-bold text-[#7a4f28]">
              {t.status[remedy.status]}
            </span>
            {remedy.status === "limited" && remedy.stock !== undefined ? (
              <span className="text-sm font-semibold text-[#8a3a1a]">
                {t.stockLabel(remedy.stock)}
              </span>
            ) : null}
          </div>
        </header>

        {/* 진단 */}
        <div className="mb-4">
          <p className="mb-1 text-sm font-bold tracking-[0.2em] text-[#7a4f28]">
            {t.diagnosis}
          </p>
          <p className="font-script text-xl leading-relaxed">{text.diagnosis}</p>
        </div>

        {/* 인포 */}
        <div className="mb-5 rounded-md bg-[#7a4f28]/8 p-3">
          <p className="mb-1 text-sm font-bold tracking-[0.2em] text-[#7a4f28]">
            {t.info}
          </p>
          <p className="text-base leading-8">{text.info}</p>
        </div>

        {isUnavailable ? (
          <div className="mb-5 rounded-md border-2 border-dashed border-[#8a3a1a]/50 bg-[#8a3a1a]/8 p-4 text-center">
            <p className="font-script text-2xl font-bold text-[#8a3a1a]">
              {t.royalReject}
            </p>
          </div>
        ) : (
          <div className="mb-5">
            <p className="mb-3 text-sm font-bold tracking-[0.2em] text-[#7a4f28]">
              {t.prescription}
            </p>
            <ol className="space-y-4">
              {quiz.map((item, index) => {
                const result = correctness[index];
                const given = answers[index] ?? "";
                const question = text.quizQuestions[index] ?? item.question;
                return (
                  <li
                    className="rounded-md border border-[#7a4f28]/30 bg-white/40 p-3"
                    key={index}
                  >
                    <p className="mb-2 text-base font-semibold leading-7">
                      {index + 1}. {question}
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
                              className={`rounded-md border px-3 py-1.5 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7a4f28] ${tone}`}
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
                          aria-label={`${index + 1}`}
                          className={`w-44 rounded-md border bg-[#f5e6c8] px-3 py-1.5 text-base font-semibold outline-none transition focus:ring-2 focus:ring-[#7a4f28] ${
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
                          placeholder={t.answerPlaceholder}
                          type="text"
                          value={given}
                        />
                        {result === true ? (
                          <span className="text-base font-bold text-green-700">
                            {t.correct}
                          </span>
                        ) : null}
                        {result === false ? (
                          <span className="text-base font-bold text-red-700">
                            {t.wrong}
                          </span>
                        ) : null}
                      </div>
                    )}

                    {item.hint ? (
                      <div className="mt-2">
                        {hintsShown[index] ? (
                          <p className="text-sm italic text-[#7a4f28]">
                            {t.hintPrefix}
                            {item.hint}
                          </p>
                        ) : (
                          <button
                            className="text-sm font-semibold text-[#7a4f28] underline underline-offset-2 hover:text-[#8a3a1a] focus:outline-none"
                            onClick={() =>
                              setHintsShown((prev) => ({
                                ...prev,
                                [index]: true
                              }))
                            }
                            type="button"
                          >
                            {t.showHint}
                          </button>
                        )}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {allCorrect ? (
              <p className="mt-4 text-center font-script text-xl font-bold text-[#8a3a1a]">
                {t.allDone}
              </p>
            ) : null}
          </div>
        )}

        {callbackIsLive ? (
          <a
            className="block w-full rounded-md border border-[#7a4f28] bg-[#7a4f28] px-4 py-3 text-center text-base font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
            href={callback.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {text.callbackLabel}
          </a>
        ) : (
          <div className="w-full rounded-md border border-dashed border-[#7a4f28]/50 bg-[#7a4f28]/8 px-4 py-3 text-center text-base font-bold text-[#7a4f28]">
            {text.callbackLabel}
            <span className="ml-1 font-normal opacity-70">{t.callbackPending}</span>
          </div>
        )}
      </section>
    </div>
  );
}
