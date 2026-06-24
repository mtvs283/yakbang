import { createClient } from "./supabase/client";
import {
  getStashedReceiptIds,
  getStashedReceiptOwnerId,
  stashReceiptOwnerId
} from "./receiptStorage";

/** 가입·재로그인 후 localStorage에 남은 영수증 id를 현재 세션으로 이관 */
export async function migrateStashedReceipts(): Promise<void> {
  if (typeof window === "undefined") return;

  const ids = getStashedReceiptIds();
  const fromUserId = getStashedReceiptOwnerId();
  if (ids.length === 0) return;

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return;

  if (fromUserId && fromUserId !== user.id) {
    const { error } = await supabase.rpc("transfer_receipts", {
      p_receipt_ids: ids,
      p_from_user_id: fromUserId
    });
    if (error) {
      console.error("transfer_receipts failed", error);
      return;
    }
  }

  stashReceiptOwnerId(user.id);
}
