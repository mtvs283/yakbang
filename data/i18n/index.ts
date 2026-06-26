import type { Remedy } from "../remedies";
import { ar } from "./ar";
import { bn } from "./bn";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fil } from "./fil";
import { fr } from "./fr";
import { ha } from "./ha";
import { hi } from "./hi";
import { id } from "./id";
import { ja } from "./ja";
import { kk } from "./kk";
import { km } from "./km";
import { ko } from "./ko";
import { ky } from "./ky";
import { mn } from "./mn";
import { my } from "./my";
import { ne } from "./ne";
import { PHARMACY_GUIDE } from "./pharmacyGuide";
import { PUMGYE_RANKS } from "./pumgyeRanks";
import { ru } from "./ru";
import { sw } from "./sw";
import { th } from "./th";
import { uz } from "./uz";
import { vi } from "./vi";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import type { Locale, LocaleData, RemedyText, UIMessages } from "./types";

export type {
  Locale,
  LocaleData,
  PharmacyGuideCopy,
  PumgyeCopy,
  PumgyeRankEntry,
  RemedyText,
  UIMessages
} from "./types";

// 토글에 보이는 순서
export const LOCALES: Locale[] = [
  "ko",
  "en",
  "ja",
  "zh-CN",
  "zh-TW",
  "vi",
  "th",
  "id",
  "mn",
  "ru",
  "uz",
  "kk",
  "ky",
  "ne",
  "my",
  "km",
  "fil",
  "hi",
  "bn",
  "ar",
  "es",
  "fr",
  "de",
  "sw",
  "ha"
];

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  "zh-CN": "中文(简体)",
  "zh-TW": "中文(繁體)",
  vi: "Tiếng Việt",
  th: "ไทย",
  id: "Bahasa Indonesia",
  mn: "Монгол",
  ru: "Русский",
  uz: "Oʻzbekcha",
  kk: "Қазақша",
  ky: "Кыргызча",
  ne: "नेपाली",
  my: "မြန်မာ",
  km: "ខ្មែរ",
  fil: "Filipino",
  hi: "हिन्दी",
  bn: "বাংলা",
  ar: "العربية",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  sw: "Kiswahili",
  ha: "Hausa"
};

// 언어 추가 = 위에서 import 한 줄 + 아래 두 곳 등록 + types.ts의 Locale에 코드 추가.
const DATA: Record<Locale, LocaleData> = {
  ko,
  en,
  ja,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  vi,
  th,
  id,
  mn,
  ru,
  uz,
  kk,
  ky,
  ne,
  my,
  km,
  fil,
  hi,
  bn,
  ar,
  es,
  fr,
  de,
  sw,
  ha
};

export const messages: Record<Locale, UIMessages> = Object.fromEntries(
  (Object.keys(DATA) as Locale[]).map((locale) => [
    locale,
    {
      ...DATA[locale].ui,
      pharmacyGuide: PHARMACY_GUIDE[locale],
      pumgye: PUMGYE_RANKS[locale]
    }
  ])
) as Record<Locale, UIMessages>;

export function getRemedyText(remedy: Remedy, locale: Locale): RemedyText {
  const translated = DATA[locale].remedies[remedy.id];
  if (translated) {
    return translated;
  }
  // 번역이 없으면 한국어 원본(remedies.ts)으로 폴백
  return {
    name: remedy.name,
    description: remedy.description,
    diagnosis: remedy.prescription.diagnosis,
    info: remedy.prescription.info,
    quizQuestions: remedy.prescription.quiz.map((item) => item.question),
    callbackLabel: remedy.prescription.callback.label
  };
}
