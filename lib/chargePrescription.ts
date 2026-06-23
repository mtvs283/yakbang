import { createClient } from "./supabase/client";

export type ChargeResult =
  | { success: true; newBalance: number }
  | { error: "no_user" | "insert_failed" | "insufficient"; balance?: number };

export async function getPointBalance(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data: balance } = await supabase
    .from("point_transactions")
    .select("delta")
    .eq("user_id", user.id);
  return balance?.reduce((sum: number, t: { delta: number }) => sum + t.delta, 0) ?? 0;
}

export async function chargePrescription(
  slug: string,
  price: number
): Promise<ChargeResult> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { error: "no_user" };

  const { data: prescription } = await supabase
    .from("user_prescriptions")
    .select("id")
    .eq("user_id", user.id)
    .eq("prescription_slug", slug)
    .single();

  const { data: balance } = await supabase
    .from("point_transactions")
    .select("delta")
    .eq("user_id", user.id);

  const total =
    balance?.reduce((sum: number, t: { delta: number }) => sum + t.delta, 0) ?? 0;

  if (total < price) {
    return { error: "insufficient", balance: total };
  }

  const { error } = await supabase.from("point_transactions").insert({
    user_id: user.id,
    delta: -price,
    reason: "prescription_purchase",
    related_id: prescription?.id ?? null
  });

  if (error) return { error: "insert_failed" };

  return {
    success: true,
    newBalance: total - price
  };
}