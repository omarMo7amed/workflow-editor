import { Node } from "reactflow";
import { initialEdges, initialNodes } from "./constants";

// export function getNodeId(nodes: Node[], label: string): string | undefined {
//   const node = nodes.find((node) => node.data.label === label);

//   return node?.id || undefined;
// }

export function focusSearchInput() {
  const searchField = document.getElementById("search-node");
  searchField?.focus();
}

export const getInitialState = () => ({
  nodeIdCounter: 1,
  labelCounters: {},
  noteCounters: {},
  editingNode: null,
  nodeContext: null,
  edgeContext: null,
  noteIdCounter: 1,
});
