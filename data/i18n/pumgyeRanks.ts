import type { Locale, PumgyeCopy } from "./types";

// 품계명(환자/단골/의관/어의)은 학습 대상 한국어 어휘이므로
// 도장(stamp)과 설명문 속 해당 단어 모두 한글로 유지한다.
const STAMP = {
  patient: "환자",
  regular: "단골",
  physician: "의관",
  royal: "어의"
} as const;

export const PUMGYE_RANKS: Record<Locale, PumgyeCopy> = {
  ko: {
    title: "약방 품계도",
    patient: { stamp: STAMP.patient, desc: "약방에 드시면 환자요." },
    regular: {
      stamp: STAMP.regular,
      desc: "넉 주 중 석 주, 매주 세 번 이상 입원하시면 단골이오."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골을 넉 달 지키시고 중급 약방문 몇 첩을 익히시면 의관이오."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "고급 약방문을 모두 손에 쥐셔야 어의라 하오."
    },
    footnote1: "※ 단골은 빠지시면 잠시 환자로 돌아가나, 다시 오시면 되돌아오오.",
    footnote2: "※ 의관과 어의는 한 번 오르시면 평생이오."
  },
  en: {
    title: "Ranks of the Apothecary",
    patient: {
      stamp: STAMP.patient,
      desc: "Enter the apothecary, and you are a 환자 (patient)."
    },
    regular: {
      stamp: STAMP.regular,
      desc: "If you are admitted at least three times a week for three out of four weeks, you become a 단골 (regular)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "If you keep your 단골 status for four months and master a few intermediate prescriptions, you become an 의관 (physician)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Only when you hold all the advanced prescriptions in your hands may you be called an 어의 (royal physician)."
    }
  },
  ja: {
    title: "薬房の品階図",
    patient: { stamp: STAMP.patient, desc: "薬房に入れば、そなたは환자(患者)である。" },
    regular: {
      stamp: STAMP.regular,
      desc: "四週のうち三週、毎週三回以上入院すれば단골(常連)である。"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골を四か月守り、中級の処方箋を数帖身につければ의관(医官)である。"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "上級の処方箋をすべて手にしてこそ、어의(御医)と呼ばれる。"
    }
  },
  "zh-CN": {
    title: "药房品级图",
    patient: { stamp: STAMP.patient, desc: "进入药房，便是환자（患者）。" },
    regular: {
      stamp: STAMP.regular,
      desc: "四周之中有三周，每周入院三次以上，便是단골（常客）。"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "保持단골身份四个月，并掌握几帖中级药方，便是의관（医官）。"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "只有将所有高级药方握在手中，方可称为어의（御医）。"
    }
  },
  "zh-TW": {
    title: "藥房品級圖",
    patient: { stamp: STAMP.patient, desc: "進入藥房，便是환자（患者）。" },
    regular: {
      stamp: STAMP.regular,
      desc: "四週之中有三週，每週入院三次以上，便是단골（常客）。"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "保持단골身分四個月，並掌握幾帖中級藥方，便是의관（醫官）。"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "唯有將所有高級藥方握在手中，方可稱為어의（御醫）。"
    }
  },
  vi: {
    title: "Sơ đồ phẩm cấp của tiệm thuốc",
    patient: {
      stamp: STAMP.patient,
      desc: "Hễ bước vào tiệm thuốc, ngươi là 환자 (bệnh nhân)."
    },
    regular: {
      stamp: STAMP.regular,
      desc: "Nếu trong bốn tuần có ba tuần nhập viện ít nhất ba lần mỗi tuần, ngươi là 단골 (khách quen)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Nếu giữ hạng 단골 trong bốn tháng và luyện được vài thang thuốc trung cấp, ngươi là 의관 (y quan)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Chỉ khi nắm trong tay toàn bộ thang thuốc cao cấp, ngươi mới được gọi là 어의 (ngự y)."
    }
  },
  th: {
    title: "แผนผังยศแห่งร้านยา",
    patient: { stamp: STAMP.patient, desc: "เมื่อท่านเข้าร้านยา ท่านคือ환자 (ผู้ป่วย)" },
    regular: {
      stamp: STAMP.regular,
      desc: "หากในสี่สัปดาห์ มีสามสัปดาห์ที่ท่านเข้าเป็นผู้ป่วยอย่างน้อยสัปดาห์ละสามครั้ง ท่านคือ단골 (ขาประจำ)"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "หากรักษาสถานะ단골ไว้สี่เดือน และเรียนรู้ตำรับยาระดับกลางได้หลายชุด ท่านคือ의관 (แพทย์หลวงชั้นต้น)"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "ต้องถือครองตำรับยาระดับสูงทั้งหมดไว้ในมือ จึงจะเรียกได้ว่าเป็น어의 (หมอหลวง)"
    }
  },
  id: {
    title: "Bagan Pangkat Apotek",
    patient: { stamp: STAMP.patient, desc: "Begitu masuk ke apotek, Anda adalah 환자 (pasien)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Jika dalam empat minggu, selama tiga minggu Anda dirawat setidaknya tiga kali setiap minggu, Anda menjadi 단골 (pelanggan tetap)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Jika Anda mempertahankan status 단골 selama empat bulan dan menguasai beberapa resep tingkat menengah, Anda menjadi 의관 (tabib istana)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Hanya setelah menggenggam semua resep tingkat lanjut, Anda layak disebut 어의 (tabib kerajaan)."
    }
  },
  mn: {
    title: "Эмийн сангийн зэрэг дэвийн зураглал",
    patient: { stamp: STAMP.patient, desc: "Эмийн санд ормогц та 환자 (өвчтөн) болно." },
    regular: {
      stamp: STAMP.regular,
      desc: "Дөрвөн долоо хоногийн гурван долоо хоногт, долоо хоног бүр гурваас дээш удаа хэвтэн эмчлүүлбэл та 단골 (байнгын үйлчлүүлэгч) болно."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 зэрэглэлийг дөрвөн сар хадгалж, дунд шатны хэдэн эмийн жорыг эзэмшвэл та 의관 (эмч) болно."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Харин ахисан шатны бүх эмийн жорыг гартаа атгасан цагт л 어의 (хааны эмч) хэмээн дуудуулна."
    }
  },
  ru: {
    title: "Табель рангов аптекарни",
    patient: { stamp: STAMP.patient, desc: "Войдёте в аптекарню — станете 환자 (пациентом)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Если три недели из четырёх вы будете поступать на лечение не менее трёх раз в неделю, станете 단골 (постоянным посетителем)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Если сохраните статус 단골 четыре месяца и освоите несколько рецептов среднего уровня, станете 의관 (лекарем)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "А когда получите в руки все продвинутые рецепты, тогда вас можно будет назвать 어의 (царским врачом)."
    }
  },
  uz: {
    title: "Dorixona martabalari jadvali",
    patient: { stamp: STAMP.patient, desc: "Dorixonaga kirsangiz, 환자 (bemor) bo‘lasiz." },
    regular: {
      stamp: STAMP.regular,
      desc: "To‘rt haftaning uch haftasida, har hafta kamida uch marta yotib davolansangiz, 단골 (doimiy mijoz) bo‘lasiz."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 maqomini to‘rt oy saqlab, o‘rta darajadagi bir necha dorixona retseptini o‘zlashtirsangiz, 의관 (tabib) bo‘lasiz."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Yuqori darajadagi barcha retseptlarni qo‘lga kiritganingizdagina 어의 (saroy tabibi) deb atalursiz."
    }
  },
  kk: {
    title: "Дәріхана дәрежелерінің кестесі",
    patient: { stamp: STAMP.patient, desc: "Дәріханаға кірсеңіз, 환자 (науқас) боласыз." },
    regular: {
      stamp: STAMP.regular,
      desc: "Төрт аптаның үш аптасында, әр аптада кемінде үш рет емге жатсаңыз, 단골 (тұрақты келуші) боласыз."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 мәртебесін төрт ай сақтап, орта деңгейдегі бірнеше дәрі жазбасын меңгерсеңіз, 의관 (дәрігер) боласыз."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Ал жоғары деңгейдегі барлық дәрі жазбасын қолыңызға алған кезде ғана 어의 (сарай дәрігері) атанасыз."
    }
  },
  ky: {
    title: "Дарыкананын даража картасы",
    patient: { stamp: STAMP.patient, desc: "Дарыканага кирсеңиз, 환자 (бейтап) болосуз." },
    regular: {
      stamp: STAMP.regular,
      desc: "Төрт жуманын үч жумасында, ар жумада кеминде үч жолу дарыланууга жатсаңыз, 단골 (туруктуу кардар) болосуз."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 даражасын төрт ай сактап, орто деңгээлдеги бир нече дары жазмасын өздөштүрсөңүз, 의관 (дарыгер) болосуз."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Жогорку деңгээлдеги бардык дары жазмаларын колго алганда гана 어의 (падышанын дарыгери) деп аталасыз."
    }
  },
  ne: {
    title: "औषधालयको दर्जा तालिका",
    patient: { stamp: STAMP.patient, desc: "औषधालयमा पस्नुभयो भने तपाईं 환자 (बिरामी) हुनुहुन्छ।" },
    regular: {
      stamp: STAMP.regular,
      desc: "चार हप्तामध्ये तीन हप्ता, हरेक हप्ता कम्तीमा तीन पटक भर्ना हुनुभयो भने तपाईं 단골 (नियमित ग्राहक) हुनुहुन्छ।"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 को दर्जा चार महिना जोगाएर, मध्यम तहका केही औषधि-पुर्जीहरू सिक्नुभयो भने तपाईं 의관 (वैद्य) हुनुहुन्छ।"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "उच्च तहका सबै औषधि-पुर्जी हातमा लिएपछि मात्र तपाईंलाई 어의 (राजवैद्य) भन्न सकिन्छ।"
    }
  },
  my: {
    title: "ဆေးခန်းအဆင့်အတန်းပြဇယား",
    patient: { stamp: STAMP.patient, desc: "ဆေးခန်းထဲဝင်လာလျှင် သင်သည် 환자 (လူနာ) ဖြစ်ပါသည်။" },
    regular: {
      stamp: STAMP.regular,
      desc: "လေးပတ်အနက် သုံးပတ်တွင် တစ်ပတ်လျှင် အနည်းဆုံး သုံးကြိမ် ဆေးရုံတက်လျှင် သင်သည် 단골 (ပုံမှန်လူနာ) ဖြစ်ပါသည်။"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "단골 အဆင့်ကို လေးလ ထိန်းထားပြီး အလယ်အဆင့် ဆေးညွှန်းအချို့ကို သင်ယူပြီးလျှင် သင်သည် 의관 (ဆေးဆရာ) ဖြစ်ပါသည်။"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "အဆင့်မြင့် ဆေးညွှန်းအားလုံးကို လက်ဝယ်ထားနိုင်မှသာ 어의 (မင်းဆရာဝန်) ဟု ခေါ်နိုင်ပါသည်။"
    }
  },
  km: {
    title: "តារាងឋានៈនៃហាងថ្នាំ",
    patient: { stamp: STAMP.patient, desc: "បើចូលមកហាងថ្នាំ អ្នកគឺជា 환자 (អ្នកជំងឺ)។" },
    regular: {
      stamp: STAMP.regular,
      desc: "បើក្នុងចំណោមបួនសប្តាហ៍ មានបីសប្តាហ៍ដែលអ្នកចូលសម្រាកព្យាបាលយ៉ាងហោចណាស់បីដងក្នុងមួយសប្តាហ៍ អ្នកគឺជា 단골 (អតិថិជនប្រចាំ)។"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "បើអ្នករក្សាឋានៈ 단골 បានបួនខែ ហើយរៀនចេះវេជ្ជបញ្ជាកម្រិតមធ្យមបានប៉ុន្មានច្បាប់ អ្នកគឺជា 의관 (គ្រូពេទ្យ)។"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "លុះត្រាតែអ្នកកាន់វេជ្ជបញ្ជាកម្រិតខ្ពស់ទាំងអស់នៅក្នុងដៃ ទើបអាចហៅថា 어의 (គ្រូពេទ្យរាជវាំង) បាន។"
    }
  },
  fil: {
    title: "Talaan ng Ranggo sa Botika",
    patient: { stamp: STAMP.patient, desc: "Kapag pumasok ka sa botika, ikaw ay 환자 (pasyente)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Kung sa loob ng apat na linggo ay tatlong linggo kang na-admit nang hindi bababa sa tatlong beses bawat linggo, ikaw ay 단골 (suki)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Kung mapanatili mo ang pagiging 단골 sa loob ng apat na buwan at matutuhan ang ilang reseta sa gitnang antas, ikaw ay 의관 (manggagamot)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Kapag hawak mo na ang lahat ng reseta sa mataas na antas, saka ka lamang matatawag na 어의 (manggagamot ng hari)."
    }
  },
  hi: {
    title: "औषधालय की पद-तालिका",
    patient: { stamp: STAMP.patient, desc: "औषधालय में प्रवेश करते ही आप 환자 (रोगी) हैं।" },
    regular: {
      stamp: STAMP.regular,
      desc: "यदि चार सप्ताह में से तीन सप्ताह, हर सप्ताह कम से कम तीन बार भर्ती हों, तो आप 단골 (नियमित रोगी) हैं।"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "यदि आप चार महीने तक 단골 का दर्जा बनाए रखें और मध्यम स्तर की कुछ औषधि-पर्चियाँ सीख लें, तो आप 의관 (वैद्य) हैं।"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "उच्च स्तर की सभी औषधि-पर्चियाँ हाथ में होने पर ही आपको 어의 (राजवैद्य) कहा जाएगा।"
    }
  },
  bn: {
    title: "ঔষধালয়ের পদমর্যাদা তালিকা",
    patient: { stamp: STAMP.patient, desc: "ঔষধালয়ে প্রবেশ করলেই আপনি 환자 (রোগী)।" },
    regular: {
      stamp: STAMP.regular,
      desc: "চার সপ্তাহের মধ্যে তিন সপ্তাহ, প্রতি সপ্তাহে অন্তত তিনবার ভর্তি হলে আপনি 단골 (নিয়মিত রোগী)।"
    },
    physician: {
      stamp: STAMP.physician,
      desc: "চার মাস ধরে 단골 মর্যাদা ধরে রেখে, মাঝারি স্তরের কয়েকটি ঔষধি প্রেসক্রিপশন আয়ত্ত করলে আপনি 의관 (বৈদ্য)।"
    },
    royal: {
      stamp: STAMP.royal,
      desc: "উচ্চ স্তরের সব প্রেসক্রিপশন হাতে পেলেই কেবল আপনাকে 어의 (রাজবৈদ্য) বলা যাবে।"
    }
  },
  ar: {
    title: "مخطط مراتب دار الدواء",
    patient: { stamp: STAMP.patient, desc: "إذا دخلت دار الدواء، فأنت 환자 (مريض)." },
    regular: {
      stamp: STAMP.regular,
      desc: "إذا أُدخلت للعلاج ثلاث مرات على الأقل كل أسبوع، خلال ثلاثة أسابيع من أصل أربعة، فأنت 단골 (زبون دائم)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "إذا حافظت على مرتبة 단골 أربعة أشهر، وتعلّمت بضع وصفات دوائية من المستوى المتوسط، فأنت 의관 (طبيب)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "ولا تُدعى 어의 (طبيب البلاط) إلا إذا أمسكت بجميع الوصفات الدوائية المتقدمة بين يديك."
    }
  },
  es: {
    title: "Tabla de rangos de la botica",
    patient: { stamp: STAMP.patient, desc: "Si entras en la botica, eres 환자 (paciente)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Si durante tres de cada cuatro semanas ingresas al menos tres veces por semana, eres 단골 (cliente habitual)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Si mantienes el rango de 단골 durante cuatro meses y dominas varias recetas de nivel intermedio, eres 의관 (médico)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Solo cuando tengas en tus manos todas las recetas avanzadas podrás ser llamado 어의 (médico real)."
    }
  },
  fr: {
    title: "Table des rangs de l’apothicairerie",
    patient: { stamp: STAMP.patient, desc: "Si vous entrez dans l’apothicairerie, vous êtes 환자 (patient)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Si, pendant trois semaines sur quatre, vous êtes admis au moins trois fois par semaine, vous devenez un 단골 (habitué)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Si vous gardez ce rang de 단골 pendant quatre mois et maîtrisez quelques ordonnances de niveau intermédiaire, vous devenez 의관 (médecin)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Ce n’est qu’en tenant entre vos mains toutes les ordonnances avancées que vous pourrez être appelé 어의 (médecin royal)."
    }
  },
  de: {
    title: "Rangordnung der Apotheke",
    patient: { stamp: STAMP.patient, desc: "Betreten Sie die Apotheke, so sind Sie ein 환자 (Patient)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Wenn Sie in drei von vier Wochen mindestens dreimal pro Woche aufgenommen werden, sind Sie ein 단골 (Stammgast)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Wenn Sie den Rang des 단골 vier Monate lang halten und einige mittlere Rezepte beherrschen, werden Sie zum 의관 (Arzt)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Erst wenn Sie alle fortgeschrittenen Rezepte in den Händen halten, dürfen Sie 어의 (königlicher Leibarzt) genannt werden."
    }
  },
  sw: {
    title: "Jedwali la Vyeo vya Duka la Dawa",
    patient: { stamp: STAMP.patient, desc: "Ukiingia katika duka la dawa, wewe ni 환자 (mgonjwa)." },
    regular: {
      stamp: STAMP.regular,
      desc: "Ikiwa katika wiki tatu kati ya nne utaingizwa kutibiwa angalau mara tatu kila wiki, wewe ni 단골 (mteja wa kudumu)."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Ukidumisha hadhi ya 단골 kwa miezi minne na kujifunza maagizo kadhaa ya dawa ya kiwango cha kati, wewe ni 의관 (tabibu)."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Ni pale tu utakaposhika maagizo yote ya dawa ya kiwango cha juu ndipo unaweza kuitwa 어의 (tabibu wa kifalme)."
    }
  },
  ha: {
    title: "Jadawalin Matsayin Gidan Magani",
    patient: { stamp: STAMP.patient, desc: "Idan ka shiga gidan magani, kai 환자 (mara lafiya) ne." },
    regular: {
      stamp: STAMP.regular,
      desc: "Idan cikin makonni huɗu, ka kwanta jinya aƙalla sau uku a kowane mako na makonni uku, kai 단골 (abokin ciniki na dindindin) ne."
    },
    physician: {
      stamp: STAMP.physician,
      desc: "Idan ka riƙe matsayin 단골 tsawon watanni huɗu, kuma ka koyi wasu takardun magani na matsakaicin mataki, kai 의관 (likita) ne."
    },
    royal: {
      stamp: STAMP.royal,
      desc: "Sai ka mallaki dukkan takardun magani na babban mataki a hannunka sannan za a kira ka 어의 (likitan sarki)."
    }
  }
};
