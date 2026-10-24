import { createHash } from "node:crypto";
import { seal, unseal } from "./tiktok";

export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const BUCKET = "tiktok-cardnews-private";
export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export const ownerKey = (openId: string) => createHash("sha256").update(openId).digest("hex");
export class PostError extends Error {
  constructor(message: string, public status = 400, public code = "invalid_request") { super(message); }
}
export type Creator = { creator_nickname: string; creator_username: string; privacy_level_options: string[]; comment_disabled: boolean };
export type PostInput = { title: string; description: string; privacy: string; consent: boolean; comments: boolean;
  music: boolean; aigc: boolean; commercial: boolean; ownBrand: boolean; branded: boolean; cover: number; images: string[]; requestId: string };

export function validatePost(input: PostInput, creator: Pick<Creator, "privacy_level_options" | "comment_disabled">) {
  if (!input || typeof input.title !== "string" || input.title.length > 90 || typeof input.description !== "string" || input.description.length > 4000)
    throw new PostError("제목은 90자, 설명은 4,000자 이내로 입력해 주세요.");
  if (!uuidPattern.test(input.requestId || "")) throw new PostError("게시 요청 번호가 올바르지 않아요.");
  if (!Array.isArray(input.images) || input.images.length < 1 || input.images.length > 35 ||
    input.images.some(x => typeof x !== "string" || x.length > 3500) || new Set(input.images).size !== input.images.length)
    throw new PostError("서로 다른 이미지 1~35장을 선택해 주세요.");
  if (!Number.isInteger(input.cover) || input.cover < 0 || input.cover >= input.images.length) throw new PostError("표지 이미지를 확인해 주세요.");
  if (input.privacy !== "SELF_ONLY" || !creator.privacy_level_options.includes(input.privacy))
    throw new PostError("현재 테스트에서는 ‘나만 보기’ 게시만 지원해요.");
  for (const key of ["consent", "comments", "music", "aigc", "commercial", "ownBrand", "branded"] as const)
    if (typeof input[key] !== "boolean") throw new PostError("게시 설정을 확인해 주세요.");
  if (!input.consent) throw new PostError("게시와 음악 이용 확인에 동의해 주세요.");
  if (creator.comment_disabled && input.comments) throw new PostError("이 계정은 댓글 허용을 사용할 수 없어요.");
  if ((input.commercial && !input.ownBrand && !input.branded) || (!input.commercial && (input.ownBrand || input.branded)))
    throw new PostError("상업적 콘텐츠 유형을 선택해 주세요.");
  if (input.branded) throw new PostError("타사 유료 광고 콘텐츠는 ‘나만 보기’로 게시할 수 없어요.");
}

type ImageTicket = { kind: "image"; path: string; owner: string; expiresAt: number };
export function imageTicket(path: string, owner: string, secret: string) {
  return seal({ kind: "image", path, owner, expiresAt: Date.now() + 86400000 }, secret);
}
export function readImageTicket(value: string, secret: string, owner?: string): ImageTicket {
  const data = unseal<ImageTicket>(value, secret);
  if (!data || data.kind !== "image" || !/^[a-f0-9]{64}$/.test(data.owner) ||
    typeof data.path !== "string" || !data.path.startsWith(`${data.owner}/`) ||
    !uuidPattern.test(data.path.slice(65, -4)) || !data.path.endsWith(".jpg") ||
    (owner !== undefined && data.owner !== owner) || !Number.isFinite(data.expiresAt) || data.expiresAt < Date.now())
    throw new PostError("이미지 인증이 만료됐거나 올바르지 않아요. 이미지를 다시 선택해 주세요.", 403);
  return data;
}

export function validateJpeg(bytes: Buffer) {
  if (bytes.length < 16 || bytes.length > MAX_IMAGE_BYTES || bytes[0] !== 255 || bytes[1] !== 216 ||
    bytes[bytes.length - 2] !== 255 || bytes[bytes.length - 1] !== 217) throw new PostError("3MB 이하의 JPEG 이미지가 필요해요.");
  let offset = 2;
  while (offset + 4 < bytes.length) {
    if (bytes[offset] !== 255) break;
    const marker = bytes[offset + 1], length = bytes.readUInt16BE(offset + 2);
    if (length < 2 || offset + 2 + length > bytes.length) break;
    if ([192, 193, 194].includes(marker) && length >= 8) {
      const height = bytes.readUInt16BE(offset + 5), width = bytes.readUInt16BE(offset + 7);
      if (width < 1 || height < 1 || Math.min(width, height) > 1080 || Math.max(width, height) > 1920)
        throw new PostError("이미지 크기는 최대 1080×1920 또는 1920×1080이에요.");
      return { width, height };
    }
    offset += length + 2;
  }
  throw new PostError("JPEG 이미지 정보를 읽을 수 없어요.");
}

const apiMessages: Record<string, string> = {
  unaudited_client_can_only_post_to_private_accounts: "심사 전에는 틱톡 계정을 비공개로 설정해야 테스트 게시가 가능해요. 계정 변경은 TK샘이 틱톡 앱에서 결정해 주세요.",
  url_ownership_unverified: "Sandbox의 URL properties에서 홈페이지 주소 인증이 필요해요.",
  access_token_invalid: "틱톡 연결을 갱신하거나 다시 연결해 주세요.",
  scope_not_authorized: "직접 게시 권한에 동의한 뒤 다시 연결해 주세요.",
  spam_risk_too_many_posts: "틱톡의 일일 게시 한도에 도달했어요.",
  rate_limit_exceeded: "요청이 많아요. 잠시 뒤 다시 확인해 주세요."
};
export async function tiktokApi(path: "creator_info/query" | "content/init" | "status/fetch", accessToken: string, body: object = {}) {
  const response = await fetch(`https://open.tiktokapis.com/v2/post/publish/${path}/`, {
    method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(15000)
  });
  if (response.status >= 500) throw new Error("TikTok service unavailable; outcome unknown");
  const result = await response.json();
  if (!response.ok || result.error?.code !== "ok") {
    const code = typeof result.error?.code === "string" ? result.error.code : "api_error";
    throw new PostError(apiMessages[code] || "틱톡 요청이 거절됐어요. 오류 코드와 게시 상태를 확인해 주세요.", 400, /^[a-z_]+$/.test(code) ? code : "api_error");
  }
  return result.data;
}
