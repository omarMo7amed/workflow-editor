/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import { groq } from "../../../_lib/groq/groq";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a concise summarizer for my project workflow-editor.",
        },
        {
          role: "user",
          content: `Summarize the following text in 10 bullet points. 
          The output must be plain text only (no special characters, no markdown, no tables).
          Make sure the content is compatible to be saved as PDF, DOCX, or CSV:\n\n${text}`,
        },
      ],
      temperature: 0.2,
    });

    const summary = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ data: summary });
  } catch (e: any) {
    console.error("Error summarizing text:", e);
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
