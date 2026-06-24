import { createClient } from "./supabase/client";

/** 클라이언트 → /api/send-receipt 호출 (실패해도 UI는 계속) */
export async function requestReceiptEmail(receiptId: string): Promise<void> {
  try {
    const supabase = createClient();
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }

    const res = await fetch("/api/send-receipt", {
      method: "POST",
      headers,
      credentials: "include",
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
