import { createClient } from "./supabase/client";
import type { ReceiptData } from "./receiptTypes";
import { stashReceiptId, stashReceiptOwnerId } from "./receiptStorage";

interface RecordReceiptParams {
  prescriptionSlug: string;
  receiptData: ReceiptData;
  recipientEmail?: string | null;
  recipientName?: string | null;
}

export async function recordUserReceipt(
  params: RecordReceiptParams
): Promise<string | null> {
  try {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) return null;

    const email =
      params.recipientEmail !== undefined
        ? params.recipientEmail
        : user.email ?? null;

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
      console.error("user_receipts insert failed", error);
      return null;
    }

    stashReceiptId(data.id);
    stashReceiptOwnerId(user.id);
    return data.id;
  } catch (e) {
    console.error("recordUserReceipt failed", e);
    return null;
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
      console.error("user_receipts recipient update failed", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("updateReceiptRecipient failed", e);
    return false;
  }
}
