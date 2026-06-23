import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";

// 매직링크 콜백: ?code 를 세션으로 교환(쿠키 저장) 후 원래 페이지로.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/shop";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/shop?login_error=1`);
}
