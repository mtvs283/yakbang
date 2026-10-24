# TKssam Cardnews: TikTok connection

## Added routes

- Connection page: `https://www.xn--vh3bp4o.kr/tiktok`
- Login Kit Redirect URI: `https://www.xn--vh3bp4o.kr/api/tiktok/callback`
- POST `/api/tiktok/connect`: operator password check and TikTok authorization redirect.
- GET `/api/tiktok/callback`: validates state, exchanges code, stores encrypted session.
- POST `/api/tiktok/refresh`: refreshes credentials, including refresh-token rotation.
- POST `/api/tiktok/disconnect`: requests revocation and clears browser session.

## Server environment variables

Set these in Vercel project Settings → Environment Variables, in the environment you intend to test/deploy. Never paste secrets into chat, screenshots, a public repository, or variables prefixed NEXT_PUBLIC_.

| Variable | Value |
| --- | --- |
| TIKTOK_CLIENT_KEY | App's Client key |
| TIKTOK_CLIENT_SECRET | App's Client secret |
| TIKTOK_REDIRECT_URI | Exact Redirect URI above |
| TIKTOK_SESSION_SECRET | Independent random secret, at least 32 characters |
| TIKTOK_CONNECT_PASSWORD | Independent strong operator password, at least 16 characters |

Generate each random value separately, locally: `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Use the connection password in the form; do not use your TikTok password. This page has no public sign-up. The operator password gates the authorization start, including on an otherwise public website.

Changing variables requires redeployment. Production deployment requires TK샘 approval; this change does not deploy or publish content automatically. First test with the developer portal's Sandbox app credentials, matching registered redirect URI, and authorized target account. When switching Sandbox/Production, update matching credentials together and reconnect.

## Developer portal

1. Login Kit → Web → Redirect URI: enter the callback address exactly (no trailing slash).
2. Content Posting API → Direct Post enabled; this connection requests `user.info.basic,video.publish`.
3. `video.upload` may appear in the portal but is not requested by this feature because draft upload is not implemented.
4. Web/Desktop URL can use `/tiktok` once the connection page is actually deployed.
5. Test actual account authorization before recording any review demonstration.

## Scope and security

Existing pages, middleware, data, and approved terms/privacy files are unchanged. Tokens are AES-256-GCM encrypted in a Secure, HttpOnly, SameSite=Lax, host-only cookie. JavaScript and page HTML never receive token values. State expires after ten minutes; callback response clears it. POST routes reject foreign origins. TikTok requests have a 15-second timeout; API error payloads and credentials are not logged or reflected into the page. A failed new connection leaves any previous valid connection intact.

The browser cookie retains the connection for at most 30 days and cannot support unattended server publishing by itself. This change adds OAuth connection only, not photo publishing, scheduling, a background worker, or a token database. Server-side persistent storage and its access controls must be designed separately before unattended posting. Changing the session secret invalidates saved connections. All routes share the existing site's Supabase middleware, so its environment variables must also be configured.

The UI confirms locally stored authorization, not that TikTok has not subsequently revoked it. Refresh/reconnect checks credentials with TikTok. Disconnect attempts provider revocation; if that fails the UI asks the operator to revoke in TikTok settings. Public Direct Post audit restrictions still apply; implementing OAuth does not grant audit approval.

## Verification

`node --test tests/tiktok.test.mjs` (Node 22.18+ or 24), `npx tsc --noEmit`, `npm run build`.
Real OAuth needs configured app credentials and interactive account consent; mocked checks cannot establish real TikTok login success.

## Official references (checked 2026-10-24)

- https://developers.tiktok.com/docs/en/login-kit-web
- https://developers.tiktok.com/docs/en/oauth-user-access-token-management
- https://developers.tiktok.com/docs/en/content-sharing-guidelines
