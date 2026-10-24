# 카드뉴스 사진 게시 기능 — 2026-10-24

## 구현 범위

- `/tiktok`: 연결 계정 이름 확인, 이미지 1~35장 선택, 순서 변경·삭제·표지 지정, 게시용 이미지 미리보기.
- 원본을 수정하지 않고 브라우저에서 JPEG 변환. 최대 1080×1920 또는 1920×1080, 비율 유지. 투명 배경은 흰색. 게시용 파일 한 장 최대 3MB.
- 제목·설명·공개 범위·댓글·추천 음악·AI 생성 여부·상업적 콘텐츠 설정.
- 공개 범위와 동의는 사용자가 직접 선택. 현재 테스트용 구현은 `SELF_ONLY`만 허용. 제3자 유료 광고는 비공개로 게시할 수 없으므로 게시 차단.
- 서버에서 최신 creator info 조회 후 재검증, 사진 게시 API 접수, 별도 상태 조회.
- 같은 요청 번호는 저장소의 원자적 파일 생성으로 한 번만 접수. 네트워크 오류나 5xx는 접수 여부 불명으로 표시하고 자동 재접수하지 않음.
- 완료 또는 실패 상태 조회 시 임시 이미지 삭제. 조회하지 않고 남은 이미지는 24시간이 지난 뒤 다음 업로드 때 오래된 항목 최대 100개씩 정리.
- 요청 번호는 브라우저 탭의 sessionStorage에 보관해 새로고침 후 상태 확인 가능. 인증 토큰은 브라우저 자바스크립트에 제공하지 않음.

## 저장소

기존 `NEXT_PUBLIC_SUPABASE_URL`과 서버 전용 `SUPABASE_SERVICE_ROLE_KEY` 사용. 새 의존성·새 환경변수·DB 테이블 없음.
첫 업로드 시 `tiktok-cardnews-private` 비공개 Storage 버킷을 준비하며, 같은 이름의 공개 버킷이 있으면 사용을 거부.
anon/authenticated 역할에 허용 정책을 추가하지 않음. 관리 키는 서버에서만 사용. 기존 다른 버킷·정책·데이터는 변경하지 않음.
계정 식별자는 SHA-256 해시한 경로로 구분. 이미지 제공 주소는 기존 인증 도메인의 `/api/tiktok/media?ticket=...`.
이미지 티켓은 암호화되고 24시간 뒤 만료. 쿠키 없이 틱톡이 이미지 내용을 가져갈 수 있는 한시적인 읽기 권한임.
게시 기록(JSON)은 같은 비공개 버킷에 보관하며 이미지 경로와 publish_id, 처리 상태만 포함. 토큰이나 제목·설명은 기록하지 않음. 게시 기록은 중복 방지를 위해 자동 삭제하지 않음.

## 배포 전후 확인

1. TK샘 승인 후 GitHub 반영·배포.
2. 실제 저장소 관리 키와 사용 가능한 용량은 배포 환경에서 확인 필요. 저장소 제공자의 무료 한도·비용은 별도이며 무제한 저장을 보장하지 않음.
3. Sandbox에도 홈페이지 URL prefix 소유권 인증 필요. `/api/tiktok/media`를 포함하는 루트 prefix 인증 사용.
4. 개발자 앱 심사 전에는 대상 틱톡 계정을 비공개로 설정해야 API 게시 가능. 이 기능은 계정 공개 설정을 변경하지 않음.
5. `/tiktok`에서 실제 카드 선택 → 나만 보기 → 게시 및 음악 이용 확인 동의 → 게시 → 게시 상태 확인.
6. PUBLISH_COMPLETE는 틱톡 API가 보고한 상태이며 실제 앱에서 이미지 순서·구성 확인은 TK샘 수행.

## 검증 기록

- `node --test tests/tiktok.test.mjs tests/tiktok-routes.test.cjs tests/tiktok-post.test.cjs tests/tiktok-studio.test.cjs`: 14개 통과.
- `npx tsc --noEmit`: 통과.
- `npm run build`: 통과.
- 격리된 Edge 브라우저 + 모의 API: 파일 선택과 실제 JPEG 변환, 2장 순서 변경, 미리보기, 공개 범위 기본 미선택,
  동의 전 게시 비활성, 동의 후 게시 요청, 게시 상태 확인, 모바일 폭 넘침 없음 확인.
- 실제 TikTok 게시 및 실제 Supabase 저장/삭제는 미실행. 계정 토큰·운영자 비밀번호를 읽거나 실제 게시물을 만들지 않음.
- 브라우저 검증은 모의 외부 API로 수행했으므로 TikTok 심사 통과나 실게시 성공을 증명하지 않음.

## 개인정보 안내 반영

TK샘의 2026-10-24 승인에 따라 `public/privacy.html`의 한국어·영어 안내에 아래 처리 사실과 실제 보관·정리 방식을 반영함.

“운영자가 선택한 카드뉴스 이미지와 입력한 제목·설명·게시 설정은 TikTok 게시를 위해 처리됩니다.
게시용 이미지는 Supabase의 전용 비공개 저장소에 임시 보관하며, 한시적인 읽기 주소를 통해 TikTok에 전달합니다.
틱톡 게시 결과의 완료 또는 실패를 조회하면 임시 이미지를 삭제합니다. 남아 있는 임시 이미지는 24시간 경과 후 다음 업로드 시 정리합니다.
중복 게시 방지와 결과 확인을 위한 게시 요청 번호·TikTok 게시 접수 번호·이미지 경로·처리 상태는 전용 비공개 저장소에 보관합니다.
인증 정보는 기존 방식으로 암호화해 처리합니다.”

기존 ‘액세스 토큰만 사용’, ‘제3자에게 제공하지 않음’ 문장도 실제 이미지 저장·TikTok 전달 흐름에 맞게 조정함.

## 공식 근거 (2026-10-24 확인)

- https://developers.tiktok.com/docs/en/content-posting-api-reference-photo-post
- https://developers.tiktok.com/docs/en/content-posting-api-media-transfer-guide
- https://developers.tiktok.com/docs/en/content-posting-api-reference-get-video-status
- https://developers.tiktok.com/docs/en/content-sharing-guidelines
- https://supabase.com/docs/reference/javascript/storage-createbucket
- https://supabase.com/docs/reference/javascript/storage-from-upload
