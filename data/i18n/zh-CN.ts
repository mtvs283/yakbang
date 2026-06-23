import type { LocaleData } from "./types";

export const zhCN: LocaleData = {
  ui: {
    catalogTitle: "药铺处方笺",
    catalogSubtitle: "挑一味药，拿走你的处方。填对空格，它就是你的了。",
    scrollCue: "展开处方目录",
    groups: {
      pronunciation: { title: "发音矫正药", blurb: "驯服舌尖与嘴唇" },
      "phonological-rule": { title: "音变规则药", blurb: "掌握声音变化的规则" },
      grammar: { title: "语法调剂药", blurb: "平息助词与词尾的争吵" },
      royal: { title: "王室秘方", blurb: "你够不着的限量贡品" }
    },
    status: {
      available: "在售",
      limited: "限量供应",
      unavailable: "买不到"
    },
    cardAction: "拿处方",
    footerLead: "走出药铺，更广阔的广开土在等你。",
    enterGwanggaeto: "进入广开土",
    toTop: "回到顶部",
    home: "首页",
    modalLabel: "处方笺 · 藥房廣開土",
    diagnosis: "诊断",
    info: "药品说明",
    prescription: "处方（填空）",
    royalReject: "这味药，离你还有点远。",
    stamp: "已配药",
    allDone: "你已经掌握了这张处方。这味药，归你了。",
    correct: "✓ 答对了",
    wrong: "✗ 再想想",
    showHint: "看提示",
    hintPrefix: "提示：",
    answerPlaceholder: "请输入答案",
    callbackPending: "（链接即将上线）",
    closeAria: "关闭处方",
    stockLabel: (count) => `剩余 ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "世宗大王亲笔韩文字帖",
      description: "这是国王亲手写的教材。连领议政都抢不到一本。",
      diagnosis: "这味药，离你还有点远。",
      info: "已经绝版，不再炼制了。还是先去广开土普通药铺，一步一步开始吧。",
      quizQuestions: [],
      callbackLabel: "换一个 → 去广开土普通药铺"
    },
    hunminjeongeum: {
      name: "《训民正音》解例本",
      description: "原本一册，等上千年也未必能遇到。",
      diagnosis: "这味药，离你还有点远。",
      info: "还在等御前会议批准呢。等一千年也批不下来，还是去广开土普通药铺吧。",
      quizQuestions: [],
      callbackLabel: "换一个 → 去广开土普通药铺"
    },
    "korean-friend-patience": {
      name: "韩国朋友耐心增强剂",
      description: "能一直听你发音到最后的那份朋友的心意。",
      diagnosis: "这味药，离你还有点远。",
      info: "连领议政都找不到。去广开土药铺好好学，朋友的心也会慢慢变宽的。",
      quizQuestions: [],
      callbackLabel: "换一个 → 去广开土普通药铺"
    },
    "hangul-creation-secret": {
      name: "韩文创制秘方",
      description: "世宗和学者们花了4年才炼成的秘密处方。",
      diagnosis: "这味药，离你还有点远。",
      info: "限量一份，听说早就被封印在某处了。去广开土普通药铺，一帖一帖揭开韩文的秘密吧。",
      quizQuestions: [],
      callbackLabel: "换一个 → 去广开土普通药铺"
    },
    "prime-minister-capsule": {
      name: "领议政推荐限量胶囊",
      description: "没有领议政亲笔推荐信，可买不到哦。",
      diagnosis: "这味药，离你还有点远。",
      info: "需要推荐信。不过你要是在广开土普通药铺坚持学，说不定领议政会自己注意到你呢。",
      quizQuestions: [],
      callbackLabel: "换一个 → 去广开土普通药铺"
    },
    "h-pronunciation": {
      name: "ㅎ 发音药",
      description: "让 ㅎ 在嘴里轻轻一飘，自然消失。",
      diagnosis: "你现在对 ㅎ 的发音有点吃力。",
      info: "ㅎ 是韩语里很轻的辅音。放在音节开头时只是轻轻带一点气，做收音时几乎听不太出来。",
      quizQuestions: ["在 '하늘' 里，ㅎ 在哪里？", "'좋아요' → [______]"],
      callbackLabel: "想学得更细 → 去广开土辅音 App"
    },
    "korean-ear": {
      name: "韩国人耳朵",
      description: "一下子分清 ㅓ 和 ㅗ。",
      diagnosis: "你现在分不太清 ㅓ 和 ㅗ。",
      info: "ㅓ 的时候嘴巴稍微张开，口型比较平；ㅗ 的时候嘴唇要明显收圆。",
      quizQuestions: [
        "'어머니' 的第一个元音是什么？",
        "'오빠' 的第一个元音是什么？",
        "'버스' 和 '보스' —— 哪个是 ㅓ？"
      ],
      callbackLabel: "想学得更细 → 去广开土元音 App"
    },
    "three-tier-taste": {
      name: "平音·送气音·紧音味觉药",
      description: "用舌尖感受 ㅈ、ㅊ、ㅉ 的差别。",
      diagnosis: "你现在分不太清平音、送气音和紧音。",
      info: "同一位置发出的三种音 — 平音(ㅂㄷㄱㅈ)自然发出, 激音(ㅍㅌㅋㅊ)猛烈迸发, 紧音(ㅃㄸㄲㅉ)快而强劲。",
      quizQuestions: ["'바보' 和 '파보' —— 哪个是送气音？", "哪个词里有紧音 ㄸ？"],
      callbackLabel: "想学得更细 → 去广开土辅音 App"
    },
    "fortification-chip": {
      name: "紧音化自动芯片",
      description: "自动把 '학교' 读成 '학꾜'。",
      diagnosis: "你现在对紧音化发音有点吃力。",
      info: "收音 ㄱㄷㅂ 后面如果接平音 ㄱㄷㅂㅈㅅ，后面的音常常会读成紧音 ㄲㄸㅃㅉㅆ。",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "想学得更细 → 去广开土音变 App"
    },
    "final-7-capsule": {
      name: "7个代表收音胶囊",
      description: "一粒装下 ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ。",
      diagnosis: "你现在对7个代表收音有点吃力。",
      info: "韩语收音写法有27种，但实际发音通常归到7个代表音：ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ。",
      quizQuestions: ["'꽃' 的收音怎么发？", "'낯' 的收音怎么发？", "'밖' 的收音怎么发？"],
      callbackLabel: "想学得更细 → 去广开土收音 App"
    },
    "rk-special-capsule": {
      name: "ㄺ 收音专用胶囊",
      description: "专治 닭、흙、굵다 这种难搞的双收音。",
      diagnosis: "你现在对双收音 ㄺ 的发音有点吃力。",
      info: "单独读或后面接辅音时读 [ㄱ]，比如 닭→[닥]；后面接元音时读成 [ㄹㄱ]，比如 닭이→[달기]。",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "想学得更细 → 去广开土双收音 App"
    },
    "h-weakening-soothing": {
      name: "ㅎ 弱化舒缓剂",
      description: "自然把 '좋아요' 读成 '조아요'。",
      diagnosis: "你现在对 ㅎ 弱化有点吃力。",
      info: "ㅎ 做收音时常常会消失，比如 좋아요 → 조아요。ㄴㄹㅁㅇ 收音后面接 ㅎ 时，ㅎ 也会变弱，比如 전화 → 저놔。",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "想学得更细 → 去广开土 ㅎ 弱化 App"
    },
    "liaison-patch": {
      name: "连音规则自动贴片",
      description: "自动把 '한국이' 连读成 '한구기'。",
      diagnosis: "你现在对连音规则有点吃力。",
      info: "前一个音节有收音，后一个音节以元音开头时，那个收音会挪过去，像后一个音节的开头音一样发出来。",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "想学得更细 → 去广开土音变 App"
    },
    "nasalization-inhaler": {
      name: "鼻音化吸入器",
      description: "像用鼻子吸进去一样，把 '국물' 读成 '궁물'。",
      diagnosis: "你现在对鼻音化发音有点吃力。",
      info: "收音 ㄱㄷㅂ 后面接 ㄴㅁ 时，收音会变成鼻音 ㅇㄴㅁ。",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "想学得更细 → 去广开土音变 App"
    },
    "e-vs-eseo-syrup": {
      name: "'에' vs '에서' 区分糖浆",
      description: "一口分清是到达点，还是动作发生的地方。",
      diagnosis: "你现在对 '에' 和 '에서' 的区别有点吃力。",
      info: "에 = 到达点/所在位置，比如 학교에 가다。에서 = 做动作的地方，比如 학교에서 공부하다。",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "eun-i-chip": {
      name: "'은/는' vs '이/가' 自动判断芯片",
      description: "让话题和主语这场老吵架终于停下来。",
      diagnosis: "你现在对 '은/는' 和 '이/가' 的区别有点吃力。",
      info: "은/는 = 话题，常用于已知信息或对比。이/가 = 主语，常用于新信息或强调。",
      quizQuestions: ["저___ 학생이에요.（自我介绍）", "누___ 왔어요?", "날씨___ 좋아요."],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "do-man-separator": {
      name: "'도/만' 分离液",
      description: "一口分清“也”的 도 和“只”的 만。",
      diagnosis: "你现在对 '도' 和 '만' 的区别有点吃力。",
      info: "도 = 也包括，比如 저도 가요。만 = 只限定这个，比如 저만 가요。",
      quizQuestions: ["저___ 좋아해요.（我也一起）", "저___ 좋아해요.（只有我）"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "buteo-kkaji-syrup": {
      name: "'부터-까지' 范围糖浆",
      description: "开始和结束，两头都稳稳钉住。",
      diagnosis: "你现在对 '부터' 和 '까지' 的范围表达有点吃力。",
      info: "부터 = 起点，까지 = 终点。它们经常成对出现。",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "nikka-ni-separator": {
      name: "'-(으)니까' vs '-(으)니' 分离液",
      description: "一眼分清是理由，还是去了之后才发现。",
      diagnosis: "你现在对 '-(으)니까' 和 '-(으)니' 的区别有点吃力。",
      info: "(으)니까 = 理由/原因，比如因为下雨所以带伞。(으)니 = 去了/做了以后才发现。",
      quizQuestions: ["비가 오___ 우산 가져가요.（理由）", "가___ 사람이 많았어요.（去了之后发现）"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "lge-l-geoyeyo-separator": {
      name: "'-(으)ㄹ게요' vs '-(으)ㄹ 거예요' 分离液",
      description: "把承诺和未来这条细线分清楚。",
      diagnosis: "你现在对 '-(으)ㄹ게요' 和 '-(으)ㄹ 거예요' 的区别有点吃力。",
      info: "(으)ㄹ게요 = 说话人的意志/承诺，比如 제가 할게요。(으)ㄹ 거예요 = 单纯未来或推测，比如 비가 올 거예요。",
      quizQuestions: ["제가 도와___.（承诺）", "내일 비가 ___.（预测）"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "aseo-a-aligner": {
      name: "'-아서/어서' vs '-아/어' 整理药",
      description: "把原因表达的两条路整理清楚。",
      diagnosis: "你现在对 '-아서/어서' 和 '-아/어' 的用法有点吃力。",
      info: "아서/어서 = 原因 + 结果，比如 피곤해서 잤어요。아/어 = 动作顺序，比如 가서 봤어요。",
      quizQuestions: ["피곤___ 잤어요.（理由）", "집에 가___ 봤어요.（顺序）"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "causative-passive-syrup": {
      name: "使动/被动自动转换糖浆",
      description: "먹이다 和 먹히다，一口就分清。",
      diagnosis: "你现在对使动和被动的区别有点吃力。",
      info: "使动 = 让别人做，比如 밥을 먹이다。被动 = 被别人影响/遭受，比如 모기에 물리다。常见词尾有 이/히/리/기。",
      quizQuestions: ["엄마가 아기에게 밥을 ___.（让孩子吃）", "모기가 사람에게 ___.（被动）"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    },
    "honorific-converter": {
      name: "敬语自动转换器",
      description: "把非敬语自动变成礼貌正式的说法。",
      diagnosis: "你现在对敬语用法有点吃力。",
      info: "非敬语词干 + -요 = 日常礼貌体，比如 해요。非敬语词干 + -습니다/ㅂ니다 = 正式体，比如 합니다。",
      quizQuestions: ["'먹다' 的正式体是？", "'가다' 的日常礼貌体是？"],
      callbackLabel: "想学得更细 → 去广开土语法 App（即将上线）"
    }
  }
};
