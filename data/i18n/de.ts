import type { LocaleData } from "./types";

export const de: LocaleData = {
  ui: {
    catalogTitle: "Rezeptbuch der Apotheke",
    catalogSubtitle:
      "Wähle das Mittel, das zu deiner Schwierigkeit im Koreanischen passt, und erhalte dein Rezept. Fülle die Lücken aus, dann gehört es dir.",
    scrollCue: "Zur Rezeptliste",
    groups: {
      pronunciation: {
        title: "Aussprache-Mittel",
        blurb: "Zähme Zunge und Lippen"
      },
      "phonological-rule": {
        title: "Mittel für Lautwandel",
        blurb: "Meistere die Regeln, bei denen sich Laute ändern"
      },
      grammar: {
        title: "Grammatik-Mittel",
        blurb: "Schlichte den Streit von Partikeln und Endungen"
      },
      royal: {
        title: "Königliche Geheimmittel",
        blurb: "Begrenzte Tribute außer Reichweite"
      }
    },
    status: {
      available: "Verfügbar",
      limited: "Begrenzt",
      unavailable: "Außer Reichweite"
    },
    cardAction: "Rezept erhalten",
    footerLead:
      "Wenn du die Apotheke verlässt, wartet ein größeres Gwanggaeto auf dich.",
    enterGwanggaeto: "Zu Gwanggaeto",
    toTop: "Nach oben",
    home: "Startseite",
    modalLabel: "REZEPT · 藥房廣開土",
    diagnosis: "Diagnose",
    info: "Über dieses Mittel",
    prescription: "Rezept (Lücken ausfüllen)",
    royalReject: "Dieses Mittel ist außer deiner Reichweite.",
    stamp: "AUSGEGEBEN",
    allDone: "Du hast das Rezept gemeistert. Dieses Mittel gehört dir.",
    correct: "✓ Richtig",
    wrong: "✗ Versuch es nochmal",
    showHint: "Hinweis anzeigen",
    hintPrefix: "Hinweis: ",
    answerPlaceholder: "Gib deine Antwort ein",
    callbackPending: "(Link folgt in Kürze)",
    closeAria: "Rezept schließen",
    stockLabel: (count) => `Noch ${count} übrig`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Handgeschriebenes Hangeul-Lehrbuch von König Sejong",
      description:
        "Vom König eigenhändig geschrieben. Nicht einmal der Premierminister bekam ein Exemplar.",
      diagnosis: "Dieses Mittel ist außer deiner Reichweite.",
      info: "Vergriffen, wird nicht mehr hergestellt. Beginne Schritt für Schritt in der gewöhnlichen Gwanggaeto-Apotheke.",
      quizQuestions: [],
      callbackLabel: "Stattdessen → zur gewöhnlichen Gwanggaeto-Apotheke"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (Original)",
      description: "Ein einziges Originalexemplar, tausend Jahre Wartezeit.",
      diagnosis: "Dieses Mittel ist außer deiner Reichweite.",
      info: "Wartet auf die Genehmigung des königlichen Rates. Auch in tausend Jahren wird sie nicht erteilt — geh zur gewöhnlichen Gwanggaeto-Apotheke.",
      quizQuestions: [],
      callbackLabel: "Stattdessen → zur gewöhnlichen Gwanggaeto-Apotheke"
    },
    "korean-friend-patience": {
      name: "Geduld-Booster eines koreanischen Freundes",
      description:
        "Das Herz eines Freundes, der deiner Aussprache bis zum Ende zuhört.",
      diagnosis: "Dieses Mittel ist außer deiner Reichweite.",
      info: "Nicht einmal der Premierminister kann es bekommen. Lerne in der Gwanggaeto-Apotheke, und die Geduld deines Freundes wird immer großzügiger.",
      quizQuestions: [],
      callbackLabel: "Stattdessen → zur gewöhnlichen Gwanggaeto-Apotheke"
    },
    "hangul-creation-secret": {
      name: "Das Geheimrezept der Hangeul-Schöpfung",
      description:
        "Das geheime Mittel, das König Sejong mit seinen Gelehrten vier Jahre lang braute.",
      diagnosis: "Dieses Mittel ist außer deiner Reichweite.",
      info: "Nur ein Exemplar, längst irgendwo versiegelt. Lerne die Geheimnisse des Hangeul Dosis für Dosis in der gewöhnlichen Gwanggaeto-Apotheke.",
      quizQuestions: [],
      callbackLabel: "Stattdessen → zur gewöhnlichen Gwanggaeto-Apotheke"
    },
    "prime-minister-capsule": {
      name: "Limitierte Kapsel auf Empfehlung des Premierministers",
      description:
        "Ohne das handgeschriebene Empfehlungsschreiben des Premierministers nicht zu kaufen.",
      diagnosis: "Dieses Mittel ist außer deiner Reichweite.",
      info: "Empfehlung erforderlich. Lerne fleißig in der Gwanggaeto-Apotheke, und vielleicht empfiehlt dich der Premierminister selbst.",
      quizQuestions: [],
      callbackLabel: "Stattdessen → zur gewöhnlichen Gwanggaeto-Apotheke"
    },
    "h-pronunciation": {
      name: "ㅎ-Aussprache-Mittel",
      description: "Lässt das ㅎ sanft im Mund verschwinden.",
      diagnosis: "Dir fällt die Aussprache von ㅎ schwer.",
      info: "ㅎ ist der schwächste Konsonant im Koreanischen — am Silbenanfang ein leichter Hauch, als Batchim (Endkonsonant) kaum hörbar.",
      quizQuestions: ["Wo befindet sich das ㅎ in '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Konsonanten-App"
    },
    "korean-ear": {
      name: "Koreanische Ohren",
      description: "Unterscheide ㅓ und ㅗ auf Anhieb.",
      diagnosis: "Dir fällt es schwer, ㅓ und ㅗ zu unterscheiden.",
      info: "ㅓ: Mund leicht geöffnet und flach. ㅗ: Lippen gerundet.",
      quizQuestions: [
        "Was ist der erste Vokal in '어머니'?",
        "Was ist der erste Vokal in '오빠'?",
        "'버스' oder '보스' — welches enthält ㅓ?"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Vokal-App"
    },
    "three-tier-taste": {
      name: "Gaumen für einfach · aspiriert · gespannt",
      description: "Spüre ㅈ ㅊ ㅉ auf der Zungenspitze.",
      diagnosis: "Dir fällt es schwer, einfache, aspirierte und gespannte Konsonanten zu unterscheiden.",
      info: "Drei Laute vom selben Ort — Einfach (ㅂㄷㄱㅈ): natürlich, Behaucht (ㅍㅌㅋㅊ): scharf und berstend, Gespannt (ㅃㄸㄲㅉ): schnell und stark.",
      quizQuestions: [
        "'바보' oder '파보' — welches ist aspiriert?",
        "Welches Wort enthält das gespannte ㄸ?"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Konsonanten-App"
    },
    "fortification-chip": {
      name: "Auto-Spannungs-Chip",
      description: "Spricht '학교' automatisch als '학꾜' aus.",
      diagnosis: "Dir fällt die Verspannung (Tensifizierung) schwer.",
      info: "Ein einfacher Konsonant (ㄱㄷㅂㅈㅅ) nach einem Batchim ㄱㄷㅂ wird gespannt (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Lautwandel-App"
    },
    "final-7-capsule": {
      name: "Kapsel der 7 Endlaute",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ in einer einzigen Pille.",
      diagnosis: "Dir fallen die 7 repräsentativen Endlaute schwer.",
      info: "Koreanisch hat 27 Batchim, aber sie werden in nur 7 Lauten ausgesprochen: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Wie wird das Batchim von '꽃' ausgesprochen?",
        "Wie wird das Batchim von '낯' ausgesprochen?",
        "Wie wird das Batchim von '밖' ausgesprochen?"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Batchim-App"
    },
    "rk-special-capsule": {
      name: "Spezialkapsel für das Batchim ㄺ",
      description: "닭, 흙, 굵다 — spezialisiert auf die schwierige Gruppe ㄺ.",
      diagnosis: "Dir fällt die Konsonantengruppe ㄺ schwer.",
      info: "Allein oder vor einem Konsonanten ist es [ㄱ] (닭→[닥]); vor einem Vokal ist es [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-App für zusammengesetzte Batchim"
    },
    "h-weakening-soothing": {
      name: "Beruhigungsmittel für die ㅎ-Schwächung",
      description: "Spricht '좋아요' natürlich als '조아요' aus.",
      diagnosis: "Dir fällt die ㅎ-Schwächung schwer.",
      info: "Ein ㅎ als Batchim verschwindet (좋아요 → 조아요). Nach einem Batchim ㄴㄹㅁㅇ wird das ㅎ schwächer (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-ㅎ-Schwächung-App"
    },
    "liaison-patch": {
      name: "Auto-Bindungs-Patch",
      description: "Verbindet '한국이' automatisch zu '한구기'.",
      diagnosis: "Dir fällt die Lautbindung (Liaison) schwer.",
      info: "Wenn ein Batchim von einer Silbe gefolgt wird, die mit einem Vokal beginnt, wird das Batchim zum Anfangslaut der nächsten Silbe.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Lautwandel-App"
    },
    "nasalization-inhaler": {
      name: "Nasalierungs-Inhalator",
      description: "Atme '국물' durch die Nase zu '궁물'.",
      diagnosis: "Dir fällt die Nasalierung schwer.",
      info: "Ein Batchim ㄱㄷㅂ gefolgt von ㄴㅁ macht das Batchim nasal (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Lautwandel-App"
    },
    "e-vs-eseo-syrup": {
      name: "Sirup zur Unterscheidung von '에' und '에서'",
      description: "Zielpunkt oder Ort der Handlung — in einem Schluck.",
      diagnosis: "Dir fällt die Unterscheidung von '에' und '에서' schwer.",
      info: "에 = Ziel / Ort (학교에 가다). 에서 = Ort der Handlung (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "eun-i-chip": {
      name: "Auto-Erkennungs-Chip für '은/는' und '이/가'",
      description: "Beendet den ewigen Streit zwischen Thema und Subjekt.",
      diagnosis: "Dir fällt die Unterscheidung von '은/는' und '이/가' schwer.",
      info: "은/는 = Thema (bekannte Information, Kontrast). 이/가 = Subjekt (neue Information, Betonung).",
      quizQuestions: [
        "저___ 학생이에요. (bei der Vorstellung)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "do-man-separator": {
      name: "Trennlösung für '도/만'",
      description: "Trennt das hinzufügende 도 und das einschränkende 만 in einem Schluck.",
      diagnosis: "Dir fällt die Unterscheidung von '도' und '만' schwer.",
      info: "도 = auch / einschließlich (저도 가요). 만 = nur (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (ich auch)", "저___ 좋아해요. (nur ich)"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "buteo-kkaji-syrup": {
      name: "Bereichssirup '부터-까지'",
      description: "Die zwei Anker von Anfang und Ende.",
      diagnosis: "Dir fallen die Bereichsmarker '부터' und '까지' schwer.",
      info: "부터 = Startpunkt, 까지 = Endpunkt. Meist als Paar verwendet.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "nikka-ni-separator": {
      name: "Trennlösung für '-(으)니까' und '-(으)니'",
      description: "Unterscheidet, ob es ein Grund ist oder eine Entdeckung beim Tun.",
      diagnosis: "Dir fällt die Unterscheidung von '-(으)니까' und '-(으)니' schwer.",
      info: "(으)니까 = Grund / Ursache. (으)니 = Entdeckung beim Tun.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (Grund)",
        "가___ 사람이 많았어요. (beim Hingehen bemerkt)"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Trennlösung für '-(으)ㄹ게요' und '-(으)ㄹ 거예요'",
      description: "Die feine Linie zwischen Versprechen und Zukunft.",
      diagnosis: "Dir fällt die Unterscheidung von '-(으)ㄹ게요' und '-(으)ㄹ 거예요' schwer.",
      info: "(으)ㄹ게요 = Wille / Versprechen des Sprechers (제가 할게요). (으)ㄹ 거예요 = einfache Zukunft / Vermutung (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (Versprechen)", "내일 비가 ___. (Vorhersage)"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "aseo-a-aligner": {
      name: "Ordnungsmittel für '-아서/어서' und '-아/어'",
      description: "Ordnet die zwei Wege, einen Grund auszudrücken.",
      diagnosis: "Dir fällt die Verwendung von '-아서/어서' und '-아/어' schwer.",
      info: "아서/어서 = Grund + Ergebnis (피곤해서 잤어요). 아/어 = aufeinanderfolgende Handlungen (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (Grund)", "집에 가___ 봤어요. (aufeinanderfolgend)"],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "causative-passive-syrup": {
      name: "Auto-Umwandlungssirup Kausativ / Passiv",
      description: "먹이다 vs 먹히다, in einem Schluck.",
      diagnosis: "Dir fällt die Unterscheidung von Kausativ und Passiv schwer.",
      info: "Kausativ = jemanden etwas tun lassen (밥을 먹이다). Passiv = etwas erleiden (모기에 물리다). Endungen: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (zu essen geben)",
        "모기가 사람에게 ___. (Passiv)"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    },
    "honorific-converter": {
      name: "Automatischer Honorativ-Wandler",
      description: "Wandelt lockere Sprache automatisch in höfliche um.",
      diagnosis: "Dir fällt die Höflichkeitssprache schwer.",
      info: "Locker + -요 = höflich (해요). Locker + -습니다/ㅂ니다 = formell (합니다).",
      quizQuestions: [
        "Was ist die formelle Form von '먹다'?",
        "Was ist die höfliche Form (해요) von '가다'?"
      ],
      callbackLabel: "Mehr dazu → in der Gwanggaeto-Grammatik-App (bald)"
    }
  }
};
