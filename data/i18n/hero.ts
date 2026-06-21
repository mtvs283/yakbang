import type { Locale } from "./types";

export interface HeroStrings {
  tagline: string;
  write: string;
  enter: string;
}

// 히어로(첫 화면) 문구. enter는 키보드 키라 비한국어는 "Enter!!"로 통일.
export const heroStrings: Record<Locale, HeroStrings> = {
  ko: {
    tagline: "발음이 꼬였소? 배웠는데 또 헷갈리오?",
    write: "쓰고",
    enter: "엔터!!"
  },
  en: {
    tagline:
      "Pronunciation tangled up again? You learned it, but it's confusing again, huh~?",
    write: "Type it &",
    enter: "Enter!!"
  },
  ja: {
    tagline: "発音、またこんがらがったのか？習ったのに、また迷っておるのか〜？",
    write: "書いて",
    enter: "Enter!!"
  },
  "zh-CN": {
    tagline: "发音又打结了吗？明明学过，怎么又迷糊啦～？",
    write: "写完按",
    enter: "Enter!!"
  },
  "zh-TW": {
    tagline: "發音又打結了嗎？明明學過，怎麼又迷糊啦～？",
    write: "寫完按",
    enter: "Enter!!"
  },
  vi: {
    tagline: "Phát âm lại rối nữa hả? Học rồi mà vẫn lại thấy lẫn lộn ha~?",
    write: "Viết rồi nhấn",
    enter: "Enter!!"
  },
  th: {
    tagline: "ออกเสียงมั่วอีกแล้วเหรอ? เรียนมาแล้วแท้ ๆ แต่ยังงงอีกใช่ไหม~?",
    write: "พิมพ์แล้วกด",
    enter: "Enter!!"
  },
  id: {
    tagline: "Pengucapannya kusut lagi? Sudah belajar, tapi masih bingung lagi ya~?",
    write: "Tulis lalu",
    enter: "Enter!!"
  },
  mn: {
    tagline:
      "Дуудлага чинь дахиад орооцолдчихов уу? Сурсан мөртлөө дахиад будилаад байна уу~?",
    write: "Бичээд",
    enter: "Enter!!"
  },
  ru: {
    tagline: "Произношение снова запуталось? Вроде уже учил, а опять всё путается~?",
    write: "Напиши и",
    enter: "Enter!!"
  },
  uz: {
    tagline: "Talaffuz yana chalkashib ketdimi? Oʻrganding-ku, yana adashyapsanmi~?",
    write: "Yozib",
    enter: "Enter!!"
  },
  kk: {
    tagline:
      "Айтылуы тағы шатасып кетті ме? Үйренген сияқты едің, тағы да түсініксіз болып тұр ма~?",
    write: "Жазып",
    enter: "Enter!!"
  },
  ky: {
    tagline:
      "Айтылышы дагы чаташып кеттиби? Үйрөнгөн элең го, кайра эле башың айланып жатабы~?",
    write: "Жазып",
    enter: "Enter!!"
  },
  ne: {
    tagline: "उच्चारण फेरि गडबड भयो? सिकिसक्नुभएको थियो, तर फेरि अलमल भयो है~?",
    write: "लेखेर",
    enter: "Enter!!"
  },
  my: {
    tagline:
      "အသံထွက်က ထပ်ရှုပ်သွားပြန်ပြီလား? သင်ပြီးသားကို ထပ်မရောထွေးပြန်ဘူးလား~?",
    write: "ရေးပြီး",
    enter: "Enter!!"
  },
  km: {
    tagline:
      "ការបញ្ចេញសំឡេងរញ៉េរញ៉ៃម្ដងទៀតហើយឬ? រៀនហើយ តែម្ដងទៀតនៅតែច្រឡំទៀតអី~?",
    write: "សរសេររួច",
    enter: "Enter!!"
  },
  fil: {
    tagline: "Nagulo na naman ang bigkas mo? Napag-aralan mo na, pero nalilito ka na naman, ano~?",
    write: "Isulat at",
    enter: "Enter!!"
  },
  hi: {
    tagline: "उच्चारण फिर से उलझ गया? सीखा तो था, फिर भी दोबारा कन्फ्यूज़ हो गए न~?",
    write: "लिखो और",
    enter: "Enter!!"
  },
  bn: {
    tagline: "উচ্চারণ আবার গুলিয়ে গেল? শিখেছিলে তো, তবু আবার কনফিউজড হয়ে গেলে না~?",
    write: "লিখে",
    enter: "Enter!!"
  },
  ar: {
    tagline: "تلخبط النطق مرة ثانية؟ درستها من قبل، ومع ذلك تهت من جديد، صح~؟",
    write: "اكتب ثم",
    enter: "Enter!!"
  },
  es: {
    tagline:
      "¿La pronunciación se te volvió a enredar? Ya lo habías aprendido, pero otra vez te confundiste, ¿verdad~?",
    write: "Escríbelo y",
    enter: "Enter!!"
  },
  fr: {
    tagline:
      "La prononciation s'est encore emmêlée ? Tu l'avais déjà apprise, mais te voilà encore perdu, hein~ ?",
    write: "Écris-le et",
    enter: "Enter!!"
  },
  de: {
    tagline:
      "Ist die Aussprache schon wieder durcheinandergeraten? Du hast es doch gelernt, und trotzdem wieder verwirrt, hm~?",
    write: "Schreib und",
    enter: "Enter!!"
  },
  sw: {
    tagline: "Matamshi yamevurugika tena? Ulishajifunza, lakini umechanganyikiwa tena, sivyo~?",
    write: "Andika kisha",
    enter: "Enter!!"
  },
  ha: {
    tagline: "Furucin ya sake rikicewa ne? Ka riga ka koya, amma har yanzu ka sake ruɗewa ko~?",
    write: "Rubuta sannan",
    enter: "Enter!!"
  }
};
