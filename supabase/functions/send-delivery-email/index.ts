// @ts-nocheck
// Supabase Edge Function (Deno 런타임). Next 빌드와 무관 — Supabase에 따로 배포.
// 약방 사극톤 배달 이메일 발송 (Resend). delivery_emails 의 pending 건을 처리.
//
// 배포:   supabase functions deploy send-delivery-email
// 시크릿: supabase secrets set RESEND_API_KEY=... SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=...
// 스케줄: Supabase Dashboard → Edge Functions → send-delivery-email → Schedule → 매일 1회(cron)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const FROM = Deno.env.get("DELIVERY_FROM") ?? "광개토약방 <noreply@xn--vh3bp4o.kr>";

type TemplateType = "shipped" | "arrived" | "reminder";

function buildEmail(type: TemplateType, ctx: { name: string; remedy?: string }) {
  switch (type) {
    case "shipped":
      return {
        subject: `약방에서 서신을 보냈소이다 — ${ctx.remedy ?? "약"} 배달 시작`,
        html: `<p>환자 ${ctx.name}이시여,</p><p>주문하신 <b>${ctx.remedy ?? "약"}</b>을 약방에서 보냈소이다. 배달이 시작되었으니 곧 거처에 닿을 것이오.</p><p>— 광개토약방</p>`
      };
    case "arrived":
      return {
        subject: "약이 거처에 도착하였소이다",
        html: `<p>환자 ${ctx.name}이시여,</p><p>약이 거처에 무사히 도착하였소이다. 처방대로 드시고 한국어에 밝아지시오.</p><p>— 광개토약방</p>`
      };
    case "reminder":
      return {
        subject: `환자 ${ctx.name}, 잘 지내시오?`,
        html: `<p>환자 ${ctx.name}이시여, 그간 잘 지내셨소? 약방에서 새 약이 나왔소이다. 한번 들르시오.</p><p>— 광개토약방</p>`
      };
  }
}

async function sendViaResend(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ from: FROM, to, subject, html })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // 보낼 때가 된 pending 건 조회
  const { data: jobs, error } = await supabase
    .from("delivery_emails")
    .select("id, user_id, template_type, scheduled_at, purchase_id, purchases(remedy_id), users(display_name, email)")
    .eq("status", "pending")
    .lte("scheduled_at", new Date().toISOString())
    .limit(50);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  let sent = 0;
  let failed = 0;
  for (const job of jobs ?? []) {
    const email = job.users?.email;
    const name = job.users?.display_name ?? "그대";
    const remedy = job.purchases?.remedy_id;
    const tpl = (job.template_type ?? "shipped") as TemplateType;
    try {
      if (!email) throw new Error("이메일 없음");
      const { subject, html } = buildEmail(tpl, { name, remedy });
      await sendViaResend(email, subject, html);
      await supabase
        .from("delivery_emails")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", job.id);
      sent++;
    } catch (_e) {
      await supabase
        .from("delivery_emails")
        .update({ status: "failed" })
        .eq("id", job.id);
      failed++;
    }
  }

  return new Response(JSON.stringify({ sent, failed }), {
    headers: { "Content-Type": "application/json" }
  });
});
