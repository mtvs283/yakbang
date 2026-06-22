import type { Locale } from "./i18n/types";
import type { RemedyCategory } from "./remedies";

export type HotspotStyle =
  | "calligraphy-gold"
  | "speech-bubble"
  | "category-marker"
  | "royal-marker"
  | "button-gold";

export interface Hotspot {
  id: string;
  x: string; // "50%"
  y: string;
  mobileX?: string;
  mobileY?: string;
  style: HotspotStyle;
  action?: string; // "scroll-to-catalog" | "open-catalog/<category>" | "open-royal"
  // 텍스트 출처(셋 중 하나):
  text?: Partial<Record<Locale, string>>; // 인라인 (sign/greeting). 없는 언어는 en→ko 폴백
  category?: RemedyCategory; // 카테고리/왕실 마커 → i18n groups[category].title 사용 (25개 언어 자동)
  uiKey?: "scrollCue"; // 메인 CTA → i18n 문구 사용
}

// 실제 카탈로그 카테고리: pronunciation / phonological-rule / grammar / royal
// (스펙의 상비약/특수약/보충제는 예시였고, 실제 데이터에 맞춰 매핑)
export const pharmacyScene: { background: string; hotspots: Hotspot[] } = {
  background: "/images/pharmacy-scene-bg.png",
  hotspots: [
    {
      // 상단 간판: 한국어만 (번역 X), 검정 글씨. 모든 언어에서 ko로 표시
      id: "sign",
      x: "50%",
      y: "11.1%",
      mobileX: "50%",
      mobileY: "11.1%",
      style: "calligraphy-gold",
      text: { ko: "집현전약방" }
    },
    {
      id: "greeting",
      x: "59.5%",
      y: "44.9%",
      style: "speech-bubble",
      text: {
        ko: "어서오시오~ 어디가 아프오?",
        en: "Welcome~ what ails you?",
        ja: "ようこそ〜 どこがお悪いのじゃ？",
        "zh-CN": "欢迎光临～ 哪里不舒服啊？",
        "zh-TW": "歡迎光臨～ 哪裡不舒服啊？",
        vi: "Mời vào~ Bạn thấy khó ở chỗ nào?",
        th: "ยินดีต้อนรับ~ ไม่สบายตรงไหนหรือ?",
        id: "Selamat datang~ Apa yang mengganggumu?",
        mn: "Тавтай морил~ Хаана чинь өвдөж байна?",
        ru: "Добро пожаловать~ Что вас беспокоит?",
        uz: "Xush kelibsiz~ Qayeringiz bezovta qilyapti?",
        kk: "Қош келдіңіз~ Қай жеріңіз ауырады?",
        ky: "Кош келиңиз~ Кай жериңиз ооруп жатат?",
        ne: "स्वागत छ~ कहाँ बिसन्चो छ?",
        my: "ကြိုဆိုပါတယ်~ ဘယ်နေရာ မသက်မသာ ဖြစ်နေလဲ?",
        km: "សូមស្វាគមន៍~ ឈឺត្រង់ណាដែរ?",
        fil: "Maligayang pagdating~ Saan ka masama ang pakiramdam?",
        hi: "स्वागत है~ कहाँ तकलीफ़ है?",
        bn: "স্বাগতম~ কোথায় কষ্ট হচ্ছে?",
        ar: "أهلًا وسهلًا~ ما الذي يؤلمك؟",
        es: "Bienvenido~ ¿Qué te aqueja?",
        fr: "Bienvenue~ Qu'est-ce qui vous tracasse ?",
        de: "Willkommen~ Wo zwickt es?",
        sw: "Karibu~ Unaumwa wapi?",
        ha: "Barka da zuwa~ Ina ke damunka?"
      }
    },
    {
      id: "pronunciation-shelf",
      x: "9.5%",
      y: "45%",
      style: "category-marker",
      action: "open-catalog/pronunciation",
      category: "pronunciation"
    },
    {
      id: "phonological-shelf",
      x: "21.4%",
      y: "45%",
      style: "category-marker",
      action: "open-catalog/phonological-rule",
      category: "phonological-rule"
    },
    {
      id: "grammar-shelf",
      x: "38.5%",
      y: "45%",
      style: "category-marker",
      action: "open-catalog/grammar",
      category: "grammar"
    },
    {
      id: "royal-stand",
      x: "90.1%",
      y: "79.2%",
      style: "royal-marker",
      action: "open-royal",
      category: "royal"
    },
    {
      id: "main-cta",
      x: "50%",
      y: "92%",
      style: "button-gold",
      action: "scroll-to-catalog",
      uiKey: "scrollCue"
    }
  ]
};
