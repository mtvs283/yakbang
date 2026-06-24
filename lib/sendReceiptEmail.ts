import { createClient } from "./supabase/client";

export type SendReceiptEmailResult =
  | { ok: true }
  | { ok: false; status: number; message: string; detail?: string };

function mapSendError(
  status: number,
  body: { error?: string; detail?: string }
): SendReceiptEmailResult {
  const detail = body.detail;
  if (status === 401) {
    return {
      ok: false,
      status,
      message: "입장이 풀렸소. 새로 고침 후 다시 시도하시오.",
      detail
    };
  }
  if (status === 404) {
    return {
      ok: false,
      status,
      message: "영수증을 찾지 못했소.",
      detail
    };
  }
  if (status === 400) {
    return {
      ok: false,
      status,
      message: body.error ?? "서신 주소가 없소.",
      detail
    };
  }
  if (status === 409) {
    return {
      ok: false,
      status,
      message: "이미 발송된 영수증이오. 아래 ‘다시 보내기’를 누르시오.",
      detail
    };
  }
  if (status === 500 && body.error?.includes("설정")) {
    return {
      ok: false,
      status,
      message:
        "약방 서신 설정(RESEND)이 안 됐소. Vercel 환경 변수를 점검하시오.",
      detail
    };
  }
  if (detail) {
    return {
      ok: false,
      status,
      message: detail,
      detail
    };
  }
  return {
    ok: false,
    status,
    message: body.error ?? `서신 발송 실패 (${status})`,
    detail
  };
}

/** 클라이언트 → /api/send-receipt */
export async function requestReceiptEmail(
  receiptId: string,
  options?: { force?: boolean }
): Promise<SendReceiptEmailResult> {
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
      body: JSON.stringify({
        receipt_id: receiptId,
        force: options?.force === true
      })
    });

    if (res.ok) {
      return { ok: true };
    }

    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      detail?: string;
    };
    const mapped = mapSendError(res.status, body);
    console.error("[send-receipt] failed", res.status, body);
    return mapped;
  } catch (e) {
    const message = e instanceof Error ? e.message : "네트워크 오류";
    console.error("[send-receipt] request failed", e);
    return { ok: false, status: 0, message };
  }
}
