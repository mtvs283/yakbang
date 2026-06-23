import type { LocaleData } from "./types";

export const vi: LocaleData = {
  ui: {
    catalogTitle: "Đơn thuốc ở hiệu thuốc",
    catalogSubtitle:
      "Chọn một món thuốc và nhận đơn thuốc. Điền vào chỗ trống là nó thuộc về bạn.",
    scrollCue: "Mở danh sách đơn thuốc",
    groups: {
      pronunciation: {
        title: "Thuốc luyện phát âm",
        blurb: "Thuần phục đầu lưỡi và đôi môi"
      },
      "phonological-rule": {
        title: "Thuốc quy tắc biến âm",
        blurb: "Nắm vững các quy tắc khi âm thay đổi"
      },
      grammar: {
        title: "Thuốc ngữ pháp",
        blurb: "Dẹp yên cuộc cãi vã của trợ từ và đuôi từ"
      },
      royal: {
        title: "Bí phương hoàng cung",
        blurb: "Cống phẩm giới hạn ngoài tầm tay bạn"
      }
    },
    status: {
      available: "Đang bán",
      limited: "Hàng giới hạn",
      unavailable: "Không mua được"
    },
    cardAction: "Lấy đơn thuốc",
    footerLead:
      "Bước ra khỏi hiệu thuốc, một Gwanggaeto rộng lớn hơn đang đợi bạn.",
    enterGwanggaeto: "Vào Gwanggaeto",
    toTop: "Lên đầu",
    home: "Trang chủ",
    modalLabel: "ĐƠN THUỐC · 藥房廣開土",
    diagnosis: "Chẩn đoán",
    info: "Mô tả thuốc",
    prescription: "Đơn thuốc (điền vào chỗ trống)",
    royalReject: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
    stamp: "ĐÃ KÊ ĐƠN",
    allDone: "Bạn đã thuộc hết đơn thuốc. Món thuốc này là của bạn rồi.",
    correct: "✓ Chính xác",
    wrong: "✗ Thử lại",
    showHint: "Xem gợi ý",
    hintPrefix: "Gợi ý: ",
    answerPlaceholder: "Nhập câu trả lời",
    callbackPending: "(liên kết sắp có)",
    closeAria: "Đóng đơn thuốc",
    stockLabel: (count) => `Còn ${count}`
  },
  remedies: {
    "sejong-manuscript": {
      name: "Giáo trình Hangul viết tay của vua Sejong",
      description:
        "Sách do chính đức vua viết đó. Đến tể tướng cũng không kiếm nổi một cuốn.",
      diagnosis: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
      info: "Đã hết bản nên không bào chế thêm nữa. Cứ bắt đầu từ từ ở hiệu thuốc Gwanggaeto thường nhé.",
      quizQuestions: [],
      callbackLabel: "Thay vào đó → đến hiệu thuốc Gwanggaeto thường"
    },
    hunminjeongeum: {
      name: "Bản chú giải Hunminjeongeum",
      description: "Một bản gốc, chờ cả nghìn năm chưa chắc gặp",
      diagnosis: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
      info: "Còn đang chờ triều đình phê duyệt. Chờ nghìn năm cũng chưa chắc xong đâu, nên ghé hiệu thuốc Gwanggaeto thường nhé.",
      quizQuestions: [],
      callbackLabel: "Thay vào đó → đến hiệu thuốc Gwanggaeto thường"
    },
    "korean-friend-patience": {
      name: "Thuốc tăng kiên nhẫn cho bạn người Hàn",
      description: "Tấm lòng của người bạn chịu nghe phát âm của bạn đến cuối cùng",
      diagnosis: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
      info: "Đến tể tướng cũng không kiếm được. Nếu học ở hiệu thuốc Gwanggaeto, lòng bạn bè chắc cũng sẽ rộng ra dần đó.",
      quizQuestions: [],
      callbackLabel: "Thay vào đó → đến hiệu thuốc Gwanggaeto thường"
    },
    "hangul-creation-secret": {
      name: "Bí kíp tạo ra Hangul",
      description:
        "Bài thuốc bí mật vua Sejong cùng các học giả mất 4 năm mới luyện thành",
      diagnosis: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
      info: "Chỉ có 1 bản, mà nghe đâu đã bị niêm phong rồi. Ở hiệu thuốc Gwanggaeto thường, bạn có thể mở từng bí mật của Hangul từng gói một.",
      quizQuestions: [],
      callbackLabel: "Thay vào đó → đến hiệu thuốc Gwanggaeto thường"
    },
    "prime-minister-capsule": {
      name: "Viên nang giới hạn do tể tướng đề cử",
      description:
        "Không có thư giới thiệu viết tay của tể tướng thì không mua được đâu",
      diagnosis: "Món thuốc này nằm ngoài tầm tay của bạn rồi.",
      info: "Cần thư giới thiệu. Nhưng nếu bạn học đều ở hiệu thuốc Gwanggaeto thường, biết đâu tể tướng sẽ tự để ý đến bạn.",
      quizQuestions: [],
      callbackLabel: "Thay vào đó → đến hiệu thuốc Gwanggaeto thường"
    },
    "h-pronunciation": {
      name: "Thuốc phát âm ㅎ",
      description: "Giúp âm ㅎ lướt nhẹ rồi tan mất trong miệng",
      diagnosis: "Bạn đang gặp khó với phát âm ㅎ.",
      info: "ㅎ là phụ âm rất nhẹ trong tiếng Hàn. Ở đầu âm tiết thì chỉ có chút hơi nhẹ, còn ở batchim thì gần như không nghe rõ.",
      quizQuestions: ["Trong từ '하늘', ㅎ nằm ở đâu?", "'좋아요' → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app phụ âm Gwanggaeto"
    },
    "korean-ear": {
      name: "Tai nghe kiểu người Hàn",
      description: "Phân biệt ngay ㅓ và ㅗ",
      diagnosis: "Bạn đang gặp khó khi phân biệt ㅓ và ㅗ.",
      info: "ㅓ đọc với miệng hơi mở và khá phẳng. ㅗ thì môi tròn lại rõ hơn.",
      quizQuestions: [
        "Nguyên âm đầu trong '어머니' là gì?",
        "Nguyên âm đầu trong '오빠' là gì?",
        "'버스' và '보스' — từ nào có ㅓ?"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app nguyên âm Gwanggaeto"
    },
    "three-tier-taste": {
      name: "Vị giác phân biệt âm thường·âm bật hơi·âm căng",
      description: "Cảm nhận ㅈ ㅊ ㅉ bằng đầu lưỡi",
      diagnosis: "Bạn đang gặp khó khi phân biệt âm thường, âm bật hơi và âm căng.",
      info: "Ba âm phát ra từ cùng một vị trí — Âm thường (ㅂㄷㄱㅈ): tự nhiên, Âm bật hơi (ㅍㅌㅋㅊ): bật mạnh dứt khoát, Âm căng (ㅃㄸㄲㅉ): nhanh và mạnh.",
      quizQuestions: [
        "'바보' và '파보' — từ nào có âm bật hơi?",
        "Từ nào có âm căng ㄸ?"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app phụ âm Gwanggaeto"
    },
    "fortification-chip": {
      name: "Chip tự động căng âm",
      description: "Tự động đọc '학교' thành '학꾜'",
      diagnosis: "Bạn đang gặp khó với hiện tượng căng âm.",
      info: "Sau batchim ㄱㄷㅂ, các âm thường ㄱㄷㅂㅈㅅ phía sau thường được đọc thành âm căng ㄲㄸㅃㅉㅆ.",
      quizQuestions: ["'학교' → [______]", "'먹다' → [______]", "'국밥' → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app biến âm Gwanggaeto"
    },
    "final-7-capsule": {
      name: "Viên nang 7 âm batchim đại diện",
      description: "Một viên gom đủ ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ",
      diagnosis: "Bạn đang gặp khó với 7 âm batchim đại diện.",
      info: "Trong tiếng Hàn có 27 dạng batchim, nhưng khi phát âm thường quy về 7 âm: ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.",
      quizQuestions: [
        "Batchim của '꽃' phát âm như thế nào?",
        "Batchim của '낯' phát âm như thế nào?",
        "Batchim của '밖' phát âm như thế nào?"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app batchim Gwanggaeto"
    },
    "rk-special-capsule": {
      name: "Viên nang chuyên trị batchim ㄺ",
      description: "Chuyên xử lý batchim kép khó như 닭, 흙, 굵다",
      diagnosis: "Bạn đang gặp khó với phát âm batchim kép ㄺ.",
      info: "Khi đứng một mình hoặc trước phụ âm thì đọc là [ㄱ] như 닭→[닥]. Trước nguyên âm thì tách ra [ㄹㄱ] như 닭이→[달기].",
      quizQuestions: ["'닭' → [______]", "'닭이' → [______]", "'흙' → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app batchim kép Gwanggaeto"
    },
    "h-weakening-soothing": {
      name: "Thuốc làm dịu hiện tượng yếu hóa ㅎ",
      description: "Đọc '좋아요' tự nhiên thành '조아요'",
      diagnosis: "Bạn đang gặp khó với hiện tượng yếu hóa ㅎ.",
      info: "Khi ㅎ làm batchim, nó thường biến mất như 좋아요 → 조아요. Sau batchim ㄴㄹㅁㅇ, ㅎ phía sau cũng yếu đi như 전화 → 저놔.",
      quizQuestions: ["좋아요 → [______]", "전화 → [______]", "은행 → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app yếu hóa ㅎ Gwanggaeto"
    },
    "liaison-patch": {
      name: "Miếng dán tự động nối âm",
      description: "Tự động nối âm '한국이' thành '한구기'",
      diagnosis: "Bạn đang gặp khó với quy tắc nối âm.",
      info: "Nếu một âm tiết có batchim và âm tiết sau bắt đầu bằng nguyên âm, batchim đó sẽ được đọc như âm đầu của âm tiết sau.",
      quizQuestions: ["'한국이' → [______]", "'책을' → [______]", "'음악이' → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app biến âm Gwanggaeto"
    },
    "nasalization-inhaler": {
      name: "Ống hít mũi hóa",
      description: "Hít '국물' qua mũi thành '궁물'",
      diagnosis: "Bạn đang gặp khó với hiện tượng mũi hóa.",
      info: "Khi batchim ㄱㄷㅂ gặp ㄴ hoặc ㅁ, batchim sẽ đổi thành âm mũi ㅇㄴㅁ.",
      quizQuestions: ["'국물' → [______]", "'먹는' → [______]", "'입니다' → [______]"],
      callbackLabel: "Muốn học kỹ hơn → vào app biến âm Gwanggaeto"
    },
    "e-vs-eseo-syrup": {
      name: "Siro phân biệt '에' và '에서'",
      description: "Uống một ngụm là biết điểm đến hay nơi diễn ra hành động",
      diagnosis: "Bạn đang gặp khó khi phân biệt '에' và '에서'.",
      info: "에 dùng cho điểm đến hoặc vị trí như 학교에 가다. 에서 dùng cho nơi diễn ra hành động như 학교에서 공부하다.",
      quizQuestions: ["학교___ 공부해요.", "학교___ 가요.", "집___ 있어요."],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "eun-i-chip": {
      name: "Chip tự nhận biết '은/는' và '이/가'",
      description: "Chấm dứt cuộc chiến muôn đời giữa chủ đề và chủ ngữ",
      diagnosis: "Bạn đang gặp khó khi phân biệt '은/는' và '이/가'.",
      info: "은/는 dùng cho chủ đề, thông tin đã biết hoặc ý đối chiếu. 이/가 dùng cho chủ ngữ, thông tin mới hoặc nhấn mạnh.",
      quizQuestions: [
        "저___ 학생이에요. (tự giới thiệu)",
        "누___ 왔어요?",
        "날씨___ 좋아요."
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "do-man-separator": {
      name: "Dung dịch tách riêng '도' và '만'",
      description: "Tách rõ 도 nghĩa là cũng và 만 nghĩa là chỉ",
      diagnosis: "Bạn đang gặp khó khi phân biệt '도' và '만'.",
      info: "도 nghĩa là cũng bao gồm cái đó, như 저도 가요. 만 nghĩa là chỉ giới hạn ở cái đó, như 저만 가요.",
      quizQuestions: ["저___ 좋아해요. (tôi cũng vậy)", "저___ 좋아해요. (chỉ mình tôi)"],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "buteo-kkaji-syrup": {
      name: "Siro phạm vi '부터-까지'",
      description: "Hai cái neo cho điểm bắt đầu và điểm kết thúc",
      diagnosis: "Bạn đang gặp khó với cách nói phạm vi bằng '부터' và '까지'.",
      info: "부터 là điểm bắt đầu, 까지 là điểm kết thúc. Hai từ này thường đi thành một cặp.",
      quizQuestions: ["월요일___ 금요일까지 일해요.", "아침부터 저녁___ 공부해요."],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "nikka-ni-separator": {
      name: "Dung dịch tách '-(으)니까' và '-(으)니'",
      description: "Tách rõ là nói lý do hay nói phát hiện sau khi làm gì đó",
      diagnosis: "Bạn đang gặp khó khi phân biệt '-(으)니까' và '-(으)니'.",
      info: "'-(으)니까' dùng để nói lý do hoặc nguyên nhân. '-(으)니' thường dùng kiểu làm rồi mới phát hiện ra điều gì đó.",
      quizQuestions: [
        "비가 오___ 우산 가져가요. (lý do)",
        "가___ 사람이 많았어요. (đến nơi mới thấy)"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "lge-l-geoyeyo-separator": {
      name: "Dung dịch tách '-(으)ㄹ게요' và '-(으)ㄹ 거예요'",
      description: "Ranh giới nhỏ nhưng quan trọng giữa lời hứa và tương lai",
      diagnosis: "Bạn đang gặp khó khi phân biệt '-(으)ㄹ게요' và '-(으)ㄹ 거예요'.",
      info: "'-(으)ㄹ게요' dùng khi người nói thể hiện ý định hoặc lời hứa, như 제가 할게요. '-(으)ㄹ 거예요' dùng cho tương lai đơn giản hoặc dự đoán, như 비가 올 거예요.",
      quizQuestions: ["제가 도와___. (lời hứa)", "내일 비가 ___. (dự đoán)"],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "aseo-a-aligner": {
      name: "Thuốc sắp xếp '-아서/어서' và '-아/어'",
      description: "Sắp gọn hai nhánh diễn đạt lý do và hành động nối tiếp",
      diagnosis: "Bạn đang gặp khó khi dùng '-아서/어서' và '-아/어'.",
      info: "'-아서/어서' dùng cho lý do + kết quả, như 피곤해서 잤어요. '-아/어' dùng khi các hành động nối tiếp nhau, như 가서 봤어요.",
      quizQuestions: ["피곤___ 잤어요. (lý do)", "집에 가___ 봤어요. (hành động nối tiếp)"],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "causative-passive-syrup": {
      name: "Siro tự đổi sai khiến và bị động",
      description: "Một ngụm là phân biệt 먹이다 và 먹히다",
      diagnosis: "Bạn đang gặp khó khi phân biệt sai khiến và bị động.",
      info: "Sai khiến nghĩa là làm cho ai đó làm gì, như 밥을 먹이다. Bị động nghĩa là bị tác động, như 모기에 물리다. Các đuôi thường gặp là 이/히/리/기.",
      quizQuestions: [
        "엄마가 아기에게 밥을 ___. (làm cho ăn)",
        "모기가 사람에게 ___. (bị động)"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    },
    "honorific-converter": {
      name: "Máy tự đổi sang kính ngữ",
      description: "Tự động biến câu thân mật thành câu lịch sự",
      diagnosis: "Bạn đang gặp khó khi dùng kính ngữ.",
      info: "Thân mật + -요 thành cách nói lịch sự thân thiện như 해요. Thân mật + -습니다/ㅂ니다 thành văn phong trang trọng như 합니다.",
      quizQuestions: [
        "Dạng trang trọng của '먹다' là gì?",
        "Dạng lịch sự thân thiện của '가다' là gì?"
      ],
      callbackLabel: "Muốn học kỹ hơn → vào app ngữ pháp Gwanggaeto, sắp ra mắt"
    }
  }
};
