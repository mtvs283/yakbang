import type { LocaleData } from "./types";

export const zhTW: LocaleData = {
  ui: {
    catalogTitle: "藥鋪處方箋",
    catalogSubtitle: "挑一帖藥，拿走你的處方。填對空格，它就是你的了。",
    scrollCue: "展開處方目錄",
    groups: {
      pronunciation: { title: "發音矯正藥", blurb: "馴服舌尖與嘴唇" },
      "phonological-rule": { title: "音變規則藥", blurb: "掌握聲音變化的規則" },
      grammar: { title: "語法調劑藥", blurb: "平息助詞與詞尾的爭吵" },
      royal: { title: "王室祕方", blurb: "你搆不著的限量貢品" }
    },
    status: {
      available: "販售中",
      limited: "限量供應",
      unavailable: "買不到"
    },
    cardAction: "拿處方",
    footerLead: "走出藥鋪，更廣闊的廣開土在等你。",
    enterGwanggaeto: "進入廣開土",
    toTop: "回到頂部",
    modalLabel: "處方箋 · 藥房廣開土",
    diagnosis: "診斷",
    info: "藥品說明",
    prescription: "處方（填空）",
    royalReject: "這帖藥，離你還有點遠。",
    stamp: "已配藥",
    allDone: "你已經掌握了這張處方。這帖藥，歸你了。",
    correct: "✓ 答對了",
    wrong: "✗ 再想想",
    showHint: "看提示",
    hintPrefix: "提示：",
    answerPlaceholder: "請輸入答案",
    callbackPending: "（連結即將上線）",
    closeAria: "關閉處方",
    stockLabel: (count) => `剩餘 ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "世宗大王親筆韓文字帖",
      description: "這是國王親手寫的教材。連領議政都搶不到一本。",
      diagnosis: "這帖藥，離你還有點遠。",
      info: "已經絕版，不再煉製了。還是先到廣開土一般藥鋪，一步一步開始吧。",
      quizQuestions: [],
      callbackLabel: "換一個 → 到廣開土一般藥鋪"
    },
    hunminjeongeum: {
      name: "《訓民正音》解例本",
      description: "原本一冊，等上千年也不一定遇得到。",
      diagnosis: "這帖藥，離你還有點遠。",
      info: "還在等御前會議批准呢。等一千年也批不下來，還是去廣開土一般藥鋪吧。",
      quizQuestions: [],
      callbackLabel: "換一個 → 到廣開土一般藥鋪"
    },
    "korean-friend-patience": {
      name: "韓國朋友耐心增強劑",
      description: "能把你的發音聽到最後的那份朋友心意。",
      diagnosis: "這帖藥，離你還有點遠。",
      info: "連領議政都找不到。到廣開土藥鋪好好學，朋友的心也會慢慢變寬的。",
      quizQuestions: [],
      callbackLabel: "換一個 → 到廣開土一般藥鋪"
    },
    "hangul-creation-secret": {
      name: "韓文創製秘方",
      description: "世宗和學者們花了4年才煉成的秘密處方。",
      diagnosis: "這帖藥，離你還有點遠。",
      info: "限量一份，聽說早就被封印在某個地方了。到廣開土一般藥鋪，一帖一帖打開韓文的秘密吧。",
      quizQuestions: [],
      callbackLabel: "換一個 → 到廣開土一般藥鋪"
    },
    "prime-minister-capsule": {
      name: "領議政推薦限量膠囊",
      description: "沒有領議政親筆推薦信，可是買不到的喔。",
      diagnosis: "這帖藥，離你還有點遠。",
      info: "需要推薦信。不過你要是在廣開土一般藥鋪持續學，說不定領議政會自己注意到你呢。",
      quizQuestions: [],
      callbackLabel: "換一個 → 到廣開土一般藥鋪"
    },
    "h-pronunciation": {
      name: "ㅎ 發音藥",
      description: "讓 ㅎ 在嘴裡輕輕一飄，自然消失。",
      diagnosis: "你現在對 ㅎ 的發音有點吃力。",
      info: "ㅎ 是韓語裡很輕的子音。放在音節開頭時只是輕輕帶一點氣，當收音時幾乎聽不太出來。",
      quizQuestions: ["在 '하늘' 裡，ㅎ 在哪裡？", "'좋아요' → [______]"],
      callbackLabel: "想學得更細 → 到廣開土子音 App"
    },
    "korean-ear": {
      name: "韓國人耳朵",
      description: "一下子分清 ㅓ 和 ㅗ。",
      diagnosis: "你現在分不太清 ㅓ 和 ㅗ。",
      info: "ㅓ 的時候嘴巴稍微張開，口型比較平；ㅗ 的時候嘴唇要明顯收圓。",
      quizQuestions: [
        "'어머니' 的第一個母音是什麼？",
        "'오빠' 的第一個母音是什麼？",
        "'버스' 和 '보스' —— 哪個是 ㅓ？"
      ],
      callbackLabel: "想學得更細 → 到廣開土母音 App"
    },
    "three-tier-taste": {
      name: "平音·送氣音·緊音味覺藥",
      description: "用舌尖感受 ㅈ、ㅊ、ㅉ 的差別。",
      diagnosis: "你現在分不太清平音、送氣音和緊音。",
      info: "同一位置發出的三種音 — 平音(ㅂㄷㄱㅈ)自然發出, 激音(ㅍㅌㅋㅊ)猛烈迸發, 緊音(ㅃㄸㄲㅉ)快而強勁。",
      quizQuestions: ["'바보' 和 '파보' —— 哪個是送氣音？", "哪個詞裡有緊音 ㄸ？"],
      callbackLabel: "想學得更細 → 到廣開土子音 App"
    },
    "fortification-chip": {
      name: "緊音化自動晶片",
      description: "自動把 '학교' 讀成 '학꾜'。",
      diagnosis: "你現在對緊音化發音有點吃力。",
      info: "收音 ㄱㄷㅂ 後面如果接平音 ㄱㄷㅂㅈㅅ，後面的音常常會讀成緊音 ㄲㄸㅃㅉㅆ。",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "想學得更細 → 到廣開土音變 App"
    },
    "final-7-capsule": {
      name: "7個代表收音膠囊",
      description: "一顆裝下 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ。",
      diagnosis: "你現在對7個代表收音有點吃力。",
      info: "韓語收音寫法有27種，但實際發音通常歸到7個代表音：ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ。",
      quizQuestions: ["'꽃' 的收音怎麼發？", "'낯' 的收音怎麼發？", "'밖' 的收音怎麼發？"],
      callbackLabel: "想學得更細 → 到廣開土收音 App"
    },
    "rk-special-capsule": {
      name: "ㄺ 收音專用膠囊",
      description: "專治 닭、흙、굵다 這種難搞的雙收音。",
      diagnosis: "你現在對雙收音 ㄺ 的發音有點吃力。",
      info: "單獨讀或後面接子音時讀 [ㄱ]，例如 닭→[닥]；後面接母音時讀成 [ㄹㄱ]，例如 닭이→[달기]。",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "想學得更細 → 到廣開土雙收音 App"
    },
    "h-weakening-soothing": {
      name: "ㅎ 弱化舒緩劑",
      description: "自然把 '좋아요' 讀成 '조아요'。",
      diagnosis: "你現在對 ㅎ 弱化有點吃力。",
      info: "ㅎ 當收音時常常會消失，例如 좋아요 → 조아요。ㄴㄹㅁㅇ 收音後面接 ㅎ 時，ㅎ 也會變弱，例如 전화 → 저놔。",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "想學得更細 → 到廣開土 ㅎ 弱化 App"
    },
    "liaison-patch": {
      name: "連音規則自動貼片",
      description: "自動把 '한국이' 連讀成 '한구기'。",
      diagnosis: "你現在對連音規則有點吃力。",
      info: "前一個音節有收音，後一個音節以母音開頭時，那個收音會挪過去，像後一個音節的開頭音一樣發出來。",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "想學得更細 → 到廣開土音變 App"
    },
    "nasalization-inhaler": {
      name: "鼻音化吸入器",
      description: "像用鼻子吸進去一樣，把 '국물' 讀成 '궁물'。",
      diagnosis: "你現在對鼻音化發音有點吃力。",
      info: "收音 ㄱㄷㅂ 後面接 ㄴㅁ 時，收音會變成鼻音 ㅇㄴㅁ。",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "想學得更細 → 到廣開土音變 App"
    },
    "e-vs-eseo-syrup": {
      name: "'에' vs '에서' 區分糖漿",
      description: "一口分清是到達點，還是動作發生的地方。",
      diagnosis: "你現在對 '에' 和 '에서' 的區別有點吃力。",
      info: "에 = 到達點/所在位置，例如 학교에 가다。에서 = 做動作的地方，例如 학교에서 공부하다。",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "eun-i-chip": {
      name: "'은/는' vs '이/가' 自動判斷晶片",
      description: "讓話題和主語這場老吵架終於停下來。",
      diagnosis: "你現在對 '은/는' 和 '이/가' 的區別有點吃力。",
      info: "은/는 = 話題，常用在已知資訊或對比。이/가 = 主語，常用在新資訊或強調。",
      quizQuestions: ["저___ 학생이에요.（自我介紹）", "누___ 왔어요?", "날씨___ 좋아요."],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "do-man-separator": {
      name: "'도/만' 分離液",
      description: "一口分清『也』的 도 和『只』的 만。",
      diagnosis: "你現在對 '도' 和 '만' 的區別有點吃力。",
      info: "도 = 也包括，例如 저도 가요。만 = 只限定這個，例如 저만 가요。",
      quizQuestions: ["저___ 좋아해요.（我也一起）", "저___ 좋아해요.（只有我）"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "buteo-kkaji-syrup": {
      name: "'부터-까지' 範圍糖漿",
      description: "開始和結束，兩頭都穩穩釘住。",
      diagnosis: "你現在對 '부터' 和 '까지' 的範圍表達有點吃力。",
      info: "부터 = 起點，까지 = 終點。它們經常成對出現。",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "nikka-ni-separator": {
      name: "'-(으)니까' vs '-(으)니' 分離液",
      description: "一眼分清是理由，還是去了之後才發現。",
      diagnosis: "你現在對 '-(으)니까' 和 '-(으)니' 的區別有點吃力。",
      info: "(으)니까 = 理由/原因，例如因為下雨所以帶傘。(으)니 = 去了/做了以後才發現。",
      quizQuestions: ["비가 오___ 우산 가져가요.（理由）", "가___ 사람이 많았어요.（去了之後發現）"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "lge-l-geoyeyo-separator": {
      name: "'-(으)ㄹ게요' vs '-(으)ㄹ 거예요' 分離液",
      description: "把承諾和未來這條細線分清楚。",
      diagnosis: "你現在對 '-(으)ㄹ게요' 和 '-(으)ㄹ 거예요' 的區別有點吃力。",
      info: "(으)ㄹ게요 = 說話人的意志/承諾，例如 제가 할게요。(으)ㄹ 거예요 = 單純未來或推測，例如 비가 올 거예요。",
      quizQuestions: ["제가 도와___.（承諾）", "내일 비가 ___.（預測）"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "aseo-a-aligner": {
      name: "'-아서/어서' vs '-아/어' 整理藥",
      description: "把原因表達的兩條路整理清楚。",
      diagnosis: "你現在對 '-아서/어서' 和 '-아/어' 的用法有點吃力。",
      info: "아서/어서 = 原因 + 結果，例如 피곤해서 잤어요。아/어 = 動作順序，例如 가서 봤어요。",
      quizQuestions: ["피곤___ 잤어요.（理由）", "집에 가___ 봤어요.（順序）"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "causative-passive-syrup": {
      name: "使動/被動自動轉換糖漿",
      description: "먹이다 和 먹히다，一口就分清。",
      diagnosis: "你現在對使動和被動的區別有點吃力。",
      info: "使動 = 讓別人做，例如 밥을 먹이다。被動 = 被別人影響/遭受，例如 모기에 물리다。常見詞尾有 이/히/리/기。",
      quizQuestions: ["엄마가 아기에게 밥을 ___.（讓孩子吃）", "모기가 사람에게 ___.（被動）"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    },
    "honorific-converter": {
      name: "敬語自動轉換器",
      description: "把非敬語自動變成禮貌正式的說法。",
      diagnosis: "你現在對敬語用法有點吃力。",
      info: "非敬語詞幹 + -요 = 日常禮貌體，例如 해요。非敬語詞幹 + -습니다/ㅂ니다 = 正式體，例如 합니다。",
      quizQuestions: ["'먹다' 的正式體是？", "'가다' 的日常禮貌體是？"],
      callbackLabel: "想學得更細 → 到廣開土語法 App（即將上線）"
    }
  }
};
