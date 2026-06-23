import { createClient } from "./supabase/client";

export type ChargeResult =
  | { success: true; newBalance: number }
  | { error: "no_user" | "insert_failed" | "insufficient"; balance?: number };

type RpcChargeResponse = {
  error?: "no_user" | "insufficient" | "insert_failed";
  balance?: number;
  success?: boolean;
  newBalance?: number;
};

export async function getPointBalance(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const { data: profile } = await supabase
    .from("users")
    .select("points")
    .eq("id", user.id)
    .single();
  return (profile?.points as number) ?? 0;
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

  const { data, error } = await supabase.rpc("charge_prescription", {
    p_slug: slug,
    p_price: price
  });

  if (error) {
    console.error("charge_prescription rpc failed", error);
    return { error: "insert_failed" };
  }

  const result = data as RpcChargeResponse;
  if (result.error === "no_user") return { error: "no_user" };
  if (result.error === "insufficient") {
    return { error: "insufficient", balance: result.balance };
  }
  if (result.success && typeof result.newBalance === "number") {
    return { success: true, newBalance: result.newBalance };
  }

  console.error("charge_prescription unexpected response", result);
  return { error: "insert_failed" };
}
