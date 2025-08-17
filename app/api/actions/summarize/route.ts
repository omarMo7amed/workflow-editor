/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/actions/summarize/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise summarizer." },
        { role: "user", content: `Summarize in 5 bullet points:\n\n${text}` },
      ],
      temperature: 0.2,
    });

    const summary = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ summary });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || String(e) },
      { status: 500 }
    );
  }
}
