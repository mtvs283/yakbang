"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRemedyText } from "../data/i18n";
import {
  formatPrice,
  remedies,
  type Remedy,
  type RemedyCategory
} from "../data/remedies";
import { useLocale } from "./LocaleProvider";
import PrescriptionModal from "./PrescriptionModal";

const GWANGGAETO_URL = "https://gwanggaeto-home.vercel.app/";

const CATEGORY_ORDER: RemedyCategory[] = [
  "pronunciation",
  "phonological-rule",
  "grammar",
  "royal"
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function RemedyCatalog() {
  const { locale, t } = useLocale();
  const [selected, setSelected] = useState<Remedy | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative z-10 scroll-mt-4 bg-[#100b07] px-5 py-14 text-yakbangPaper sm:px-10"
      id="remedy-catalog"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h2 className="font-script text-4xl font-bold text-yakbangGold sm:text-5xl">
            {t.catalogTitle}
          </h2>
          <p className="mt-2 text-sm text-yakbangPaper/70">{t.catalogSubtitle}</p>
        </header>

        {CATEGORY_ORDER.map((category) => {
          const items = remedies.filter((remedy) => remedy.category === category);
          if (items.length === 0) {
            return null;
          }
          const group = t.groups[category];
          return (
            <div className="mb-12" key={category}>
              <div className="mb-5 flex items-baseline gap-3 border-b border-yakbangGold/30 pb-2">
                <h3 className="font-script text-2xl font-bold text-yakbangGold sm:text-3xl">
                  {group.title}
                </h3>
                <span className="text-xs text-yakbangPaper/60">{group.blurb}</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((remedy) => {
                  const text = getRemedyText(remedy, locale);
                  const locked = remedy.status === "unavailable";
                  return (
                    <button
                      className={[
                        "group flex flex-col rounded-lg border bg-yakbangBlack/60 p-5 text-left transition duration-200 focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-[#100b07]",
                        locked
                          ? "border-yakbangGold/25 opacity-80 hover:border-yakbangGold/50"
                          : "border-yakbangGold/40 hover:-translate-y-0.5 hover:border-yakbangGold hover:shadow-royal"
                      ].join(" ")}
                      key={remedy.id}
                      onClick={() => setSelected(remedy)}
                      type="button"
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="font-script text-2xl font-bold leading-snug text-yakbangPaper">
                          {text.name}
                        </h4>
                        <span
                          className={[
                            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                            remedy.status === "available"
                              ? "bg-green-900/40 text-green-300"
                              : remedy.status === "limited"
                                ? "bg-yakbangGold/20 text-yakbangGold"
                                : "bg-zinc-700/70 text-zinc-300"
                          ].join(" ")}
                        >
                          {t.status[remedy.status]}
                        </span>
                      </div>

                      <p className="mb-4 grow text-sm leading-6 text-yakbangPaper/80">
                        {text.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-yakbangGold">
                          {formatPrice(remedy.price)}
                        </span>
                        <span className="text-sm font-bold text-yakbangPaper/70 transition group-hover:text-yakbangGold">
                          {t.cardAction} →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* 광개토 진입 + 네비 */}
        <div className="mt-6 border-t border-yakbangGold/20 pt-12 text-center">
          <p className="mb-6 font-script text-lg text-yakbangPaper/75">
            {t.footerLead}
          </p>
          <a
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl border-2 border-yakbangGold bg-gradient-to-b from-[#262017] to-black px-10 py-5 text-xl font-black tracking-wide text-yakbangGold shadow-[0_0_30px_rgba(212,175,55,0.45)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_52px_rgba(212,175,55,0.85)] focus:outline-none focus:ring-2 focus:ring-yakbangGold focus:ring-offset-2 focus:ring-offset-[#100b07] sm:text-2xl"
            href={GWANGGAETO_URL}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-yakbangGold/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span aria-hidden="true" className="text-2xl">
              ⚜
            </span>
            {t.enterGwanggaeto}
            <span aria-hidden="true">→</span>
          </a>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              className="inline-flex items-center gap-1 rounded-full border border-yakbangGold/50 px-5 py-2.5 text-sm font-bold text-yakbangPaper/85 transition hover:border-yakbangGold hover:text-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
              onClick={scrollToTop}
              type="button"
            >
              ↑ {t.toTop}
            </button>
            <Link
              className="inline-flex items-center gap-1 rounded-full border border-yakbangGold/50 px-5 py-2.5 text-sm font-bold text-yakbangPaper/85 transition hover:border-yakbangGold hover:text-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
              href="/"
            >
              {t.home}
            </Link>
          </div>
        </div>
      </div>

      {/* 스크롤 시 떠오르는 맨 위로 화살표 */}
      {showTop ? (
        <button
          aria-label={t.toTop}
          className="fixed bottom-5 left-5 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-yakbangGold/70 bg-yakbangBlack/80 text-xl font-bold text-yakbangGold shadow-[0_0_20px_rgba(212,175,55,0.3)] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-yakbangGold hover:text-yakbangBlack focus:outline-none focus:ring-2 focus:ring-yakbangGold"
          onClick={scrollToTop}
          type="button"
        >
          ↑
        </button>
      ) : null}

      {selected ? (
        <PrescriptionModal
          key={selected.id}
          onClose={() => setSelected(null)}
          remedy={selected}
        />
      ) : null}
    </section>
  );
}
