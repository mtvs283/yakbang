export type Locale = "ko" | "en";

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
  home: string;
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
}

export interface RemedyText {
  name: string;
  description: string;
  diagnosis: string;
  info: string;
  quizQuestions: string[];
  callbackLabel: string;
}

// 한 언어 = UI 문구 + 약 번역(id별). 약 번역이 없으면 한국어 원본(remedies.ts)으로 폴백.
export interface LocaleData {
  ui: UIMessages;
  remedies: Record<string, RemedyText>;
}
