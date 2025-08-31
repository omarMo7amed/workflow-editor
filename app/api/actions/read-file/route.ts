/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import path from "path";

import { getCurrentUser } from "../../../_lib/auth/actions";
import { createClient } from "../../../_lib/supabase/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filePath } = await req.json();
  if (!filePath) {
    return NextResponse.json(
      { error: "File path is required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { data: fileData, error } = await supabase.storage
    .from("user-files")
    .download(filePath);

  if (error || !fileData) {
    console.error("Supabase download error:", error);
    return NextResponse.json(
      { error: "File not found or access denied" },
      { status: 404 }
    );
  }

  const buffer = Buffer.from(await fileData.arrayBuffer());
  let text = "";
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".txt") {
    text = buffer.toString("utf8");
  } else if (ext === ".pdf") {
    // const data = await extractPdfText();
    // text = data;
  } else if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    return NextResponse.json(
      { error: `Unsupported file type: ${ext}` },
      { status: 400 }
    );
  }

  return NextResponse.json({ text }, { status: 200 });
}

// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your env
// });

// export async function extractPdfText(buffer: Buffer): Promise<string> {
//   try {
//     // First: locally parse PDF text
//     const pdfData = await PdfParse(buffer);
//     const rawText = pdfData.text;

//     // Then: clean it up with OpenAI (optional)
//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are an assistant that extracts clean, structured text from PDFs.",
//         },
//         {
//           role: "user",
//           content: rawText.slice(0, 12000), // truncate if PDF is too big
//         },
//       ],
//     });

//     return response.choices[0].message?.content ?? rawText;
//   } catch (err) {
//     console.error("Error extracting PDF text:", err);
//     return "";
//   }
// }
