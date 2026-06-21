"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  formatPrice,
  remedies,
  statusLabel,
  type Remedy,
  type RemedyCategory
} from "../data/remedies";
import PrescriptionModal from "./PrescriptionModal";

const GWANGGAETO_URL = "https://gwanggaeto-home.vercel.app/";

const categoryGroups: { category: RemedyCategory; title: string; blurb: string }[] =
  [
    {
      category: "pronunciation",
      title: "발음 교정약",
      blurb: "혀끝과 입술을 다스리는 처방"
    },
    {
      category: "phonological-rule",
      title: "음운 규칙약",
      blurb: "소리가 변하는 규칙을 다스리는 처방"
    },
    {
      category: "grammar",
      title: "문법 조제약",
      blurb: "조사와 어미의 다툼을 잠재우는 처방"
    },
    {
      category: "royal",
      title: "왕실 비방",
      blurb: "그대의 손이 닿지 않는 한정 진상품"
    }
  ];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function RemedyCatalog() {
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
            약방 처방 목록
          </h2>
          <p className="mt-2 text-sm text-yakbangPaper/70">
            약을 골라 약방문을 받으시오. 빈칸을 채우면 그대의 것이 되오.
          </p>
        </header>

        {categoryGroups.map((group) => {
          const items = remedies.filter(
            (remedy) => remedy.category === group.category
          );
          if (items.length === 0) {
            return null;
          }
          return (
            <div className="mb-12" key={group.category}>
              <div className="mb-5 flex items-baseline gap-3 border-b border-yakbangGold/30 pb-2">
                <h3 className="font-script text-2xl font-bold text-yakbangGold sm:text-3xl">
                  {group.title}
                </h3>
                <span className="text-xs text-yakbangPaper/60">
                  {group.blurb}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((remedy) => {
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
                          {remedy.name}
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
                          {statusLabel(remedy.status)}
                        </span>
                      </div>

                      <p className="mb-4 grow text-sm leading-6 text-yakbangPaper/80">
                        {remedy.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-black text-yakbangGold">
                          {formatPrice(remedy.price)}
                        </span>
                        <span className="text-sm font-bold text-yakbangPaper/70 transition group-hover:text-yakbangGold">
                          약방문 받기 →
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
            약방을 나서면, 더 넓은 광개토가 그대를 기다리오.
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
            광개토로 들어가기
            <span aria-hidden="true">→</span>
          </a>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              className="inline-flex items-center gap-1 rounded-full border border-yakbangGold/50 px-5 py-2.5 text-sm font-bold text-yakbangPaper/85 transition hover:border-yakbangGold hover:text-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
              onClick={scrollToTop}
              type="button"
            >
              ↑ 맨 위로
            </button>
            <Link
              className="inline-flex items-center gap-1 rounded-full border border-yakbangGold/50 px-5 py-2.5 text-sm font-bold text-yakbangPaper/85 transition hover:border-yakbangGold hover:text-yakbangGold focus:outline-none focus:ring-2 focus:ring-yakbangGold"
              href="/"
            >
              홈으로
            </Link>
          </div>
        </div>
      </div>

      {/* 스크롤 시 떠오르는 맨 위로 화살표 */}
      {showTop ? (
        <button
          aria-label="맨 위로"
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
