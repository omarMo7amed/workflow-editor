import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import { OnEdgesChange, OnNodesChange } from "reactflow";

export interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: 0 | 1 | 2;
  vx: number;
  vy: number;
}

export interface Connection {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ObjectiveCardProps {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface TableOfContentsProps {
  activeSection?: string;
  side?: "left" | "right";
  children?: ReactNode;
  activeTab?: string;
}

export interface docsNavigationItems {
  id: string;
  title: string;
  level: number;
}

export interface PortfolioValueCardProps {
  id: string;
  title: string;
  items: string[];
}

export interface DevObjective {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface TechnologiesTypes {
  name: string;
  desc: string;
}

export type StepProps = {
  step: {
    icon: LucideIcon;
    label: string;
    color: string; // e.g., "bg-slate-600"
  };
  index: number;
  activeStep: number;
  length: number;
};

export type NodeType = "readFile" | "summarize" | "email" | "report" | "note";

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    input?: unknown;
    output?: unknown;
    config?: Record<string, unknown>;
  };
}

export interface Workflow {
  id: string;
  name: string;
  createdAt: string;
  nodes: WorkflowNode[];
  edges: Edge[];
}

export interface FileUploadProps {
  onFilesUpload?: (files: File[]) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  multiple?: boolean;
}

export interface UploadFilesListProps {
  files: File[];
  removeFile: (index: number) => void;
}

export interface ChildrenType {
  children: ReactNode;
}

export interface SearchFieldProps {
  query: string;
  setQuery: (x: string) => void;
}

export interface EditorSubHeaderPorps {
  activeTab: string;
  onActiveTab: (tab: string) => void;
}

export type availableNodeType = {
  type: NodeType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export interface ContextMenu<T> {
  position: { x: number; y: number };
  item: T;
}

export interface FlowState {
  nodeMap: Map<string, Node>;
  edgeMap: Map<string, Edge>;
  nodeIdCounter: number;
  labelCounters: Record<string, number>;
  editingNode: Node | null;
  nodeContext: ContextMenu<Node> | null;
  edgeContext: ContextMenu<Edge> | null;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  getNodes: () => Node[];
  getEdges: () => Edge[];
  getCurrentNode: (id: string) => Node | undefined;

  addNode: (
    type: NodeType,
    label?: string,
    position?: { x: number; y: number }
  ) => void;
  addEdge: (edge: Edge) => void;
  // addNote: (type: string, label?: string) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  duplicateNode: (node: Node) => void;
  editNode: (id: string, label: string, type: string) => void;
  changeEdgeType: (id: string, type: string) => void;
  toggleEdgeLabel: (id: string) => void;

  setEditingNode: (node: Node | null) => void;
  setNodeContext: (context: ContextMenu<Node>) => void;
  setEdgeContext: (context: ContextMenu<Edge>) => void;
  clearContexts: () => void;
  clearWorkflow: () => void;
}
