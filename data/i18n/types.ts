export type Locale =
  | "ko"
  | "en"
  | "ja"
  | "zh-CN"
  | "zh-TW"
  | "vi"
  | "th"
  | "id"
  | "mn"
  | "ru"
  | "uz"
  | "kk"
  | "ky"
  | "ne"
  | "my"
  | "km"
  | "fil"
  | "hi"
  | "bn"
  | "ar"
  | "es"
  | "fr"
  | "de"
  | "sw"
  | "ha";

export interface PharmacyGuideCopy {
  button: string;
  title: string;
  step1: string;
  step1Note: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
}

export interface PumgyeRankEntry {
  stamp: string;
  desc: string;
}

export interface PumgyeCopy {
  title: string;
  patient: PumgyeRankEntry;
  regular: PumgyeRankEntry;
  physician: PumgyeRankEntry;
  royal: PumgyeRankEntry;
  footnote1?: string;
  footnote2?: string;
}

export interface UIMessages {
  catalogTitle: string;
  catalogSubtitle: string;
  scrollCue: string;
  groups: Record<string, { title: string; blurb: string }>;
  status: Record<string, string>;
  cardAction: string;
  footerLead: string;
  enterGwanggaeto: string;
  toTop: string;
  modalLabel: string;
  diagnosis: string;
  info: string;
  prescription: string;
  royalReject: string;
  stamp: string;
  allDone: string;
  correct: string;
  wrong: string;
  showHint: string;
  hintPrefix: string;
  answerPlaceholder: string;
  callbackPending: string;
  closeAria: string;
  stockLabel: (count: number) => string;
  pharmacyGuide: PharmacyGuideCopy;
  pumgye: PumgyeCopy;
}

export interface RemedyText {
  name: string;
  description: string;
  diagnosis: string;
  info: string;
  quizQuestions: string[];
  callbackLabel: string;
}

export interface LocaleData {
  ui: Omit<UIMessages, "pharmacyGuide" | "pumgye">;
  remedies: Record<string, RemedyText>;
}
