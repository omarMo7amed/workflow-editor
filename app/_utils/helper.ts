import toast from "react-hot-toast";
import {
  EditorMode,
  NodeStatus,
  NodeType,
  UploadedFile,
} from "../_types/types";
import { NodeStatusConfig } from "./constants";
import { Node } from "reactflow";
import crypto from "crypto";

export function focusSearchInput() {
  const searchField = document.getElementById("search-node");
  searchField?.focus();
}

export const getInitialState = () => ({
  nodeMap: new Map(),
  edgeMap: new Map(),
  isLoading: false,
  nodeIdCounter: 1,
  edgeIdCounter: 1,
  noteIdCounter: 0,
  executionProgress: 0,
  executions: [],
  mode: "Editor" as EditorMode,
  labelCounters: {},
  currentExecutedNode: null,
  currentNodeId: null,
  reservedFilesByNode: new Map(),
  reservedFilesByFile: new Map(),
  uploadedFiles: [],
  editingNode: null,
  stats: { success: 0, error: 0, duration: 0, total: 0 },
  isExecuting: false,
  nodeContext: null,
  nodesLength: 1,
  edgeContext: null,
});

export function calcCoordinatesOfNode(
  id: number,
  type: string
): { x: number; y: number } {
  const gridSize = 5;
  const spacingX = type === "note" ? 250 : 150;
  const spacingY = 150;

  const row = Math.floor(id / gridSize);
  const col = id % gridSize;

  const x = type === "note" ? col * spacingX + 500 : col * spacingX + 100;
  const y = type === "note" ? row * spacingX + 100 : row * spacingY + 150;

  return { x, y };
}

export function getDefaultConfigForType(type: NodeType) {
  switch (type) {
    case "readFile":
      return { extractMode: "full", fileId: "" };
    case "summarize":
      return { prompt: "Summarize this", model: "gpt-3.5", maxTokens: 300 };
    case "email":
      return { recipient: "", subject: "", body: "", attachPDF: false };
    case "report":
      return {
        reportType: "PDF",
        includeSummary: true,
        includeAttachments: false,
      };
    default:
      return {};
  }
}

export function getNodeStatusStyles(status: NodeStatus) {
  return {
    iconColor: {
      idle: "text-gray-600",
      pending: "text-gray-500",
      running: "text-blue-600",
      success: "text-green-600",
      error: "text-red-600",
    }[status],
    statusIconColor: {
      idle: "text-gray-400",
      pending: "text-gray-400",
      running: "text-blue-500",
      success: "text-green-500",
      error: "text-red-500",
    }[status],
    animation: NodeStatusConfig[status].animation,
  };
}

export function validateFiles(
  files: File[],
  uploadedFiles: UploadedFile[],
  acceptedFileTypes: Record<string, string>,
  maxFileSize: number,
  maxTotalFiles: number
): File[] {
  const existingKeys = new Set(
    uploadedFiles.map((f) => `${f.filename}-${f.file_size}`)
  );

  const validFiles: File[] = [];

  for (const file of files) {
    const key = `${file.name}-${file.size}`;
    const sizeMB = file.size / (1024 * 1024);

    if (!acceptedFileTypes[file.type]) {
      toast.error(`this type not allowed`);
      continue;
    }

    if (sizeMB > maxFileSize) {
      toast.error(`${file.name} exceeds ${maxFileSize}MB`);
      continue;
    }

    if (existingKeys.has(key)) {
      toast.error(`${file.name} is already uploaded`);
      continue;
    }

    validFiles.push(file);
    existingKeys.add(key);
  }

  if (uploadedFiles.length + validFiles.length > maxTotalFiles) {
    toast.error(`Only ${maxTotalFiles} files are allowed in total`);
    return [];
  }

  return validFiles;
}

export function createNode(
  type: NodeType,
  id: string,
  label: string,
  position: { x: number; y: number }
): Node {
  switch (type) {
    case "readFile":
      return {
        id,
        type,
        position,
        data: {
          id,
          label,
          type,
          status: "idle",
          fileName: "",
          filePath: "",
          output: "",
        },
      };

    case "summarize":
      return {
        id,
        type,
        position,
        data: {
          id,
          label,
          input: "",
          output: "",
          type,
          status: "idle",
          summaryLength: 200,
          instructions: "Summarize the content",
        },
      };

    case "email":
      return {
        id,
        type,
        position,
        data: {
          id,
          label,
          type,
          status: "idle",
          to: "",
          subject: "",
          body: "",
        },
      };

    case "report":
      return {
        id,
        type,
        position,
        data: {
          id,
          label,
          type,
          input: "",
          output: "",
          status: "idle",
          reportFormat: "PDF",
        },
      };

    case "note":
      return {
        id,
        type,
        position,
        data: {
          id,
          label,
          type,
          description: "",
        },
      };

    default:
      throw new Error(`Unsupported node type: ${type}`);
  }
}

export async function handleReadFile(filePath: string) {
  const res = await fetch("/api/actions/read-file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filePath }),
  });

  const data = await res.json();

  return data;
}

export async function handleSummarize(inputText: string) {
  const res = await fetch("/api/actions/summarize", {
    method: "POST",
    body: JSON.stringify({ text: inputText }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  return data;
}

export async function handleEmail(
  to: string,
  body: { summary: string; reportUrl?: string }
) {
  if (!to) {
    toast.error("Email required , provide email address in node settings");
    return;
  }
  if (!body) {
    toast.error("No content to send, please provide content in node settings");
    return;
  }

  const res = await fetch("/api/actions/send-email", {
    method: "POST",
    body: JSON.stringify({
      to,
      subject: "Your file content successfully summarized🥳",
      body: body.summary,
      fileUrl: body.reportUrl || "",
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!data.error) {
    data.data = body;
  }

  return data;
}

export async function handleReport(
  format: "CSV" | "PDF" | "DOCX",
  content: string,
  workflowId: string
) {
  const res = await fetch("/api/actions/generate-report", {
    method: "POST",
    body: JSON.stringify({ summary: content, format, workflowId }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  return data;
}

export async function downloadReport(reportUrl: string) {
  const isPDF = reportUrl.toLowerCase().includes(".pdf");
  const link = document.createElement("a");
  link.href = reportUrl;

  if (isPDF) link.target = "_blank";
  else link.download = reportUrl.split("/").pop() || "report";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getReportFileName(summary: string, format: string): string {
  const hash = crypto
    .createHash("md5")
    .update(summary)
    .digest("hex")
    .slice(0, 11);
  return `report-${hash}.${format.toLowerCase()}`;
}

export function formatTimeDifference(dateString?: string): string {
  if (!dateString) return "Never";
  const inputDate = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - inputDate.getTime();

  if (diffMs < 0) return "in the future";

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diffMs < hour) {
    const minutes = Math.ceil(diffMs / minute);
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else if (diffMs < day) {
    const hours = Math.floor(diffMs / hour);
    return `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (diffMs < month) {
    const days = Math.floor(diffMs / day);
    return `${days} day${days === 1 ? "" : "s"}`;
  } else if (diffMs < year) {
    const months = Math.floor(diffMs / month);
    return `${months} month${months === 1 ? "" : "s"}`;
  } else {
    const years = (diffMs / year).toFixed(1);
    return `${years} year${years === "1.0" ? "" : "s"}`;
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-800 border-green-200";
    case "running":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "pending":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "error":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
