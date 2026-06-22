"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { koreanTerms } from "../data/korean-terms";
import { useLocale } from "./LocaleProvider";

interface Props {
  term: string;
  children: ReactNode;
}

// 한국어 핵심 어휘 — PC 호버 / 모바일 탭. 한자 + 학습자 모국어 의미 툴팁.
export default function KoreanTermTooltip({ term, children }: Props) {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (!open || canHover) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open, canHover]);

  const entry = koreanTerms[term];
  const meaning = entry
    ? entry.meanings[locale] ?? entry.meanings.en ?? ""
    : "";

  return (
    <span className="relative inline-block" ref={ref}>
      <span
        className="cursor-help border-b border-dashed border-[#7a4f28]/70 font-bold text-[#3d2b1a] transition hover:text-[#8a3a1a]"
        onClick={
          canHover
            ? undefined
            : (e) => {
                e.stopPropagation();
                setOpen((o) => !o);
              }
        }
        onMouseEnter={canHover ? () => setOpen(true) : undefined}
        onMouseLeave={canHover ? () => setOpen(false) : undefined}
        role="button"
        tabIndex={0}
      >
        {children}
      </span>
      {open && entry ? (
        <span className="absolute left-1/2 top-full z-50 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border-2 border-[#7a4f28] bg-[#f5e6c8] px-3 py-1.5 font-script text-sm text-[#3d2b1a] shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
          {entry.hanja ? (
            <b className="mr-1.5 text-[#8a3a1a]">{entry.hanja}</b>
          ) : null}
          {meaning}
        </span>
      ) : null}
    </span>
  );
}
