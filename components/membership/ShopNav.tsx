"use client";

import { useUser } from "../../lib/hooks/useUser";
import { signOut } from "../../lib/supabase/auth";

const GWANGGAETO_URL = "https://gwanggaeto-home.vercel.app/";

// 좌상단 고정 토글: 광개토 홈 이동(항상) + 로그아웃(등록 환자만).
// 크기/스타일은 우상단 다국어 토글과 동일.
const PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-yakbangGold/60 bg-yakbangBlack/70 px-3.5 py-1.5 text-sm font-bold text-yakbangGold backdrop-blur transition hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold";

export default function ShopNav() {
  const { isRegistered } = useUser();

  async function handleLogout() {
    await signOut();
    window.location.reload(); // 로그아웃 후 새 방문자로 초기화
  }

  return (
    <div className="fixed left-4 top-4 z-40 flex flex-col items-start gap-2">
      <a className={PILL} href={GWANGGAETO_URL}>
        <span aria-hidden="true">⚜</span> 광개토로
      </a>
      {isRegistered ? (
        <button className={PILL} onClick={handleLogout} type="button">
          나가기
        </button>
      ) : null}
    </div>
  );
}
