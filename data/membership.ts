// 회원 등급(tier) — 약방 환자 + 광개토 화랑도 4단계를 한 컬럼(users.tier)으로 통합.
export type Tier =
  | "visitor"
  | "patient"
  | "nangdo"
  | "hwarang"
  | "pungwolju"
  | "guksun";

// 호칭을 보여줄 영역. 약방(pharmacy) / 광개토 본체(gwanggaeto)
export type Area = "pharmacy" | "gwanggaeto";

export interface TierInfo {
  ko: string;
  hanja?: string;
  badge: string | null; // 이모지 또는 PNG 경로
  order: number;
}

export const tiers: Record<Tier, TierInfo> = {
  visitor: { ko: "방문자", badge: null, order: 0 },
  patient: { ko: "환자", hanja: "患者", badge: "🤒", order: 1 },
  nangdo: { ko: "낭도", hanja: "郎徒", badge: "/images/badges/satgat.png", order: 2 },
  hwarang: { ko: "화랑", hanja: "花郞", badge: "/images/badges/yugeon.png", order: 3 },
  pungwolju: {
    ko: "풍월주",
    hanja: "風月主",
    badge: "/images/badges/jeongjagwan.png",
    order: 4
  },
  guksun: {
    ko: "국선",
    hanja: "國仙",
    badge: "/images/badges/baekjeollip.png",
    order: 5
  }
};

// 광개토 화랑도 등급(낭도 이상)인지
export function isGwanggaetoMember(tier: Tier): boolean {
  return tiers[tier].order >= tiers.nangdo.order;
}

// 수정②: tier + area → 화면에 보일 호칭.
// 약방에선 환자로 맞이하되 광개토 회원은 본인 칭호를 그대로 존중,
// 광개토 본체에선 화랑도 칭호 기준(아직 입문 전이면 방문자).
export function getDisplayTitle(tier: Tier, area: Area = "pharmacy"): string {
  if (area === "gwanggaeto") {
    return isGwanggaetoMember(tier) ? tiers[tier].ko : tiers.visitor.ko;
  }
  // pharmacy
  if (tier === "visitor") return tiers.visitor.ko;
  if (tier === "patient") return tiers.patient.ko;
  return tiers[tier].ko; // 낭도+ 는 칭호 유지
}

// 수정③: 적립 정책 (비회원 100 / 환자 300 / 광개토 회원 500)
export const pointPolicy = {
  dailyAttendance: { visitor: 100, patient: 300, default: 500 },
  signupBonus: { patient: 1000, gwanggaeto: 5000 },
  transferBonus: 3000, // 환자 → 광개토 이사
  referralBonus: 3000,
  reviewBonus: { patient: 300, default: 500 },
  purchaseRate: 0.03,
  learningComplete: 1000 // 광개토만
};

export function dailyAttendancePoints(tier: Tier): number {
  if (tier === "visitor") return pointPolicy.dailyAttendance.visitor;
  if (tier === "patient") return pointPolicy.dailyAttendance.patient;
  return pointPolicy.dailyAttendance.default; // 낭도+
}

export const stageMessages = {
  patientWelcome:
    "약방에 어서 오시오. 환자로 등록되셨소이다. 적립금 1,000원을 드리오.",
  upgradeTo: {
    nangdo:
      "환자 {name}이(가) 광개토 낭도로 격상되었소이다. 화랑도에 입문하시오. 약방 적립금 자동 승계 + 가입 보너스 5,000원 + 이사 보너스 3,000원.",
    hwarang:
      "낭도 {name}이(가) 화랑으로 진급하였소이다. 꽃 사내 칭호를 받으시오. 학문을 닦으시오.",
    pungwolju:
      "화랑 {name}이(가) 풍월주로 진급하였소이다. 학자의 길에 들어서시오.",
    guksun:
      "풍월주 {name}이(가) 국선으로 격상되었소이다. 광개토 화랑도의 우두머리시오."
  }
} as const;

export function formatStageMessage(template: string, name: string): string {
  return template.replace(/\{name\}/g, name);
}
