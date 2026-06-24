"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getRemedyText } from "../../data/i18n";
import { remedies } from "../../data/remedies";
import {
  COMING_SOON_SILHOUETTE_COUNT,
  progressByCategory,
  RECEIPT_CATALOG_SLUGS,
  SLUG_TO_REMEDY_ID
} from "../../data/receiptCatalog";
import { fetchUserReceipts } from "../../lib/fetchUserReceipts";
import { useUser } from "../../lib/hooks/useUser";
import type { UserReceiptRow } from "../../lib/receiptTypes";
import { useLocale } from "../../components/LocaleProvider";
import ReceiptModal from "../../components/payment/ReceiptModal";
import ShopNav from "../../components/membership/ShopNav";

function formatIssuedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return iso;
  }
}

function amountLabel(amount: number): string {
  if (amount === 0) return "무료 체험";
  return `${amount.toLocaleString("ko-KR")}원`;
}

function remedyNameForSlug(slug: string, locale: string): string {
  const remedyId = SLUG_TO_REMEDY_ID[slug];
  const remedy = remedies.find((r) => r.id === remedyId);
  if (!remedy) return slug;
  return getRemedyText(remedy, locale as "ko").name;
}

export default function ReceiptsPageClient() {
  const { locale } = useLocale();
  const { profile, isRegistered, loading: userLoading } = useUser();
  const [receipts, setReceipts] = useState<UserReceiptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<UserReceiptRow | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const rows = await fetchUserReceipts();
    setReceipts(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (userLoading) return;
    void load();
  }, [load, userLoading]);

  const receivedSlugs = useMemo(
    () => new Set(receipts.map((r) => r.prescription_slug)),
    [receipts]
  );

  const unreceivedSlugs = useMemo(
    () => RECEIPT_CATALOG_SLUGS.filter((slug) => !receivedSlugs.has(slug)),
    [receivedSlugs]
  );

  const progressLines = useMemo(
    () => progressByCategory(Array.from(receivedSlugs)),
    [receivedSlugs]
  );

  const headingPatient = isRegistered
    ? profile?.daily_number != null
      ? `환자 ${profile.daily_number}`
      : "환자"
    : "방문 환자";

  const hanjiStyle = {
    backgroundImage:
      "repeating-linear-gradient(90deg, rgba(122,79,40,0.05) 0px, rgba(122,79,40,0.05) 1px, transparent 1px, transparent 22px)"
  };

  return (
    <>
      <ShopNav />
      <main
        className="min-h-screen bg-[#f5e6c8] px-5 py-24 text-[#3d2b1a] sm:px-10"
        style={hanjiStyle}
      >
        <div className="mx-auto max-w-5xl">
          <header className="mb-10 border-b-2 border-dashed border-[#7a4f28]/40 pb-6 text-center">
            <p className="mb-2 text-sm font-bold tracking-[0.24em] text-[#7a4f28]">
              집현전 약방
            </p>
            <h1 className="font-sanskr text-3xl font-bold text-[#8a3a1a] sm:text-4xl">
              {headingPatient}의 영수증함 · 총 {receipts.length}장
            </h1>
            <Link
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border-2 border-[#7a4f28] bg-[#7a4f28] px-6 py-2.5 font-script text-base font-bold text-[#f5e6c8] shadow-sm transition hover:bg-[#8a3a1a] focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
              href="/shop"
            >
              ← 약방으로 돌아가기
            </Link>
          </header>

          {loading ? (
            <p className="py-16 text-center font-script text-lg text-[#7a4f28]">
              영수증함을 펼치는 중…
            </p>
          ) : (
            <>
              <section className="mb-12">
                <h2 className="mb-4 font-script text-xl font-bold text-[#7a4f28]">
                  받은 영수증
                </h2>
                {receipts.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-[#7a4f28]/40 bg-white/30 p-8 text-center font-script text-base text-[#7a4f28]">
                    아직 영수증이 없소. 약방에서 치료를 받으시오.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {receipts.map((row) => {
                      const data = row.receipt_data;
                      return (
                        <button
                          className="rounded-lg border-2 border-[#7a4f28]/50 bg-white/50 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#7a4f28] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#7a4f28]"
                          key={row.id}
                          onClick={() => setDetail(row)}
                          type="button"
                        >
                          <p className="font-sanskr text-lg font-bold text-[#3d2b1a]">
                            {data.remedyName}
                          </p>
                          <p className="mt-1 text-sm text-[#7a4f28]">
                            {formatIssuedAt(row.issued_at)}
                          </p>
                          <p className="mt-2 font-script text-base font-bold text-[#8a3a1a]">
                            {amountLabel(data.amount)}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="mb-10">
                <h2 className="mb-4 font-script text-xl font-bold text-[#7a4f28]">
                  아직 치료받지 않은 약
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {unreceivedSlugs.map((slug) => (
                    <div
                      className="rounded-lg border-2 border-dashed border-[#7a4f28]/35 bg-[#7a4f28]/5 p-4 opacity-80"
                      key={slug}
                    >
                      <div
                        aria-hidden
                        className="mb-3 h-16 rounded-md bg-[#7a4f28]/10"
                      />
                      <p className="font-sanskr text-lg font-bold text-[#7a4f28]/70">
                        {remedyNameForSlug(slug, locale)}
                      </p>
                      <p className="mt-2 font-script text-sm text-[#7a4f28]/80">
                        아직 치료받지 않은 약
                      </p>
                    </div>
                  ))}
                  {Array.from({ length: COMING_SOON_SILHOUETTE_COUNT }).map(
                    (_, i) => (
                      <div
                        className="rounded-lg border-2 border-dashed border-[#7a4f28]/25 bg-[#7a4f28]/5 p-4 opacity-60"
                        key={`soon-${i}`}
                      >
                        <div
                          aria-hidden
                          className="mb-3 h-16 rounded-md bg-[#7a4f28]/8"
                        />
                        <p className="font-sanskr text-lg font-bold text-[#7a4f28]/50">
                          Coming Soon
                        </p>
                        <p className="mt-2 font-script text-sm text-[#7a4f28]/60">
                          아직 치료받지 않은 약
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>

              {progressLines.length > 0 ? (
                <footer className="border-t-2 border-dashed border-[#7a4f28]/40 pt-6 text-center">
                  {progressLines.map((line) => (
                    <p
                      className="font-script text-lg font-bold text-[#8a3a1a]"
                      key={line}
                    >
                      {line}
                    </p>
                  ))}
                </footer>
              ) : null}
            </>
          )}
        </div>
      </main>

      {detail ? (
        <ReceiptModal
          balance={detail.receipt_data.balance ?? 0}
          closeLabel="닫기"
          isRegisteredPatient={isRegistered}
          onClose={() => setDetail(null)}
          price={detail.receipt_data.amount}
          remedyName={detail.receipt_data.remedyName}
          showKimchiGuide={detail.receipt_data.amount > 0}
        />
      ) : null}
    </>
  );
}
