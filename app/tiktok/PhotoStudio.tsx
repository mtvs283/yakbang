"use client";

import { useEffect, useRef, useState } from "react";
type Creator = { creator_nickname: string; creator_username: string; privacy_level_options: string[]; comment_disabled: boolean };
type Card = { id: string; name: string; blob: Blob; preview: string; ticket?: string };
type Result = { state?: string; status?: string; error?: string; code?: string; reason?: string; cleanupPending?: boolean };
const labels: Record<string, string> = { PROCESSING_UPLOAD: "이미지 처리 중", PROCESSING_DOWNLOAD: "틱톡에서 이미지를 가져오는 중",
  PUBLISH_COMPLETE: "게시 완료 — 틱톡 앱의 ‘나만 보기’ 게시물을 확인해 주세요.", FAILED: "게시 실패",
  SEND_TO_USER_INBOX: "틱톡 알림함으로 전송됐어요. 앱에서 확인해 주세요." };

async function api(action: string, body: unknown = {}): Promise<any> {
  const response = await fetch(`/api/tiktok/studio?action=${action}`, {
    method: "POST", headers: { "Content-Type": body instanceof Blob ? "image/jpeg" : "application/json" },
    body: body instanceof Blob ? body : JSON.stringify(body)
  });
  let data;
  try { data = await response.json(); } catch { throw new Error("서버 응답을 읽지 못했어요. 게시를 누른 뒤라면 상태 확인을 눌러 주세요."); }
  if (!response.ok) {
    const error = new Error([data.error, data.code].filter(Boolean).join(" · ")) as Error & { safeToRetry?: boolean };
    error.safeToRetry = data.safeToRetry === true;
    throw error;
  }
  return data;
}
async function prepare(file: File): Promise<Card> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 20 * 1024 * 1024)
    throw new Error("JPG·PNG·WebP 파일을 선택해 주세요. 원본은 한 장당 20MB 이하여야 해요.");
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 50000000) throw new Error("이미지 해상도가 너무 커요. 5천만 화소 이하로 줄여 주세요.");
    const portrait = bitmap.height >= bitmap.width;
    const scale = Math.min(1, (portrait ? 1080 : 1920) / bitmap.width, (portrait ? 1920 : 1080) / bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(bitmap.width * scale)); canvas.height = Math.max(1, Math.floor(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("브라우저에서 이미지 미리보기를 만들 수 없어요.");
    context.fillStyle = "white"; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("이미지 변환 실패")), "image/jpeg", 0.92));
    if (blob.size > 3 * 1024 * 1024) throw new Error("변환 이미지가 3MB를 넘어요. 원본을 줄여 주세요.");
    return { id: crypto.randomUUID(), name: file.name, blob, preview: URL.createObjectURL(blob) };
  } finally { bitmap.close(); }
}

