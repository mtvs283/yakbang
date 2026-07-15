import { createClient } from "./supabase/client";
import type { UserReceiptRow } from "./receiptTypes";

export async function fetchUserReceipts(): Promise<UserReceiptRow[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("user_receipts")
      .select("*")
      .order("issued_at", { ascending: false });

    if (error) {
      console.error("fetchUserReceipts failed", error);
      return [];
    }

    return (data ?? []) as UserReceiptRow[];
  } catch (e) {
    console.error("fetchUserReceipts failed", e);
    return [];
  }
}

export async function fetchUserReceiptCount(): Promise<number> {
  try {
    const supabase = createClient();
    const { count, error } = await supabase
      .from("user_receipts")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("fetchUserReceiptCount failed", error);
      return 0;
    }

    return count ?? 0;
  } catch (e) {
    console.error("fetchUserReceiptCount failed", e);
    return 0;
  }
}
