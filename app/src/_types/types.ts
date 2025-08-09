import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
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

export interface FileUploadProps {
  onFilesUpload?: (files: File[]) => void;
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
