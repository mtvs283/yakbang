import { createClient } from "./supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

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

async function chargePrescriptionDirect(
  supabase: SupabaseClient,
  userId: string,
  slug: string,
  price: number
): Promise<ChargeResult> {
  const { data: prescription } = await supabase
    .from("user_prescriptions")
    .select("id")
    .eq("user_id", userId)
    .eq("prescription_slug", slug)
    .single();

  const { data: profile } = await supabase
    .from("users")
    .select("points")
    .eq("id", userId)
    .single();

  const total = (profile?.points as number) ?? 0;
  if (total < price) {
    return { error: "insufficient", balance: total };
  }

  const { error } = await supabase.from("point_transactions").insert({
    user_id: userId,
    delta: -price,
    reason: "prescription_purchase",
    related_id: prescription?.id ?? null
  });

  if (error) {
    console.error("prescription_purchase insert failed", error);
    return { error: "insert_failed" };
  }

  return { success: true, newBalance: total - price };
}

function isMissingRpcError(error: { code?: string; message?: string }) {
  return (
    error.code === "PGRST202" ||
    error.message?.includes("charge_prescription") === true ||
    error.message?.includes("Could not find the function") === true
  );
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
    if (isMissingRpcError(error)) {
      return chargePrescriptionDirect(supabase, user.id, slug, price);
    }
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
  return chargePrescriptionDirect(supabase, user.id, slug, price);
}
