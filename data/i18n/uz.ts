import type { LocaleData } from "./types";

export const uz: LocaleData = {
  ui: {
    catalogTitle: "Dorixona retseptlari roʻyxati",
    catalogSubtitle:
      "Koreys tilidagi qiyinchiligingga mos dorini tanlab, retseptingni ol. Boʻsh joyni toʻldirsang, u seniki.",
    scrollCue: "Retseptlar roʻyxatini koʻrish",
    groups: {
      pronunciation: {
        title: "Talaffuz dorilari",
        blurb: "Til va lablarni qoʻlga ol"
      },
      "phonological-rule": {
        title: "Tovush oʻzgarishi qoidalari dorilari",
        blurb: "Tovushlar oʻzgaradigan qoidalarni egalla"
      },
      grammar: {
        title: "Grammatika dorilari",
        blurb: "Qoʻshimcha va tugallanmalar janjalini tinchit"
      },
      royal: {
        title: "Saroy maxfiy retseptlari",
        blurb: "Qoʻling yetmaydigan cheklangan tuhfa"
      }
    },
    status: {
      available: "Sotuvda",
      limited: "Cheklangan",
      unavailable: "Qoʻl yetmaydi"
    },
    cardAction: "Retsept olish",
    footerLead: "Dorixonadan chiqqaningda, kengroq Gwanggaeto seni kutmoqda.",
    enterGwanggaeto: "Gwanggaeto'ga kirish",
    toTop: "Yuqoriga",
    modalLabel: "RETSEPT · 藥房廣開土",
    diagnosis: "Tashxis",
    info: "Bu dori haqida",
    prescription: "Retsept (boʻsh joyni toʻldir)",
    royalReject: "Bu doriga qoʻling yetmaydi.",
    stamp: "BERILDI",
    allDone: "Retseptni toʻliq egalleding. Bu dori endi seniki.",
    correct: "✓ Toʻgʻri",
    wrong: "✗ Yana urin",
    showHint: "Maslahatni koʻrsatish",
    hintPrefix: "Maslahat: ",
    answerPlaceholder: "Javobingni yoz",
    callbackPending: "(havola tez orada)",
    closeAria: "Retseptni yopish",
    stockLabel: (count) => `Qoldi ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Qirol Sejongning qoʻlyozma Hangeul darsligi",
      description: "Qirol oʻz qoʻli bilan yozgan. Bosh vazir ham bitta nusxa topolmagan.",
      diagnosis: "Bu doriga qoʻling yetmaydi.",
      info: "Nashri tugagan, boshqa tayyorlanmaydi. Oddiy Gwanggaeto dorixonasida qadam-baqadam boshla.",
      quizQuestions: [],
      callbackLabel: "Buning oʻrniga → oddiy Gwanggaeto dorixonasiga"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (asl nusxa)",
      description: "Yagona asl nusxa, ming yillik kutish.",
      diagnosis: "Bu doriga qoʻling yetmaydi.",
      info: "Saroy kengashi tasdigʻini kutmoqda. Ming yil kutsang ham tasdiqlanmaydi, shuning uchun oddiy Gwanggaeto dorixonasiga bor.",
      quizQuestions: [],
      callbackLabel: "Buning oʻrniga → oddiy Gwanggaeto dorixonasiga"
    },
    "korean-friend-patience": {
      name: "Koreys doʻstning sabr kuchaytirgichi",
      description: "Talaffuzingni oxirigacha tinglaydigan doʻstning qalbi.",
      diagnosis: "Bu doriga qoʻling yetmaydi.",
      info: "Bosh vazir ham topolmaydi. Gwanggaeto dorixonasida oʻrgansang, doʻstning sabri ham asta-sekin kengayadi.",
      quizQuestions: [],
      callbackLabel: "Buning oʻrniga → oddiy Gwanggaeto dorixonasiga"
    },
    "hangul-creation-secret": {
      name: "Hangeul yaratishning maxfiy retsepti",
      description: "Qirol Sejong olimlar bilan toʻrt yil davomida tayyorlagan maxfiy dori.",
      diagnosis: "Bu doriga qoʻling yetmaydi.",
      info: "Faqat bitta nusxa, allaqachon biror joyda muhrlangan. Oddiy Gwanggaeto dorixonasida Hangeul sirlarini birma-bir oʻrgan.",
      quizQuestions: [],
      callbackLabel: "Buning oʻrniga → oddiy Gwanggaeto dorixonasiga"
    },
    "prime-minister-capsule": {
      name: "Bosh vazir tavsiya qilgan cheklangan kapsula",
      description: "Bosh vazirning qoʻlyozma tavsiyanomasisiz sotib boʻlmaydi.",
      diagnosis: "Bu doriga qoʻling yetmaydi.",
      info: "Tavsiyanoma kerak. Gwanggaeto dorixonasida muntazam oʻrgansang, bosh vazir oʻzi seni tavsiya qilishi mumkin.",
      quizQuestions: [],
      callbackLabel: "Buning oʻrniga → oddiy Gwanggaeto dorixonasiga"
    },
    "h-pronunciation": {
      name: "ㅎ talaffuz dorisi",
      description: "ㅎ ni ogʻiz ichida yumshoq yoʻqotadi.",
      diagnosis: "Sen ㅎ ni talaffuz qilishda qiynalyapsan.",
      info: "ㅎ — koreys tilidagi eng kuchsiz undosh: boʻgʻin boshida yengil nafas, batchim (oxirgi undosh) boʻlganda deyarli eshitilmaydi.",
      quizQuestions: ["'하늘' ichida ㅎ qayerda?", "'좋아요' → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto undoshlar ilovasida"
    },
    "korean-ear": {
      name: "Koreys qulogʻi",
      description: "ㅓ va ㅗ ni darrov ajrat.",
      diagnosis: "Sen ㅓ va ㅗ ni ajratishda qiynalyapsan.",
      info: "ㅓ: ogʻiz biroz ochiq va yassi. ㅗ: lablar dumaloq.",
      quizQuestions: [
        "'어머니' dagi birinchi unli qaysi?",
        "'오빠' dagi birinchi unli qaysi?",
        "'버스' va '보스' — qaysida ㅓ bor?"
      ],
      callbackLabel: "Batafsil → Gwanggaeto unlilar ilovasida"
    },
    "three-tier-taste": {
      name: "Oddiy · intiluvchi · kuchli taʼm",
      description: "ㅈ ㅊ ㅉ ni til uchi bilan his qil.",
      diagnosis: "Sen oddiy, intiluvchi va kuchli undoshlarni ajratishda qiynalyapsan.",
      info: "Bir joydan chiqadigan uchta tovush — Oddiy (ㅂㄷㄱㅈ): tabiiy, Intiluvchi (ㅍㅌㅋㅊ): keskin va portlab, Kuchli (ㅃㄸㄲㅉ): tez va kuchli.",
      quizQuestions: [
        "'바보' va '파보' — qaysi biri intiluvchi?",
        "Qaysi soʻzda kuchli ㄸ bor?"
      ],
      callbackLabel: "Batafsil → Gwanggaeto undoshlar ilovasida"
    },
    "fortification-chip": {
      name: "Avtomatik kuchaytirish chipi",
      description: "'학교' ni avtomatik '학꾜' deb talaffuz qiladi.",
      diagnosis: "Sen kuchayishda qiynalyapsan.",
      info: "Batchim ㄱㄷㅂ dan keyingi oddiy undosh (ㄱㄷㅂㅈㅅ) kuchliga (ㄲㄸㅃㅉㅆ) aylanadi.",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto tovush oʻzgarishi ilovasida"
    },
    "final-7-capsule": {
      name: "Batchim 7 vakil tovush kapsulasi",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ bitta tabletkada.",
      diagnosis: "Sen 7 vakil oxirgi tovushda qiynalyapsan.",
      info: "Koreys tilida 27 batchim bor, ammo talaffuzi atigi 7 tovushga jamlanadi — ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "'꽃' batchimi qanday talaffuz qilinadi?",
        "'낯' batchimi qanday talaffuz qilinadi?",
        "'밖' batchimi qanday talaffuz qilinadi?"
      ],
      callbackLabel: "Batafsil → Gwanggaeto batchim ilovasida"
    },
    "rk-special-capsule": {
      name: "Batchim ㄺ maxsus kapsulasi",
      description: "닭, 흙, 굵다 — qiyin ㄺ birikmasi uchun.",
      diagnosis: "Sen qoʻsh batchim ㄺ da qiynalyapsan.",
      info: "Yolgʻiz yoki undosh oldida [ㄱ] (닭→[닥]); unli oldida [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto qoʻsh batchim ilovasida"
    },
    "h-weakening-soothing": {
      name: "ㅎ kuchsizlanishi tinchlantirgichi",
      description: "'좋아요' ni tabiiy '조아요' deb talaffuz qiladi.",
      diagnosis: "Sen ㅎ kuchsizlanishida qiynalyapsan.",
      info: "Oxirgi ㅎ yoʻqoladi (좋아요 → 조아요). ㄴㄹㅁㅇ batchimidan keyingi ㅎ kuchsizlanadi (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto ㅎ kuchsizlanishi ilovasida"
    },
    "liaison-patch": {
      name: "Tovush ulash avtomatik yopishqogʻi",
      description: "'한국이' ni avtomatik '한구기' qilib ulaydi.",
      diagnosis: "Sen tovush ulashda qiynalyapsan.",
      info: "Batchimdan keyin unli bilan boshlanadigan boʻgʻin kelsa, batchim keyingi boʻgʻinning birinchi tovushiga aylanadi.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto tovush oʻzgarishi ilovasida"
    },
    "nasalization-inhaler": {
      name: "Burun tovushi ingalyatori",
      description: "'국물' ni burun orqali tortib '궁물' qiladi.",
      diagnosis: "Sen burunlashishda qiynalyapsan.",
      info: "Batchim ㄱㄷㅂ dan keyin ㄴㅁ kelsa, batchim burun tovushiga (ㅇㄴㅁ) aylanadi.",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Batafsil → Gwanggaeto tovush oʻzgarishi ilovasida"
    },
    "e-vs-eseo-syrup": {
      name: "'에' va '에서' ni ajratish siropi",
      description: "Manzilmi yoki harakat joyimi — bir qultumda.",
      diagnosis: "Sen '에' va '에서' ni ajratishda qiynalyapsan.",
      info: "에 = manzil/joy (학교에 가다). 에서 = harakat joyi (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "eun-i-chip": {
      name: "'은/는' va '이/가' ni avtomatik aniqlash chipi",
      description: "Mavzu va ega oʻrtasidagi abadiy janjalni tugatadi.",
      diagnosis: "Sen '은/는' va '이/가' ni ajratishda qiynalyapsan.",
      info: "은/는 = mavzu (maʼlum maʼlumot, qarama-qarshilik). 이/가 = ega (yangi maʼlumot, urgʻu).",
      quizQuestions: [
        "저___ 학생이에요. (oʻzingni tanishtirish)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "do-man-separator": {
      name: "'도/만' ajratgichi",
      description: "Qoʻshimcha 도 va cheklovchi 만 ni bir qultumda ajratadi.",
      diagnosis: "Sen '도' va '만' ni ajratishda qiynalyapsan.",
      info: "도 = ham/jumladan (저도 가요). 만 = faqat (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (men ham)", "저___ 좋아해요. (faqat men)"],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "buteo-kkaji-syrup": {
      name: "'부터-까지' oraliq siropi",
      description: "Boshlanish va tugash ikki langari.",
      diagnosis: "Sen '부터' va '까지' oraligʻida qiynalyapsan.",
      info: "부터 = boshlanish nuqtasi, 까지 = tugash nuqtasi. Odatda juft holda ishlatiladi.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "nikka-ni-separator": {
      name: "'-(으)니까' va '-(으)니' ajratgichi",
      description: "Sababmi yoki qilib turib bilib olishmi — aniqlaydi.",
      diagnosis: "Sen '-(으)니까' va '-(으)니' ni ajratishda qiynalyapsan.",
      info: "(으)니까 = sabab/asos. (으)니 = qilib turib bilib olish.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (sabab)",
        "가___ 사람이 많았어요. (borib koʻrsam)"
      ],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "lge-l-geoyeyo-separator": {
      name: "'-(으)ㄹ게요' va '-(으)ㄹ 거예요' ajratgichi",
      description: "Vaʼda va kelajak oʻrtasidagi nozik chiziq.",
      diagnosis: "Sen '-(으)ㄹ게요' va '-(으)ㄹ 거예요' ni ajratishda qiynalyapsan.",
      info: "(으)ㄹ게요 = soʻzlovchining irodasi/vaʼdasi (제가 할게요). (으)ㄹ 거예요 = oddiy kelajak/taxmin (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (vaʼda)", "내일 비가 ___. (taxmin)"],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "aseo-a-aligner": {
      name: "'-아서/어서' va '-아/어' tartiblagichi",
      description: "Sabab bildirishning ikki yoʻlini tartiblaydi.",
      diagnosis: "Sen '-아서/어서' va '-아/어' ishlatishda qiynalyapsan.",
      info: "아서/어서 = sabab + natija (피곤해서 잤어요). 아/어 = ketma-ket harakatlar (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (sabab)", "집에 가___ 봤어요. (ketma-ket)"],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "causative-passive-syrup": {
      name: "Orttirma/majhul avtomatik oʻzgartirish siropi",
      description: "먹이다 va 먹히다 ni bir qultumda.",
      diagnosis: "Sen orttirma va majhulni ajratishda qiynalyapsan.",
      info: "Orttirma = birovga qildirish (밥을 먹이다). Majhul = harakatga uchrash (모기에 물리다). Qoʻshimchalar: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (ovqatlantirish)",
        "모기가 사람에게 ___. (majhul)"
      ],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    },
    "honorific-converter": {
      name: "Hurmat tiliga avtomatik oʻzgartirgich",
      description: "Norasmiy nutqni avtomatik hurmatli shaklga aylantiradi.",
      diagnosis: "Sen hurmat tilida qiynalyapsan.",
      info: "Norasmiy + -요 = xushmuomala (해요). Norasmiy + -습니다/ㅂ니다 = rasmiy (합니다).",
      quizQuestions: [
        "'먹다' ning rasmiy shakli qanday?",
        "'가다' ning xushmuomala shakli (해요) qanday?"
      ],
      callbackLabel: "Batafsil → Gwanggaeto grammatika ilovasida (tez orada)"
    }
  }
};
