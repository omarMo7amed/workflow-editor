import { NodeType } from "../_types/types";

export function focusSearchInput() {
  const searchField = document.getElementById("search-node");
  searchField?.focus();
}

export const getInitialState = () => ({
  nodeIdCounter: 1,
  noteIdCounter: 0,

  labelCounters: {},
  reservedFilesByNode: new Map(),
  reservedFilesByFile: new Map(),
  uploadedFiles: [],
  editingNode: null,
  nodeContext: null,
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
