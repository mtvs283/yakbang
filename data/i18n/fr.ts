import type { LocaleData } from "./types";

export const fr: LocaleData = {
  ui: {
    catalogTitle: "Ordonnancier de l'apothicaire",
    catalogSubtitle:
      "Choisissez le remède adapté à votre difficulté en coréen et recevez votre ordonnance. Remplissez les blancs et il est à vous.",
    scrollCue: "Voir la liste des ordonnances",
    groups: {
      pronunciation: {
        title: "Remèdes de prononciation",
        blurb: "Domptez la langue et les lèvres"
      },
      "phonological-rule": {
        title: "Remèdes des changements de sons",
        blurb: "Maîtrisez les règles où les sons changent"
      },
      grammar: {
        title: "Remèdes de grammaire",
        blurb: "Apaisez les querelles des particules et des terminaisons"
      },
      royal: {
        title: "Remèdes secrets de la cour",
        blurb: "Tributs limités hors de votre portée"
      }
    },
    status: {
      available: "Disponible",
      limited: "Limité",
      unavailable: "Hors de portée"
    },
    cardAction: "Recevoir l'ordonnance",
    footerLead: "En sortant de l'apothicaire, un Gwanggaeto plus vaste vous attend.",
    enterGwanggaeto: "Entrer dans Gwanggaeto",
    toTop: "Haut",
    home: "Accueil",
    modalLabel: "ORDONNANCE · 藥房廣開土",
    diagnosis: "Diagnostic",
    info: "À propos de ce remède",
    prescription: "Ordonnance (remplissez les blancs)",
    royalReject: "Ce remède est hors de votre portée.",
    stamp: "DÉLIVRÉ",
    allDone: "Vous avez maîtrisé l'ordonnance. Ce remède est à vous.",
    correct: "✓ Correct",
    wrong: "✗ Réessayez",
    showHint: "Voir l'indice",
    hintPrefix: "Indice : ",
    answerPlaceholder: "Écrivez votre réponse",
    callbackPending: "(lien bientôt disponible)",
    closeAria: "Fermer l'ordonnance",
    stockLabel: (count) => `Il en reste ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Manuel de Hangeul manuscrit du roi Sejong",
      description:
        "Écrit de la main du roi. Même le Premier ministre n'a pu en obtenir un exemplaire.",
      diagnosis: "Ce remède est hors de votre portée.",
      info: "Épuisé, il ne sera plus fabriqué. Commencez pas à pas à l'apothicaire ordinaire Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "À la place → vers l'apothicaire ordinaire Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (original)",
      description: "Un seul exemplaire original, mille ans d'attente.",
      diagnosis: "Ce remède est hors de votre portée.",
      info: "En attente de l'approbation du conseil royal. Mille ans n'y suffiront pas, alors rendez-vous à l'apothicaire ordinaire Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "À la place → vers l'apothicaire ordinaire Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Booster de patience d'un ami coréen",
      description:
        "Le cœur d'un ami qui écoute votre prononciation jusqu'au bout.",
      diagnosis: "Ce remède est hors de votre portée.",
      info: "Même le Premier ministre n'en trouve pas. Étudiez à l'apothicaire Gwanggaeto et la patience de votre ami deviendra plus généreuse.",
      quizQuestions: [],
      callbackLabel: "À la place → vers l'apothicaire ordinaire Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "La recette secrète de la création du Hangeul",
      description:
        "Le remède secret que le roi Sejong a élaboré avec ses érudits pendant quatre ans.",
      diagnosis: "Ce remède est hors de votre portée.",
      info: "Un seul exemplaire, déjà scellé quelque part. Apprenez les secrets du Hangeul dose par dose à l'apothicaire ordinaire Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "À la place → vers l'apothicaire ordinaire Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Capsule limitée recommandée par le Premier ministre",
      description:
        "Impossible à acheter sans la lettre de recommandation manuscrite du Premier ministre.",
      diagnosis: "Ce remède est hors de votre portée.",
      info: "Recommandation requise. Étudiez avec assiduité à l'apothicaire Gwanggaeto et le Premier ministre vous recommandera peut-être lui-même.",
      quizQuestions: [],
      callbackLabel: "À la place → vers l'apothicaire ordinaire Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Remède de prononciation du ㅎ",
      description: "Fait fondre doucement le ㅎ dans la bouche.",
      diagnosis: "Vous avez du mal à prononcer le ㅎ.",
      info: "Le ㅎ est la consonne la plus faible du coréen : un léger souffle en début de syllabe, presque inaudible en batchim (consonne finale).",
      quizQuestions: ["Où se trouve le ㅎ dans '하늘' ?", "'좋아요' → [______]"],
      callbackLabel: "Plus de détails → dans l'appli des consonnes Gwanggaeto"
    },
    "korean-ear": {
      name: "Oreilles coréennes",
      description: "Distinguez ㅓ et ㅗ d'un coup.",
      diagnosis: "Vous avez du mal à distinguer ㅓ et ㅗ.",
      info: "ㅓ : bouche un peu ouverte et plate. ㅗ : lèvres arrondies.",
      quizQuestions: [
        "Quelle est la première voyelle de '어머니' ?",
        "Quelle est la première voyelle de '오빠' ?",
        "'버스' ou '보스' — lequel contient ㅓ ?"
      ],
      callbackLabel: "Plus de détails → dans l'appli des voyelles Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Palais simple · aspirée · tendue",
      description: "Sentez ㅈ ㅊ ㅉ du bout de la langue.",
      diagnosis: "Vous avez du mal à distinguer les consonnes simples, aspirées et tendues.",
      info: "Trois intensités au même endroit : simple (ㅂㄷㄱㅈ) naturelle, aspirée (ㅍㅌㅋㅊ) avec un souffle fort, tendue (ㅃㄸㄲㅉ) brève et tendue.",
      quizQuestions: [
        "'바보' ou '파보' — laquelle est aspirée ?",
        "Quel mot contient la tendue ㄸ ?"
      ],
      callbackLabel: "Plus de détails → dans l'appli des consonnes Gwanggaeto"
    },
    "fortification-chip": {
      name: "Puce de tension automatique",
      description: "Prononce '학교' comme '학꾜' automatiquement.",
      diagnosis: "Vous avez du mal avec la tensification.",
      info: "Une consonne simple (ㄱㄷㅂㅈㅅ) après un batchim ㄱㄷㅂ devient tendue (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Plus de détails → dans l'appli des changements de sons Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Capsule des 7 sons finaux",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ en une seule pilule.",
      diagnosis: "Vous avez du mal avec les 7 sons finaux représentatifs.",
      info: "Le coréen compte 27 batchim, mais ils se prononcent en 7 sons seulement : ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Comment se prononce le batchim de '꽃' ?",
        "Comment se prononce le batchim de '낯' ?",
        "Comment se prononce le batchim de '밖' ?"
      ],
      callbackLabel: "Plus de détails → dans l'appli des batchim Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Capsule spécialiste du batchim ㄺ",
      description: "닭, 흙, 굵다 — spécialisée dans le groupe difficile ㄺ.",
      diagnosis: "Vous avez du mal avec le groupe consonantique ㄺ.",
      info: "Seul ou devant une consonne, c'est [ㄱ] (닭→[닥]) ; devant une voyelle, c'est [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Plus de détails → dans l'appli des batchim composés Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Calmant d'affaiblissement du ㅎ",
      description: "Transforme '좋아요' en '조아요' naturellement.",
      diagnosis: "Vous avez du mal avec l'affaiblissement du ㅎ.",
      info: "Un ㅎ final disparaît (좋아요 → 조아요). Après un batchim ㄴㄹㅁㅇ, le ㅎ s'affaiblit (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Plus de détails → dans l'appli d'affaiblissement du ㅎ Gwanggaeto"
    },
    "liaison-patch": {
      name: "Patch de liaison automatique",
      description: "Enchaîne '한국이' en '한구기' automatiquement.",
      diagnosis: "Vous avez du mal avec la liaison.",
      info: "Quand un batchim est suivi d'une syllabe commençant par une voyelle, le batchim devient le son initial de la syllabe suivante.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Plus de détails → dans l'appli des changements de sons Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Inhalateur de nasalisation",
      description: "Inhalez '국물' pour le transformer en '궁물' par le nez.",
      diagnosis: "Vous avez du mal avec la nasalisation.",
      info: "Un batchim ㄱㄷㅂ suivi de ㄴㅁ fait que le batchim devient nasal (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Plus de détails → dans l'appli des changements de sons Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Sirop pour distinguer '에' et '에서'",
      description: "Point d'arrivée ou lieu de l'action, en une gorgée.",
      diagnosis: "Vous avez du mal à distinguer '에' et '에서'.",
      info: "에 = destination / lieu (학교에 가다). 에서 = lieu de l'action (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "eun-i-chip": {
      name: "Puce détectrice de '은/는' et '이/가'",
      description: "Met fin à l'éternelle querelle entre thème et sujet.",
      diagnosis: "Vous avez du mal à distinguer '은/는' et '이/가'.",
      info: "은/는 = thème (information connue, contraste). 이/가 = sujet (information nouvelle, emphase).",
      quizQuestions: [
        "저___ 학생이에요. (en vous présentant)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "do-man-separator": {
      name: "Séparateur de '도/만'",
      description: "Sépare le 도 additif et le 만 restrictif en une gorgée.",
      diagnosis: "Vous avez du mal à distinguer '도' et '만'.",
      info: "도 = aussi / inclus (저도 가요). 만 = seulement (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (moi aussi)", "저___ 좋아해요. (moi seul)"],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "buteo-kkaji-syrup": {
      name: "Sirop de plage '부터-까지'",
      description: "Les deux ancres du début et de la fin.",
      diagnosis: "Vous avez du mal avec les marqueurs de plage '부터' et '까지'.",
      info: "부터 = point de départ, 까지 = point d'arrivée. Souvent utilisés en paire.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "nikka-ni-separator": {
      name: "Séparateur de '-(으)니까' et '-(으)니'",
      description: "Distingue s'il s'agit d'une raison ou d'une découverte en faisant quelque chose.",
      diagnosis: "Vous avez du mal à distinguer '-(으)니까' et '-(으)니'.",
      info: "(으)니까 = raison / cause. (으)니 = découverte en faisant quelque chose.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (raison)",
        "가___ 사람이 많았어요. (en y allant, j'ai constaté)"
      ],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Séparateur de '-(으)ㄹ게요' et '-(으)ㄹ 거예요'",
      description: "La fine ligne entre la promesse et le futur.",
      diagnosis: "Vous avez du mal à distinguer '-(으)ㄹ게요' et '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = volonté / promesse du locuteur (제가 할게요). (으)ㄹ 거예요 = futur simple / supposition (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (promesse)", "내일 비가 ___. (prédiction)"],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "aseo-a-aligner": {
      name: "Aligneur de '-아서/어서' et '-아/어'",
      description: "Range les deux voies pour exprimer la raison.",
      diagnosis: "Vous avez du mal à utiliser '-아서/어서' et '-아/어'.",
      info: "아서/어서 = raison + résultat (피곤해서 잤어요). 아/어 = actions successives (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (raison)", "집에 가___ 봤어요. (successif)"],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "causative-passive-syrup": {
      name: "Sirop convertisseur causatif / passif",
      description: "먹이다 vs 먹히다, en une gorgée.",
      diagnosis: "Vous avez du mal à distinguer le causatif et le passif.",
      info: "Causatif = faire faire (밥을 먹이다). Passif = subir l'action (모기에 물리다). Terminaisons : 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (faire manger)",
        "모기가 사람에게 ___. (passif)"
      ],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    },
    "honorific-converter": {
      name: "Convertisseur automatique d'honorifiques",
      description: "Transforme le langage familier en formel automatiquement.",
      diagnosis: "Vous avez du mal avec le langage honorifique.",
      info: "Familier + -요 = poli (해요). Familier + -습니다/ㅂ니다 = formel (합니다).",
      quizQuestions: [
        "Quelle est la forme formelle de '먹다' ?",
        "Quelle est la forme polie (해요) de '가다' ?"
      ],
      callbackLabel: "Plus de détails → dans l'appli de grammaire Gwanggaeto (bientôt)"
    }
  }
};
