export const RECEIPT_FROM =
  process.env.RECEIPT_FROM?.trim().replace(/[""]/g, '"') ??
  "광개토약방 <noreply@yakbang.kr>";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yakbang.kr";

export const RECEIPT_SEAL_IMAGE = `${SITE_URL}/images/yakbang-gwanggaeto-stamp.png`;
