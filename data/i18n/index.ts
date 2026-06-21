import type { Remedy } from "../remedies";
import { en } from "./en";
import { ko } from "./ko";
import type { Locale, LocaleData, RemedyText, UIMessages } from "./types";

export type { Locale, LocaleData, RemedyText, UIMessages } from "./types";

export const LOCALES: Locale[] = ["ko", "en"];
export const LOCALE_LABELS: Record<Locale, string> = {
  ko: "한국어",
  en: "English"
};

// 언어 추가 = 위에서 import 한 줄 + 여기 등록 한 줄 + types.ts의 Locale에 코드 추가.
const DATA: Record<Locale, LocaleData> = { ko, en };

export const messages: Record<Locale, UIMessages> = {
  ko: ko.ui,
  en: en.ui
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
