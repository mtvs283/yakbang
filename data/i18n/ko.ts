import type { LocaleData } from "./types";

// 한국어는 약 내용 원본이 remedies.ts에 있으므로 remedies는 비워두고 자동 폴백시킨다.
export const ko: LocaleData = {
  ui: {
    catalogTitle: "약방 처방 목록",
    catalogSubtitle: "약을 골라 약방문을 받으시오. 빈칸을 채우면 그대의 것이 되오.",
    scrollCue: "처방 목록 펼치기",
    groups: {
      pronunciation: { title: "발음 교정약", blurb: "혀끝과 입술을 다스리는 처방" },
      "phonological-rule": {
        title: "음운 규칙약",
        blurb: "소리가 변하는 규칙을 다스리는 처방"
      },
      grammar: { title: "문법 조제약", blurb: "조사와 어미의 다툼을 잠재우는 처방" },
      royal: { title: "왕실 비방", blurb: "그대의 손이 닿지 않는 한정 진상품" }
    },
    status: {
      available: "판매 중",
      limited: "한정 진상",
      unavailable: "구할 수 없음"
    },
    cardAction: "약방문 받기",
    footerLead: "약방을 나서면, 더 넓은 광개토가 그대를 기다리오.",
    enterGwanggaeto: "광개토 입장",
    toTop: "맨 위로",
    home: "홈으로",
    modalLabel: "약 방 문 · 藥房廣開土",
    diagnosis: "진단",
    info: "약 설명",
    prescription: "처방 (빈칸을 채우시오)",
    royalReject: "이 약은 그대의 손이 닿지 않소",
    stamp: "처방 완료",
    allDone: "처방을 모두 익혔소. 이 약, 그대의 것이오.",
    correct: "✓ 정답이오",
    wrong: "✗ 다시 보시오",
    showHint: "힌트 보기",
    hintPrefix: "힌트: ",
    answerPlaceholder: "답을 적으시오",
    callbackPending: "(연결 준비 중)",
    closeAria: "약방문 닫기",
    stockLabel: (count) => `남은 수량 ${count}첩`
  },
  remedies: {}
};
