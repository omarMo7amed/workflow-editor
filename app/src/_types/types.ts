/* eslint-disable @typescript-eslint/no-explicit-any */
import { LucideIcon } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Node as FlowNode } from "reactflow";

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
export type EdgeType = "animated" | "pulse" | "running" | "done" | "error";

export interface FileUploadProps {
  acceptedFileType?: string;
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
  placeholder?: string;
  className?: string;
}

export interface EditorSubHeaderPorps {
  activeTab: string;
  onActiveTab: (mode: EditorMode) => void;
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

export type State = {
  label: string;
  reportFormat: string;
  email: string;
  choosedFile: string;
  description: string;
  hasChanges: boolean;
  removeFile: boolean;
};

export type Action =
  | { type: "ready"; payload: FlowNode | undefined }
  | { type: "setLabel"; payload: string }
  | { type: "setDescription"; payload: string }
  | { type: "setReportFormat"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setChoosedFile"; payload: string }
  | { type: "removeChoosedFile" }
  | { type: "reset"; payload: FlowNode | undefined };

export interface EdgeConfig {
  strokeWidth: number;
  stroke?: string;
  filter?: string;
  animation?: string;
  markerColor: string;
  strokeDasharray?: string;
}

export interface CustomEdgeData {
  label?: string;
  showLabel?: boolean;
  edgeType?: string;
}

export interface DefaultNode {
  type: Exclude<NodeType, "note">;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export type ActiveTabsContextType = {
  left: string;
  right: string;
  currentNodeId: string | undefined;
  setCurrentNodeId: Dispatch<SetStateAction<string | undefined>>;
  setLeft: Dispatch<SetStateAction<string>>;
  setRight: Dispatch<SetStateAction<string>>;
};

export type NodeStatus = "idle" | "pending" | "running" | "success" | "error";

export type EditorMode = "Editor" | "Executions";

export interface ExecutionLog {
  id: string;
  nodeId: string;
  nodeLabel: string;
  status: NodeStatus;
  startedAt: string | null;
  finishedAt: string | null;
  output: string | null;
  choosedFile?: string;
  duration: number | null;
}

// export interface Workflow {
//   id: string;
//   user_id: string;
//   name: string;
//   description: string;
//   nodes: FlowNode[];
//   edges: FlowNode[];
//   status: Exclude<NodeStatus, "idle">;
//   settings: any;
//   created_at: string;
//   updated_at: string;
// }

export interface WorkflowDashboard {
  id: string;
  name: string;
  description: string;
  status: "success" | "error" | "pending" | "running";
  nodes: FlowNode[];
  edges: FlowNode[];
  lastRun: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  edges: FlowNode[];
  nodes: FlowNode[];
  created: string;
  lastRun: string;
  status: Exclude<NodeStatus, "idle">;
  executions: [];
}

export interface FormCreateWorkflow {
  name: string;
  description: string;
}
