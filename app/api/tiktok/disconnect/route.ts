import { NextRequest, NextResponse } from "next/server";
import { config, cookieOptions, readSession, SESSION_COOKIE, STATE_COOKIE } from "../../../../lib/tiktok";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  let cfg;
  try { cfg = config(); } catch { return NextResponse.json({ error: "틱톡 연결 설정이 필요합니다." }, { status: 503 }); }
  if (request.headers.get("origin") !== cfg.origin) return new NextResponse(null, { status: 403 });
  const session = readSession(request.cookies.get(SESSION_COOKIE)?.value, cfg.secret);
  let result = "disconnected";
  if (session) {
    try {
      const response = await fetch("https://open.tiktokapis.com/v2/oauth/revoke/", {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ client_key: cfg.clientKey, client_secret: cfg.clientSecret, access_token: session.accessToken }),
        cache: "no-store", signal: AbortSignal.timeout(15000)
      });
      const data = await response.json();
      if (!response.ok || data.error) result = "revoke_failed";
    } catch { result = "revoke_failed"; }
  }
  const response = NextResponse.redirect(new URL(`/tiktok?result=${result}`, cfg.origin), 303);
  response.headers.set("Cache-Control", "no-store");
  for (const name of [SESSION_COOKIE, STATE_COOKIE]) response.cookies.set(name, "", { ...cookieOptions, maxAge: 0 });
  return response;
}
