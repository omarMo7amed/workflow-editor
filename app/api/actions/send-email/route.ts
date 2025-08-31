/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body, fileUrl } = await req.json();

    const preview = body
      ? body.split(/\s+/).slice(0, 50).join(" ") + "..."
      : "<i>No content provided</i>";

    if (!to) {
      return NextResponse.json(
        { error: "Recipient email is required" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: process.env.MAIL_FROM!,
      to,
      subject: subject || "No subject",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color:#333;">
        <p><strong>Here’s a preview of your file content:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; color: #555; margin: 10px 0;">
          ${preview}
        </blockquote>
    
        ${
          fileUrl
            ? `
              <p>You can download the full file using the link below:</p>
              <a href="${fileUrl}" 
                 style="display:inline-block; padding:10px 20px; color:#fff; background:#007bff; 
                        text-decoration:none; border-radius:5px; font-weight:bold; margin: 10px 0;" 
                 download="summarized_file">
                📥 Download File
              </a>
              <p style="font-size: 12px; color:#888; margin-top:8px;">
                <em>Note: This link will expire in 2 hours. Please make sure to download your file before then.</em>
              </p>
            `
            : ""
        }
      </div>
    `,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Email error:", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
