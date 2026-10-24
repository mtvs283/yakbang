import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { config, cookieOptions, equal, seal, STATE_COOKIE } from "../../../../lib/tiktok";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const cfg = config();
    if (request.headers.get("origin") !== cfg.origin) return new NextResponse(null, { status: 403 });
    const form = await request.formData();
    const password = form.get("password");
    if (typeof password !== "string" || !equal(password, cfg.password)) {
      return NextResponse.redirect(new URL("/tiktok?result=password", cfg.origin), 303);
    }
    const state = randomBytes(32).toString("base64url");
    const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
    url.search = new URLSearchParams({ client_key: cfg.clientKey, response_type: "code",
      scope: "user.info.basic,video.publish", redirect_uri: cfg.redirectUri, state,
      disable_auto_auth: "1" }).toString();
    const response = NextResponse.redirect(url, 303);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(STATE_COOKIE, seal({ state, expiresAt: Date.now() + 600000 }, cfg.secret), { ...cookieOptions, maxAge: 600 });
    return response;
  } catch { return NextResponse.json({ error: "틱톡 연결 환경변수를 확인해 주세요." }, { status: 503 }); }
}
