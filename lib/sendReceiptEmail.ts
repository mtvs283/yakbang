/** 클라이언트 → /api/send-receipt 호출 (실패해도 UI는 계속) */
export async function requestReceiptEmail(receiptId: string): Promise<void> {
  try {
    const res = await fetch("/api/send-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ receipt_id: receiptId })
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      console.error("[send-receipt] failed", res.status, body);
    }
  } catch (e) {
    console.error("[send-receipt] request failed", e);
  }
}
