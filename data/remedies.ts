export interface Remedy {
  id: string;
  name: string;
  price: string;
  status: string;
  description: string;
  category: "royal";
}

export const royalRemedies: Remedy[] = [
  {
    id: "sejong-handbook",
    name: "세종대왕 친필 한글 교본",
    price: "5억 냥",
    status: "절판",
    description: "임금이 친히 쓰신 교본이오. 영의정도 한 권 못 구함.",
    category: "royal"
    prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '절판되어 더 이상 빚지 않소. 광개토 일반 약방에서 차근차근 시작하시오.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  },
  {
  id: 'sejong-manuscript',
  name: '세종대왕 친필 한글 교본',
  category: 'royal',
  price: { amount: 500000000, currency: 'nyang' },
  status: 'unavailable',
  description: '임금이 친히 쓰신 교본이오. 영의정도 한 권 못 구함.',
  prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '절판되어 더 이상 빚지 않소. 광개토 일반 약방에서 차근차근 시작하시오.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  }
},
{
  id: 'hunminjeongeum',
  name: '훈민정음 해례본',
  category: 'royal',
  price: { amount: 100000000, currency: 'nyang' },
  status: 'unavailable',
  description: '원본 한 부, 천 년의 기다림',
  prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '어전회의 결재 대기 중이오. 천 년을 기다려도 결재가 안 나니 광개토 일반 약방에서.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  }
},
{
  id: 'korean-friend-patience',
  name: '한국인 친구 인내심 부스터',
  category: 'royal',
  price: { amount: 0, currency: 'nyang' },
  status: 'unavailable',
  description: '그대의 발음을 끝까지 들어줄 친구의 마음',
  prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '영의정도 못 구함. 광개토 약방에서 학습하시면 친구의 마음도 점점 너그러워지오.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  }
},
{
  id: 'hangul-creation-secret',
  name: '한글창제 비방',
  category: 'royal',
  price: { amount: 300000000, currency: 'nyang' },
  status: 'unavailable',
  description: '세종이 학자들과 4년 걸려 빚은 비밀의 처방',
  prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '한정 1부, 이미 어딘가 봉인됨. 광개토 일반 약방에서 한글의 비밀을 한 첩씩.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  }
},
{
  id: 'prime-minister-capsule',
  name: '영의정 추천 한정 캡슐',
  category: 'royal',
  price: { amount: 70000000, currency: 'nyang' },
  status: 'unavailable',
  description: '영의정의 친필 추천서 없이는 살 수 없소',
  prescription: {
    diagnosis: '이 약은 그대의 손이 닿지 않는 곳에 있소.',
    info: '추천서 필요. 광개토 일반 약방에서 꾸준히 학습하시면 영의정이 알아서 추천하실지도.',
    quiz: [],
    callback: { label: '대신 → 광개토 일반 약방으로', url: 'TBD' }
  }
}
  {
  id: 'h-pronunciation',
  name: 'ㅎ 발음약',
  category: 'pronunciation',
  price: { amount: 500, currency: 'won' },
  status: 'available',
  description: 'ㅎ을 입 안에서 살랑 사라지게 하오',
  prescription: {
    diagnosis: '그대는 ㅎ 발음에 어려움을 겪고 있소.',
    info: 'ㅎ은 한국어에서 가장 약한 자음 — 첫소리에선 살짝 입김, 받침에선 거의 안 들림.',
    quiz: [
      { question: "'하늘'에서 ㅎ은 어디에 있나요?", answer: '첫소리', options: ['첫소리', '받침', '없음'] },
      { question: "'좋아요' → [ ]", answer: '조아요', hint: '받침 ㅎ은 사라짐' }
    ],
    callback: { label: '더 자세히는 → 광개토 자음 앱에서', url: 'TBD: hangul-consonants' }
  }
},
{
  id: 'korean-ear',
  name: '한국인 귀',
  category: 'pronunciation',
  price: { amount: 3000, currency: 'won' },
  status: 'available',
  description: 'ㅓ와 ㅗ를 단번에 구별하시오',
  prescription: {
    diagnosis: '그대는 ㅓ와 ㅗ 구별에 어려움을 겪고 있소.',
    info: 'ㅓ는 입을 살짝 벌리고 평평하게, ㅗ는 입술을 둥글게 모음.',
    quiz: [
      { question: "'어머니'에서 첫 모음은?", answer: 'ㅓ' },
      { question: "'오빠'에서 첫 모음은?", answer: 'ㅗ' },
      { question: "'버스'와 '보스' — 어느 게 ㅓ?", answer: '버스' }
    ],
    callback: { label: '더 자세히는 → 광개토 모음 앱에서', url: 'TBD: hangul-vowels' }
  }
},
{
  id: 'three-tier-taste',
  name: '평음·격음·경음 미각',
  category: 'pronunciation',
  price: { amount: 5000, currency: 'won' },
  status: 'available',
  description: 'ㅈ ㅊ ㅉ를 혀끝으로 느끼시오',
  prescription: {
    diagnosis: '그대는 평음/격음/경음 구별에 어려움을 겪고 있소.',
    info: '같은 자리에서 세 가지 강도 — 평음(ㅂㄷㄱㅈ)은 자연스럽게, 격음(ㅍㅌㅋㅊ)은 거센 입김, 경음(ㅃㄸㄲㅉ)은 짧고 강하게.',
    quiz: [
      { question: "'바보'와 '파보' — 어느 게 격음?", answer: '파보' },
      { question: '경음 ㄸ가 들어간 단어는?', answer: '딸', options: ['달', '탈', '딸'] }
    ],
    callback: { label: '더 자세히는 → 광개토 자음 앱에서', url: 'TBD: hangul-consonants' }
  }
},
{
  id: 'fortification-chip',
  name: '경음화 자동칩',
  category: 'pronunciation',
  price: { amount: 2000, currency: 'won' },
  status: 'available',
  description: '"학교"를 "학꾜"로 자동 발음',
  prescription: {
    diagnosis: '그대는 경음화 발음에 어려움을 겪고 있소.',
    info: '받침 ㄱㄷㅂ 다음에 오는 평음(ㄱㄷㅂㅈㅅ)은 경음(ㄲㄸㅃㅉㅆ)으로 발음.',
    quiz: [
      { question: "'학교' → [ ]", answer: '학꾜' },
      { question: "'먹다' → [ ]", answer: '먹따' },
      { question: "'국밥' → [ ]", answer: '국빱' }
    ],
    callback: { label: '더 자세히는 → 광개토 음운변동 앱에서', url: 'TBD' }
  }
},
{
  id: 'final-7-capsule',
  name: '받침 7대표음 캡슐',
  category: 'pronunciation',
  price: { amount: 7000, currency: 'won' },
  status: 'available',
  description: 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ 한 알에',
  prescription: {
    diagnosis: '그대는 받침 7대표음 발음에 어려움을 겪고 있소.',
    info: '한국어 받침은 27개지만 발음은 7개로 통일 — ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ.',
    quiz: [
      { question: "'꽃' 받침은 어떻게 발음?", answer: 'ㄷ' },
      { question: "'낯' 받침은 어떻게 발음?", answer: 'ㄷ' },
      { question: "'밖' 받침은 어떻게 발음?", answer: 'ㄱ' }
    ],
    callback: { label: '더 자세히는 → 광개토 받침 앱에서', url: 'TBD: hangul-batchim' }
  }
},
{
  id: 'rk-special-capsule',
  name: '받침 ㄺ 전문 캡슐',
  category: 'pronunciation',
  price: { amount: 10000, currency: 'won' },
  status: 'limited',
  stock: 3,
  description: '닭, 흙, 굵다 — 어려운 겹받침 특화',
  prescription: {
    diagnosis: '그대는 겹받침 ㄺ 발음에 어려움을 겪고 있소.',
    info: '단독/자음 앞은 [ㄱ] (닭→[닥]), 모음 앞은 [ㄹㄱ] (닭이→[달기]).',
    quiz: [
      { question: "'닭' → [ ]", answer: '닥' },
      { question: "'닭이' → [ ]", answer: '달기' },
      { question: "'흙' → [ ]", answer: '흑' }
    ],
    callback: { label: '더 자세히는 → 광개토 복합받침 앱에서', url: 'TBD: hangul-complex' }
  }
  {
  id: 'e-vs-eseo-syrup',
  name: "'에' vs '에서' 구별 시럽",
  category: 'grammar',
  price: { amount: 4000, currency: 'won' },
  status: 'available',
  description: '도착인지 행위 장소인지 한 모금에',
  prescription: {
    diagnosis: "그대는 '에'와 '에서' 구별에 어려움을 겪고 있소.",
    info: '에 = 도착점/위치 (학교에 가다). 에서 = 행위 장소 (학교에서 공부하다).',
    quiz: [
      { question: '학교___ 공부해요.', answer: '에서' },
      { question: '학교___ 가요.', answer: '에' },
      { question: '집___ 있어요.', answer: '에' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'eun-i-chip',
  name: "'은/는' vs '이/가' 자동 판별 칩",
  category: 'grammar',
  price: { amount: 7000, currency: 'won' },
  status: 'available',
  description: '주제와 주어의 영원한 다툼 종결',
  prescription: {
    diagnosis: "그대는 '은/는'과 '이/가' 구별에 어려움을 겪고 있소.",
    info: '은/는 = 주제(이미 아는 정보, 대조). 이/가 = 주어(새 정보, 강조).',
    quiz: [
      { question: '저___ 학생이에요. (자기소개)', answer: '는' },
      { question: '누___ 왔어요?', answer: '가' },
      { question: '날씨___ 좋아요.', answer: '가' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'do-man-separator',
  name: "'도/만' 분리액",
  category: 'grammar',
  price: { amount: 5000, currency: 'won' },
  status: 'available',
  description: '추가의 도와 한정의 만, 한 모금에 분리',
  prescription: {
    diagnosis: "그대는 '도'와 '만' 구별에 어려움을 겪고 있소.",
    info: '도 = 그것도 포함 (저도 가요). 만 = 그것만 한정 (저만 가요).',
    quiz: [
      { question: '저___ 좋아해요. (나도 같이)', answer: '도' },
      { question: '저___ 좋아해요. (나 혼자)', answer: '만' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'buteo-kkaji-syrup',
  name: "'부터-까지' 범위 시럽",
  category: 'grammar',
  price: { amount: 5000, currency: 'won' },
  status: 'available',
  description: '시작과 끝의 두 닻',
  prescription: {
    diagnosis: "그대는 '부터'와 '까지'의 범위 표현에 어려움을 겪고 있소.",
    info: '부터 = 시작점, 까지 = 종결점. 보통 짝으로 사용.',
    quiz: [
      { question: '월요일___ 금요일까지 일해요.', answer: '부터' },
      { question: '아침부터 저녁___ 공부해요.', answer: '까지' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'nikka-ni-separator',
  name: "'-(으)니까' vs '-(으)니' 분리액",
  category: 'grammar',
  price: { amount: 3000, currency: 'won' },
  status: 'available',
  description: '이유인지 발견인지 명확하게',
  prescription: {
    diagnosis: "그대는 '-(으)니까'와 '-(으)니' 구별에 어려움을 겪고 있소.",
    info: '(으)니까 = 이유/원인 (비 와서 우산 가져가요). (으)니 = 가서 보니 발견.',
    quiz: [
      { question: '비가 오___ 우산 가져가요. (이유)', answer: '니까' },
      { question: '가___ 사람이 많았어요. (가서 보니)', answer: '니' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'lge-l-geoyeyo-separator',
  name: "'-(으)ㄹ게요' vs '-(으)ㄹ 거예요' 분리액",
  category: 'grammar',
  price: { amount: 3000, currency: 'won' },
  status: 'available',
  description: '약속과 미래의 미묘한 경계',
  prescription: {
    diagnosis: "그대는 '-(으)ㄹ게요'와 '-(으)ㄹ 거예요' 구별에 어려움을 겪고 있소.",
    info: '(으)ㄹ게요 = 화자의 의지/약속 (제가 할게요). (으)ㄹ 거예요 = 단순 미래/추측 (비가 올 거예요).',
    quiz: [
      { question: '제가 도와___. (약속)', answer: 'ㄹ게요' },
      { question: '내일 비가 ___. (예측)', answer: '올 거예요' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'aseo-a-aligner',
  name: "'-아서/어서' vs '-아/어' 정렬약",
  category: 'grammar',
  price: { amount: 4000, currency: 'won' },
  status: 'available',
  description: '이유 표현 두 갈래 정렬',
  prescription: {
    diagnosis: "그대는 '-아서/어서'와 '-아/어' 사용에 어려움을 겪고 있소.",
    info: '아서/어서 = 이유 + 결과 (피곤해서 잤어요). 아/어 = 순차 행동 (가서 봤어요).',
    quiz: [
      { question: '피곤___ 잤어요. (이유)', answer: '해서' },
      { question: '집에 가___ 봤어요. (순차)', answer: '서' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'causative-passive-syrup',
  name: '사동/피동 자동 변환 시럽',
  category: 'grammar',
  price: { amount: 10000, currency: 'won' },
  status: 'limited',
  stock: 5,
  description: '먹이다 vs 먹히다, 한 모금에',
  prescription: {
    diagnosis: '그대는 사동/피동 구별에 어려움을 겪고 있소.',
    info: '사동 = 시키다 (밥을 먹이다). 피동 = 당하다 (모기에 물리다). 어미: 이/히/리/기.',
    quiz: [
      { question: '엄마가 아기에게 밥을 ___. (먹게 함)', answer: '먹이다' },
      { question: '모기가 사람에게 ___. (피동)', answer: '물리다' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
},
{
  id: 'honorific-converter',
  name: '존댓말 자동 변환기',
  category: 'grammar',
  price: { amount: 20000, currency: 'won' },
  status: 'limited',
  stock: 2,
  description: '반말이 자동으로 격식체로',
  prescription: {
    diagnosis: '그대는 존댓말 사용에 어려움을 겪고 있소.',
    info: '반말 + -요 = 두루높임 (해요). 반말 + -습니다/ㅂ니다 = 격식체 (합니다).',
    quiz: [
      { question: "'먹다' 격식체는?", answer: '먹습니다' },
      { question: "'가다' 두루높임은?", answer: '가요' }
    ],
    callback: { label: '더 자세히는 → 광개토 문법 앱에서 (곧 출시)', url: 'TBD' }
  }
}
}
];
