import type { LocaleData } from "./types";

export const en: LocaleData = {
  ui: {
    catalogTitle: "Apothecary Prescriptions",
    catalogSubtitle:
      "Pick a remedy and receive your prescription. Fill in the blanks and it's yours.",
    scrollCue: "Open the prescription list",
    groups: {
      pronunciation: {
        title: "Pronunciation Remedies",
        blurb: "Tame your tongue and lips"
      },
      "phonological-rule": {
        title: "Sound-Change Remedies",
        blurb: "Master the rules where sounds shift"
      },
      grammar: {
        title: "Grammar Remedies",
        blurb: "Settle the quarrels of particles and endings"
      },
      royal: {
        title: "Royal Secret Remedies",
        blurb: "Limited tributes beyond your reach"
      }
    },
    status: {
      available: "In stock",
      limited: "Limited",
      unavailable: "Out of reach"
    },
    cardAction: "Get prescription",
    footerLead: "Step out of the apothecary, and a wider Gwanggaeto awaits.",
    enterGwanggaeto: "Enter Gwanggaeto",
    toTop: "Top",
    home: "Home",
    modalLabel: "PRESCRIPTION · 藥房廣開土",
    diagnosis: "Diagnosis",
    info: "About this remedy",
    prescription: "Prescription (fill in the blanks)",
    royalReject: "This remedy lies beyond your reach.",
    stamp: "FILLED",
    allDone: "You've mastered the prescription. This remedy is yours.",
    correct: "✓ Correct",
    wrong: "✗ Try again",
    showHint: "Show hint",
    hintPrefix: "Hint: ",
    answerPlaceholder: "Type your answer",
    callbackPending: "(link coming soon)",
    closeAria: "Close prescription",
    stockLabel: (count) => `${count} left`
  },
  remedies: {
    "sejong-manuscript": {
      name: "King Sejong's Handwritten Hangeul Primer",
      description:
        "Written by the king's own hand. Even the Prime Minister couldn't get a copy.",
      diagnosis: "This remedy lies beyond your reach.",
      info: "Out of print, never to be made again. Start step by step at the Gwanggaeto apothecary.",
      quizQuestions: [],
      callbackLabel: "Instead → to the Gwanggaeto apothecary"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (Original)",
      description: "One original copy, a thousand years in the waiting.",
      diagnosis: "This remedy lies beyond your reach.",
      info: "Awaiting royal council approval. A thousand years won't get it signed — so head to the Gwanggaeto apothecary.",
      quizQuestions: [],
      callbackLabel: "Instead → to the Gwanggaeto apothecary"
    },
    "korean-friend-patience": {
      name: "A Korean Friend's Patience Booster",
      description:
        "The heart of a friend who'll hear out your pronunciation to the end.",
      diagnosis: "This remedy lies beyond your reach.",
      info: "Even the Prime Minister can't obtain it. Study at the Gwanggaeto apothecary and a friend's patience grows ever more generous.",
      quizQuestions: [],
      callbackLabel: "Instead → to the Gwanggaeto apothecary"
    },
    "hangul-creation-secret": {
      name: "The Secret Recipe of Hangeul's Creation",
      description: "The hidden remedy King Sejong brewed with scholars over four years.",
      diagnosis: "This remedy lies beyond your reach.",
      info: "One copy only, already sealed away somewhere. Learn Hangeul's secrets one dose at a time at the Gwanggaeto apothecary.",
      quizQuestions: [],
      callbackLabel: "Instead → to the Gwanggaeto apothecary"
    },
    "prime-minister-capsule": {
      name: "Prime Minister's Recommended Limited Capsule",
      description:
        "Cannot be bought without the Prime Minister's written recommendation.",
      diagnosis: "This remedy lies beyond your reach.",
      info: "Recommendation required. Study diligently at the Gwanggaeto apothecary and perhaps the Prime Minister will recommend you himself.",
      quizQuestions: [],
      callbackLabel: "Instead → to the Gwanggaeto apothecary"
    },
    "h-pronunciation": {
      name: "ㅎ Pronunciation Remedy",
      description: "Makes ㅎ melt softly away inside your mouth.",
      diagnosis: "You struggle with pronouncing ㅎ.",
      info: "ㅎ is the weakest consonant in Korean — a faint puff at the start of a syllable, almost silent as a final consonant.",
      quizQuestions: ["Where is the ㅎ in '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto consonant app"
    },
    "korean-ear": {
      name: "Korean Ears",
      description: "Tell ㅓ and ㅗ apart at once.",
      diagnosis: "You struggle to distinguish ㅓ and ㅗ.",
      info: "ㅓ: mouth slightly open and flat. ㅗ: lips rounded.",
      quizQuestions: [
        "What is the first vowel in '어머니'?",
        "What is the first vowel in '오빠'?",
        "'버스' or '보스' — which has ㅓ?"
      ],
      callbackLabel: "More detail → in the Gwanggaeto vowel app"
    },
    "three-tier-taste": {
      name: "Plain · Aspirated · Tense Palate",
      description: "Feel ㅈ ㅊ ㅉ on the tip of your tongue.",
      diagnosis: "You struggle to distinguish plain / aspirated / tense consonants.",
      info: "Three sounds from the same place — Plain (ㅂㄷㄱㅈ): naturally, Aspirated (ㅍㅌㅋㅊ): sharp and bursting, Tense (ㅃㄸㄲㅉ): fast and strong.",
      quizQuestions: [
        "'바보' or '파보' — which is aspirated?",
        "Which word contains the tense ㄸ?"
      ],
      callbackLabel: "More detail → in the Gwanggaeto consonant app"
    },
    "fortification-chip": {
      name: "Auto-Tensing Chip",
      description: "Pronounce '학교' as '학꾜' automatically.",
      diagnosis: "You struggle with tensification.",
      info: "A plain consonant (ㄱㄷㅂㅈㅅ) after a ㄱㄷㅂ final becomes tense (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto sound-change app"
    },
    "final-7-capsule": {
      name: "7 Final-Sound Capsule",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ in a single pill.",
      diagnosis: "You struggle with the 7 representative final sounds.",
      info: "Korean has 27 final consonants but only 7 pronunciations — ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "How is the final consonant of '꽃' pronounced?",
        "How is the final consonant of '낯' pronounced?",
        "How is the final consonant of '밖' pronounced?"
      ],
      callbackLabel: "More detail → in the Gwanggaeto batchim app"
    },
    "rk-special-capsule": {
      name: "ㄺ Final-Cluster Specialist Capsule",
      description: "닭, 흙, 굵다 — specialized for the tricky ㄺ cluster.",
      diagnosis: "You struggle with the ㄺ consonant cluster.",
      info: "Alone or before a consonant it's [ㄱ] (닭→[닥]); before a vowel it's [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto complex-final app"
    },
    "h-weakening-soothing": {
      name: "ㅎ Weakening Sedative",
      description: "Turn '좋아요' into '조아요' naturally.",
      diagnosis: "You struggle with ㅎ weakening.",
      info: "A final ㅎ disappears (좋아요 → 조아요). After a ㄴㄹㅁㅇ final, ㅎ weakens (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto ㅎ-weakening app"
    },
    "liaison-patch": {
      name: "Liaison Auto-Activation Patch",
      description: "Turn '한국이' into '한구기' with automatic liaison.",
      diagnosis: "You struggle with liaison.",
      info: "When a final consonant is followed by a vowel-initial syllable, it moves to the onset of the next syllable in pronunciation.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto sound-change app"
    },
    "nasalization-inhaler": {
      name: "Nasalization Inhaler",
      description: "Breathe '국물' into '궁물' through your nose.",
      diagnosis: "You struggle with nasalization.",
      info: "A ㄱㄷㅂ final + ㄴㅁ = the final consonant becomes a nasal (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "More detail → in the Gwanggaeto sound-change app"
    },
    "e-vs-eseo-syrup": {
      name: "'에' vs '에서' Distinguishing Syrup",
      description: "Destination or place of action — in one sip.",
      diagnosis: "You struggle to distinguish '에' and '에서'.",
      info: "에 = destination / location (학교에 가다). 에서 = place of action (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "eun-i-chip": {
      name: "'은/는' vs '이/가' Auto-Detection Chip",
      description: "End the eternal feud between topic and subject.",
      diagnosis: "You struggle to distinguish '은/는' and '이/가'.",
      info: "은/는 = topic (known info, contrast). 이/가 = subject (new info, emphasis).",
      quizQuestions: [
        "저___ 학생이에요. (introducing yourself)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "do-man-separator": {
      name: "'도/만' Separator",
      description: "Additive 도 and limiting 만, separated in one sip.",
      diagnosis: "You struggle to distinguish '도' and '만'.",
      info: "도 = also / including (저도 가요). 만 = only (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (me too)", "저___ 좋아해요. (only me)"],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "buteo-kkaji-syrup": {
      name: "'부터-까지' Range Syrup",
      description: "The two anchors of start and end.",
      diagnosis: "You struggle with the range markers '부터' and '까지'.",
      info: "부터 = starting point, 까지 = end point. Usually used as a pair.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "nikka-ni-separator": {
      name: "'-(으)니까' vs '-(으)니' Separator",
      description: "Reason or discovery — made clear.",
      diagnosis: "You struggle to distinguish '-(으)니까' and '-(으)니'.",
      info: "(으)니까 = reason / cause (비 와서 우산 가져가요). (으)니 = discovery upon doing.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (reason)",
        "가___ 사람이 많았어요. (saw upon arriving)"
      ],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "lge-l-geoyeyo-separator": {
      name: "'-(으)ㄹ게요' vs '-(으)ㄹ 거예요' Separator",
      description: "The subtle line between promise and future.",
      diagnosis: "You struggle to distinguish '-(으)ㄹ게요' and '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = speaker's will / promise (제가 할게요). (으)ㄹ 거예요 = plain future / guess (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (promise)", "내일 비가 ___. (prediction)"],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "aseo-a-aligner": {
      name: "'-아서/어서' vs '-아/어' Aligner",
      description: "Two branches of expressing reason, aligned.",
      diagnosis: "You struggle with '-아서/어서' and '-아/어'.",
      info: "아서/어서 = reason + result (피곤해서 잤어요). 아/어 = sequential actions (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (reason)", "집에 가___ 봤어요. (sequential)"],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "causative-passive-syrup": {
      name: "Causative / Passive Auto-Conversion Syrup",
      description: "먹이다 vs 먹히다, in one sip.",
      diagnosis: "You struggle to distinguish causative and passive.",
      info: "Causative = make someone do (밥을 먹이다). Passive = have it done to you (모기에 물리다). Endings: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (makes them eat)",
        "모기가 사람에게 ___. (passive)"
      ],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    },
    "honorific-converter": {
      name: "Honorific Auto-Converter",
      description: "Casual speech automatically into formal.",
      diagnosis: "You struggle with honorific speech.",
      info: "Casual + -요 = polite (해요). Casual + -습니다/ㅂ니다 = formal (합니다).",
      quizQuestions: [
        "What is the formal form of '먹다'?",
        "What is the polite (해요) form of '가다'?"
      ],
      callbackLabel: "More detail → in the Gwanggaeto grammar app (coming soon)"
    }
  }
};
