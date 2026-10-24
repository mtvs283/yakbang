import { NextRequest, NextResponse } from "next/server";
import { config, cookieOptions, readSession, seal, SESSION_COOKIE, tokenRequest } from "../../../../lib/tiktok";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  let cfg;
  try { cfg = config(); } catch { return NextResponse.json({ error: "틱톡 연결 설정이 필요합니다." }, { status: 503 }); }
  if (request.headers.get("origin") !== cfg.origin) return new NextResponse(null, { status: 403 });
  const old = readSession(request.cookies.get(SESSION_COOKIE)?.value, cfg.secret);
  if (!old) return NextResponse.redirect(new URL("/tiktok?result=expired", cfg.origin), 303);
  try {
    const session = await tokenRequest({ grant_type: "refresh_token", refresh_token: old.refreshToken });
    if (session.openId !== old.openId) throw new Error("Account mismatch");
    const response = NextResponse.redirect(new URL("/tiktok?result=refreshed", cfg.origin), 303);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(SESSION_COOKIE, seal(session, cfg.secret), {
      ...cookieOptions, maxAge: Math.min(2592000, Math.floor((session.refreshExpiresAt - Date.now()) / 1000))
    });
    return response;
  } catch { return NextResponse.redirect(new URL("/tiktok?result=refresh_failed", cfg.origin), 303); }
}
