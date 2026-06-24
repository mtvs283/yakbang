import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderReceiptEmailHtml } from "../../../lib/email/renderReceiptEmailHtml";
import { RECEIPT_FROM } from "../../../lib/email/receiptEmailConfig";
import type { ReceiptData } from "../../../lib/receiptTypes";
import { createClient, createServiceClient } from "../../../lib/supabase/server";

interface ReceiptRow {
  id: string;
  user_id: string;
  prescription_slug: string;
  issued_at: string;
  receipt_data: ReceiptData;
  recipient_name: string | null;
  recipient_email: string | null;
  email_sent: boolean;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[send-receipt] RESEND_API_KEY missing");
      return NextResponse.json({ error: "서신 발송 설정이 없소." }, { status: 500 });
    }

    const body = (await request.json()) as { receipt_id?: string };
    const receiptId = body.receipt_id?.trim();
    if (!receiptId) {
      return NextResponse.json({ error: "receipt_id가 필요하오." }, { status: 400 });
    }

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "로그인이 필요하오." }, { status: 401 });
    }

    const { data: receipt, error: fetchError } = await supabase
      .from("user_receipts")
      .select("*")
      .eq("id", receiptId)
      .single();

    if (fetchError || !receipt) {
      return NextResponse.json({ error: "영수증을 찾지 못했소." }, { status: 404 });
    }

    const row = receipt as ReceiptRow;

    if (!row.recipient_email?.trim()) {
      return NextResponse.json({ error: "서신 주소가 없소." }, { status: 400 });
    }

    if (row.email_sent) {
      return NextResponse.json({ error: "이미 발송된 영수증이오." }, { status: 409 });
    }

    const service = createServiceClient();
    const { data: profile } = await service
      .from("users")
      .select("daily_number")
      .eq("id", row.user_id)
      .maybeSingle();

    const html = renderReceiptEmailHtml({
      recipientName: row.recipient_name,
      prescriptionName: row.receipt_data.remedyName,
      issuedAt: row.issued_at,
      patientNumber: profile?.daily_number ?? null,
      amount: row.receipt_data.amount
    });

    const resend = new Resend(apiKey);
    const subject = `[약방광개토] ${row.receipt_data.remedyName} 영수증`;
    const { error: sendError } = await resend.emails.send({
      from: RECEIPT_FROM,
      to: row.recipient_email.trim(),
      subject,
      html
    });

    if (sendError) {
      console.error("[send-receipt] Resend error", sendError);
      return NextResponse.json({ error: "서신 발송에 실패했소." }, { status: 500 });
    }

    const { error: updateError } = await service
      .from("user_receipts")
      .update({ email_sent: true })
      .eq("id", receiptId)
      .eq("user_id", row.user_id);

    if (updateError) {
      console.error("[send-receipt] email_sent update failed", updateError);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[send-receipt] unexpected error", e);
    return NextResponse.json({ error: "서신 발송 중 탈이 났소." }, { status: 500 });
  }
}
