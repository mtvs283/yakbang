"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS } from "../../data/i18n";
import { tiers, type Tier } from "../../data/membership";
import { useUser } from "../../lib/hooks/useUser";
import { prepareNewPatientRegistration, signOut } from "../../lib/supabase/auth";
import { useLocale } from "../LocaleProvider";
import PharmacyGuideModal from "./PharmacyGuideModal";
import PumgyeModal from "./PumgyeModal";
import RegisterModal from "./RegisterModal";
import ReturnLoginModal from "./ReturnLoginModal";
import StageUpgradeNotification from "./StageUpgradeNotification";
import UpgradeModal from "./UpgradeModal";

const DRAWER =
  "group relative flex min-h-[72px] flex-col items-center justify-end overflow-visible border border-[#a57b45] bg-gradient-to-b from-[#765031] via-[#54351f] to-[#321d11] px-1 pb-2 pt-8 text-center font-script font-bold text-[#f4dfb0] shadow-[inset_0_1px_0_rgba(255,235,181,0.22),inset_0_-5px_10px_rgba(0,0,0,0.28)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-yakbangGold sm:min-h-[82px] sm:px-3 sm:pb-2.5 sm:pt-10";

export default function ShopNav() {
  const { locale, setLocale, t } = useLocale();
  const { isRegistered, profile, refresh } = useUser();
  const pathname = usePathname();
  const onReceiptsPage = pathname === "/receipts";
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showPumgye, setShowPumgye] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [notif, setNotif] = useState<{ from: Tier; to: Tier } | null>(null);

  const tier: Tier = profile?.tier ?? "visitor";
  const patientNumber = profile?.daily_number ? ` ${profile.daily_number}` : "";
  const statusLabel = isRegistered
    ? `${tiers[tier].ko}${patientNumber}`
    : "방문객";

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
      {onReceiptsPage ? (
        <Link
          className="fixed left-3 top-3 z-40 rounded-md border border-yakbangGold/60 bg-yakbangBlack/80 px-3 py-2 font-script font-bold text-yakbangGold backdrop-blur transition hover:bg-yakbangGold hover:text-yakbangBlack"
          href="/shop"
        >
          ← 약방으로
        </Link>
      ) : null}

      <div className="fixed bottom-2 left-1/2 z-50 grid w-[calc(100%-0.75rem)] max-w-[720px] -translate-x-1/2 grid-cols-4 border-2 border-[#b48a50] bg-[#211208] p-1 shadow-[0_10px_35px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,225,162,0.15)] sm:bottom-3 sm:gap-1 sm:p-1.5">
        <button
          aria-label="약방 이용법"
          className={DRAWER}
          onClick={() => setShowGuide(true)}
          type="button"
        >
          <Image
            alt=""
            aria-hidden
            className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 -translate-y-2 rounded-sm border border-[#c19a5b] object-cover object-[center_18%] shadow-md sm:h-12 sm:w-12 sm:-translate-y-3"
            height={256}
            src="/images/moongchi-guide-label.png"
            width={256}
          />
          <span className="text-sm sm:text-lg">{t.pharmacyGuide.button}</span>
        </button>

        <button
          aria-label="약방 품계도"
          className={DRAWER}
          onClick={() => setShowPumgye(true)}
          type="button"
        >
          <Image
            alt=""
            aria-hidden
            className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 -translate-y-2 rounded-sm border border-[#c19a5b] object-cover object-[center_28%] shadow-md sm:h-12 sm:w-12 sm:-translate-y-3"
            height={256}
            src="/images/moongchi-pumgye-label.png"
            width={256}
          />
          <span className="text-sm sm:text-lg">품계도</span>
          <span className="mt-0.5 max-w-full truncate text-[10px] font-normal text-[#dfc48e] sm:text-xs">
            현재 · {statusLabel}
          </span>
        </button>

        <div className="relative">
          <button
            aria-expanded={showLanguages}
            aria-label="언어 선택 / Language"
            className={`${DRAWER} h-full w-full`}
            onClick={() => setShowLanguages((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="absolute top-2 text-lg text-[#d9b56c] sm:text-2xl">
              文
            </span>
            <span className="text-sm sm:text-lg">다국어</span>
            <span className="mt-0.5 max-w-full truncate text-[10px] font-normal text-[#dfc48e] sm:text-xs">
              {LOCALE_LABELS[locale]}
            </span>
          </button>

          {showLanguages ? (
            <>
              <button
                aria-label="언어 메뉴 닫기"
                className="fixed inset-0 z-[-1] cursor-default"
                onClick={() => setShowLanguages(false)}
                type="button"
              />
              <div className="absolute bottom-full left-1/2 mb-3 max-h-[55vh] w-40 -translate-x-1/2 overflow-y-auto border-2 border-[#b48a50] bg-[#211208]/[0.98] p-1 shadow-2xl">
                {LOCALES.map((option) => (
                  <button
                    className={`flex w-full items-center justify-between border-b border-[#8d673c]/40 px-3 py-2 text-left text-sm transition last:border-0 hover:bg-[#6b4528] ${
                      locale === option
                        ? "font-bold text-yakbangGold"
                        : "text-yakbangPaper/90"
                    }`}
                    key={option}
                    onClick={() => {
                      setLocale(option);
                      setShowLanguages(false);
                    }}
                    type="button"
                  >
                    {LOCALE_LABELS[option]}
                    {locale === option ? <span aria-hidden="true">✓</span> : null}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <Link
          aria-current={onReceiptsPage ? "page" : undefined}
          className={`${DRAWER} ${onReceiptsPage ? "brightness-125" : ""}`}
          href="/receipts"
        >
          <span aria-hidden="true" className="absolute top-2 text-lg text-[#d9b56c] sm:text-2xl">
            帳
          </span>
          <span className="text-sm sm:text-lg">영수증함</span>
        </Link>
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

      {showGuide ? <PharmacyGuideModal onClose={() => setShowGuide(false)} /> : null}

      {showPumgye ? (
        <PumgyeModal
          canUpgrade={isRegistered && tier === "patient"}
          isRegistered={isRegistered}
          onClose={() => setShowPumgye(false)}
          onLogin={() => {
            setShowPumgye(false);
            setShowLogin(true);
          }}
          onLogout={() => void handleLogout()}
          onUpgrade={() => {
            setShowPumgye(false);
            setShowUpgrade(true);
          }}
        />
      ) : null}

      {showUpgrade ? (
        <UpgradeModal
          name={profile?.display_name ?? ""}
          onClose={() => setShowUpgrade(false)}
          onDone={async () => {
            setShowUpgrade(false);
            await refresh();
            setNotif({ from: "patient", to: "nangdo" });
          }}
        />
      ) : null}

      {notif ? (
        <StageUpgradeNotification
          fromTier={notif.from}
          name={profile?.display_name ?? ""}
          onDismiss={() => setNotif(null)}
          toTier={notif.to}
        />
      ) : null}
    </>
  );
}
