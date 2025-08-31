/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Document, Packer, Paragraph } from "docx";
import { unparse } from "papaparse";
import { getCurrentUser } from "../../../_lib/auth/actions";
import { createClient } from "../../../_lib/supabase/server";
import { uploadReportByWorkflow } from "../../../_lib/data-service";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getReportFileName } from "../../../_utils/helper";

async function makePDF(content: string): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595.28, 841.89]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const titleSize = 18;
  const contentSize = 12;

  page.drawText("Summary Report", {
    x: 50,
    y: page.getHeight() - 80,
    size: titleSize,
    font,
    color: rgb(0, 0, 0),
  });

  page.drawText(content, {
    x: 50,
    y: page.getHeight() - 120,
    size: contentSize,
    font,
    color: rgb(0, 0, 0),
    lineHeight: 16,
    maxWidth: 500,
  });

  const pdfBytes = await pdfDoc.save();

  return Buffer.from(pdfBytes);
}

async function makeDOCX(content: string): Promise<Buffer> {
  const doc = new Document({
    sections: [
      { children: [new Paragraph("Summary Report"), new Paragraph(content)] },
    ],
  });
  return Buffer.from(await Packer.toBuffer(doc));
}

async function makeCSV(content: string): Promise<Buffer> {
  const rows = content.split("\n").map((l) => [l.replace(/^[-*\s]+/, "")]);
  const csv = unparse(rows);
  return Buffer.from(csv, "utf8");
}

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = await createClient();
  if (!supabase)
    return NextResponse.json(
      { error: "Supabase client not initialized" },
      { status: 500 }
    );

  try {
    const { summary, format, workflowId } = (await req.json()) as {
      summary: string;
      format: "CSV" | "PDF" | "DOCX";
      workflowId: string;
    };

    if (!summary || !format || !workflowId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (format !== "CSV" && format !== "PDF" && format !== "DOCX") {
      return NextResponse.json(
        { error: "Invalid format specified" },
        { status: 400 }
      );
    }

    let buffer: Buffer;
    if (format === "PDF") buffer = await makePDF(summary);
    else if (format === "DOCX") buffer = await makeDOCX(summary);
    else buffer = await makeCSV(summary);

    const fileName = getReportFileName(summary, format);

    const { reportUrl } = await uploadReportByWorkflow(
      workflowId,
      currentUser.id,
      buffer,
      fileName,
      format
    );

    return NextResponse.json({ data: reportUrl }, { status: 200 });
  } catch (e: any) {
    console.error("Report generation error:", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
