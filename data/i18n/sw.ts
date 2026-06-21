import type { LocaleData } from "./types";

export const sw: LocaleData = {
  ui: {
    catalogTitle: "Orodha ya maagizo ya duka la dawa",
    catalogSubtitle:
      "Chagua dawa inayolingana na ugumu wako wa Kikorea na upate agizo lako. Jaza nafasi tupu, nayo ni yako.",
    scrollCue: "Tazama orodha ya maagizo",
    groups: {
      pronunciation: {
        title: "Dawa za matamshi",
        blurb: "Dhibiti ulimi na midomo"
      },
      "phonological-rule": {
        title: "Dawa za kanuni za mabadiliko ya sauti",
        blurb: "Mudu kanuni pale sauti zinapobadilika"
      },
      grammar: {
        title: "Dawa za sarufi",
        blurb: "Tuliza ugomvi wa viambishi na miisho"
      },
      royal: {
        title: "Dawa za siri za ikulu",
        blurb: "Zawadi adimu zisizofikika"
      }
    },
    status: {
      available: "Inapatikana",
      limited: "Idadi finyu",
      unavailable: "Haifikiki"
    },
    cardAction: "Pata agizo",
    footerLead: "Ukitoka dukani, Gwanggaeto pana zaidi inakungoja.",
    enterGwanggaeto: "Ingia Gwanggaeto",
    toTop: "Juu",
    home: "Mwanzo",
    modalLabel: "AGIZO · 藥房廣開土",
    diagnosis: "Uchunguzi",
    info: "Kuhusu dawa hii",
    prescription: "Agizo (jaza nafasi tupu)",
    royalReject: "Dawa hii haifikiki kwako.",
    stamp: "IMETOLEWA",
    allDone: "Umelimudu agizo. Dawa hii sasa ni yako.",
    correct: "✓ Sahihi",
    wrong: "✗ Jaribu tena",
    showHint: "Onyesha dokezo",
    hintPrefix: "Dokezo: ",
    answerPlaceholder: "Andika jibu lako",
    callbackPending: "(kiungo kinakuja hivi karibuni)",
    closeAria: "Funga agizo",
    stockLabel: (count) => `Zimebaki ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Kitabu cha Hangeul kilichoandikwa kwa mkono na Mfalme Sejong",
      description: "Kiliandikwa na mfalme mwenyewe. Hata waziri mkuu hakupata nakala.",
      diagnosis: "Dawa hii haifikiki kwako.",
      info: "Imeisha kuchapishwa, haitatengenezwa tena. Anza hatua kwa hatua katika duka la kawaida la Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Badala yake → kwenye duka la kawaida la Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (asili)",
      description: "Nakala moja ya asili, kusubiri kwa miaka elfu.",
      diagnosis: "Dawa hii haifikiki kwako.",
      info: "Inangoja idhini ya baraza la kifalme. Hata miaka elfu haitatosha, basi nenda duka la kawaida la Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Badala yake → kwenye duka la kawaida la Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Kiongezi cha subira cha rafiki Mkorea",
      description: "Moyo wa rafiki anayesikiliza matamshi yako hadi mwisho.",
      diagnosis: "Dawa hii haifikiki kwako.",
      info: "Hata waziri mkuu hapati. Jifunze katika duka la Gwanggaeto, na subira ya rafiki yako itazidi kuwa pana.",
      quizQuestions: [],
      callbackLabel: "Badala yake → kwenye duka la kawaida la Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "Mapishi ya siri ya kuumbwa kwa Hangeul",
      description: "Dawa ya siri aliyoitengeneza Mfalme Sejong na wasomi kwa miaka minne.",
      diagnosis: "Dawa hii haifikiki kwako.",
      info: "Nakala moja tu, tayari imefungwa mahali fulani. Jifunze siri za Hangeul dozi kwa dozi katika duka la kawaida la Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Badala yake → kwenye duka la kawaida la Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Kapsuli finyu iliyopendekezwa na waziri mkuu",
      description: "Haiwezi kununuliwa bila barua ya pendekezo iliyoandikwa kwa mkono na waziri mkuu.",
      diagnosis: "Dawa hii haifikiki kwako.",
      info: "Pendekezo linahitajika. Jifunze kwa bidii katika duka la Gwanggaeto, labda waziri mkuu atakupendekeza mwenyewe.",
      quizQuestions: [],
      callbackLabel: "Badala yake → kwenye duka la kawaida la Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Dawa ya matamshi ya ㅎ",
      description: "Hufanya ㅎ kuyeyuka taratibu mdomoni.",
      diagnosis: "Unapata ugumu kutamka ㅎ.",
      info: "ㅎ ni konsonanti dhaifu zaidi katika Kikorea — pumzi nyepesi mwanzoni mwa silabi, karibu haisikiki kama batchim (konsonanti ya mwisho).",
      quizQuestions: ["ㅎ iko wapi katika '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya konsonanti ya Gwanggaeto"
    },
    "korean-ear": {
      name: "Masikio ya Kikorea",
      description: "Tofautisha ㅓ na ㅗ papo hapo.",
      diagnosis: "Unapata ugumu kutofautisha ㅓ na ㅗ.",
      info: "ㅓ: mdomo wazi kidogo na bapa. ㅗ: midomo iliyoviringwa.",
      quizQuestions: [
        "Irabu ya kwanza katika '어머니' ni ipi?",
        "Irabu ya kwanza katika '오빠' ni ipi?",
        "'버스' au '보스' — lipi lina ㅓ?"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya irabu ya Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Onjo: rahisi · pumzi · kazi",
      description: "Hisi ㅈ ㅊ ㅉ kwa ncha ya ulimi.",
      diagnosis: "Unapata ugumu kutofautisha konsonanti rahisi, za pumzi na kazi.",
      info: "Nguvu tatu mahali pamoja: rahisi (ㅂㄷㄱㅈ) kawaida, za pumzi (ㅍㅌㅋㅊ) kwa pumzi kali, kazi (ㅃㄸㄲㅉ) fupi na kazi.",
      quizQuestions: [
        "'바보' au '파보' — lipi ni la pumzi?",
        "Neno lipi lina kazi ㄸ?"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya konsonanti ya Gwanggaeto"
    },
    "fortification-chip": {
      name: "Chipu ya ukazaji otomatiki",
      description: "Hutamka '학교' kama '학꾜' otomatiki.",
      diagnosis: "Unapata ugumu wa ukazaji.",
      info: "Konsonanti rahisi (ㄱㄷㅂㅈㅅ) baada ya batchim ㄱㄷㅂ huwa kazi (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya mabadiliko ya sauti ya Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Kapsuli ya sauti 7 za mwisho",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ katika kidonge kimoja.",
      diagnosis: "Unapata ugumu wa sauti 7 wakilishi za mwisho.",
      info: "Kikorea kina batchim 27, lakini hutamkwa kwa sauti 7 tu: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Batchim ya '꽃' hutamkwaje?",
        "Batchim ya '낯' hutamkwaje?",
        "Batchim ya '밖' hutamkwaje?"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya batchim ya Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Kapsuli maalum ya batchim ㄺ",
      description: "닭, 흙, 굵다 — maalum kwa kundi gumu ㄺ.",
      diagnosis: "Unapata ugumu wa kundi la konsonanti ㄺ.",
      info: "Peke yake au mbele ya konsonanti ni [ㄱ] (닭→[닥]); mbele ya irabu ni [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya batchim mchanganyiko ya Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Kituliza cha kudhoofika kwa ㅎ",
      description: "Hutamka '좋아요' kama '조아요' kwa kawaida.",
      diagnosis: "Unapata ugumu wa kudhoofika kwa ㅎ.",
      info: "ㅎ ya mwisho hutoweka (좋아요 → 조아요). Baada ya batchim ㄴㄹㅁㅇ, ㅎ hudhoofika (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya kudhoofika kwa ㅎ ya Gwanggaeto"
    },
    "liaison-patch": {
      name: "Kiraka cha kuunganisha sauti otomatiki",
      description: "Huunganisha '한국이' kuwa '한구기' otomatiki.",
      diagnosis: "Unapata ugumu wa kuunganisha sauti (liaison).",
      info: "Batchim ikifuatwa na silabi inayoanza kwa irabu, batchim huhamia kuwa sauti ya kwanza ya silabi inayofuata.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya mabadiliko ya sauti ya Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Kivutio cha unazali",
      description: "Vuta '국물' kupitia pua kuwa '궁물'.",
      diagnosis: "Unapata ugumu wa unazali.",
      info: "Batchim ㄱㄷㅂ ikifuatwa na ㄴㅁ, batchim huwa sauti ya nazali (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Maelezo zaidi → katika programu ya mabadiliko ya sauti ya Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Sharubati ya kutofautisha '에' na '에서'",
      description: "Lengo au mahali pa kitendo — kwa funda moja.",
      diagnosis: "Unapata ugumu kutofautisha '에' na '에서'.",
      info: "에 = lengo/mahali (학교에 가다). 에서 = mahali pa kitendo (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "eun-i-chip": {
      name: "Chipu ya kutambua '은/는' na '이/가' otomatiki",
      description: "Inamaliza ugomvi wa milele kati ya mada na kiima.",
      diagnosis: "Unapata ugumu kutofautisha '은/는' na '이/가'.",
      info: "은/는 = mada (taarifa inayojulikana, ulinganishi). 이/가 = kiima (taarifa mpya, mkazo).",
      quizQuestions: [
        "저___ 학생이에요. (kujitambulisha)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "do-man-separator": {
      name: "Kitenganishi cha '도/만'",
      description: "Hutenganisha 도 (pia) na 만 (tu) kwa funda moja.",
      diagnosis: "Unapata ugumu kutofautisha '도' na '만'.",
      info: "도 = pia/ikijumuisha (저도 가요). 만 = tu (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (mimi pia)", "저___ 좋아해요. (mimi tu)"],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "buteo-kkaji-syrup": {
      name: "Sharubati ya mpaka '부터-까지'",
      description: "Nanga mbili: mwanzo na mwisho.",
      diagnosis: "Unapata ugumu wa viashiria vya mpaka '부터' na '까지'.",
      info: "부터 = mahali pa kuanzia, 까지 = mahali pa kuishia. Mara nyingi hutumika pamoja.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "nikka-ni-separator": {
      name: "Kitenganishi cha '-(으)니까' na '-(으)니'",
      description: "Hutofautisha kama ni sababu au ugunduzi wakati wa kutenda.",
      diagnosis: "Unapata ugumu kutofautisha '-(으)니까' na '-(으)니'.",
      info: "(으)니까 = sababu/chanzo. (으)니 = ugunduzi wakati wa kutenda.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (sababu)",
        "가___ 사람이 많았어요. (nilipoenda nikagundua)"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Kitenganishi cha '-(으)ㄹ게요' na '-(으)ㄹ 거예요'",
      description: "Mstari mwembamba kati ya ahadi na wakati ujao.",
      diagnosis: "Unapata ugumu kutofautisha '-(으)ㄹ게요' na '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = nia/ahadi ya msemaji (제가 할게요). (으)ㄹ 거예요 = wakati ujao wa kawaida/kisio (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (ahadi)", "내일 비가 ___. (utabiri)"],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "aseo-a-aligner": {
      name: "Kipangaji cha '-아서/어서' na '-아/어'",
      description: "Hupanga njia mbili za kueleza sababu.",
      diagnosis: "Unapata ugumu kutumia '-아서/어서' na '-아/어'.",
      info: "아서/어서 = sababu + matokeo (피곤해서 잤어요). 아/어 = vitendo vinavyofuatana (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (sababu)", "집에 가___ 봤어요. (kufuatana)"],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "causative-passive-syrup": {
      name: "Sharubati ya kubadilisha sababishi/tendwa otomatiki",
      description: "먹이다 dhidi ya 먹히다, kwa funda moja.",
      diagnosis: "Unapata ugumu kutofautisha sababishi na tendwa.",
      info: "Sababishi = kumfanya mwingine atende (밥을 먹이다). Tendwa = kutendwa (모기에 물리다). Miisho: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (kulisha)",
        "모기가 사람에게 ___. (tendwa)"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    },
    "honorific-converter": {
      name: "Kibadilishi otomatiki cha lugha ya heshima",
      description: "Hubadilisha lugha ya kawaida kuwa ya heshima otomatiki.",
      diagnosis: "Unapata ugumu wa lugha ya heshima.",
      info: "Kawaida + -요 = heshima (해요). Kawaida + -습니다/ㅂ니다 = rasmi (합니다).",
      quizQuestions: [
        "Umbo rasmi la '먹다' ni lipi?",
        "Umbo la heshima (해요) la '가다' ni lipi?"
      ],
      callbackLabel: "Maelezo zaidi → katika programu ya sarufi ya Gwanggaeto (hivi karibuni)"
    }
  }
};
