import type { LocaleData } from "./types";

export const id: LocaleData = {
  ui: {
    catalogTitle: "Daftar resep apotek",
    catalogSubtitle:
      "Pilih obat yang sesuai dengan kesulitan bahasa Korea-mu dan terima resepnya. Isi bagian kosong, dan obat itu jadi milikmu.",
    scrollCue: "Lihat daftar resep",
    groups: {
      pronunciation: {
        title: "Obat pelafalan",
        blurb: "Jinakkan lidah dan bibir"
      },
      "phonological-rule": {
        title: "Obat aturan perubahan bunyi",
        blurb: "Kuasai aturan saat bunyi berubah"
      },
      grammar: {
        title: "Obat tata bahasa",
        blurb: "Damaikan perselisihan partikel dan akhiran"
      },
      royal: {
        title: "Resep rahasia istana",
        blurb: "Persembahan terbatas di luar jangkauanmu"
      }
    },
    status: {
      available: "Tersedia",
      limited: "Terbatas",
      unavailable: "Tak terjangkau"
    },
    cardAction: "Terima resep",
    footerLead: "Begitu keluar dari apotek, Gwanggaeto yang lebih luas menantimu.",
    enterGwanggaeto: "Masuk ke Gwanggaeto",
    toTop: "Ke atas",
    home: "Beranda",
    modalLabel: "RESEP · 藥房廣開土",
    diagnosis: "Diagnosis",
    info: "Tentang obat ini",
    prescription: "Resep (isi bagian kosong)",
    royalReject: "Obat ini di luar jangkauanmu.",
    stamp: "DITEBUS",
    allDone: "Kamu telah menguasai resepnya. Obat ini milikmu.",
    correct: "✓ Benar",
    wrong: "✗ Coba lagi",
    showHint: "Lihat petunjuk",
    hintPrefix: "Petunjuk: ",
    answerPlaceholder: "Tulis jawabanmu",
    callbackPending: "(tautan segera hadir)",
    closeAria: "Tutup resep",
    stockLabel: (count) => `Sisa ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Buku Hangeul tulisan tangan Raja Sejong",
      description:
        "Ditulis langsung oleh raja. Perdana menteri pun tak dapat satu eksemplar.",
      diagnosis: "Obat ini di luar jangkauanmu.",
      info: "Sudah habis cetak, tidak diracik lagi. Mulailah selangkah demi selangkah di apotek umum Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sebagai gantinya → ke apotek umum Gwanggaeto"
    },
    hunminjeongeum: {
      name: "Hunminjeongeum Haeryebon (asli)",
      description: "Satu naskah asli, penantian seribu tahun.",
      diagnosis: "Obat ini di luar jangkauanmu.",
      info: "Masih menunggu persetujuan dewan istana. Seribu tahun pun tak akan disetujui, jadi pergilah ke apotek umum Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sebagai gantinya → ke apotek umum Gwanggaeto"
    },
    "korean-friend-patience": {
      name: "Penguat kesabaran teman Korea",
      description:
        "Hati seorang teman yang mendengarkan pelafalanmu sampai akhir.",
      diagnosis: "Obat ini di luar jangkauanmu.",
      info: "Perdana menteri pun tak bisa mendapatkannya. Belajarlah di apotek Gwanggaeto, dan kesabaran temanmu pun makin lapang.",
      quizQuestions: [],
      callbackLabel: "Sebagai gantinya → ke apotek umum Gwanggaeto"
    },
    "hangul-creation-secret": {
      name: "Resep rahasia penciptaan Hangeul",
      description:
        "Obat rahasia yang diracik Raja Sejong bersama para sarjana selama empat tahun.",
      diagnosis: "Obat ini di luar jangkauanmu.",
      info: "Hanya satu eksemplar, sudah disegel entah di mana. Pelajari rahasia Hangeul satu dosis demi satu dosis di apotek umum Gwanggaeto.",
      quizQuestions: [],
      callbackLabel: "Sebagai gantinya → ke apotek umum Gwanggaeto"
    },
    "prime-minister-capsule": {
      name: "Kapsul terbatas rekomendasi perdana menteri",
      description:
        "Tak bisa dibeli tanpa surat rekomendasi tulisan tangan perdana menteri.",
      diagnosis: "Obat ini di luar jangkauanmu.",
      info: "Perlu surat rekomendasi. Belajarlah rajin di apotek Gwanggaeto, mungkin perdana menteri akan merekomendasikanmu sendiri.",
      quizQuestions: [],
      callbackLabel: "Sebagai gantinya → ke apotek umum Gwanggaeto"
    },
    "h-pronunciation": {
      name: "Obat pelafalan ㅎ",
      description: "Membuat ㅎ memudar lembut di dalam mulut.",
      diagnosis: "Kamu kesulitan melafalkan ㅎ.",
      info: "ㅎ adalah konsonan terlemah dalam bahasa Korea: hembusan halus di awal suku kata, hampir tak terdengar sebagai batchim (konsonan akhir).",
      quizQuestions: ["Di mana ㅎ pada '하늘'?", "'좋아요' → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi konsonan Gwanggaeto"
    },
    "korean-ear": {
      name: "Telinga Korea",
      description: "Bedakan ㅓ dan ㅗ seketika.",
      diagnosis: "Kamu kesulitan membedakan ㅓ dan ㅗ.",
      info: "ㅓ: mulut sedikit terbuka dan datar. ㅗ: bibir dibulatkan.",
      quizQuestions: [
        "Apa vokal pertama pada '어머니'?",
        "Apa vokal pertama pada '오빠'?",
        "'버스' atau '보스' — mana yang ber-ㅓ?"
      ],
      callbackLabel: "Selengkapnya → di aplikasi vokal Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Indra rasa: biasa · aspirasi · tegang",
      description: "Rasakan ㅈ ㅊ ㅉ di ujung lidah.",
      diagnosis: "Kamu kesulitan membedakan konsonan biasa, aspirasi, dan tegang.",
      info: "Tiga kekuatan di posisi yang sama: biasa (ㅂㄷㄱㅈ) alami, aspirasi (ㅍㅌㅋㅊ) dengan hembusan kuat, tegang (ㅃㄸㄲㅉ) singkat dan tegang.",
      quizQuestions: [
        "'바보' atau '파보' — mana yang aspirasi?",
        "Kata mana yang ada tegang ㄸ?"
      ],
      callbackLabel: "Selengkapnya → di aplikasi konsonan Gwanggaeto"
    },
    "fortification-chip": {
      name: "Chip penegangan otomatis",
      description: "Melafalkan '학교' menjadi '학꾜' otomatis.",
      diagnosis: "Kamu kesulitan dengan penegangan bunyi.",
      info: "Konsonan biasa (ㄱㄷㅂㅈㅅ) setelah batchim ㄱㄷㅂ menjadi tegang (ㄲㄸㅃㅉㅆ).",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi perubahan bunyi Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Kapsul 7 bunyi akhir",
      description: "ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ dalam satu butir.",
      diagnosis: "Kamu kesulitan dengan 7 bunyi akhir representatif.",
      info: "Batchim Korea ada 27, tetapi dilafalkan menjadi 7 bunyi saja: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Bagaimana batchim '꽃' dilafalkan?",
        "Bagaimana batchim '낯' dilafalkan?",
        "Bagaimana batchim '밖' dilafalkan?"
      ],
      callbackLabel: "Selengkapnya → di aplikasi batchim Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Kapsul khusus batchim ㄺ",
      description: "닭, 흙, 굵다 — khusus untuk gugus sulit ㄺ.",
      diagnosis: "Kamu kesulitan dengan gugus konsonan ㄺ.",
      info: "Sendiri atau sebelum konsonan jadi [ㄱ] (닭→[닥]); sebelum vokal jadi [ㄹㄱ] (닭이→[달기]).",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi batchim ganda Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Penenang pelemahan ㅎ",
      description: "Melafalkan '좋아요' menjadi '조아요' secara alami.",
      diagnosis: "Kamu kesulitan dengan pelemahan ㅎ.",
      info: "ㅎ sebagai batchim menghilang (좋아요 → 조아요). Setelah batchim ㄴㄹㅁㅇ, ㅎ melemah (전화 → 저놔).",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi pelemahan ㅎ Gwanggaeto"
    },
    "liaison-patch": {
      name: "Tempel penghubung bunyi otomatis",
      description: "Menghubungkan '한국이' menjadi '한구기' otomatis.",
      diagnosis: "Kamu kesulitan dengan penghubungan bunyi (liaison).",
      info: "Bila batchim diikuti suku kata berawalan vokal, batchim itu pindah menjadi bunyi awal suku kata berikutnya.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi perubahan bunyi Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Inhaler nasalisasi",
      description: "Hirup '국물' lewat hidung menjadi '궁물'.",
      diagnosis: "Kamu kesulitan dengan nasalisasi.",
      info: "Batchim ㄱㄷㅂ yang bertemu ㄴㅁ berubah menjadi bunyi sengau (ㅇㄴㅁ).",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Selengkapnya → di aplikasi perubahan bunyi Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Sirop pembeda '에' dan '에서'",
      description: "Titik tujuan atau tempat aksi, dalam seteguk.",
      diagnosis: "Kamu kesulitan membedakan '에' dan '에서'.",
      info: "에 = tujuan / lokasi (학교에 가다). 에서 = tempat aksi (학교에서 공부하다).",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "eun-i-chip": {
      name: "Chip pembeda otomatis '은/는' dan '이/가'",
      description: "Mengakhiri perselisihan abadi antara topik dan subjek.",
      diagnosis: "Kamu kesulitan membedakan '은/는' dan '이/가'.",
      info: "은/는 = topik (informasi yang sudah diketahui, kontras). 이/가 = subjek (informasi baru, penekanan).",
      quizQuestions: [
        "저___ 학생이에요. (memperkenalkan diri)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "do-man-separator": {
      name: "Cairan pemisah '도/만'",
      description: "Memisahkan 도 (juga) dan 만 (hanya) dalam seteguk.",
      diagnosis: "Kamu kesulitan membedakan '도' dan '만'.",
      info: "도 = juga / termasuk (저도 가요). 만 = hanya (저만 가요).",
      quizQuestions: ["저___ 좋아해요. (saya juga)", "저___ 좋아해요. (hanya saya)"],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "buteo-kkaji-syrup": {
      name: "Sirop rentang '부터-까지'",
      description: "Dua jangkar: awal dan akhir.",
      diagnosis: "Kamu kesulitan dengan penanda rentang '부터' dan '까지'.",
      info: "부터 = titik awal, 까지 = titik akhir. Biasanya dipakai berpasangan.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "nikka-ni-separator": {
      name: "Cairan pemisah '-(으)니까' dan '-(으)니'",
      description: "Membedakan apakah alasan atau penemuan saat melakukan sesuatu.",
      diagnosis: "Kamu kesulitan membedakan '-(으)니까' dan '-(으)니'.",
      info: "(으)니까 = alasan / sebab. (으)니 = penemuan saat melakukan sesuatu.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (alasan)",
        "가___ 사람이 많았어요. (setiba di sana, ternyata)"
      ],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "lge-l-geoyeyo-separator": {
      name: "Cairan pemisah '-(으)ㄹ게요' dan '-(으)ㄹ 거예요'",
      description: "Garis tipis antara janji dan masa depan.",
      diagnosis: "Kamu kesulitan membedakan '-(으)ㄹ게요' dan '-(으)ㄹ 거예요'.",
      info: "(으)ㄹ게요 = kehendak / janji pembicara (제가 할게요). (으)ㄹ 거예요 = masa depan biasa / dugaan (비가 올 거예요).",
      quizQuestions: ["제가 도와___. (janji)", "내일 비가 ___. (prediksi)"],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "aseo-a-aligner": {
      name: "Obat penata '-아서/어서' dan '-아/어'",
      description: "Menata dua jalur untuk menyatakan alasan.",
      diagnosis: "Kamu kesulitan memakai '-아서/어서' dan '-아/어'.",
      info: "아서/어서 = alasan + hasil (피곤해서 잤어요). 아/어 = tindakan berurutan (가서 봤어요).",
      quizQuestions: ["피곤___ 잤어요. (alasan)", "집에 가___ 봤어요. (berurutan)"],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "causative-passive-syrup": {
      name: "Sirop konversi kausatif / pasif otomatis",
      description: "먹이다 vs 먹히다, dalam seteguk.",
      diagnosis: "Kamu kesulitan membedakan kausatif dan pasif.",
      info: "Kausatif = membuat orang lain melakukan (밥을 먹이다). Pasif = dikenai tindakan (모기에 물리다). Akhiran: 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (memberi makan)",
        "모기가 사람에게 ___. (pasif)"
      ],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    },
    "honorific-converter": {
      name: "Pengubah otomatis ke bahasa hormat",
      description: "Mengubah bahasa santai menjadi bentuk sopan otomatis.",
      diagnosis: "Kamu kesulitan dengan bahasa hormat.",
      info: "Santai + -요 = sopan (해요). Santai + -습니다/ㅂ니다 = formal (합니다).",
      quizQuestions: [
        "Apa bentuk formal dari '먹다'?",
        "Apa bentuk sopan (해요) dari '가다'?"
      ],
      callbackLabel: "Selengkapnya → di aplikasi tata bahasa Gwanggaeto (segera hadir)"
    }
  }
};
