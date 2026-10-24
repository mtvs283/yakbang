import { NextRequest, NextResponse } from "next/server";
import { config, cookieOptions, equal, seal, SESSION_COOKIE, STATE_COOKIE, tokenRequest, unseal } from "../../../../lib/tiktok";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  let cfg;
  try { cfg = config(); } catch { return NextResponse.json({ error: "틱톡 연결 설정이 필요합니다." }, { status: 503 }); }
  const finish = (result: string) => {
    const response = NextResponse.redirect(new URL(`/tiktok?result=${result}`, cfg.origin), 303);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.cookies.set(STATE_COOKIE, "", { ...cookieOptions, maxAge: 0 });
    return response;
  };
  const saved = unseal<{ state: string; expiresAt: number }>(request.cookies.get(STATE_COOKIE)?.value, cfg.secret);
  const state = request.nextUrl.searchParams.get("state");
  if (!saved || typeof saved.state !== "string" || !Number.isFinite(saved.expiresAt) ||
    saved.expiresAt <= Date.now() || !state || !equal(saved.state, state)) return finish("state");
  if (request.nextUrl.searchParams.has("error")) return finish("cancelled");
  const code = request.nextUrl.searchParams.get("code");
  if (!code) return finish("failed");
  try {
    const session = await tokenRequest({ code, grant_type: "authorization_code", redirect_uri: cfg.redirectUri });
    const response = finish("connected");
    response.cookies.set(SESSION_COOKIE, seal(session, cfg.secret), {
      ...cookieOptions, maxAge: Math.min(2592000, Math.floor((session.refreshExpiresAt - Date.now()) / 1000))
    });
    return response;
  } catch { return finish("failed"); }
}
