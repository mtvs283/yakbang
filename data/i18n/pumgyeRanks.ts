import type { Locale, PumgyeCopy } from "./types";

export const PUMGYE_RANKS: Record<Locale, PumgyeCopy> = {
  ko: {
    title: "약방 품계도",
    patient: { stamp: "환자", desc: "약방에 드시면 환자요." },
    regular: {
      stamp: "단골",
      desc: "넉 주 중 석 주, 매주 세 번 이상 입원하시면 단골이오."
    },
    physician: {
      stamp: "의관",
      desc: "단골을 넉 달 지키시고 중급 약방문 몇 첩을 익히시면 의관이오."
    },
    royal: {
      stamp: "어의",
      desc: "고급 약방문을 모두 손에 쥐셔야 어의라 하오."
    },
    footnote1: "※ 단골은 빠지시면 잠시 환자로 돌아가나, 다시 오시면 되돌아오오.",
    footnote2: "※ 의관과 어의는 한 번 오르시면 평생이오."
  },
  en: {
    title: "Ranks of the Apothecary",
    patient: {
      stamp: "Patient",
      desc: "Enter the apothecary, and you are a patient."
    },
    regular: {
      stamp: "Regular",
      desc: "If you are admitted at least three times a week for three out of four weeks, you become a regular."
    },
    physician: {
      stamp: "Physician",
      desc: "If you keep your regular status for four months and master a few intermediate prescriptions, you become a physician."
    },
    royal: {
      stamp: "Royal Physician",
      desc: "Only when you hold all the advanced prescriptions in your hands may you be called a royal physician."
    }
  },
  ja: {
    title: "薬房の品階図",
    patient: { stamp: "患者", desc: "薬房に入れば、そなたは患者である。" },
    regular: {
      stamp: "常連",
      desc: "四週のうち三週、毎週三回以上入院すれば常連である。"
    },
    physician: {
      stamp: "医官",
      desc: "常連を四か月守り、中級の処方箋を数帖身につければ医官である。"
    },
    royal: {
      stamp: "御医",
      desc: "上級の処方箋をすべて手にしてこそ、御医と呼ばれる。"
    }
  },
  "zh-CN": {
    title: "药房品级图",
    patient: { stamp: "患者", desc: "进入药房，便是患者。" },
    regular: {
      stamp: "常客",
      desc: "四周之中有三周，每周入院三次以上，便是常客。"
    },
    physician: {
      stamp: "医官",
      desc: "保持常客身份四个月，并掌握几帖中级药方，便是医官。"
    },
    royal: {
      stamp: "御医",
      desc: "只有将所有高级药方握在手中，方可称为御医。"
    }
  },
  "zh-TW": {
    title: "藥房品級圖",
    patient: { stamp: "患者", desc: "進入藥房，便是患者。" },
    regular: {
      stamp: "常客",
      desc: "四週之中有三週，每週入院三次以上，便是常客。"
    },
    physician: {
      stamp: "醫官",
      desc: "保持常客身分四個月，並掌握幾帖中級藥方，便是醫官。"
    },
    royal: {
      stamp: "御醫",
      desc: "唯有將所有高級藥方握在手中，方可稱為御醫。"
    }
  },
  vi: {
    title: "Sơ đồ phẩm cấp của tiệm thuốc",
    patient: {
      stamp: "Bệnh nhân",
      desc: "Hễ bước vào tiệm thuốc, ngươi là bệnh nhân."
    },
    regular: {
      stamp: "Khách quen",
      desc: "Nếu trong bốn tuần có ba tuần nhập viện ít nhất ba lần mỗi tuần, ngươi là khách quen."
    },
    physician: {
      stamp: "Y quan",
      desc: "Nếu giữ hạng khách quen trong bốn tháng và luyện được vài thang thuốc trung cấp, ngươi là y quan."
    },
    royal: {
      stamp: "Ngự y",
      desc: "Chỉ khi nắm trong tay toàn bộ thang thuốc cao cấp, ngươi mới được gọi là ngự y."
    }
  },
  th: {
    title: "แผนผังยศแห่งร้านยา",
    patient: { stamp: "ผู้ป่วย", desc: "เมื่อท่านเข้าร้านยา ท่านคือผู้ป่วย" },
    regular: {
      stamp: "ขาประจำ",
      desc: "หากในสี่สัปดาห์ มีสามสัปดาห์ที่ท่านเข้าเป็นผู้ป่วยอย่างน้อยสัปดาห์ละสามครั้ง ท่านคือขาประจำ"
    },
    physician: {
      stamp: "แพทย์หลวงชั้นต้น",
      desc: "หากรักษาสถานะขาประจำไว้สี่เดือน และเรียนรู้ตำรับยาระดับกลางได้หลายชุด ท่านคือแพทย์หลวงชั้นต้น"
    },
    royal: {
      stamp: "หมอหลวง",
      desc: "ต้องถือครองตำรับยาระดับสูงทั้งหมดไว้ในมือ จึงจะเรียกได้ว่าเป็นหมอหลวง"
    }
  },
  id: {
    title: "Bagan Pangkat Apotek",
    patient: { stamp: "Pasien", desc: "Begitu masuk ke apotek, Anda adalah pasien." },
    regular: {
      stamp: "Pelanggan tetap",
      desc: "Jika dalam empat minggu, selama tiga minggu Anda dirawat setidaknya tiga kali setiap minggu, Anda menjadi pelanggan tetap."
    },
    physician: {
      stamp: "Tabib istana",
      desc: "Jika Anda mempertahankan status pelanggan tetap selama empat bulan dan menguasai beberapa resep tingkat menengah, Anda menjadi tabib istana."
    },
    royal: {
      stamp: "Tabib kerajaan",
      desc: "Hanya setelah menggenggam semua resep tingkat lanjut, Anda layak disebut tabib kerajaan."
    }
  },
  mn: {
    title: "Эмийн сангийн зэрэг дэвийн зураглал",
    patient: { stamp: "Өвчтөн", desc: "Эмийн санд ормогц та өвчтөн болно." },
    regular: {
      stamp: "Байнгын үйлчлүүлэгч",
      desc: "Дөрвөн долоо хоногийн гурван долоо хоногт, долоо хоног бүр гурваас дээш удаа хэвтэн эмчлүүлбэл та байнгын үйлчлүүлэгч болно."
    },
    physician: {
      stamp: "Эмч",
      desc: "Байнгын үйлчлүүлэгчийн зэрэглэлийг дөрвөн сар хадгалж, дунд шатны хэдэн эмийн жорыг эзэмшвэл та эмч болно."
    },
    royal: {
      stamp: "Хааны эмч",
      desc: "Харин ахисан шатны бүх эмийн жорыг гартаа атгасан цагт л хааны эмч хэмээн дуудуулна."
    }
  },
  ru: {
    title: "Табель рангов аптекарни",
    patient: { stamp: "Пациент", desc: "Войдёте в аптекарню — станете пациентом." },
    regular: {
      stamp: "Постоянный посетитель",
      desc: "Если три недели из четырёх вы будете поступать на лечение не менее трёх раз в неделю, станете постоянным посетителем."
    },
    physician: {
      stamp: "Лекарь",
      desc: "Если сохраните этот статус четыре месяца и освоите несколько рецептов среднего уровня, станете лекарем."
    },
    royal: {
      stamp: "Царский врач",
      desc: "А когда получите в руки все продвинутые рецепты, тогда вас можно будет назвать царским врачом."
    }
  },
  uz: {
    title: "Dorixona martabalari jadvali",
    patient: { stamp: "Bemor", desc: "Dorixonaga kirsangiz, bemor bo‘lasiz." },
    regular: {
      stamp: "Doimiy mijoz",
      desc: "To‘rt haftaning uch haftasida, har hafta kamida uch marta yotib davolansangiz, doimiy mijoz bo‘lasiz."
    },
    physician: {
      stamp: "Tabib",
      desc: "Doimiy mijoz maqomini to‘rt oy saqlab, o‘rta darajadagi bir necha dorixona retseptini o‘zlashtirsangiz, tabib bo‘lasiz."
    },
    royal: {
      stamp: "Saroy tabibi",
      desc: "Yuqori darajadagi barcha retseptlarni qo‘lga kiritganingizdagina saroy tabibi deb atalursiz."
    }
  },
  kk: {
    title: "Дәріхана дәрежелерінің кестесі",
    patient: { stamp: "Науқас", desc: "Дәріханаға кірсеңіз, науқас боласыз." },
    regular: {
      stamp: "Тұрақты келуші",
      desc: "Төрт аптаның үш аптасында, әр аптада кемінде үш рет емге жатсаңыз, тұрақты келуші боласыз."
    },
    physician: {
      stamp: "Дәрігер",
      desc: "Тұрақты келуші мәртебесін төрт ай сақтап, орта деңгейдегі бірнеше дәрі жазбасын меңгерсеңіз, дәрігер боласыз."
    },
    royal: {
      stamp: "Сарай дәрігері",
      desc: "Ал жоғары деңгейдегі барлық дәрі жазбасын қолыңызға алған кезде ғана сарай дәрігері атанасыз."
    }
  },
  ky: {
    title: "Дарыкананын даража картасы",
    patient: { stamp: "Бейтап", desc: "Дарыканага кирсеңиз, бейтап болосуз." },
    regular: {
      stamp: "Туруктуу кардар",
      desc: "Төрт жуманын үч жумасында, ар жумада кеминде үч жолу дарыланууга жатсаңыз, туруктуу кардар болосуз."
    },
    physician: {
      stamp: "Дарыгер",
      desc: "Туруктуу кардар даражасын төрт ай сактап, орто деңгээлдеги бир нече дары жазмасын өздөштүрсөңүз, дарыгер болосуз."
    },
    royal: {
      stamp: "Падышанын дарыгери",
      desc: "Жогорку деңгээлдеги бардык дары жазмаларын колго алганда гана падышанын дарыгери деп аталасыз."
    }
  },
  ne: {
    title: "औषधालयको दर्जा तालिका",
    patient: { stamp: "बिरामी", desc: "औषधालयमा पस्नुभयो भने तपाईं बिरामी हुनुहुन्छ।" },
    regular: {
      stamp: "नियमित ग्राहक",
      desc: "चार हप्तामध्ये तीन हप्ता, हरेक हप्ता कम्तीमा तीन पटक भर्ना हुनुभयो भने तपाईं नियमित ग्राहक हुनुहुन्छ।"
    },
    physician: {
      stamp: "वैद्य",
      desc: "नियमित ग्राहकको दर्जा चार महिना जोगाएर, मध्यम तहका केही औषधि-पुर्जीहरू सिक्नुभयो भने तपाईं वैद्य हुनुहुन्छ।"
    },
    royal: {
      stamp: "राजवैद्य",
      desc: "उच्च तहका सबै औषधि-पुर्जी हातमा लिएपछि मात्र तपाईंलाई राजवैद्य भन्न सकिन्छ।"
    }
  },
  my: {
    title: "ဆေးခန်းအဆင့်အတန်းပြဇယား",
    patient: { stamp: "လူနာ", desc: "ဆေးခန်းထဲဝင်လာလျှင် သင်သည် လူနာဖြစ်ပါသည်။" },
    regular: {
      stamp: "ပုံမှန်လူနာ",
      desc: "လေးပတ်အနက် သုံးပတ်တွင် တစ်ပတ်လျှင် အနည်းဆုံး သုံးကြိမ် ဆေးရုံတက်လျှင် သင်သည် ပုံမှန်လူနာဖြစ်ပါသည်။"
    },
    physician: {
      stamp: "ဆေးဆရာ",
      desc: "ပုံမှန်လူနာအဆင့်ကို လေးလ ထိန်းထားပြီး အလယ်အဆင့် ဆေးညွှန်းအချို့ကို သင်ယူပြီးလျှင် သင်သည် ဆေးဆရာဖြစ်ပါသည်။"
    },
    royal: {
      stamp: "မင်းဆရာဝန်",
      desc: "အဆင့်မြင့် ဆေးညွှန်းအားလုံးကို လက်ဝယ်ထားနိုင်မှသာ မင်းဆရာဝန်ဟု ခေါ်နိုင်ပါသည်။"
    }
  },
  km: {
    title: "តារាងឋានៈនៃហាងថ្នាំ",
    patient: { stamp: "អ្នកជំងឺ", desc: "បើចូលមកហាងថ្នាំ អ្នកគឺជាអ្នកជំងឺ។" },
    regular: {
      stamp: "អតិថិជនប្រចាំ",
      desc: "បើក្នុងចំណោមបួនសប្តាហ៍ មានបីសប្តាហ៍ដែលអ្នកចូលសម្រាកព្យាបាលយ៉ាងហោចណាស់បីដងក្នុងមួយសប្តាហ៍ អ្នកគឺជាអតិថិជនប្រចាំ។"
    },
    physician: {
      stamp: "គ្រូពេទ្យ",
      desc: "បើអ្នករក្សាឋានៈអតិថិជនប្រចាំបានបួនខែ ហើយរៀនចេះវេជ្ជបញ្ជាកម្រិតមធ្យមបានប៉ុន្មានច្បាប់ អ្នកគឺជាគ្រូពេទ្យ។"
    },
    royal: {
      stamp: "គ្រូពេទ្យរាជវាំង",
      desc: "លុះត្រាតែអ្នកកាន់វេជ្ជបញ្ជាកម្រិតខ្ពស់ទាំងអស់នៅក្នុងដៃ ទើបអាចហៅថា គ្រូពេទ្យរាជវាំងបាន។"
    }
  },
  fil: {
    title: "Talaan ng Ranggo sa Botika",
    patient: { stamp: "Pasyente", desc: "Kapag pumasok ka sa botika, ikaw ay pasyente." },
    regular: {
      stamp: "Suki",
      desc: "Kung sa loob ng apat na linggo ay tatlong linggo kang na-admit nang hindi bababa sa tatlong beses bawat linggo, ikaw ay suki."
    },
    physician: {
      stamp: "Manggagamot",
      desc: "Kung mapanatili mo ang pagiging suki sa loob ng apat na buwan at matutuhan ang ilang reseta sa gitnang antas, ikaw ay manggagamot."
    },
    royal: {
      stamp: "Manggagamot ng hari",
      desc: "Kapag hawak mo na ang lahat ng reseta sa mataas na antas, saka ka lamang matatawag na manggagamot ng hari."
    }
  },
  hi: {
    title: "औषधालय की पद-तालिका",
    patient: { stamp: "रोगी", desc: "औषधालय में प्रवेश करते ही आप रोगी हैं।" },
    regular: {
      stamp: "नियमित रोगी",
      desc: "यदि चार सप्ताह में से तीन सप्ताह, हर सप्ताह कम से कम तीन बार भर्ती हों, तो आप नियमित रोगी हैं।"
    },
    physician: {
      stamp: "वैद्य",
      desc: "यदि आप चार महीने तक नियमित रोगी का दर्जा बनाए रखें और मध्यम स्तर की कुछ औषधि-पर्चियाँ सीख लें, तो आप वैद्य हैं।"
    },
    royal: {
      stamp: "राजवैद्य",
      desc: "उच्च स्तर की सभी औषधि-पर्चियाँ हाथ में होने पर ही आपको राजवैद्य कहा जाएगा।"
    }
  },
  bn: {
    title: "ঔষধালয়ের পদমর্যাদা তালিকা",
    patient: { stamp: "রোগী", desc: "ঔষধালয়ে প্রবেশ করলেই আপনি রোগী।" },
    regular: {
      stamp: "নিয়মিত রোগী",
      desc: "চার সপ্তাহের মধ্যে তিন সপ্তাহ, প্রতি সপ্তাহে অন্তত তিনবার ভর্তি হলে আপনি নিয়মিত রোগী।"
    },
    physician: {
      stamp: "বৈদ্য",
      desc: "চার মাস ধরে নিয়মিত রোগীর মর্যাদা ধরে রেখে, মাঝারি স্তরের কয়েকটি ঔষধি প্রেসক্রিপশন আয়ত্ত করলে আপনি বৈদ্য।"
    },
    royal: {
      stamp: "রাজবৈদ্য",
      desc: "উচ্চ স্তরের সব প্রেসক্রিপশন হাতে পেলেই কেবল আপনাকে রাজবৈদ্য বলা যাবে।"
    }
  },
  ar: {
    title: "مخطط مراتب دار الدواء",
    patient: { stamp: "مريض", desc: "إذا دخلت دار الدواء، فأنت مريض." },
    regular: {
      stamp: "زبون دائم",
      desc: "إذا أُدخلت للعلاج ثلاث مرات على الأقل كل أسبوع، خلال ثلاثة أسابيع من أصل أربعة، فأنت زبون دائم."
    },
    physician: {
      stamp: "طبيب",
      desc: "إذا حافظت على مرتبة الزبون الدائم أربعة أشهر، وتعلّمت بضع وصفات دوائية من المستوى المتوسط، فأنت طبيب."
    },
    royal: {
      stamp: "طبيب البلاط",
      desc: "ولا تُدعى طبيب البلاط إلا إذا أمسكت بجميع الوصفات الدوائية المتقدمة بين يديك."
    }
  },
  es: {
    title: "Tabla de rangos de la botica",
    patient: { stamp: "Paciente", desc: "Si entras en la botica, eres paciente." },
    regular: {
      stamp: "Cliente habitual",
      desc: "Si durante tres de cada cuatro semanas ingresas al menos tres veces por semana, eres cliente habitual."
    },
    physician: {
      stamp: "Médico",
      desc: "Si mantienes el rango de cliente habitual durante cuatro meses y dominas varias recetas de nivel intermedio, eres médico."
    },
    royal: {
      stamp: "Médico real",
      desc: "Solo cuando tengas en tus manos todas las recetas avanzadas podrás ser llamado médico real."
    }
  },
  fr: {
    title: "Table des rangs de l’apothicairerie",
    patient: { stamp: "Patient", desc: "Si vous entrez dans l’apothicairerie, vous êtes patient." },
    regular: {
      stamp: "Habitué",
      desc: "Si, pendant trois semaines sur quatre, vous êtes admis au moins trois fois par semaine, vous devenez un habitué."
    },
    physician: {
      stamp: "Médecin",
      desc: "Si vous gardez ce rang d’habitué pendant quatre mois et maîtrisez quelques ordonnances de niveau intermédiaire, vous devenez médecin."
    },
    royal: {
      stamp: "Médecin royal",
      desc: "Ce n’est qu’en tenant entre vos mains toutes les ordonnances avancées que vous pourrez être appelé médecin royal."
    }
  },
  de: {
    title: "Rangordnung der Apotheke",
    patient: { stamp: "Patient", desc: "Betreten Sie die Apotheke, so sind Sie ein Patient." },
    regular: {
      stamp: "Stammgast",
      desc: "Wenn Sie in drei von vier Wochen mindestens dreimal pro Woche aufgenommen werden, sind Sie ein Stammgast."
    },
    physician: {
      stamp: "Arzt",
      desc: "Wenn Sie den Rang des Stammgasts vier Monate lang halten und einige mittlere Rezepte beherrschen, werden Sie zum Arzt."
    },
    royal: {
      stamp: "Königlicher Leibarzt",
      desc: "Erst wenn Sie alle fortgeschrittenen Rezepte in den Händen halten, dürfen Sie königlicher Leibarzt genannt werden."
    }
  },
  sw: {
    title: "Jedwali la Vyeo vya Duka la Dawa",
    patient: { stamp: "Mgonjwa", desc: "Ukiingia katika duka la dawa, wewe ni mgonjwa." },
    regular: {
      stamp: "Mteja wa kudumu",
      desc: "Ikiwa katika wiki tatu kati ya nne utaingizwa kutibiwa angalau mara tatu kila wiki, wewe ni mteja wa kudumu."
    },
    physician: {
      stamp: "Tabibu",
      desc: "Ukidumisha hadhi ya mteja wa kudumu kwa miezi minne na kujifunza maagizo kadhaa ya dawa ya kiwango cha kati, wewe ni tabibu."
    },
    royal: {
      stamp: "Tabibu wa kifalme",
      desc: "Ni pale tu utakaposhika maagizo yote ya dawa ya kiwango cha juu ndipo unaweza kuitwa tabibu wa kifalme."
    }
  },
  ha: {
    title: "Jadawalin Matsayin Gidan Magani",
    patient: { stamp: "Mara lafiya", desc: "Idan ka shiga gidan magani, kai mara lafiya ne." },
    regular: {
      stamp: "Abokin ciniki na dindindin",
      desc: "Idan cikin makonni huɗu, ka kwanta jinya aƙalla sau uku a kowane mako na makonni uku, kai abokin ciniki na dindindin ne."
    },
    physician: {
      stamp: "Likita",
      desc: "Idan ka riƙe matsayin abokin ciniki na dindindin tsawon watanni huɗu, kuma ka koyi wasu takardun magani na matsakaicin mataki, kai likita ne."
    },
    royal: {
      stamp: "Likitan sarki",
      desc: "Sai ka mallaki dukkan takardun magani na babban mataki a hannunka sannan za a kira ka likitan sarki."
    }
  }
};
