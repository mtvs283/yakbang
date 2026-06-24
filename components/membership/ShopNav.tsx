"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "../LocaleProvider";
import { useUser } from "../../lib/hooks/useUser";
import { signOut } from "../../lib/supabase/auth";
import PharmacyGuideModal from "./PharmacyGuideModal";
import ReturnLoginModal from "./ReturnLoginModal";

const GWANGGAETO_URL = "https://gwanggaeto-home.vercel.app/";

// 좌상단 고정 토글: 광개토 홈 이동(항상) + 로그아웃(등록 환자만).
// 크기/스타일은 우상단 다국어 토글과 동일.
const PILL =
  "inline-flex items-center gap-1.5 rounded-full border border-yakbangGold/60 bg-yakbangBlack/70 px-3.5 py-1.5 text-sm font-bold text-yakbangGold backdrop-blur transition hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold";

const PILL_GUIDE =
  "inline-flex items-center justify-center rounded-full border border-yakbangGold/60 bg-yakbangBlack/70 px-4 py-2 text-base font-bold text-yakbangGold backdrop-blur transition hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold";

// 나가기 pill 높이(~2.25rem)의 300% — 약방 이용법 블록 여백
const GUIDE_BLOCK_OFFSET = "mt-[6.75rem]";

export default function ShopNav() {
  const { t } = useLocale();
  const { isRegistered } = useUser();
  const pathname = usePathname();
  const onReceiptsPage = pathname === "/receipts";
  const [showLogin, setShowLogin] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  async function handleLogout() {
    await signOut();
    window.location.reload(); // 로그아웃 후 새 방문자로 초기화
  }

  return (
    <>
      <div className="fixed left-4 top-4 z-40 flex flex-col items-start gap-2">
        <a className={PILL} href={GWANGGAETO_URL}>
          <span aria-hidden="true">⚜</span> 광개토로
        </a>
        {isRegistered ? (
          <button className={PILL} onClick={handleLogout} type="button">
            나가기
          </button>
        ) : (
          <button
            className={PILL}
            onClick={() => setShowLogin(true)}
            type="button"
          >
            재진 입장
          </button>
        )}

        {onReceiptsPage ? (
          <Link className={PILL} href="/shop">
            ← 약방으로
          </Link>
        ) : null}

        <div className={`${GUIDE_BLOCK_OFFSET} flex flex-col items-start gap-1.5`}>
          <button
            aria-label="약방 이용법"
            className="overflow-hidden rounded-md border border-yakbangGold/50 bg-yakbangBlack/70 p-0 shadow-sm transition hover:border-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
            onClick={() => setShowGuide(true)}
            type="button"
          >
            <Image
              alt=""
              aria-hidden
              className="block aspect-square h-11 w-11 object-cover object-[center_18%]"
              height={88}
              src="/images/moongchi-guide-label.png"
              width={88}
            />
          </button>
          <button
            className={PILL_GUIDE}
            onClick={() => setShowGuide(true)}
            type="button"
          >
            {t.pharmacyGuide.button}
          </button>
          {!onReceiptsPage ? (
            <Link className={PILL_GUIDE} href="/receipts">
              📜 영수증함
            </Link>
          ) : null}
        </div>
      </div>

      {showLogin ? (
        <ReturnLoginModal onClose={() => setShowLogin(false)} />
      ) : null}

      {showGuide ? (
        <PharmacyGuideModal onClose={() => setShowGuide(false)} />
      ) : null}
    </>
  );
}
