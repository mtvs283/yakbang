import { createClient } from "./supabase/client";
import type { ReceiptData } from "./receiptTypes";
import { stashReceiptId, stashReceiptOwnerId } from "./receiptStorage";

interface RecordReceiptParams {
  prescriptionSlug: string;
  receiptData: ReceiptData;
  recipientEmail?: string | null;
  recipientName?: string | null;
}

export type RecordReceiptResult =
  | { ok: true; id: string }
  | { ok: false; reason: "no_user" | "insert_failed"; detail: string };

async function resolveAuthUser() {
  const supabase = createClient();
  for (let attempt = 0; attempt < 8; attempt++) {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (session?.user) return session.user;

    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (user) return user;

    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  return null;
}

function formatSupabaseError(error: {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}): string {
  return [error.code, error.message, error.details, error.hint]
    .filter(Boolean)
    .join(" | ");
}

export async function recordUserReceipt(
  params: RecordReceiptParams
): Promise<RecordReceiptResult> {
  try {
    const user = await resolveAuthUser();
    if (!user) {
      console.error("[user_receipts] no auth user after retries");
      return { ok: false, reason: "no_user", detail: "auth.uid() 없음" };
    }

    const email =
      params.recipientEmail !== undefined
        ? params.recipientEmail
        : user.email ?? null;

    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_receipts")
      .insert({
        prescription_slug: params.prescriptionSlug,
        receipt_data: params.receiptData,
        recipient_email: email,
        recipient_name: params.recipientName ?? null
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      const detail = error ? formatSupabaseError(error) : "empty insert response";
      console.error("[user_receipts] insert failed", {
        userId: user.id,
        slug: params.prescriptionSlug,
        detail,
        error
      });
      return { ok: false, reason: "insert_failed", detail };
    }

    stashReceiptId(data.id);
    stashReceiptOwnerId(user.id);
    console.info("[user_receipts] insert ok", { id: data.id, userId: user.id });
    return { ok: true, id: data.id };
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    console.error("[user_receipts] recordUserReceipt exception", e);
    return { ok: false, reason: "insert_failed", detail };
  }
}

export async function updateReceiptRecipient(
  receiptId: string,
  recipientName: string,
  recipientEmail: string
): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("user_receipts")
      .update({
        recipient_name: recipientName.trim(),
        recipient_email: recipientEmail.trim()
      })
      .eq("id", receiptId);
    if (error) {
      console.error("[user_receipts] recipient update failed", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[user_receipts] updateReceiptRecipient failed", e);
    return false;
  }
}
