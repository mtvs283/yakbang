// 한국어 핵심 어휘 사전. meanings는 locale 코드별(en/zh/vi/...) 의미.
// 없는 locale은 컴포넌트에서 en → 그대로 폴백.
export interface KoreanTerm {
  hanja?: string;
  meanings: Record<string, string>;
}

export const koreanTerms: Record<string, KoreanTerm> = {
  환자: { hanja: "患者", meanings: { en: "patient", "zh-CN": "病人", "zh-TW": "病人", vi: "bệnh nhân", ja: "患者" } },
  처방: { hanja: "處方", meanings: { en: "prescription", "zh-CN": "处方", vi: "đơn thuốc", ja: "処方" } },
  약방: { hanja: "藥房", meanings: { en: "pharmacy", "zh-CN": "药房", vi: "hiệu thuốc", ja: "薬房" } },
  진료: { hanja: "診療", meanings: { en: "medical care", "zh-CN": "诊疗", vi: "khám chữa bệnh", ja: "診療" } },
  탕약: { hanja: "湯藥", meanings: { en: "herbal medicine", "zh-CN": "汤药", vi: "thuốc sắc", ja: "湯薬" } },
  약값: { meanings: { en: "medicine price", "zh-CN": "药价", vi: "giá thuốc", ja: "薬代" } },
  적립: { hanja: "積立", meanings: { en: "points accumulation", "zh-CN": "积分", vi: "tích điểm", ja: "ポイント積立" } },
  낭도: { hanja: "郎徒", meanings: { en: "Nangdo (Hwarang trainee)", "zh-CN": "郎徒", vi: "Nangdo", ja: "郎徒" } },
  화랑: { hanja: "花郞", meanings: { en: "Hwarang (flower knight)", "zh-CN": "花郎", vi: "Hwarang", ja: "花郎" } },
  풍월주: { hanja: "風月主", meanings: { en: "Pungwolju (Hwarang leader)", "zh-CN": "风月主", vi: "Pungwolju", ja: "風月主" } },
  국선: { hanja: "國仙", meanings: { en: "Guksun (chief Hwarang)", "zh-CN": "国仙", vi: "Guksun", ja: "国仙" } },
  서신: { hanja: "書信", meanings: { en: "letter / message", "zh-CN": "书信", vi: "thư", ja: "書信" } }
};
