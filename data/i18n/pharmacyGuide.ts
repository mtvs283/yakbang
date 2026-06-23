import type { Locale, PharmacyGuideCopy } from "./types";

export const PHARMACY_GUIDE: Record<Locale, PharmacyGuideCopy> = {
  ko: {
    button: "약방 이용법",
    title: "약방 이용법",
    step1: "一. 매일 약방에 들러 입원하시오",
    step1Note: "(입원하면 출석금 300원이 쌓이오)",
    step2: "二. 약방문 목록에서 약을 고르시오",
    step3: "三. 빈칸을 채워 약방문을 익히시오",
    step4: "四. 약값을 내고 약을 받으시오"
  },
  en: {
    button: "Pharmacy guide",
    title: "How to Use the Pharmacy",
    step1: "1. Visit the pharmacy daily for check-in",
    step1Note: "(Each check-in earns you 300 won)",
    step2: "2. Choose a remedy from the prescription list",
    step3: "3. Fill in the blanks to learn the remedy",
    step4: "4. Pay and receive your remedy"
  },
  ja: {
    button: "薬房のご利用方法",
    title: "薬房のご利用方法",
    step1: "一. 毎日薬房にいらして入院なされ",
    step1Note: "(入院すると出席金 300ウォン)",
    step2: "二. 薬房文目録から薬をお選びなされ",
    step3: "三. 空欄を埋めて薬房文を覚えなされ",
    step4: "四. 薬代を払って薬をお受け取りなされ"
  },
  "zh-CN": {
    button: "药房使用法",
    title: "药房使用法",
    step1: "一. 每日来药房入院",
    step1Note: "(入院可获 300 元出席金)",
    step2: "二. 从药方目录中选药",
    step3: "三. 填空学习药方",
    step4: "四. 付药费,领药"
  },
  "zh-TW": {
    button: "藥房使用法",
    title: "藥房使用法",
    step1: "一. 每日來藥房入院",
    step1Note: "(入院可獲 300 元出席金)",
    step2: "二. 從藥方目錄中選藥",
    step3: "三. 填空學習藥方",
    step4: "四. 付藥費,領藥"
  },
  vi: {
    button: "Cách dùng tiệm thuốc",
    title: "Cách sử dụng tiệm thuốc",
    step1: "1. Mỗi ngày đến tiệm thuốc nhập viện",
    step1Note: "(Nhập viện được tích 300 won)",
    step2: "2. Chọn thuốc từ danh sách đơn thuốc",
    step3: "3. Điền vào chỗ trống để học đơn thuốc",
    step4: "4. Trả tiền và nhận thuốc"
  },
  th: {
    button: "วิธีใช้ร้านยา",
    title: "วิธีใช้ร้านยา",
    step1: "๑. มาร้านยาทุกวันเพื่อเข้ารักษา",
    step1Note: "(เข้ารักษาได้สะสม ๓๐๐ วอน)",
    step2: "๒. เลือกยาจากรายการใบสั่งยา",
    step3: "๓. เติมคำในช่องว่างเพื่อเรียนรู้ใบสั่งยา",
    step4: "๔. ชำระเงินและรับยา"
  },
  id: {
    button: "Cara pakai apotek",
    title: "Cara Menggunakan Apotek",
    step1: "1. Datang ke apotek setiap hari",
    step1Note: "(Setiap kunjungan dapat 300 won)",
    step2: "2. Pilih obat dari daftar resep",
    step3: "3. Isi titik-titik untuk mempelajari resep",
    step4: "4. Bayar dan terima obat Anda"
  },
  mn: {
    button: "Эмийн сангийн заавар",
    title: "Эмийн сангийн хэрэглээний заавар",
    step1: "1. Өдөр бүр эмийн санд ирж бүртгүүл",
    step1Note: "(Ирэх бүрт 300 вон цуглуулна)",
    step2: "2. Жорын жагсаалтаас эм сонго",
    step3: "3. Хоосон зайг бөглөж эмийг сурах",
    step4: "4. Төлбөр төлж эмээ ав"
  },
  ru: {
    button: "Как пользоваться",
    title: "Как пользоваться аптекой",
    step1: "1. Приходите в аптеку каждый день",
    step1Note: "(За каждый визит — 300 вон)",
    step2: "2. Выберите лекарство из списка рецептов",
    step3: "3. Заполните пропуски и изучите рецепт",
    step4: "4. Оплатите и получите лекарство"
  },
  uz: {
    button: "Dorixona qo'llanmasi",
    title: "Dorixonadan foydalanish tartibi",
    step1: "1. Har kuni dorixonaga keling",
    step1Note: "(Har kelishingizda 300 von to'planadi)",
    step2: "2. Retseptlar ro'yxatidan dori tanlang",
    step3: "3. Bo'sh joylarni to'ldirib retseptni o'rganing",
    step4: "4. To'lov qiling va doringizni oling"
  },
  kk: {
    button: "Дәріхана нұсқаулығы",
    title: "Дәріханаға қалай келу керек",
    step1: "1. Күнде дәріханаға келіңіз",
    step1Note: "(Әр келгенде 300 вон жиналады)",
    step2: "2. Рецепт тізімінен дәріні таңдаңыз",
    step3: "3. Бос орындарды толтырып рецептті үйреніңіз",
    step4: "4. Төлеп, дәріңізді алыңыз"
  },
  ky: {
    button: "Дары-дармек боюнча",
    title: "Дары-дармек кантип колдонуу",
    step1: "1. Күн сайын дары-дармекке келиңиз",
    step1Note: "(Ар келгенде 300 вон чогулат)",
    step2: "2. Рецепт тизмесинен дары тандаңыз",
    step3: "3. Бош жерлерди толтуруп рецептти үйрөнүңүз",
    step4: "4. Акысын төлөп дарыңызды алыңыз"
  },
  ne: {
    button: "औषधालय विधि",
    title: "औषधालय प्रयोग विधि",
    step1: "१. हरेक दिन औषधालय आउनुहोस्",
    step1Note: "(आउँदा ३०० वोन जम्मा हुन्छ)",
    step2: "२. औषधि सूचीबाट औषधि छान्नुहोस्",
    step3: "३. खाली ठाउँ भरेर औषधि सिक्नुहोस्",
    step4: "४. पैसा तिरेर औषधि प्राप्त गर्नुहोस्"
  },
  my: {
    button: "ဆေးခန်း အသုံးပြုနည်း",
    title: "ဆေးခန်း အသုံးပြုနည်း",
    step1: "၁. နေ့စဉ် ဆေးခန်းသို့ လာရောက်ပါ",
    step1Note: "(လာရောက်လျှင် ၃၀၀ ဝမ် စုပါသည်)",
    step2: "၂. ဆေးညွှန်းစာရင်းမှ ဆေးကို ရွေးချယ်ပါ",
    step3: "၃. ကွက်လပ်ဖြည့်၍ ဆေးညွှန်းကို သင်ယူပါ",
    step4: "၄. ဆေးဖိုးပေး၍ ဆေးကို လက်ခံပါ"
  },
  km: {
    button: "របៀបប្រើឱសថស្ថាន",
    title: "របៀបប្រើប្រាស់ឱសថស្ថាន",
    step1: "១. មកឱសថស្ថានរាល់ថ្ងៃ",
    step1Note: "(មកម្តងបាន ៣០០ វ៉ុន)",
    step2: "២. ជ្រើសរើសឱសថពីបញ្ជីវេជ្ជបញ្ជា",
    step3: "៣. បំពេញចន្លោះដើម្បីរៀនវេជ្ជបញ្ជា",
    step4: "៤. បង់ប្រាក់ និងទទួលឱសថ"
  },
  fil: {
    button: "Gabay sa botika",
    title: "Paano Gamitin ang Botika",
    step1: "1. Bumisita sa botika araw-araw",
    step1Note: "(Bawat dalaw, 300 won ang naiipon)",
    step2: "2. Pumili ng gamot mula sa listahan ng reseta",
    step3: "3. Punan ang patlang upang matutunan ang reseta",
    step4: "4. Magbayad at tanggapin ang inyong gamot"
  },
  hi: {
    button: "औषधालय गाइड",
    title: "औषधालय उपयोग विधि",
    step1: "१. प्रतिदिन औषधालय आइए",
    step1Note: "(आने पर ३०० वॉन जमा होते हैं)",
    step2: "२. नुस्खा सूची से दवा चुनिए",
    step3: "३. रिक्त स्थान भरकर नुस्खा सीखिए",
    step4: "४. मूल्य चुकाकर दवा प्राप्त कीजिए"
  },
  bn: {
    button: "ঔষধালয় গাইড",
    title: "ঔষধালয় ব্যবহার পদ্ধতি",
    step1: "১. প্রতিদিন ঔষধালয়ে আসুন",
    step1Note: "(আগমনে ৩০০ ওন জমা হয়)",
    step2: "২. ঔষধ তালিকা থেকে ঔষধ বাছুন",
    step3: "৩. শূন্যস্থান পূরণ করে ঔষধ শিখুন",
    step4: "৪. মূল্য প্রদান করে ঔষধ গ্রহণ করুন"
  },
  ar: {
    button: "دليل الصيدلية",
    title: "كيفية استخدام الصيدلية",
    step1: "١. تفضل بزيارة الصيدلية يوميًا",
    step1Note: "(كل زيارة تكسب ٣٠٠ وون)",
    step2: "٢. اختر دواءً من قائمة الوصفات",
    step3: "٣. املأ الفراغات لتتعلم الوصفة",
    step4: "٤. ادفع واستلم دواءك"
  },
  es: {
    button: "Guía de la botica",
    title: "Cómo usar la Botica",
    step1: "1. Visite la botica cada día",
    step1Note: "(Cada visita acumula 300 won)",
    step2: "2. Elija un remedio de la lista de recetas",
    step3: "3. Complete los espacios para aprender la receta",
    step4: "4. Pague y reciba su remedio"
  },
  fr: {
    button: "Guide de la pharmacie",
    title: "Mode d'emploi de la Pharmacie",
    step1: "1. Rendez-vous à la pharmacie chaque jour",
    step1Note: "(Chaque visite vous rapporte 300 wons)",
    step2: "2. Choisissez un remède dans la liste des ordonnances",
    step3: "3. Remplissez les blancs pour apprendre l'ordonnance",
    step4: "4. Payez et recevez votre remède"
  },
  de: {
    button: "Apotheken-Anleitung",
    title: "Anleitung zur Nutzung der Apotheke",
    step1: "1. Besuchen Sie täglich die Apotheke",
    step1Note: "(Jeder Besuch bringt 300 Won)",
    step2: "2. Wählen Sie ein Heilmittel aus der Rezeptliste",
    step3: "3. Füllen Sie die Lücken aus, um das Rezept zu lernen",
    step4: "4. Bezahlen Sie und erhalten Sie Ihr Heilmittel"
  },
  sw: {
    button: "Mwongozo wa duka",
    title: "Jinsi ya Kutumia Duka la Dawa",
    step1: "1. Tembelea duka la dawa kila siku",
    step1Note: "(Kila ziara hupata won 300)",
    step2: "2. Chagua dawa kutoka orodha ya maagizo",
    step3: "3. Jaza nafasi tupu kujifunza maagizo",
    step4: "4. Lipa na pokea dawa yako"
  },
  ha: {
    button: "Jagoran kantin magani",
    title: "Yadda Ake Amfani da Kantin Magani",
    step1: "1. Ku ziyarci kantin magani kullum",
    step1Note: "(Kowace ziyara tana tara won 300)",
    step2: "2. Zaɓi magani daga jerin takardun magani",
    step3: "3. Cika wuraren da babu rubutu don koyon takardar magani",
    step4: "4. Biya kuɗi kuma karɓi maganinku"
  }
};
