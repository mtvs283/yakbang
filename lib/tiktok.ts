import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "__Host-tiktok-session";
export const STATE_COOKIE = "__Host-tiktok-state";
export const cookieOptions = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };

export function config() {
  const { TIKTOK_CLIENT_KEY: clientKey, TIKTOK_CLIENT_SECRET: clientSecret,
    TIKTOK_REDIRECT_URI: redirectUri, TIKTOK_SESSION_SECRET: secret,
    TIKTOK_CONNECT_PASSWORD: password } = process.env;
  if (!clientKey || !clientSecret || !redirectUri || !secret || !password || secret.length < 32 || password.length < 16) {
    throw new Error("TikTok configuration missing");
  }
  const url = new URL(redirectUri);
  if (url.protocol !== "https:" || url.pathname !== "/api/tiktok/callback" || url.search || url.hash || url.username || url.password) {
    throw new Error("Invalid TikTok redirect URI");
  }
  return { clientKey, clientSecret, redirectUri, secret, password, origin: url.origin };
}

export function equal(a: string, b: string) {
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function seal(value: object, secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(value), "utf8"), cipher.final()]);
  const encoded = Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
  if (encoded.length > 3500) throw new Error("Session too large");
  return encoded;
}

export function unseal<T>(value: string | undefined, secret: string): T | null {
  try {
    if (!value || value.length > 3500) return null;
    const bytes = Buffer.from(value, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", createHash("sha256").update(secret).digest(), bytes.subarray(0, 12));
    decipher.setAuthTag(bytes.subarray(12, 28));
    return JSON.parse(Buffer.concat([decipher.update(bytes.subarray(28)), decipher.final()]).toString("utf8"));
  } catch { return null; }
}

export type Session = { accessToken: string; refreshToken: string; openId: string; scope: string; expiresAt: number; refreshExpiresAt: number };

export function readSession(value: string | undefined, secret: string): Session | null {
  const data = unseal<Session>(value, secret);
  if (!data || typeof data.accessToken !== "string" || !data.accessToken ||
    typeof data.refreshToken !== "string" || !data.refreshToken || typeof data.openId !== "string" ||
    typeof data.scope !== "string" || !Number.isFinite(data.expiresAt) ||
    !Number.isFinite(data.refreshExpiresAt) || data.refreshExpiresAt <= Date.now()) return null;
  return data;
}

export async function tokenRequest(fields: Record<string, string>): Promise<Session> {
  const cfg = config();
  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: cfg.clientKey, client_secret: cfg.clientSecret, ...fields }),
    cache: "no-store", signal: AbortSignal.timeout(15000)
  });
  const data = await response.json();
  if (!response.ok || data.error || typeof data.access_token !== "string" || !data.access_token ||
    typeof data.refresh_token !== "string" || !data.refresh_token || typeof data.open_id !== "string" ||
    typeof data.scope !== "string" || !Number.isFinite(data.expires_in) || data.expires_in <= 0 ||
    !Number.isFinite(data.refresh_expires_in) || data.refresh_expires_in <= 0) throw new Error("Token exchange failed");
  return { accessToken: data.access_token, refreshToken: data.refresh_token, openId: data.open_id,
    scope: data.scope, expiresAt: Date.now() + data.expires_in * 1000,
    refreshExpiresAt: Date.now() + data.refresh_expires_in * 1000 };
}
