import { cookies } from "next/headers";
import { config, readSession, SESSION_COOKIE } from "../../lib/tiktok";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata = { title: "TKssam Cardnews · 틱톡 연결", robots: { index: false, follow: false } };
const messages: Record<string, string> = {
  connected: "틱톡 계정이 연결됐어요.", password: "연결 비밀번호를 확인해 주세요.",
  state: "인증 요청이 만료됐거나 일치하지 않아요. 다시 연결해 주세요.",
  cancelled: "틱톡 연결 동의가 취소됐어요.", failed: "연결하지 못했어요. 앱 권한과 인증 주소 설정을 확인해 주세요.",
  disconnected: "이 브라우저의 연결 정보를 삭제했어요.",
  revoke_failed: "이 브라우저의 연결 정보는 삭제했어요. 틱톡 측 해제는 확인하지 못했으니 틱톡 앱 설정에서도 권한을 해제해 주세요.",
  expired: "연결 정보가 만료됐어요. 다시 연결해 주세요.", refreshed: "연결 유효기간을 갱신했어요.",
  refresh_failed: "갱신하지 못했어요. 다시 연결해 주세요."
};

export default function TikTokPage({ searchParams }: { searchParams: { result?: string } }) {
  let ready = false;
  let session = null;
  try { const cfg = config(); ready = true; session = readSession(cookies().get(SESSION_COOKIE)?.value, cfg.secret); } catch { /* Show configuration state without exposing credentials. */ }
  const message = typeof searchParams.result === "string" ? messages[searchParams.result] : null;
  const button = { background: "#171717", color: "white", padding: "12px 20px", borderRadius: 8, cursor: "pointer" };
  return <main style={{ maxWidth: 640, margin: "64px auto", padding: 24, lineHeight: 1.8 }}>
    <h1 style={{ fontSize: 28, fontWeight: 700 }}>TKssam Cardnews</h1>
    <p>운영자 틱톡 계정 연결</p>
    {message && <p role="status" style={{ padding: 16, background: "#f2f2f2", margin: "20px 0" }}>{message}</p>}
    {!ready ? <p>틱톡 연결을 위한 서버 설정을 준비 중이에요.</p> : session ? <section>
      <h2 style={{ fontSize: 20 }}>연결 정보가 저장돼 있어요</h2>
      <p>{session.expiresAt > Date.now() ? "인증이 유효해요." : "인증 유효기간이 지났어요. 연결을 갱신해 주세요."}</p>
      <p>직접 게시 권한: {session.scope.split(",").includes("video.publish") ? "동의됨" : "동의되지 않음"}</p>
      <form action="/api/tiktok/refresh" method="post"><button style={button}>연결 갱신</button></form>
      <form action="/api/tiktok/disconnect" method="post" style={{ marginTop: 16 }}><button style={button}>틱톡 연결 해제</button></form>
    </section> : <form action="/api/tiktok/connect" method="post" style={{ marginTop: 24 }}>
      <label htmlFor="password">운영자 연결 비밀번호</label>
      <input id="password" name="password" type="password" required minLength={16} maxLength={256} autoComplete="current-password"
        style={{ display: "block", width: "100%", padding: 12, border: "1px solid #aaa", borderRadius: 8, margin: "8px 0 20px" }} />
      <button style={button}>TikTok 계정 연결</button>
    </form>}
    <p style={{ marginTop: 24 }}>계정 연결만으로 게시물이 올라가지는 않아요.</p>
    <footer style={{ marginTop: 32 }}><a href="/terms.html">이용약관</a> · <a href="/privacy.html">개인정보처리방침</a></footer>
  </main>;
}
