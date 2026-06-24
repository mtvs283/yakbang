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
export const H_PRON_PRICE = 500;

export function buildPaidReceiptData(
  remedyName: string,
  balance: number
): ReceiptData {
  return {
    remedyName,
    amount: H_PRON_PRICE,
    balance,
    kimchiGuide: {
      perDose: H_PRON_PRICE,
      lines: [
        "※ 이 약 한 첩(500원) 기준",
        "김밥 한 줄 = 7첩 (3,500원)",
        "삼각김밥 = 3첩 (1,500원)",
        "자판기 커피 = 1.4첩 (700원)"
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
