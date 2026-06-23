import type { LocaleData } from "./types";

export const fil: LocaleData = {
  ui: {
    catalogTitle: "Listahan ng reseta ng botika",
    catalogSubtitle:
      "Pumili ng gamot na bagay sa hirap mo sa Korean at kunin ang iyong reseta. Punan ang patlang, at sa iyo na ito.",
    scrollCue: "Tingnan ang listahan ng reseta",
    groups: {
      pronunciation: {
        title: "Gamot sa pagbigkas",
        blurb: "Paamuin ang dila at labi"
      },
      "phonological-rule": {
        title: "Gamot sa tuntunin ng pagbabago ng tunog",
        blurb: "Bihasahin ang mga tuntunin kung saan nagbabago ang tunog"
      },
      grammar: {
        title: "Gamot sa gramatika",
        blurb: "Payapain ang away ng mga pananda at hulapi"
      },
      royal: {
        title: "Lihim na reseta ng korte",
        blurb: "Limitadong handog na hindi mo maaabot"
      }
    },
    status: {
      available: "Available",
      limited: "Limitado",
      unavailable: "Hindi maaabot"
    },
    cardAction: "Kunin ang reseta",
    footerLead: "Paglabas mo ng botika, naghihintay ang mas malawak na Gwanggaeto.",
    enterGwanggaeto: "Pumasok sa Gwanggaeto",
    toTop: "Itaas",
    home: "Home",
    modalLabel: "RESETA · 藥房廣開土",
    diagnosis: "Diyagnosis",
    info: "Tungkol sa gamot na ito",
    prescription: "Reseta (punan ang patlang)",
    royalReject: "Hindi mo maaabot ang gamot na ito.",
    stamp: "NAIBIGAY",
    allDone: "Nabihasa mo na ang reseta. Sa iyo na ang gamot na ito.",
    correct: "✓ Tama",
    wrong: "✗ Subukan ulit",
    showHint: "Ipakita ang pahiwatig",
    hintPrefix: "Pahiwatig: ",
    answerPlaceholder: "Isulat ang iyong sagot",
    callbackPending: "(malapit nang ilunsad ang link)",
    closeAria: "Isara ang reseta",
    stockLabel: (count) => `${count} na lang`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Sulat-kamay na aklat ng Hangeul ni Haring Sejong",
      description: "Sinulat mismo ng hari. Kahit ang punong ministro ay walang nakuhang kopya.",
      diagnosis: "Hindi mo maaabot ang gamot na ito.",
      info: "Wala nang stock, hindi na gagawin pa. Magsimula nang paunti-unti sa karaniwang botika ng Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sa halip → sa karaniwang botika ng Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (orihinal)",
      description: "Iisang orihinal na kopya, libong taon ang paghihintay.",
      diagnosis: "Hindi mo maaabot ang gamot na ito.",
      info: "Naghihintay pa ng pag-apruba ng korteng-hari. Kahit libong taon ay hindi maaaprubahan, kaya pumunta sa karaniwang botika ng Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sa halip → sa karaniwang botika ng Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Pampalakas ng pasensya ng kaibigang Koreano",
      description: "Ang puso ng kaibigang nakikinig sa pagbigkas mo hanggang dulo.",
      diagnosis: "Hindi mo maaabot ang gamot na ito.",
      info: "Kahit ang punong ministro ay hindi makakuha. Mag-aral sa botika ng Gwanggaeto, at lalong lalawak ang pasensya ng iyong kaibigan.",
      quizQuestions: [],
      callbackLabel: "Sa halip → sa karaniwang botika ng Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "Lihim na reseta ng paglikha ng Hangeul",
      description: "Ang lihim na gamot na apat na taóng ginawa ni Haring Sejong kasama ang mga iskolar.",
      diagnosis: "Hindi mo maaabot ang gamot na ito.",
      info: "Iisang kopya lamang, naselyuhan na sa kung saan. Alamin ang mga lihim ng Hangeul nang tig-iisang dosis sa karaniwang botika ng Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sa halip → sa karaniwang botika ng Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Limitadong kapsula na rekomendado ng punong ministro",
      description: "Hindi mabibili nang walang sulat-kamay na rekomendasyon ng punong ministro.",
      diagnosis: "Hindi mo maaabot ang gamot na ito.",
      info: "Kailangan ng rekomendasyon. Mag-aral nang masigasig sa botika ng Gwanggaeto, baka irekomenda ka mismo ng punong ministro.",
      quizQuestions: [],
      callbackLabel: "Sa halip → sa karaniwang botika ng Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Gamot sa pagbigkas ng ㅎ",
      description: "Pinapawi nang banayad ang ㅎ sa loob ng bibig.",
      diagnosis: "Nahihirapan kang bigkasin ang ㅎ.",
      info: "Ang ㅎ ang pinakamahinang katinig sa Korean — banayad na hangin sa simula ng pantig, halos hindi marinig bilang batchim (huling katinig).",
      quizQuestions: ["Nasaan ang ㅎ sa '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "Higit pa → sa app ng katinig ng Gwanggaeto"
    },
    "korean-ear": {
      name: "Tainga ng Koreano",
      description: "Agad makilala ang ㅓ at ㅗ.",
      diagnosis: "Nahihirapan kang ikilala ang ㅓ at ㅗ.",
      info: "ㅓ: bahagyang bukas at patag ang bibig. ㅗ: bilog ang labi.",
      quizQuestions: [
        "Ano ang unang patinig sa '어머니'?",
        "Ano ang unang patinig sa '오빠'?",
        "'버스' o '보스' — alin ang may ㅓ?"
      ],
      callbackLabel: "Higit pa → sa app ng patinig ng Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Panlasa: payak · mahangin · mariin",
      description: "Damhin ang ㅈ ㅊ ㅉ sa dulo ng dila.",
      diagnosis: "Nahihirapan kang ikilala ang payak, mahangin, at mariing katinig.",
      info: "Tatlong tunog mula sa parehong lugar — Payak (ㅂㄷㄱㅈ): natural, Mahigpit ang hangin (ㅍㅌㅋㅊ): matalas at pumuputok, Mabilis at malakas (ㅃㄸㄲㅉ): mabilis at malakas.",
      quizQuestions: [
        "'바보' o '파보' — alin ang mahangin?",
        "Aling salita ang may mariing ㄸ?"
      ],
      callbackLabel: "Higit pa → sa app ng katinig ng Gwanggaeto"
    },
    "fortification-chip": {
      name: "Chip ng awtomatikong pagriin",
      description: "Binibigkas ang '학교' bilang '학꾜' nang awtomatiko.",
      diagnosis: "Nahihirapan ka sa pagriin (tensification).",
      info: "Ang payak na katinig (ㄱㄷㅂㅈㅅ) pagkatapos ng batchim ㄱㄷㅂ ay nagiging mariin (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Higit pa → sa app ng pagbabago ng tunog ng Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Kapsula ng 7 huling tunog",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ sa iisang tableta.",
      diagnosis: "Nahihirapan ka sa 7 kinatawang huling tunog.",
      info: "May 27 batchim ang Korean, ngunit binibigkas sa 7 tunog lamang: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Paano binibigkas ang batchim ng '꽃'?",
        "Paano binibigkas ang batchim ng '낯'?",
        "Paano binibigkas ang batchim ng '밖'?"
      ],
      callbackLabel: "Higit pa → sa app ng batchim ng Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Espesyal na kapsula para sa batchim ㄺ",
      description: "닭, 흙, 굵다 — para sa mahirap na kumpol na ㄺ.",
      diagnosis: "Nahihirapan ka sa kumpol-katinig na ㄺ.",
      info: "Mag-isa o bago ang katinig ay [ㄱ] (닭→[닥]); bago ang patinig ay [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Higit pa → sa app ng tambalang batchim ng Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Pampakalma sa paghina ng ㅎ",
      description: "Binibigkas ang '좋아요' bilang '조아요' nang natural.",
      diagnosis: "Nahihirapan ka sa paghina ng ㅎ.",
      info: "Ang ㅎ na batchim ay nawawala (좋아요 → 조아요). Pagkatapos ng batchim ㄴㄹㅁㅇ, humihina ang ㅎ (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Higit pa → sa app ng paghina ng ㅎ ng Gwanggaeto"
    },
    "liaison-patch": {
      name: "Awtomatikong patch ng pag-uugnay ng tunog",
      description: "Inuugnay ang '한국이' bilang '한구기' nang awtomatiko.",
      diagnosis: "Nahihirapan ka sa pag-uugnay ng tunog (liaison).",
      info: "Kapag ang batchim ay sinundan ng pantig na nagsisimula sa patinig, ang batchim ay nagiging unang tunog ng susunod na pantig.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Higit pa → sa app ng pagbabago ng tunog ng Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Inhaler ng nasalisasyon",
      description: "Langhapin ang '국물' sa ilong para maging '궁물'.",
      diagnosis: "Nahihirapan ka sa nasalisasyon.",
      info: "Ang batchim ㄱㄷㅂ na sinundan ng ㄴㅁ ay nagiging tunog-ilong (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Higit pa → sa app ng pagbabago ng tunog ng Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Sirop sa pagkilala ng '에' at '에서'",
      description: "Patutunguhan o lugar ng kilos — sa isang lagok.",
      diagnosis: "Nahihirapan kang ikilala ang '에' at '에서'.",
      info: "에 = patutunguhan/lokasyon (학교에 가다). 에서 = lugar ng kilos (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "eun-i-chip": {
      name: "Chip na awtomatikong kumikilala ng '은/는' at '이/가'",
      description: "Tinatapos ang walang-katapusang away ng paksa at simuno.",
      diagnosis: "Nahihirapan kang ikilala ang '은/는' at '이/가'.",
      info: "은/는 = paksa (kilalang impormasyon, kontrast). 이/가 = simuno (bagong impormasyon, diin).",
      quizQuestions: [
        "저___ 학생이에요. (pagpapakilala)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "do-man-separator": {
      name: "Pampahiwalay ng '도/만'",
      description: "Inihihiwalay ang 도 (rin) at 만 (lamang) sa isang lagok.",
      diagnosis: "Nahihirapan kang ikilala ang '도' at '만'.",
      info: "도 = rin/kasama (저도 가요). 만 = lamang (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (ako rin)", "저___ 좋아해요. (ako lamang)"],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "buteo-kkaji-syrup": {
      name: "Sirop ng saklaw na '부터-까지'",
      description: "Dalawang angkla: simula at wakas.",
      diagnosis: "Nahihirapan ka sa pananda ng saklaw na '부터' at '까지'.",
      info: "부터 = panimulang punto, 까지 = pangwakas na punto. Madalas magkapares.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "nikka-ni-separator": {
      name: "Pampahiwalay ng '-(으)니까' at '-(으)니'",
      description: "Kinikilala kung dahilan o natuklasan habang ginagawa.",
      diagnosis: "Nahihirapan kang ikilala ang '-(으)니까' at '-(으)니'.",
      info: "(으)니까 = dahilan/sanhi. (으)니 = natuklasan habang ginagawa.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (dahilan)",
        "가___ 사람이 많았어요. (nang pumunta, natuklasan)"
      ],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Pampahiwalay ng '-(으)ㄹ게요' at '-(으)ㄹ 거예요'",
      description: "Ang manipis na guhit sa pagitan ng pangako at hinaharap.",
      diagnosis: "Nahihirapan kang ikilala ang '-(으)ㄹ게요' at '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = kalooban/pangako ng nagsasalita (제가 할게요). (으)ㄹ 거예요 = simpleng hinaharap/hinala (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (pangako)", "내일 비가 ___. (hula)"],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "aseo-a-aligner": {
      name: "Pampahanay ng '-아서/어서' at '-아/어'",
      description: "Inaayos ang dalawang paraan ng pagpapahayag ng dahilan.",
      diagnosis: "Nahihirapan ka sa paggamit ng '-아서/어서' at '-아/어'.",
      info: "아서/어서 = dahilan + resulta (피곤해서 잤어요). 아/어 = sunod-sunod na kilos (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (dahilan)", "집에 가___ 봤어요. (sunod-sunod)"],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "causative-passive-syrup": {
      name: "Sirop na awtomatikong nagbabago ng sanhi/tinanggap",
      description: "먹이다 kontra 먹히다, sa isang lagok.",
      diagnosis: "Nahihirapan kang ikilala ang sanhi (causative) at tinanggap (passive).",
      info: "Sanhi = ipagawa sa iba (밥을 먹이다). Tinanggap = tinamaan ng kilos (모기에 물리다). Hulapi: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (pinakain)",
        "모기가 사람에게 ___. (passive)"
      ],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    },
    "honorific-converter": {
      name: "Awtomatikong tagapagpalit sa magalang na wika",
      description: "Ginagawang magalang ang impormal na pananalita nang awtomatiko.",
      diagnosis: "Nahihirapan ka sa magalang na wika.",
      info: "Impormal + -요 = magalang (해요). Impormal + -습니다/ㅂ니다 = pormal (합니다).",
      quizQuestions: [
        "Ano ang pormal na anyo ng '먹다'?",
        "Ano ang magalang na anyo (해요) ng '가다'?"
      ],
      callbackLabel: "Higit pa → sa app ng gramatika ng Gwanggaeto (malapit na)"
    }
  }
};
