import type { Remedy } from "../remedies";
import { en } from "./en";
import { ko } from "./ko";
import { vi } from "./vi";
import { zhCN } from "./zh-CN";
import { zhTW } from "./zh-TW";
import type { Locale, LocaleData, RemedyText, UIMessages } from "./types";

export type { Locale, LocaleData, RemedyText, UIMessages } from "./types";

export const LOCALES: Locale[] = ["ko", "en", "vi", "zh-CN", "zh-TW"];
export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  vi: "Tiếng Việt",
  "zh-CN": "中文(简体)",
  "zh-TW": "中文(繁體)"
};

// 언어 추가 = 위에서 import 한 줄 + 여기 등록 한 줄 + types.ts의 Locale에 코드 추가.
const DATA: Record<Locale, LocaleData> = {
  ko,
  en,
  vi,
  "zh-CN": zhCN,
  "zh-TW": zhTW
};

export const messages: Record<Locale, UIMessages> = {
  ko: ko.ui,
  en: en.ui,
  vi: vi.ui,
  "zh-CN": zhCN.ui,
  "zh-TW": zhTW.ui
};

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
