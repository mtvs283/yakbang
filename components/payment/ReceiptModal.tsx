"use client";

import { createPortal } from "react-dom";

interface Props {
  remedyName: string;
  price: number;
  balance: number;
  onClose: () => void;
  showKimchiGuide?: boolean;
  closeLabel?: string;
  /** 가입 환자: 이메일 버튼 대신 자동 발송 안내 */
  isRegisteredPatient?: boolean;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 font-script text-base">
      <span>{label}</span>
      <span className="shrink-0 font-bold">{value}</span>
    </div>
  );
}

export default function ReceiptModal({
  remedyName,
  price,
  balance,
  onClose,
  showKimchiGuide = true,
  closeLabel = "닫고 처방전 받기",
  isRegisteredPatient = false
}: Props) {
  const priceStr = `${price.toLocaleString("ko-KR")}원`;
  const balanceStr = `${balance.toLocaleString("ko-KR")}원`;

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-sm"
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
        <div className="mb-4 border-b border-dashed border-[#7a4f28]/50 pb-4 text-center">
          <p className="font-script text-sm tracking-[0.3em] text-[#7a4f28]">
            집현전 약방
          </p>
          <p className="mt-1 font-sanskr text-xl font-bold tracking-widest text-[#8a3a1a]">
            藥房廣開土 영수증
          </p>
        </div>

        <div className="space-y-2 border-b border-dashed border-[#7a4f28]/40 pb-4">
          <Row label={`${remedyName} ............`} value={priceStr} />
          <div className="my-2 border-t border-dashed border-[#7a4f28]/30" />
          <Row label="합계 ................." value={priceStr} />
          <Row label="잔액 ..............." value={balanceStr} />
        </div>

        {isRegisteredPatient ? (
          <p className="mb-4 text-center font-script text-sm leading-relaxed text-[#7a4f28]/85">
            ※ 영수증은 가입하신 서신 주소로 자동 발송되오 (서신 배달 기능은 곧 박힐
            예정)
          </p>
        ) : null}
        {!isRegisteredPatient ? (
          <button
            className="mb-4 w-full cursor-not-allowed rounded-md border border-[#7a4f28]/30 bg-[#7a4f28]/5 px-4 py-2.5 font-script text-base font-bold text-[#7a4f28]/50"
            disabled
            type="button"
          >
            영수증 이메일로 받기
          </button>
        ) : null}

        {showKimchiGuide ? (
        <div className="my-4 border-b border-dashed border-[#7a4f28]/40 pb-4 text-center text-sm leading-7 text-[#7a4f28]">
          <p>※ 이 약 한 첩(500원) 기준</p>
          <p>김밥 한 줄 = 7첩 (3,500원)</p>
          <p>삼각김밥 = 3첩 (1,500원)</p>
          <p>자판기 커피 = 1.4첩 (700원)</p>
        </div>
        ) : null}

        <div className="flex flex-col gap-2">
          <button
            className="w-full rounded-md border-2 border-[#7a4f28] bg-[#7a4f28] px-4 py-3 font-script text-lg font-bold text-[#f5e6c8] transition hover:bg-[#8a3a1a]"
            onClick={onClose}
            type="button"
          >
            {closeLabel}
          </button>
        </div>
      </section>
    </div>,
    document.body
  );
}
