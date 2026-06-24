import type { ReceiptData } from "./receiptTypes";

const RECEIPT_IDS_KEY = "yakbang_receipt_ids";
const RECEIPT_OWNER_KEY = "yakbang_receipt_owner";

function readJsonArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeJsonArray(key: string, values: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch {
    /* noop */
  }
}

export function getStashedReceiptIds(): string[] {
  return readJsonArray(RECEIPT_IDS_KEY);
}

export function stashReceiptId(id: string) {
  const ids = getStashedReceiptIds();
  if (ids.includes(id)) return;
  writeJsonArray(RECEIPT_IDS_KEY, [...ids, id]);
}

export function getStashedReceiptOwnerId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(RECEIPT_OWNER_KEY);
  } catch {
    return null;
  }
}

export function stashReceiptOwnerId(userId: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(RECEIPT_OWNER_KEY, userId);
  } catch {
    /* noop */
  }
}

export function clearReceiptStash() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECEIPT_IDS_KEY);
    localStorage.removeItem(RECEIPT_OWNER_KEY);
  } catch {
    /* noop */
  }
}

export type { ReceiptData };
