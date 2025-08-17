"use server";
import { Node } from "reactflow";

export async function handleReadFile(node: Node) {
  const res = await fetch("/api/actions/read-file", {
    method: "POST",
    body: JSON.stringify({ filePath: node.data.filePath }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Read file failed");
  const { text } = await res.json();
  return text;
}

export async function handleSummarize(node: Node, inputText: string) {
  const res = await fetch("/api/actions/summarize", {
    method: "POST",
    body: JSON.stringify({ text: inputText }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Summarize failed");
  const { summary } = await res.json();
  return summary;
}

export async function handleEmail(node: Node, content: string) {
  const res = await fetch("/api/actions/email", {
    method: "POST",
    body: JSON.stringify({
      to: node.data.to,
      subject: node.data.subject,
      body: content,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Email failed");
  return "Email sent";
}

export async function handleReport(node: Node, content: string) {
  const res = await fetch("/api/actions/report", {
    method: "POST",
    body: JSON.stringify({ summary: content, format: node.data.format }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Report generation failed");
  const { downloadUrl } = await res.json();
  return downloadUrl;
}
