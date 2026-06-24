/** 가입 환자 영수증 자동 발송 안내 (Resend 연동 전) */
export const REGISTERED_RECEIPT_EMAIL_NOTICE =
  "※ 영수증은 가입하신 서신 주소로 자동 발송되오 (서신 배달 기능은 곧 박힐 예정)";

interface Props {
  className?: string;
}

export default function RegisteredReceiptEmailNotice({ className = "" }: Props) {
  return (
    <p
      className={`text-center font-script text-sm leading-relaxed text-[#7a4f28]/85 ${className}`.trim()}
    >
      {REGISTERED_RECEIPT_EMAIL_NOTICE}
    </p>
  );
}
