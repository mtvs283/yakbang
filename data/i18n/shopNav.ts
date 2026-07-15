import type { Locale } from "./types";

interface ShopNavLabels {
  rank: string;
  languages: string;
  receipts: string;
}

export const SHOP_NAV_LABELS: Record<Locale, ShopNavLabels> = {
  ko: { rank: "품계도", languages: "다국어", receipts: "영수증함" },
  en: { rank: "Ranks", languages: "Languages", receipts: "Receipts" },
  ja: { rank: "品階図", languages: "多言語", receipts: "領収書" },
  "zh-CN": { rank: "品级表", languages: "多语言", receipts: "收据箱" },
  "zh-TW": { rank: "品級表", languages: "多語言", receipts: "收據匣" },
  vi: { rank: "Phẩm cấp", languages: "Ngôn ngữ", receipts: "Biên lai" },
  th: { rank: "ลำดับขั้น", languages: "ภาษา", receipts: "ใบเสร็จ" },
  id: { rank: "Peringkat", languages: "Bahasa", receipts: "Kuitansi" },
  mn: { rank: "Зэрэглэл", languages: "Хэл", receipts: "Баримтууд" },
  ru: { rank: "Ранги", languages: "Языки", receipts: "Чеки" },
  uz: { rank: "Darajalar", languages: "Tillar", receipts: "Cheklar" },
  kk: { rank: "Дәрежелер", languages: "Тілдер", receipts: "Түбіртектер" },
  ky: { rank: "Даражалар", languages: "Тилдер", receipts: "Дүмүрчөктөр" },
  ne: { rank: "श्रेणी", languages: "भाषाहरू", receipts: "रसिदहरू" },
  my: { rank: "အဆင့်", languages: "ဘာသာစကား", receipts: "ပြေစာများ" },
  km: { rank: "ចំណាត់ថ្នាក់", languages: "ភាសា", receipts: "បង្កាន់ដៃ" },
  fil: { rank: "Ranggo", languages: "Mga Wika", receipts: "Mga Resibo" },
  hi: { rank: "पद", languages: "भाषाएँ", receipts: "रसीदें" },
  bn: { rank: "পদমর্যাদা", languages: "ভাষা", receipts: "রসিদ" },
  ar: { rank: "الرتبة", languages: "اللغات", receipts: "الإيصالات" },
  es: { rank: "Rangos", languages: "Idiomas", receipts: "Recibos" },
  fr: { rank: "Rangs", languages: "Langues", receipts: "Reçus" },
  de: { rank: "Ränge", languages: "Sprachen", receipts: "Belege" },
  sw: { rank: "Vyeo", languages: "Lugha", receipts: "Risiti" },
  ha: { rank: "Matsayi", languages: "Harsuna", receipts: "Rasitoci" }
};
