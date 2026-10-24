import { NextRequest, NextResponse } from "next/server";
import { config } from "../../../../lib/tiktok";
import { BUCKET, readImageTicket } from "../../../../lib/tiktok-post";
import { storage } from "../../../../lib/tiktok-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const image = readImageTicket(request.nextUrl.searchParams.get("ticket") || "", config().secret);
    const { data, error } = await storage().from(BUCKET).download(image.path);
    if (error || !data) return new NextResponse(null, { status: 404 });
    return new NextResponse(data, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer" } });
  } catch { return new NextResponse(null, { status: 403 }); }
}
