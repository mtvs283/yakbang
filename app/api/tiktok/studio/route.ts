import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { config, readSession, SESSION_COOKIE } from "../../../../lib/tiktok";
import { cleanOldImages, ensureBucket, storage } from "../../../../lib/tiktok-storage";
import { BUCKET, Creator, imageTicket, MAX_IMAGE_BYTES, ownerKey, PostError, PostInput, readImageTicket, tiktokApi, uuidPattern, validateJpeg, validatePost } from "../../../../lib/tiktok-post";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;
type Job = { state: "submitting" | "accepted" | "rejected" | "uncertain"; publishId?: string; paths: string[]; error?: string; code?: string };
const json = (value: object, status = 200) => NextResponse.json(value, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  let initiated = false;
  try {
    const cfg = config();
    if (request.headers.get("origin") !== cfg.origin) throw new PostError("허용되지 않은 요청이에요.", 403);
    const session = readSession(request.cookies.get(SESSION_COOKIE)?.value, cfg.secret);
    if (!session || session.expiresAt <= Date.now()) throw new PostError("틱톡 연결을 갱신한 뒤 다시 시도해 주세요.", 401, "session_expired");
    if (!session.scope.split(",").includes("video.publish")) throw new PostError("직접 게시 권한 동의가 필요해요.", 403);
    const owner = ownerKey(session.openId), action = request.nextUrl.searchParams.get("action");
    if (action === "creator") {
      const creator = await tiktokApi("creator_info/query", session.accessToken);
      if (!creator || !Array.isArray(creator.privacy_level_options) || typeof creator.creator_nickname !== "string")
        throw new PostError("계정 정보를 확인할 수 없어요.", 502);
      return json({ creator: { creator_nickname: creator.creator_nickname, creator_username: creator.creator_username,
        comment_disabled: !!creator.comment_disabled, privacy_level_options: creator.privacy_level_options.filter((x: string) => x === "SELF_ONLY") } });
    }
    if (action === "upload") {
      const length = Number(request.headers.get("content-length"));
      if (length > MAX_IMAGE_BYTES || request.headers.get("content-type") !== "image/jpeg") throw new PostError("JPEG 이미지를 한 장씩 올려 주세요.");
      const bytes = Buffer.from(await request.arrayBuffer());
      validateJpeg(bytes);
      const bucket = await ensureBucket();
      await cleanOldImages(owner);
      const path = `${owner}/${randomUUID()}.jpg`;
      const { error } = await bucket.upload(path, bytes, { contentType: "image/jpeg", upsert: false, cacheControl: "0" });
      if (error) throw new PostError("이미지를 저장하지 못했어요.", 503, "storage_upload_failed");
      return json({ ticket: imageTicket(path, owner, cfg.secret) });
    }
    const length = Number(request.headers.get("content-length"));
    if (length > 150000) throw new PostError("요청이 너무 커요.", 413);
    const input = await request.json();
    if (action === "discard") {
      if (!Array.isArray(input.images) || input.images.length > 35) throw new PostError("이미지 목록을 확인해 주세요.");
      const paths = input.images.map((x: string) => readImageTicket(x, cfg.secret, owner).path);
      if (paths.length) {
        const { error } = await storage().from(BUCKET).remove(paths);
        if (error) throw new PostError("임시 이미지 삭제를 완료하지 못했어요.", 503);
      }
      return json({ deleted: true });
    }
    if (!uuidPattern.test(input.requestId || "")) throw new PostError("게시 요청 번호를 확인해 주세요.");
    const bucket = await ensureBucket(), jobPath = `${owner}/job-${input.requestId}.json`;
    const getJob = async (): Promise<Job | null> => {
      const { data, error } = await bucket.download(jobPath);
      if (error) {
        if (["400", "404"].includes(String(error.status))) return null;
        throw new PostError("게시 기록을 읽지 못했어요.", 503);
      }
      return data ? JSON.parse(await data.text()) : null;
    };
    const saveJob = async (job: Job) => {
      const { error } = await bucket.upload(jobPath, JSON.stringify(job), { contentType: "application/json", upsert: true });
      if (error) throw new PostError("게시 기록을 저장하지 못했어요. 중복 게시를 피하려면 다시 게시하지 말고 틱톡 앱을 확인해 주세요.", 503, "job_save_failed");
    };
    if (action === "status") {
      const job = await getJob();
      if (!job) throw new PostError("게시 기록을 찾지 못했어요.", 404);
      if (!job.publishId) return json({ state: job.state, error: job.error, code: job.code });
      const data = await tiktokApi("status/fetch", session.accessToken, { publish_id: job.publishId });
      let cleanupPending = false;
      if (["PUBLISH_COMPLETE", "FAILED"].includes(data.status)) {
        const { error } = await bucket.remove(job.paths);
        cleanupPending = !!error;
      }
      return json({ state: "accepted", status: data.status, reason: typeof data.fail_reason === "string" ? data.fail_reason : "", cleanupPending });
    }
    if (action !== "publish") throw new PostError("알 수 없는 요청이에요.");
    const old = await getJob();
    if (old) return json({ state: old.state, error: old.error, code: old.code });
    const creator: Creator = await tiktokApi("creator_info/query", session.accessToken);
    validatePost(input as PostInput, creator);
    const images = input.images.map((x: string) => ({ ticket: x, ...readImageTicket(x, cfg.secret, owner) }));
    if (images.some((x: { expiresAt: number }) => x.expiresAt < Date.now() + 3600000)) throw new PostError("이미지를 다시 선택해 주세요. 게시 처리용 이미지의 유효기간이 부족해요.");
    for (const image of images) {
      const { error } = await bucket.info(image.path);
      if (error) throw new PostError("선택한 이미지가 저장소에 없어요. 이미지를 다시 올려 주세요.");
    }
    const job: Job = { state: "submitting", paths: images.map((x: { path: string }) => x.path) };
    // Atomic create: concurrent/retried requests cannot initialize the same post twice.
    const locked = await bucket.upload(jobPath, JSON.stringify(job), { contentType: "application/json", upsert: false });
    if (locked.error) {
      const existing = await getJob();
      if (existing) return json({ state: existing.state, error: existing.error, code: existing.code });
      throw new PostError("게시 요청을 시작하지 못했어요.", 503);
    }
    initiated = true;
    try {
      const data = await tiktokApi("content/init", session.accessToken, {
        media_type: "PHOTO", post_mode: "DIRECT_POST", is_aigc: input.aigc,
        post_info: { title: input.title, description: input.description, privacy_level: input.privacy,
          disable_comment: !input.comments, auto_add_music: input.music, brand_content_toggle: input.branded, brand_organic_toggle: input.ownBrand },
        source_info: { source: "PULL_FROM_URL", photo_cover_index: input.cover,
          photo_images: images.map((x: { ticket: string }) => `${cfg.origin}/api/tiktok/media?ticket=${encodeURIComponent(x.ticket)}`) }
      });
      if (typeof data?.publish_id !== "string" || !data.publish_id) throw new Error("No publish id");
      job.state = "accepted"; job.publishId = data.publish_id;
      await saveJob(job);
      return json({ state: "accepted" });
    } catch (error) {
      // A timeout/5xx could follow acceptance. Never retry initialization automatically.
      if (job.publishId) throw error;
      job.state = error instanceof PostError ? "rejected" : "uncertain";
      job.error = error instanceof PostError ? error.message : "게시 접수 여부를 확인하지 못했어요.";
      job.code = error instanceof PostError ? error.code : "unknown_outcome";
      if (job.state === "uncertain") job.error = "게시 접수 여부를 확인하지 못했어요. 다시 게시하지 말고 틱톡 앱에서 먼저 확인해 주세요.";
      await saveJob(job);
      return json({ state: job.state, error: job.error, code: job.code });
    }
  } catch (error) {
    if (error instanceof PostError) return json({ error: error.message, code: error.code, safeToRetry: !initiated }, error.status);
    return json({ error: "요청을 처리하지 못했어요. 설정과 연결 상태를 확인해 주세요.", code: "server_error" }, 500);
  }
}
