"use client";

import { useState } from "react";
import {
  formatPrice,
  remedies,
  statusLabel,
  type Remedy,
  type RemedyCategory
} from "../data/remedies";
import PrescriptionModal from "./PrescriptionModal";

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

export default function RemedyCatalog() {
  const [selected, setSelected] = useState<Remedy | null>(null);

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
                          처방 받기 →
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

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
