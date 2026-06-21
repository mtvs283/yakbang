export interface Remedy {
  id: string;
  name: string;
  price: string;
  status: string;
  description: string;
  category: "royal";
}

export const royalRemedies: Remedy[] = [
  {
    id: "sejong-handbook",
    name: "세종대왕 친필 한글 교본",
    price: "5억 냥",
    status: "절판",
    description: "임금이 친히 쓰신 교본이오. 영의정도 한 권 못 구함.",
    category: "royal"
  },
  {
    id: "hunminjeongeum-haerye",
    name: "훈민정음 해례본",
    price: "1억 냥",
    status: "어전회의 결재 대기 중",
    description: "원본 한 부, 천 년의 기다림.",
    category: "royal"
  },
  {
    id: "friend-patience-booster",
    name: "한국인 친구 인내심 부스터",
    price: "가격 미정",
    status: "영의정도 못 구함",
    description: "그대의 발음을 끝까지 들어줄 친구의 마음.",
    category: "royal"
  },
  {
    id: "hangeul-creation-remedy",
    name: "한글창제 비방",
    price: "3억 냥",
    status: "한정 1부",
    description: "세종이 학자들과 4년 걸려 빚은 비밀의 처방.",
    category: "royal"
  },
  {
    id: "chief-scholar-capsule",
    name: "영의정 추천 한정 캡슐",
    price: "7천만 냥",
    status: "추천서 필요",
    description: "영의정의 친필 추천서 없이는 살 수 없소.",
    category: "royal"
  }
];
