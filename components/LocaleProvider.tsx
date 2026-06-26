"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import {
  LOCALES,
  LOCALE_LABELS,
  messages,
  type Locale,
  type UIMessages
} from "../data/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: UIMessages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "yakbang-locale";

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return value;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LOCALES.includes(saved as Locale)) {
      setLocaleState(saved as Locale);
    }
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
      <LanguageToggle />
    </LocaleContext.Provider>
  );
}

function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="relative">
      <button
        aria-label="언어 선택 / Language"
        className="inline-flex items-center gap-2 rounded-full border border-yakbangGold/60 bg-yakbangBlack/80 px-5 py-2.5 font-bold backdrop-blur transition hover:bg-yakbangGold/15 focus:outline-none focus:ring-2 focus:ring-yakbangGold"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="hidden font-script text-xl text-yakbangPaper sm:inline">
          어느 나라 말로 해드릴까?
        </span>
        <span className="text-sm text-yakbangGold">
          {LOCALE_LABELS[locale]}
        </span>
        <span aria-hidden="true" className="text-yakbangGold">
          ▴
        </span>
      </button>

      {open ? (
        <>
          <div
            aria-hidden="true"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute bottom-full left-1/2 z-40 mb-2 max-h-[60vh] w-36 -translate-x-1/2 overflow-y-auto rounded-md border border-yakbangGold/50 bg-yakbangBlack/95 backdrop-blur">
            {LOCALES.map((option) => (
              <button
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-yakbangGold/15 ${
                  locale === option
                    ? "font-bold text-yakbangGold"
                    : "text-yakbangPaper/85"
                }`}
                key={option}
                onClick={() => {
                  setLocale(option);
                  setOpen(false);
                }}
                type="button"
              >
                {LOCALE_LABELS[option]}
                {locale === option ? (
                  <span aria-hidden="true">✓</span>
                ) : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
      </div>
    </div>
  );
}
