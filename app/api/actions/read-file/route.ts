import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  console.log("omar ");
  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const ext = path.extname(file.name).toLowerCase();
  let text = "";

  if (ext === ".txt") {
    text = buffer.toString("utf8");
  } else if (ext === ".pdf") {
    const data = await pdf(buffer);
    text = data.text;
  } else if (ext === ".docx") {
    const tmpPath = path.join(os.tmpdir(), file.name);
    await fs.writeFile(tmpPath, buffer);
    const result = await mammoth.extractRawText({ path: tmpPath });
    text = result.value;
  } else {
    return NextResponse.json(
      { error: "Unsupported file type" },
      { status: 400 }
    );
  }

  return NextResponse.json({ text });
}
