"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getRemedyText } from "../data/i18n";
import { formatPrice, type Remedy } from "../data/remedies";
import { chargePrescription, getPointBalance } from "../lib/chargePrescription";
import { recordPrescriptionComplete } from "../lib/recordPrescriptionComplete";
import { recordUserReceipt } from "../lib/recordUserReceipt";
import {
  buildFreeReceiptData,
  buildPaidReceiptData,
  H_PRON_RECEIPT_SLUG
} from "../lib/receiptTypes";
import InsufficientBalanceModal from "./payment/InsufficientBalanceModal";
import PaymentConfirmModal from "./payment/PaymentConfirmModal";
import ReceiptIssuanceModal from "./payment/ReceiptIssuanceModal";
import ReceiptModal from "./payment/ReceiptModal";
import TreatmentConfirmModal from "./payment/TreatmentConfirmModal";
import { useLocale } from "./LocaleProvider";
import { useUser } from "../lib/hooks/useUser";

const H_PRON_SLUG = H_PRON_RECEIPT_SLUG;
const H_PRON_PRICE = 500;

type PaymentPhase =
  | "quiz"
  | "treatment"
  | "payment"
  | "receipt"
  | "insufficient"
  | "stamped";

interface PrescriptionModalProps {
  remedy: Remedy;
  onClose: () => void;
  onComplete?: () => void; // 퀴즈 전부 정답 시 1회 호출 (가입 전환 유도용)
  isRegistered?: boolean;
  onPaymentComplete?: () => void;
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
  onComplete,
  isRegistered: isRegisteredProp = false,
  onPaymentComplete
}: PrescriptionModalProps) {
  const { locale, t } = useLocale();
  const { isRegistered: userIsRegistered, loading: userLoading, userId } =
    useUser();
  const isRegistered = isRegisteredProp || userIsRegistered;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const completedRef = useRef(false);
  const recordedRef = useRef(false);
  const receiptPendingRef = useRef(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [hintsShown, setHintsShown] = useState<Record<number, boolean>>({});
  const [phase, setPhase] = useState<PaymentPhase>("quiz");
  const [balance, setBalance] = useState(0);
  const [receiptBalance, setReceiptBalance] = useState(0);
  const [paying, setPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [treatmentLoading, setTreatmentLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showIssuance, setShowIssuance] = useState(false);
  const [receiptId, setReceiptId] = useState<string | null>(null);
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [receiptRetrying, setReceiptRetrying] = useState(false);

  const text = getRemedyText(remedy, locale);
  const quiz = remedy.prescription.quiz;
  const isUnavailable = remedy.status === "unavailable";
  const requiresPayment =
    isRegistered && remedy.id === "h-pronunciation";

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

  const showStamp =
    allCorrect && (!requiresPayment || phase === "stamped");
  const showAllDone =
    allCorrect && (!requiresPayment || phase === "stamped");

  function finishVisitorFlow() {
    if (completedRef.current || !onComplete) return;
    completedRef.current = true;
    setTimeout(onComplete, 1500);
  }

  async function saveVisitorReceipt() {
    setReceiptError(null);
    const result = await recordUserReceipt({
      prescriptionSlug: H_PRON_SLUG,
      receiptData: buildFreeReceiptData(text.name),
      recipientEmail: null
    });
    if (result.ok) {
      setReceiptId(result.id);
      setShowIssuance(true);
      return true;
    }
    const hint =
      result.reason === "no_user"
        ? "세션이 아직 준비되지 않았소."
        : result.detail.includes("user_receipts") ||
            result.detail.includes("42P01") ||
            result.detail.includes("PGRST205")
          ? "user_receipts 테이블이 없소. Supabase SQL Editor에서 005_user_receipts.sql을 실행하시오."
          : result.detail;
    setReceiptError(hint);
    console.error("[visitor receipt]", result);
    return false;
  }

  function handleIssuanceDone() {
    setShowIssuance(false);
    finishVisitorFlow();
  }

  function dismissPaymentFlow() {
    setPhase("quiz");
    setAnswers({});
    setHintsShown({});
    setPaymentError(null);
  }

  async function handleTreatmentConfirm() {
    setTreatmentLoading(true);
    const currentBalance = await getPointBalance();
    setBalance(currentBalance);
    setTreatmentLoading(false);
    setPhase("payment");
  }

  async function handlePay() {
    setPaymentError(null);
    setPaying(true);
    const result = await chargePrescription(H_PRON_SLUG, H_PRON_PRICE);
    setPaying(false);
    if ("error" in result) {
      if (result.error === "insufficient") {
        setBalance(result.balance ?? 0);
        setPhase("insufficient");
      } else {
        setPaymentError("지불에 실패했소. 잠시 후 다시 시도하시오.");
      }
      return;
    }
    setReceiptBalance(result.newBalance);
    const receipt = await recordUserReceipt({
      prescriptionSlug: H_PRON_SLUG,
      receiptData: buildPaidReceiptData(text.name, result.newBalance)
    });
    if (!receipt.ok) {
      console.error("[paid receipt]", receipt);
      setPaymentError("영수증 기록에 실패했소. 잠시 후 다시 시도하시오.");
      return;
    }
    setPhase("receipt");
    await onPaymentComplete?.();
  }

  function handleGoAttendance() {
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPaymentComplete?.();
  }

  // 전부 정답 → 학습 기록 (실패해도 UI는 그대로)
  useEffect(() => {
    if (!allCorrect || recordedRef.current) return;
    if (remedy.id !== "h-pronunciation") return;
    recordedRef.current = true;
    void recordPrescriptionComplete(H_PRON_SLUG);
  }, [allCorrect, remedy.id]);

  // 가입 환자: 풀이 완료 → 치료 확인 모달 (답 확인 후 [확인] → 결제)
  useEffect(() => {
    if (!allCorrect || !requiresPayment || phase !== "quiz") return;
    setPhase("treatment");
  }, [allCorrect, requiresPayment, phase]);

  // 비회원: 세션 준비 후 영수증 기록 → 발급 모달 → 가입 유도
  useEffect(() => {
    if (userLoading || !userId) return;
    if (!allCorrect || requiresPayment || remedy.id !== "h-pronunciation") {
      return;
    }
    if (receiptPendingRef.current) return;
    receiptPendingRef.current = true;

    void (async () => {
      const ok = await saveVisitorReceipt();
      if (!ok) {
        receiptPendingRef.current = false;
      }
    })();
  }, [allCorrect, requiresPayment, remedy.id, text.name, userLoading, userId]);

  async function handleReceiptRetry() {
    setReceiptRetrying(true);
    receiptPendingRef.current = true;
    const ok = await saveVisitorReceipt();
    setReceiptRetrying(false);
    if (!ok) receiptPendingRef.current = false;
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (
          phase === "treatment" ||
          phase === "payment" ||
          phase === "receipt" ||
          phase === "insufficient" ||
          showIssuance
        ) {
          return;
        }
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, phase, showIssuance]);

  const callback = remedy.prescription.callback;
  const callbackIsLive = isExternalUrl(callback.url);

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (phase !== "quiz") return;
    onClose();
  }

  if (!mounted) return null;

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/72 px-4 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
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

        {showStamp ? (
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

            {showAllDone ? (
              <p className="mt-4 text-center font-script text-xl font-bold text-[#8a3a1a]">
                {t.allDone}
              </p>
            ) : null}

            {showAllDone && receiptError && !showIssuance ? (
              <div className="mt-4 rounded-md border-2 border-red-700/50 bg-red-700/10 p-4 text-center">
                <p className="font-script text-base font-bold text-red-800">
                  영수증을 남기지 못했소.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-red-900/90">
                  {receiptError}
                </p>
                <button
                  className="mt-3 rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-2 font-script text-base font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a] disabled:opacity-60"
                  disabled={receiptRetrying}
                  onClick={() => void handleReceiptRetry()}
                  type="button"
                >
                  {receiptRetrying ? "다시 시도 중…" : "영수증 다시 남기기"}
                </button>
              </div>
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

      {phase === "treatment" ? (
        <TreatmentConfirmModal
          loading={treatmentLoading}
          onClose={dismissPaymentFlow}
          onConfirm={handleTreatmentConfirm}
          remedyName={text.name}
        />
      ) : null}

      {phase === "payment" ? (
        <PaymentConfirmModal
          balance={balance}
          onClose={dismissPaymentFlow}
          onPay={handlePay}
          paying={paying}
          price={H_PRON_PRICE}
          remedyName={text.name}
          error={paymentError}
        />
      ) : null}

      {phase === "receipt" ? (
        <ReceiptModal
          balance={receiptBalance}
          isRegisteredPatient
          onClose={() => setPhase("stamped")}
          price={H_PRON_PRICE}
          remedyName={text.name}
        />
      ) : null}

      {showIssuance && receiptId ? (
        <ReceiptIssuanceModal
          onDone={handleIssuanceDone}
          receiptId={receiptId}
        />
      ) : null}

      {phase === "insufficient" ? (
        <InsufficientBalanceModal
          balance={balance}
          onClose={dismissPaymentFlow}
          onGoAttendance={handleGoAttendance}
        />
      ) : null}
    </div>,
    document.body
  );
}
