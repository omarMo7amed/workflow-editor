/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import { createClient } from "@/app/src/_lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    if (!path)
      return NextResponse.json({ error: "Missing path" }, { status: 400 });
    const data = await fs.readFile(path);
    // naive content-type inference

    const ct = path.endsWith(".pdf")
      ? "application/pdf"
      : path.endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "text/csv";

    return new NextResponse(data, {
      headers: {
        "Content-Type": ct,
        "Content-Disposition": `attachment; filename="${path
          .split("/")
          .pop()}"`,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const workflowId = formData.get("workflowId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Supabase storage
    const fileName = `${user.id}/${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user-files")
      .upload(fileName, file);

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Save file record to database
    const { data: fileRecord, error: dbError } = await supabase
      .from("user_files")
      .insert({
        user_id: user.id,
        workflow_id: workflowId,
        filename: file.name,
        original_filename: file.name,
        storage_path: uploadData.path,
        file_size: file.size,
        mime_type: file.type,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, file: fileRecord });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
