/** DB user_receipts.receipt_data 스키마 (영수증 모달·영수증함 공용) */

export interface ReceiptKimchiGuide {
  perDose: number;
  lines: string[];
}

export interface ReceiptData {
  remedyName: string;
  amount: number;
  balance?: number;
  kimchiGuide?: ReceiptKimchiGuide;
}

export interface UserReceiptRow {
  id: string;
  user_id: string;
  prescription_slug: string;
  issued_at: string;
  receipt_data: ReceiptData;
  recipient_name: string | null;
  recipient_email: string | null;
  email_sent: boolean;
}

export const H_PRON_RECEIPT_SLUG = "h-pron";

export function buildPaidReceiptData(
  remedyName: string,
  balance: number,
  price: number
): ReceiptData {
  const fmt = (n: number) => n.toLocaleString("ko-KR");
  const gimbapDoses = price > 0 ? (3500 / price).toFixed(1).replace(/\.0$/, "") : "7";
  const triangleDoses = price > 0 ? (1500 / price).toFixed(1).replace(/\.0$/, "") : "3";
  const coffeeDoses = price > 0 ? (700 / price).toFixed(1).replace(/\.0$/, "") : "1.4";

  return {
    remedyName,
    amount: price,
    balance,
    kimchiGuide: {
      perDose: price,
      lines: [
        `※ 이 약 한 첩(${fmt(price)}원) 기준`,
        `김밥 한 줄 = ${gimbapDoses}첩 (3,500원)`,
        `삼각김밥 = ${triangleDoses}첩 (1,500원)`,
        `자판기 커피 = ${coffeeDoses}첩 (700원)`
      ]
    }
  };
}

export function buildFreeReceiptData(remedyName: string): ReceiptData {
  return {
    remedyName,
    amount: 0
  };
}
