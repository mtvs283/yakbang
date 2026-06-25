"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "../LocaleProvider";
import { useUser } from "../../lib/hooks/useUser";
import { prepareNewPatientRegistration, signOut } from "../../lib/supabase/auth";
import PharmacyGuideModal from "./PharmacyGuideModal";
import PumgyeModal from "./PumgyeModal";
import RegisterModal from "./RegisterModal";
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
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showPumgye, setShowPumgye] = useState(false);

  async function handleLogout() {
    await signOut();
    window.location.reload();
  }

  async function handleNewRegister() {
    setShowLogin(false);
    await prepareNewPatientRegistration();
    setShowRegister(true);
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
          <div className="flex w-32 flex-col gap-1.5">
            <button
              aria-label="약방 이용법"
              className="overflow-hidden rounded-md border border-yakbangGold/50 bg-yakbangBlack/70 p-0 shadow-sm transition hover:border-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
              onClick={() => setShowGuide(true)}
              type="button"
            >
              <Image
                alt=""
                aria-hidden
                className="block aspect-square h-auto w-full object-cover object-[center_18%]"
                height={256}
                src="/images/moongchi-guide-label.png"
                width={256}
              />
            </button>
            <button
              className={`${PILL_GUIDE} w-full`}
              onClick={() => setShowGuide(true)}
              type="button"
            >
              {t.pharmacyGuide.button}
            </button>
          </div>
          {!onReceiptsPage ? (
            <Link className={PILL_GUIDE} href="/receipts">
              📜 영수증함
            </Link>
          ) : null}
        </div>
      </div>

      {/* 좌하단 고정: 약방 품계도 */}
      <div className="fixed bottom-4 left-4 z-40 flex w-32 flex-col items-start gap-1.5">
        <button
          aria-label="약방 품계도"
          className="w-full overflow-hidden rounded-md border border-yakbangGold/50 bg-yakbangBlack/70 p-0 shadow-sm transition hover:border-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
          onClick={() => setShowPumgye(true)}
          type="button"
        >
          <Image
            alt=""
            aria-hidden
            className="block aspect-square h-auto w-full object-cover object-[center_28%]"
            height={256}
            src="/images/moongchi-pumgye-label.png"
            width={256}
          />
        </button>
        <button
          className={`${PILL_GUIDE} w-full`}
          onClick={() => setShowPumgye(true)}
          type="button"
        >
          약방 품계도
        </button>
      </div>

      {showLogin ? (
        <ReturnLoginModal
          initialEmail={loginEmail}
          onClose={() => setShowLogin(false)}
          onNewRegister={() => void handleNewRegister()}
        />
      ) : null}

      {showRegister ? (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onDone={() => {
            setShowRegister(false);
            window.location.reload();
          }}
          onSwitchToLogin={(email) => {
            setShowRegister(false);
            setLoginEmail(email);
            setShowLogin(true);
          }}
        />
      ) : null}

      {showGuide ? (
        <PharmacyGuideModal onClose={() => setShowGuide(false)} />
      ) : null}

      {showPumgye ? (
        <PumgyeModal onClose={() => setShowPumgye(false)} />
      ) : null}
    </>
  );
}
