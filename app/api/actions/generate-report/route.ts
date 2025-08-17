/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { tmpdir } from "os";
import path from "path";
import fs from "fs/promises";
import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph } from "docx";
import { unparse } from "papaparse";

async function writePDF(filePath: string, content: string) {
  const doc = new PDFDocument();
  const stream = (await import("node:fs")).createWriteStream(filePath);
  doc.pipe(stream);
  doc.fontSize(14).text("Summary Report", { underline: true });
  doc.moveDown().fontSize(12).text(content);
  doc.end();
  await new Promise<void>((res) => stream.on("finish", res));
}

async function writeDOCX(filePath: string, content: string) {
  const doc = new Document({
    sections: [
      { children: [new Paragraph("Summary Report"), new Paragraph(content)] },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  await fs.writeFile(filePath, buffer);
}

async function writeCSV(filePath: string, content: string) {
  const rows = content.split("\n").map((l) => [l.replace(/^[-*\s]+/, "")]);
  const csv = unparse(rows);
  await fs.writeFile(filePath, csv, "utf8");
}

export async function POST(req: NextRequest) {
  try {
    const { summary, format } = (await req.json()) as {
      summary: string;
      format: "CSV" | "PDF" | "DOCX";
    };
    const id = `${Date.now()}`;
    const outDir = path.join(tmpdir(), "reports");
    await fs.mkdir(outDir, { recursive: true });

    const fileMap = {
      PDF: path.join(outDir, `report-${id}.pdf`),
      DOCX: path.join(outDir, `report-${id}.docx`),
      CSV: path.join(outDir, `report-${id}.csv`),
    } as const;

    const outPath = fileMap[format];

    if (format === "PDF") await writePDF(outPath, summary);
    if (format === "DOCX") await writeDOCX(outPath, summary);
    if (format === "CSV") await writeCSV(outPath, summary);

    const downloadUrl = `/api/files?path=${encodeURIComponent(outPath)}`;
    return NextResponse.json({ downloadUrl });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
