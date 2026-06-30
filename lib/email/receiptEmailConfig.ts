export const RECEIPT_FROM =
  process.env.RECEIPT_FROM?.trim().replace(/[""]/g, '"') ??
  "광개토약방 <noreply@xn--vh3bp4o.kr>";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://약방.kr";

export const SITE_DISPLAY_HOST = "약방.kr";

export const RECEIPT_SEAL_IMAGE = `${SITE_URL}/images/yakbang-gwanggaeto-stamp.png`;
