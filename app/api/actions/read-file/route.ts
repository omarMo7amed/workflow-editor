/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import mammoth from "mammoth";
import path from "path";

import { getCurrentUser } from "../../../_lib/auth/actions";
import { createClient } from "../../../_lib/supabase/server";

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
  } else if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value;
  } else {
    return NextResponse.json(
      { error: `Unsupported file type: ${ext}` },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: text }, { status: 200 });
}
