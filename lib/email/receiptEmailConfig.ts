export const RECEIPT_FROM =
  process.env.RECEIPT_FROM?.trim().replace(/[""]/g, '"') ??
  "약방광개토 <noreply@onmaeumkr.com>";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yakbang-two.vercel.app";

export const RECEIPT_SEAL_IMAGE = `${SITE_URL}/images/onmaeum-seal.png`;
export const RECEIPT_TEACHER_LOGO = `${SITE_URL}/images/tk-saem-logo.png`;
