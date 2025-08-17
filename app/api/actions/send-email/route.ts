/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/actions/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
});

export async function POST(req: NextRequest) {
  try {
    const { to, subject, text, html } = await req.json();
    await transporter.sendMail({
      from: process.env.MAIL_FROM!,
      to,
      subject,
      text,
      html: html || `<pre>${text}</pre>`,
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
