/** 영수증 발급 일시 — 한국 시간 */
export function formatReceiptIssuedAtKST(iso: string): string {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