export default function PhotoStudio() {
  const [creator, setCreator] = useState<Creator | null>(null), [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState(""), [description, setDescription] = useState(""), [privacy, setPrivacy] = useState("");
  const [comments, setComments] = useState(false), [music, setMusic] = useState(false), [aigc, setAigc] = useState(false);
  const [commercial, setCommercial] = useState(false), [ownBrand, setOwnBrand] = useState(false), [branded, setBranded] = useState(false);
  const [consent, setConsent] = useState(false), [cover, setCover] = useState(""), [active, setActive] = useState(0);
  const [busy, setBusy] = useState(false), [notice, setNotice] = useState(""), [error, setError] = useState("");
  const [requestId, setRequestId] = useState(""), [result, setResult] = useState<Result | null>(null);
  const cardsRef = useRef<Card[]>([]), lock = useRef(false);
  useEffect(() => { cardsRef.current = cards; }, [cards]);
  useEffect(() => () => { cardsRef.current.forEach(x => URL.revokeObjectURL(x.preview)); }, []);
  async function loadCreator() {
    setError("");
    try {
      const data = await api("creator"); setCreator(data.creator);
      if (data.creator.comment_disabled) setComments(false);
    } catch (e) { setError((e as Error).message); setCreator(null); }
  }
  useEffect(() => { void loadCreator(); }, []);
  useEffect(() => {
    const saved = sessionStorage.getItem("tiktok-cardnews-request");
    if (saved) { setRequestId(saved); setNotice("이전 게시 요청이 있어요. 게시 상태를 먼저 확인해 주세요."); }
  }, []);
  const frozen = busy || !!requestId;
  const done = result?.status === "PUBLISH_COMPLETE" || result?.status === "FAILED" || result?.state === "rejected";
  async function select(files: FileList | null) {
    if (!files || lock.current || frozen) return;
    if (cards.length + files.length > 35) { setError("이미지는 최대 35장까지 선택할 수 있어요."); return; }
    lock.current = true; setBusy(true); setError("");
    const added: Card[] = [];
    try {
      for (const file of Array.from(files)) added.push(await prepare(file));
      setCards(old => [...old, ...added]); setCover(old => old || added[0]?.id || ""); setConsent(false);
    } catch (e) { added.forEach(x => URL.revokeObjectURL(x.preview)); setError((e as Error).message); }
    finally { lock.current = false; setBusy(false); }
  }
  function move(index: number, delta: number) {
    const next = [...cards], target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]]; setCards(next); setActive(target); setConsent(false);
  }
  function remove(index: number) {
    const next = cards.filter((_, i) => i !== index); URL.revokeObjectURL(cards[index].preview);
    setCards(next); if (cards[index].id === cover) setCover(next[0]?.id || ""); setActive(0); setConsent(false);
  }
  async function checkStatus(id = requestId) {
    if (!id || lock.current) return;
    lock.current = true; setBusy(true); setError("");
    try { setResult(await api("status", { requestId: id })); setNotice(""); }
    catch (e) { setError((e as Error).message); }
    finally { lock.current = false; setBusy(false); }
  }
  async function publish() {
    if (lock.current || requestId || !creator || !consent || !privacy || !cards.length) return;
    lock.current = true; setBusy(true); setError(""); setResult(null);
    const uploaded: string[] = [];
    let submitting = false;
    try {
      for (let i = 0; i < cards.length; i++) {
        setNotice(`이미지 준비 중 ${i + 1}/${cards.length}`);
        const data = await api("upload", cards[i].blob); uploaded.push(data.ticket);
      }
      const id = crypto.randomUUID();
      sessionStorage.setItem("tiktok-cardnews-request", id); setRequestId(id); submitting = true;
      setNotice("틱톡에 게시 요청을 보내고 있어요.");
      const response = await api("publish", { requestId: id, images: uploaded, title, description, privacy, comments, music, aigc,
        commercial, ownBrand, branded, consent, cover: cards.findIndex(x => x.id === cover) });
      setResult(response); setNotice("접수는 게시 완료와 달라요. ‘게시 상태 확인’을 눌러 주세요.");
    } catch (e) {
      if ((e as Error & { safeToRetry?: boolean }).safeToRetry) {
        submitting = false; setRequestId(""); sessionStorage.removeItem("tiktok-cardnews-request");
      }
      setError((e as Error).message);
      setNotice(submitting ? "중복 게시를 피하려면 ‘게시 상태 확인’과 틱톡 앱을 먼저 확인해 주세요." : "게시 요청은 보내지 않았어요.");
      if (!submitting && uploaded.length) {
        try { await api("discard", { images: uploaded }); } catch { setNotice("게시 요청은 보내지 않았어요. 임시 이미지 삭제는 완료하지 못했어요."); }
      }
    } finally { lock.current = false; setBusy(false); }
  }
  async function reset() {
    if (!done || lock.current) return;
    sessionStorage.removeItem("tiktok-cardnews-request"); setRequestId(""); setResult(null); setNotice(""); setError("");
    cards.forEach(x => URL.revokeObjectURL(x.preview)); setCards([]); setCover(""); setActive(0); setConsent(false);
    await loadCreator();
  }
  const canPost = !!creator && cards.length > 0 && !!privacy && consent && !busy && !requestId &&
    (!commercial || ownBrand || branded) && !branded;
  return <section className="studio" aria-label="카드뉴스 게시">
    <h2>카드뉴스 만들기</h2>
    {creator ? <p>게시 계정: <strong>{creator.creator_nickname}</strong> (@{creator.creator_username})</p> :
      <p>계정 정보를 확인하고 있어요. <button type="button" onClick={loadCreator} disabled={busy}>다시 확인</button></p>}
    <p>Sandbox 테스트 · 현재는 ‘나만 보기’만 지원해요. 심사 전 게시에는 틱톡 계정도 비공개로 설정해야 해요.</p>
    {error && <p role="alert" className="studio-error">{error}</p>}
    {notice && <p role="status" className="studio-notice">{notice}</p>}
    <fieldset disabled={frozen}>
      <legend>1. 이미지 선택과 순서</legend>
      <label htmlFor="card-images">JPG·PNG·WebP 이미지 1~35장</label>
      <input id="card-images" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => { void select(e.target.files); e.target.value = ""; }} />
      <p>원본은 그대로 두고, 게시용 JPEG를 최대 1080×1920 크기로 비율을 유지해 변환해요. 투명 배경은 흰색이 돼요.</p>
      <ol className="studio-cards">{cards.map((card, index) => <li key={card.id}>
        {/* Local object URLs are deliberately rendered without an image optimization service. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.preview} alt={`${index + 1}번 카드 ${card.name}`} />
        <span>{index + 1}. {card.name}</span>
        <div><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`${index + 1}번 카드 앞으로`}>←</button>
          <button type="button" onClick={() => move(index, 1)} disabled={index === cards.length - 1} aria-label={`${index + 1}번 카드 뒤로`}>→</button>
          <button type="button" onClick={() => remove(index)}>삭제</button></div>
        <label><input type="radio" name="cover" checked={cover === card.id} onChange={() => { setCover(card.id); setConsent(false); }} /> 표지</label>
      </li>)}</ol>
    </fieldset>
    {cards.length > 0 && <section className="studio-preview" aria-label="게시 미리보기">
      <h3>미리보기 · {Math.min(active + 1, cards.length)}/{cards.length}</h3>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cards[active]?.preview || cards[0].preview} alt={`${active + 1}번 카드 미리보기`} />
      <div><button type="button" disabled={active <= 0} onClick={() => setActive(x => x - 1)}>이전</button>
        <button type="button" disabled={active >= cards.length - 1} onClick={() => setActive(x => x + 1)}>다음</button></div>
      <h4>{title || "제목"}</h4><p style={{ whiteSpace: "pre-wrap" }}>{description}</p>
    </section>}
    <fieldset disabled={frozen}>
      <legend>2. 게시 설정</legend>
      <label htmlFor="post-title">제목 ({title.length}/90)</label>
      <input id="post-title" value={title} maxLength={90} onChange={e => { setTitle(e.target.value); setConsent(false); }} />
      <label htmlFor="post-description">설명·해시태그 ({description.length}/4000)</label>
      <textarea id="post-description" value={description} maxLength={4000} rows={4} onChange={e => { setDescription(e.target.value); setConsent(false); }} />
      <label htmlFor="post-privacy">공개 범위</label>
      <select id="post-privacy" value={privacy} onChange={e => { setPrivacy(e.target.value); setConsent(false); }}>
        <option value="">직접 선택해 주세요</option>{creator?.privacy_level_options.includes("SELF_ONLY") && <option value="SELF_ONLY">나만 보기</option>}
      </select>
      <label><input type="checkbox" checked={comments} disabled={creator?.comment_disabled} onChange={e => { setComments(e.target.checked); setConsent(false); }} /> 댓글 허용{creator?.comment_disabled ? " (틱톡 계정 설정으로 사용 불가)" : ""}</label>
      <label><input type="checkbox" checked={music} onChange={e => { setMusic(e.target.checked); setConsent(false); }} /> 틱톡 추천 음악 자동 추가</label>
      <label><input type="checkbox" checked={aigc} onChange={e => { setAigc(e.target.checked); setConsent(false); }} /> AI 생성 이미지 포함</label>
      <label><input type="checkbox" checked={commercial} onChange={e => { setCommercial(e.target.checked); setOwnBrand(false); setBranded(false); setConsent(false); }} /> 브랜드·상품·서비스를 홍보하는 콘텐츠</label>
      {commercial && <div>
        <label><input type="checkbox" checked={ownBrand} onChange={e => { setOwnBrand(e.target.checked); setConsent(false); }} /> 내 브랜드 홍보</label>
        <label><input type="checkbox" checked={branded} onChange={e => { setBranded(e.target.checked); setConsent(false); }} /> 타사 유료 광고</label>
        {ownBrand && <p>게시물에 ‘홍보 콘텐츠’ 표시가 붙어요.</p>}
        {branded && <p role="alert">‘유료 파트너십’ 콘텐츠는 ‘나만 보기’로 게시할 수 없어요.</p>}
      </div>}
      <p>게시 버튼을 누르면 전용 저장소에 이미지를 임시 업로드해 틱톡으로 전달해요. 최종 상태 확인 시 삭제하며, 남은 이미지는 24시간 뒤 다음 업로드 때 정리해요.</p>
      <label><input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} /> 미리보기와 게시 계정을 확인했으며 게시 및 <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noreferrer">틱톡 음악 이용 확인</a>에 동의합니다.</label>
    </fieldset>
    <button className="studio-primary" type="button" disabled={!canPost} onClick={publish}>{busy ? "처리 중…" : "나만 보기로 게시"}</button>
    {requestId && <section aria-label="게시 결과">
      <h3>게시 결과</h3>
      <p>{result?.status ? labels[result.status] || `처리 상태: ${result.status}` : result?.state === "accepted" ? "접수 완료 · 틱톡 처리 결과 확인이 필요해요." : result?.error || "게시 접수 여부를 확인해 주세요."}</p>
      {result?.code && <p>오류 코드: {result.code}</p>}{result?.reason && <p>실패 사유: {result.reason}</p>}
      {result?.cleanupPending && <p>임시 이미지 삭제가 지연됐어요. 상태 확인을 다시 누르면 재시도해요.</p>}
      <button type="button" disabled={busy} onClick={() => checkStatus()}>게시 상태 확인</button>
      {done && <button type="button" disabled={busy} onClick={reset}>새 카드뉴스 만들기</button>}
      {!done && <p>결과가 불명확하면 중복 게시를 피하도록 새 게시를 막아요. 틱톡 앱도 함께 확인해 주세요.</p>}
    </section>}
  </section>;
}
