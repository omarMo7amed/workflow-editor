import { EditorMode, NodeStatus, NodeType } from "../_types/types";
import { NodeStatusConfig } from "./constants";

export function focusSearchInput() {
  const searchField = document.getElementById("search-node");
  searchField?.focus();
}

export const getInitialState = () => ({
  nodeIdCounter: 1,
  noteIdCounter: 0,
  executionProgress: 0,
  executions: [],
  mode: "Editor" as EditorMode,
  labelCounters: {},
  currentExecutedNode: null,
  reservedFilesByNode: new Map(),
  reservedFilesByFile: new Map(),
  uploadedFiles: [],
  editingNode: null,
  stats: { success: 0, error: 0, duration: 0, total: 0 },
  isExecuting: false,
  nodeContext: null,
  nodesLength: 0,
  edgeContext: null,
});

export function calcCoordinatesOfNode(
  id: number,
  type: string
): { x: number; y: number } {
  const x = type === "note" ? (id / 10) * 1000 + 500 : (id / 10) * 500 + 300;

  const y = type === "note" ? (id / 10) * 100 + 100 : (id / 10) * 100 + 100;

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

export const getNodeStatusStyles = (status: NodeStatus) => ({
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
});
