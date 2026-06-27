import type { LocaleData } from "./types";

export const ha: LocaleData = {
  ui: {
    catalogTitle: "Jerin takardun magani na kantin magani",
    catalogSubtitle:
      "Zaɓi maganin da ya dace da wahalar Koreanci taka ka karɓi takardar maganinka. Cika gurabe, sai ya zama naka.",
    scrollCue: "Duba jerin takardun magani",
    groups: {
      pronunciation: {
        title: "Maganin furuci",
        blurb: "Hori harshe da leɓɓa"
      },
      "phonological-rule": {
        title: "Maganin ƙaʼidodin sauyin sauti",
        blurb: "Ƙware ƙaʼidodin da sauti ke sauyawa"
      },
      grammar: {
        title: "Maganin nahawu",
        blurb: "Kwantar da gardamar ƙaʼidoji da kari"
      },
      royal: {
        title: "Asirin magungunan fada",
        blurb: "Kyaututtuka iyakantattu da hannunka ba zai kai ba"
      }
    },
    status: {
      available: "Akwai",
      limited: "Iyakantacce",
      unavailable: "Ba a iya samu"
    },
    cardAction: "Karɓi takardar magani",
    footerLead: "Idan ka fita daga kantin magani, faɗaɗɗen Gwanggaeto na jiranka.",
    enterGwanggaeto: "Shiga Gwanggaeto",
    toTop: "Sama",
    modalLabel: "TAKARDAR MAGANI · 藥房廣開土",
    diagnosis: "Bincike",
    info: "Game da wannan magani",
    prescription: "Takardar magani (cika gurabe)",
    royalReject: "Wannan magani hannunka ba zai kai ba.",
    stamp: "AN BAYAR",
    allDone: "Ka ƙware takardar maganin. Wannan magani yanzu naka ne.",
    correct: "✓ Daidai",
    wrong: "✗ Sake gwadawa",
    showHint: "Nuna alama",
    hintPrefix: "Alama: ",
    answerPlaceholder: "Rubuta amsarka",
    callbackPending: "(hanyar haɗi nan ba da jimawa ba)",
    closeAria: "Rufe takardar magani",
    stockLabel: (count) => `Saura ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Littafin Hangeul da Sarki Sejong ya rubuta da hannu",
      description: "Sarki da kansa ya rubuta. Ko firaminista bai sami kwafi ɗaya ba.",
      diagnosis: "Wannan magani hannunka ba zai kai ba.",
      info: "An gama bugawa, ba za a ƙara yi ba. Fara mataki-mataki a kantin magani na yau da kullum na Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Maimakon haka → zuwa kantin magani na yau da kullum na Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (asali)",
      description: "Kwafi asali ɗaya kawai, jiran shekaru dubu.",
      diagnosis: "Wannan magani hannunka ba zai kai ba.",
      info: "Yana jiran amincewar majalisar fada. Ko shekaru dubu ba za a amince ba, don haka ka je kantin magani na yau da kullum na Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Maimakon haka → zuwa kantin magani na yau da kullum na Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Mai ƙara haƙurin abokin Koriya",
      description: "Zuciyar abokin da zai saurari furucinka har ƙarshe.",
      diagnosis: "Wannan magani hannunka ba zai kai ba.",
      info: "Ko firaminista ba ya samu. Idan ka yi karatu a kantin magani na Gwanggaeto, haƙurin abokinka ma zai ƙara faɗaɗa.",
      quizQuestions: [],
      callbackLabel: "Maimakon haka → zuwa kantin magani na yau da kullum na Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "Asirin girke-girken ƙirƙirar Hangeul",
      description: "Maganin asiri da Sarki Sejong ya ɗauki shekaru huɗu yana yi tare da malamai.",
      diagnosis: "Wannan magani hannunka ba zai kai ba.",
      info: "Kwafi ɗaya kawai, an riga an rufe shi a wani wuri. A kantin magani na yau da kullum na Gwanggaeto, koyi asiran Hangeul ɗaya-ɗaya.",
      quizQuestions: [],
      callbackLabel: "Maimakon haka → zuwa kantin magani na yau da kullum na Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Kwaya iyakantacce da firaminista ya ba da shawara",
      description: "Ba za a iya saya ba sai da takardar shawarar firaminista da hannu.",
      diagnosis: "Wannan magani hannunka ba zai kai ba.",
      info: "Ana buƙatar shawara. Idan ka yi karatu akai-akai a kantin Gwanggaeto, wataƙila firaminista da kansa zai ba da shawararka.",
      quizQuestions: [],
      callbackLabel: "Maimakon haka → zuwa kantin magani na yau da kullum na Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Maganin furucin ㅎ",
      description: "Yana sa ㅎ ya ɓace a hankali a cikin baki.",
      diagnosis: "Kana fama da furucin ㅎ.",
      info: "ㅎ ita ce baƙin mafi rauni a Koreanci — ƙaramar numfashi a farkon sigar, kusan ba a ji ta a matsayin batchim (baƙi na ƙarshe).",
      quizQuestions: ["A cikin '하늘', ina ㅎ take?", "'좋아요' → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar baƙaƙe ta Gwanggaeto"
    },
    "korean-ear": {
      name: "Kunnen Bakorea",
      description: "Bambanta ㅓ da ㅗ nan take.",
      diagnosis: "Kana fama da bambanta ㅓ da ㅗ.",
      info: "ㅓ: baki a buɗe kaɗan kuma faɗaɗɗe. ㅗ: leɓɓa a zagaye.",
      quizQuestions: [
        "Wace wasali ce ta farko a '어머니'?",
        "Wace wasali ce ta farko a '오빠'?",
        "'버스' ko '보스' — wanne ne da ㅓ?"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar wasula ta Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Ɗanɗano: sauƙi · mai numfashi · mai ƙarfi",
      description: "Ji ㅈ ㅊ ㅉ da bakin harshe.",
      diagnosis: "Kana fama da bambanta baƙaƙe masu sauƙi, masu numfashi, da masu ƙarfi.",
      info: "Sautuna uku daga wuri ɗaya — Sauti mai sauƙi (ㅂㄷㄱㅈ): a dabi'a, Sauti mai ƙarfin numfashi (ㅍㅌㅋㅊ): mai kaifi da fashewa, Sauti mai ƙarfi (ㅃㄸㄲㅉ): da sauri da ƙarfi.",
      quizQuestions: [
        "'바보' ko '파보' — wanne ne mai numfashi?",
        "Wace kalma ce da ㄸ mai ƙarfi?"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar baƙaƙe ta Gwanggaeto"
    },
    "fortification-chip": {
      name: "Guntun ƙarfafawa kai tsaye",
      description: "Yana furta '학교' a matsayin '학꾜' kai tsaye.",
      diagnosis: "Kana fama da ƙarfafawa.",
      info: "Baƙin sauƙi (ㄱㄷㅂㅈㅅ) bayan batchim ㄱㄷㅂ yana zama mai ƙarfi (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar sauyin sauti ta Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Kwayar sautukan ƙarshe 7 wakilai",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ a cikin kwaya ɗaya.",
      diagnosis: "Kana fama da sautukan ƙarshe 7 wakilai.",
      info: "Koreanci na da batchim 27, amma ana furta su a cikin sautuka 7 kawai — ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Yaya ake furta batchim na '꽃'?",
        "Yaya ake furta batchim na '낯'?",
        "Yaya ake furta batchim na '밖'?"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar batchim ta Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Kwaya ta musamman don batchim ㄺ",
      description: "닭, 흙, 굵다 — don rukunin ㄺ mai wahala.",
      diagnosis: "Kana fama da rukunin baƙaƙe ㄺ.",
      info: "Shi kaɗai ko gaban baƙi [ㄱ] (닭→[닥]); gaban wasali [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar batchim haɗaɗɗe ta Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Mai kwantar da rauni na ㅎ",
      description: "Yana furta '좋아요' a matsayin '조아요' a dabiʼance.",
      diagnosis: "Kana fama da raunin ㅎ.",
      info: "ㅎ na ƙarshe yana ɓacewa (좋아요 → 조아요). Bayan batchim ㄴㄹㅁㅇ, ㅎ yana raunana (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar raunin ㅎ ta Gwanggaeto"
    },
    "liaison-patch": {
      name: "Faci na haɗa sauti kai tsaye",
      description: "Yana haɗa '한국이' ya zama '한구기' kai tsaye.",
      diagnosis: "Kana fama da haɗa sauti (liaison).",
      info: "Idan batchim ya biyo bayan sigar da ta fara da wasali, batchim ɗin yana zama sautin farko na sigar gaba.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar sauyin sauti ta Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Naʼurar shaƙar sautin hanci",
      description: "Shaƙa '국물' ta hanci ya zama '궁물'.",
      diagnosis: "Kana fama da sautin hanci.",
      info: "Batchim ㄱㄷㅂ da ㄴㅁ ya biyo baya yana zama sautin hanci (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Ƙarin bayani → a manhajar sauyin sauti ta Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Maganin rarrabe '에' da '에서'",
      description: "Wurin zuwa ko wurin aiki — a cikin shan ɗaya.",
      diagnosis: "Kana fama da rarrabe '에' da '에서'.",
      info: "에 = wurin zuwa/wuri (학교에 가다). 에서 = wurin aiki (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "eun-i-chip": {
      name: "Guntun gane '은/는' da '이/가' kai tsaye",
      description: "Yana kawo ƙarshen gardamar dawwama tsakanin jigo da faʼili.",
      diagnosis: "Kana fama da rarrabe '은/는' da '이/가'.",
      info: "은/는 = jigo (bayanin da aka sani, gaba da juna). 이/가 = faʼili (sabon bayani, jaddadawa).",
      quizQuestions: [
        "저___ 학생이에요. (gabatar da kai)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "do-man-separator": {
      name: "Mai raba '도/만'",
      description: "Yana raba 도 na ƙari da 만 na iyakancewa a shan ɗaya.",
      diagnosis: "Kana fama da rarrabe '도' da '만'.",
      info: "도 = ma/haɗe da (저도 가요). 만 = kawai (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (ni ma)", "저___ 좋아해요. (ni kaɗai)"],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "buteo-kkaji-syrup": {
      name: "Maganin iyaka '부터-까지'",
      description: "Anka biyu na farko da ƙarshe.",
      diagnosis: "Kana fama da alamomin iyaka '부터' da '까지'.",
      info: "부터 = wurin farawa, 까지 = wurin ƙarewa. Yawanci ana amfani da su biyu.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "nikka-ni-separator": {
      name: "Mai raba '-(으)니까' da '-(으)니'",
      description: "Yana fayyace ko dalili ne ko ganowa yayin aikatawa.",
      diagnosis: "Kana fama da rarrabe '-(으)니까' da '-(으)니'.",
      info: "(으)니까 = dalili/sanadi. (으)니 = ganowa yayin aikatawa.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (dalili)",
        "가___ 사람이 많았어요. (da na je na gani)"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Mai raba '-(으)ㄹ게요' da '-(으)ㄹ 거예요'",
      description: "Layin sirara tsakanin alkawari da gaba.",
      diagnosis: "Kana fama da rarrabe '-(으)ㄹ게요' da '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = niyya/alkawarin mai magana (제가 할게요). (으)ㄹ 거예요 = gaba mai sauƙi/hasashe (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (alkawari)", "내일 비가 ___. (hasashe)"],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "aseo-a-aligner": {
      name: "Mai daidaita '-아서/어서' da '-아/어'",
      description: "Yana daidaita hanyoyi biyu na bayyana dalili.",
      diagnosis: "Kana fama da amfani da '-아서/어서' da '-아/어'.",
      info: "아서/어서 = dalili + sakamako (피곤해서 잤어요). 아/어 = ayyuka jere (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (dalili)", "집에 가___ 봤어요. (jere)"],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "causative-passive-syrup": {
      name: "Maganin sauya sa-aikatawa/karɓa kai tsaye",
      description: "먹이다 da 먹히다, a shan ɗaya.",
      diagnosis: "Kana fama da rarrabe sa-aikatawa da karɓa.",
      info: "Sa-aikatawa = sa wani ya yi (밥을 먹이다). Karɓa = a yi maka aiki (모기에 물리다). Kari: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (ciyarwa)",
        "모기가 사람에게 ___. (karɓa)"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    },
    "honorific-converter": {
      name: "Mai sauya zuwa harshen girmamawa kai tsaye",
      description: "Yana sauya magana ta yau da kullum zuwa salon ladabi kai tsaye.",
      diagnosis: "Kana fama da harshen girmamawa.",
      info: "Na yau da kullum + -요 = mai ladabi (해요). Na yau da kullum + -습니다/ㅂ니다 = na hukuma (합니다).",
      quizQuestions: [
        "Menene salon hukuma na '먹다'?",
        "Menene salon ladabi (해요) na '가다'?"
      ],
      callbackLabel: "Ƙarin bayani → a manhajar nahawu ta Gwanggaeto (nan ba da jimawa ba)"
    }
  }
};
