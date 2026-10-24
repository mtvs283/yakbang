import { createClient } from "@supabase/supabase-js";
import { BUCKET, PostError } from "./tiktok-post";

export function storage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new PostError("이미지 저장소의 서버 설정이 필요해요.", 503, "storage_config");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (url, options) => fetch(url, { ...options, signal: AbortSignal.timeout(15000) }) } }).storage;
}
export async function ensureBucket() {
  const client = storage();
  let result = await client.getBucket(BUCKET);
  if (result.error) {
    const created = await client.createBucket(BUCKET, { public: false, fileSizeLimit: 4 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "application/json"] });
    if (created.error && !["409", "400"].includes(String(created.error.status)))
      throw new PostError("이미지 저장소를 준비하지 못했어요.", 503, "storage_unavailable");
    result = await client.getBucket(BUCKET);
  }
  if (result.error || !result.data || result.data.public) throw new PostError("전용 비공개 저장소를 확인해 주세요.", 503, "storage_unavailable");
  return client.from(BUCKET);
}
export async function cleanOldImages(owner: string) {
  const bucket = storage().from(BUCKET);
  const { data } = await bucket.list(owner, { limit: 100, search: ".jpg", sortBy: { column: "created_at", order: "asc" } });
  const expired = (data || []).filter(x => x.name.endsWith(".jpg") && x.created_at && Date.parse(x.created_at) < Date.now() - 86400000);
  if (expired.length) await bucket.remove(expired.map(x => `${owner}/${x.name}`));
}
