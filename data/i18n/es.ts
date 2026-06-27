import type { LocaleData } from "./types";

export const es: LocaleData = {
  ui: {
    catalogTitle: "Recetario de la botica",
    catalogSubtitle:
      "Elige el remedio que se ajuste a tu dificultad con el coreano y recibe tu receta. Rellena los espacios y será tuyo.",
    scrollCue: "Ver la lista de recetas",
    groups: {
      pronunciation: {
        title: "Remedios de pronunciación",
        blurb: "Doma la lengua y los labios"
      },
      "phonological-rule": {
        title: "Remedios de cambios de sonido",
        blurb: "Domina las reglas donde los sonidos cambian"
      },
      grammar: {
        title: "Remedios de gramática",
        blurb: "Calma las disputas de partículas y terminaciones"
      },
      royal: {
        title: "Remedios secretos de la corte",
        blurb: "Tributos limitados fuera de tu alcance"
      }
    },
    status: {
      available: "Disponible",
      limited: "Limitado",
      unavailable: "Fuera de alcance"
    },
    cardAction: "Recibir receta",
    footerLead: "Al salir de la botica, te espera un Gwanggaeto más amplio.",
    enterGwanggaeto: "Entrar a Gwanggaeto",
    toTop: "Arriba",
    modalLabel: "RECETA · 藥房廣開土",
    diagnosis: "Diagnóstico",
    info: "Sobre este remedio",
    prescription: "Receta (rellena los espacios)",
    royalReject: "Este remedio está fuera de tu alcance.",
    stamp: "DESPACHADO",
    allDone: "Has dominado la receta. Este remedio es tuyo.",
    correct: "✓ Correcto",
    wrong: "✗ Inténtalo de nuevo",
    showHint: "Ver pista",
    hintPrefix: "Pista: ",
    answerPlaceholder: "Escribe tu respuesta",
    callbackPending: "(enlace próximamente)",
    closeAria: "Cerrar receta",
    stockLabel: (count) => `Quedan ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Manual de Hangeul escrito a mano por el rey Sejong",
      description:
        "Escrito de puño y letra del rey. Ni el primer ministro consiguió un ejemplar.",
      diagnosis: "Este remedio está fuera de tu alcance.",
      info: "Agotado, no se volverá a elaborar. Empieza paso a paso en la botica general Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "En su lugar → a la botica general Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (original)",
      description: "Un único ejemplar original, mil años de espera.",
      diagnosis: "Este remedio está fuera de tu alcance.",
      info: "A la espera de la aprobación del consejo real. Ni en mil años se aprobará, así que ve a la botica general Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "En su lugar → a la botica general Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Refuerzo de paciencia de un amigo coreano",
      description:
        "El corazón de un amigo que escucha tu pronunciación hasta el final.",
      diagnosis: "Este remedio está fuera de tu alcance.",
      info: "Ni el primer ministro puede conseguirlo. Estudia en la botica Gwanggaeto y la paciencia de tu amigo se irá haciendo más generosa.",
      quizQuestions: [],
      callbackLabel: "En su lugar → a la botica general Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "La receta secreta de la creación del Hangeul",
      description:
        "El remedio secreto que el rey Sejong elaboró con sus eruditos durante cuatro años.",
      diagnosis: "Este remedio está fuera de tu alcance.",
      info: "Solo un ejemplar, ya sellado en algún lugar. Aprende los secretos del Hangeul dosis a dosis en la botica general Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "En su lugar → a la botica general Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Cápsula limitada recomendada por el primer ministro",
      description:
        "No se puede comprar sin la carta de recomendación del primer ministro.",
      diagnosis: "Este remedio está fuera de tu alcance.",
      info: "Se requiere recomendación. Estudia con constancia en la botica Gwanggaeto y quizá el primer ministro te recomiende él mismo.",
      quizQuestions: [],
      callbackLabel: "En su lugar → a la botica general Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Remedio de pronunciación de ㅎ",
      description: "Hace que la ㅎ se desvanezca suavemente en la boca.",
      diagnosis: "Te cuesta pronunciar la ㅎ.",
      info: "La ㅎ es la consonante más débil del coreano: un leve soplo al inicio de sílaba y casi inaudible como batchim (consonante final).",
      quizQuestions: ["¿Dónde está la ㅎ en '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "Más detalles → en la app de consonantes de Gwanggaeto"
    },
    "korean-ear": {
      name: "Oídos coreanos",
      description: "Distingue ㅓ y ㅗ al instante.",
      diagnosis: "Te cuesta distinguir ㅓ y ㅗ.",
      info: "ㅓ: boca un poco abierta y plana. ㅗ: labios redondeados.",
      quizQuestions: [
        "¿Cuál es la primera vocal de '어머니'?",
        "¿Cuál es la primera vocal de '오빠'?",
        "'버스' o '보스' — ¿cuál lleva ㅓ?"
      ],
      callbackLabel: "Más detalles → en la app de vocales de Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Paladar de simple · aspirada · tensa",
      description: "Siente ㅈ ㅊ ㅉ en la punta de la lengua.",
      diagnosis: "Te cuesta distinguir las consonantes simples, aspiradas y tensas.",
      info: "Tres sonidos desde el mismo lugar — Simple (ㅂㄷㄱㅈ): natural, Aspirado (ㅍㅌㅋㅊ): agudo y explosivo, Tenso (ㅃㄸㄲㅉ): rápido y fuerte.",
      quizQuestions: [
        "'바보' o '파보' — ¿cuál es aspirada?",
        "¿Qué palabra lleva la tensa ㄸ?"
      ],
      callbackLabel: "Más detalles → en la app de consonantes de Gwanggaeto"
    },
    "fortification-chip": {
      name: "Chip de tensificación automática",
      description: "Pronuncia '학교' como '학꾜' automáticamente.",
      diagnosis: "Te cuesta la tensificación.",
      info: "Una consonante simple (ㄱㄷㅂㅈㅅ) tras un batchim ㄱㄷㅂ se vuelve tensa (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Más detalles → en la app de cambios de sonido de Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Cápsula de los 7 sonidos finales",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ en una sola pastilla.",
      diagnosis: "Te cuestan los 7 sonidos finales representativos.",
      info: "El coreano tiene 27 batchim, pero se pronuncian en solo 7 sonidos: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "¿Cómo se pronuncia el batchim de '꽃'?",
        "¿Cómo se pronuncia el batchim de '낯'?",
        "¿Cómo se pronuncia el batchim de '밖'?"
      ],
      callbackLabel: "Más detalles → en la app de batchim de Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Cápsula especialista en el batchim ㄺ",
      description: "닭, 흙, 굵다 — especializada en el difícil grupo ㄺ.",
      diagnosis: "Te cuesta el grupo consonántico ㄺ.",
      info: "Solo o ante consonante es [ㄱ] (닭→[닥]); ante vocal es [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Más detalles → en la app de batchim compuestos de Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Sedante de debilitamiento de ㅎ",
      description: "Convierte '좋아요' en '조아요' con naturalidad.",
      diagnosis: "Te cuesta el debilitamiento de la ㅎ.",
      info: "Una ㅎ final desaparece (좋아요 → 조아요). Tras un batchim ㄴㄹㅁㅇ, la ㅎ se debilita (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Más detalles → en la app de debilitamiento de ㅎ de Gwanggaeto"
    },
    "liaison-patch": {
      name: "Parche de enlace automático",
      description: "Enlaza '한국이' como '한구기' automáticamente.",
      diagnosis: "Te cuesta el enlace (liaison).",
      info: "Cuando un batchim va seguido de una sílaba que empieza por vocal, el batchim pasa a ser el sonido inicial de la sílaba siguiente.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Más detalles → en la app de cambios de sonido de Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Inhalador de nasalización",
      description: "Inhala '국물' y conviértelo en '궁물' por la nariz.",
      diagnosis: "Te cuesta la nasalización.",
      info: "Un batchim ㄱㄷㅂ seguido de ㄴㅁ hace que el batchim se vuelva nasal (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Más detalles → en la app de cambios de sonido de Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Jarabe para distinguir '에' y '에서'",
      description: "Destino o lugar de la acción, de un solo trago.",
      diagnosis: "Te cuesta distinguir '에' y '에서'.",
      info: "에 = destino / ubicación (학교에 가다). 에서 = lugar de la acción (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "eun-i-chip": {
      name: "Chip detector de '은/는' e '이/가'",
      description: "Pone fin a la eterna disputa entre tema y sujeto.",
      diagnosis: "Te cuesta distinguir '은/는' e '이/가'.",
      info: "은/는 = tema (información conocida, contraste). 이/가 = sujeto (información nueva, énfasis).",
      quizQuestions: [
        "저___ 학생이에요. (presentándote)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "do-man-separator": {
      name: "Separador de '도/만'",
      description: "Separa el 도 aditivo y el 만 restrictivo de un solo trago.",
      diagnosis: "Te cuesta distinguir '도' y '만'.",
      info: "도 = también / incluido (저도 가요). 만 = solo (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (yo también)", "저___ 좋아해요. (solo yo)"],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "buteo-kkaji-syrup": {
      name: "Jarabe de rango '부터-까지'",
      description: "Las dos anclas del inicio y el final.",
      diagnosis: "Te cuestan los marcadores de rango '부터' y '까지'.",
      info: "부터 = punto de inicio, 까지 = punto final. Suelen usarse en pareja.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "nikka-ni-separator": {
      name: "Separador de '-(으)니까' y '-(으)니'",
      description: "Distingue si es un motivo o un descubrimiento al hacer algo.",
      diagnosis: "Te cuesta distinguir '-(으)니까' y '-(으)니'.",
      info: "(으)니까 = motivo / causa. (으)니 = descubrimiento al hacer algo.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (motivo)",
        "가___ 사람이 많았어요. (al llegar lo descubrí)"
      ],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Separador de '-(으)ㄹ게요' y '-(으)ㄹ 거예요'",
      description: "La línea sutil entre la promesa y el futuro.",
      diagnosis: "Te cuesta distinguir '-(으)ㄹ게요' y '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = voluntad / promesa del hablante (제가 할게요). (으)ㄹ 거예요 = futuro simple / suposición (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (promesa)", "내일 비가 ___. (predicción)"],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "aseo-a-aligner": {
      name: "Alineador de '-아서/어서' y '-아/어'",
      description: "Ordena las dos vías de expresar el motivo.",
      diagnosis: "Te cuesta usar '-아서/어서' y '-아/어'.",
      info: "아서/어서 = motivo + resultado (피곤해서 잤어요). 아/어 = acciones consecutivas (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (motivo)", "집에 가___ 봤어요. (consecutivo)"],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "causative-passive-syrup": {
      name: "Jarabe conversor causativo / pasivo",
      description: "먹이다 vs 먹히다, de un solo trago.",
      diagnosis: "Te cuesta distinguir el causativo y el pasivo.",
      info: "Causativo = hacer que alguien haga algo (밥을 먹이다). Pasivo = que te lo hagan (모기에 물리다). Terminaciones: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (hacer comer)",
        "모기가 사람에게 ___. (pasivo)"
      ],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    },
    "honorific-converter": {
      name: "Conversor automático de honoríficos",
      description: "Convierte el habla informal en formal automáticamente.",
      diagnosis: "Te cuesta el lenguaje honorífico.",
      info: "Informal + -요 = cortés (해요). Informal + -습니다/ㅂ니다 = formal (합니다).",
      quizQuestions: [
        "¿Cuál es la forma formal de '먹다'?",
        "¿Cuál es la forma cortés (해요) de '가다'?"
      ],
      callbackLabel: "Más detalles → en la app de gramática de Gwanggaeto (próximamente)"
    }
  }
};
