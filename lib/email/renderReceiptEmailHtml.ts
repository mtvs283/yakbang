import { formatReceiptIssuedAtKST } from "./formatReceiptIssuedAt";
import { RECEIPT_SEAL_IMAGE, SITE_URL } from "./receiptEmailConfig";

export interface ReceiptEmailParams {
  recipientName: string | null;
  prescriptionName: string;
  issuedAt: string;
  patientNumber: number | null;
  amount: number;
}

export function renderReceiptEmailHtml(params: ReceiptEmailParams): string {
  const name = params.recipientName?.trim() || "양반";
  const issuedLabel = formatReceiptIssuedAtKST(params.issuedAt);
  const patientNo =
    params.patientNumber != null ? String(params.patientNumber) : "—";
  const isFree = params.amount === 0;
  const amountBox = isFree
    ? "무료 체험 · 첫 처방"
    : `${params.amount.toLocaleString("ko-KR")}원`;

  const kimchiBlock = isFree
    ? ""
    : `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border:1px dashed #8b6f47;border-radius:8px;background:#faf6ee;">
          <tr>
            <td style="padding:16px 20px;font-family:Georgia,'Times New Roman',serif;color:#2a1f14;font-size:14px;line-height:1.9;">
              <p style="margin:0 0 8px;font-weight:bold;color:#6b5b3f;">※ 이 약 한 첩(500원) 기준 김밥 환산</p>
              <p style="margin:0;">김밥 한 줄 = <strong style="color:#a83232;">7첩</strong> (3,500원)</p>
              <p style="margin:0;">삼각김밥 = <strong style="color:#a83232;">3첩</strong> (1,500원)</p>
              <p style="margin:0;">자판기 커피 = <strong style="color:#a83232;">1.4첩</strong> (700원)</p>
              <p style="margin:12px 0 0;font-size:12px;color:#a89580;text-align:center;">─ 시세라 환자 양반이 왔을 때는 올랐을지도 모르오 ─</p>
            </td>
          </tr>
        </table>`;

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0e8d8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0e8d8;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#f5e6c8;border:3px solid #7a4f28;border-radius:4px;">
          <tr>
            <td style="padding:28px 24px 8px;position:relative;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;">
                    <p style="margin:0;font-family:Georgia,serif;font-size:13px;letter-spacing:0.35em;color:#a83232;">朱印</p>
                    <h1 style="margin:6px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:28px;color:#a83232;letter-spacing:0.12em;">領收證</h1>
                    <p style="margin:4px 0 0;font-family:Georgia,serif;font-size:12px;color:#6b5b3f;letter-spacing:0.2em;">約房廣開土</p>
                  </td>
                  <td align="right" style="vertical-align:top;width:88px;">
                    <img src="${RECEIPT_SEAL_IMAGE}" alt="온마음한국어" width="72" height="72" style="display:block;border-radius:4px;"/>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 20px;font-family:Georgia,'Times New Roman',serif;color:#2a1f14;font-size:16px;line-height:1.85;">
              <p style="margin:0 0 16px;">환자 <strong style="color:#a83232;">${escapeHtml(name)}</strong> 양반,</p>
              <p style="margin:0 0 20px;">약방에서 처방하신 약의 영수증을 보내오니, 아래를 살펴보시오.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px dashed #8b6f47;border-bottom:1px dashed #8b6f47;">
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:#6b5b3f;width:38%;">처방 약명</td>
                  <td style="padding:10px 0;font-size:15px;font-weight:bold;color:#a83232;">${escapeHtml(params.prescriptionName)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:#6b5b3f;">처방 일시</td>
                  <td style="padding:10px 0;font-size:15px;color:#2a1f14;">${escapeHtml(issuedLabel)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:#6b5b3f;">환자 번호</td>
                  <td style="padding:10px 0;font-size:15px;color:#2a1f14;">${escapeHtml(patientNo)}</td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;background:#fff8ee;border:2px solid #a83232;border-radius:8px;">
                <tr>
                  <td align="center" style="padding:18px;font-size:22px;font-weight:bold;color:#a83232;font-family:Georgia,serif;">
                    ${escapeHtml(amountBox)}
                  </td>
                </tr>
              </table>
              ${kimchiBlock}
              <p style="margin:20px 0 0;font-size:15px;line-height:1.8;">이 영수증은 환자 양반의 <strong>학습 통장</strong>이오. 약방에 오실 때마다 한 장씩 쌓이니, 영수증함에서 모아 보시오.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 16px;">
                <tr>
                  <td align="center">
                    <a href="${SITE_URL}/receipts" style="display:inline-block;padding:14px 28px;background:#7a4f28;color:#f5e6c8;text-decoration:none;font-family:Georgia,serif;font-size:16px;font-weight:bold;border-radius:6px;">영수증함 열어보기</a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 8px;text-align:center;font-size:14px;color:#8b6f47;letter-spacing:0.15em;">─ 약방광개토 의원 ─</p>
              <p style="margin:0;text-align:center;font-size:12px;color:#a89580;line-height:1.6;">本 영수증은 약방광개토에서 자동 발송된 서신이오. 회신은 받지 아니하오.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
