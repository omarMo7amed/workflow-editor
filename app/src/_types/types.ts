import { LucideIcon } from "lucide-react";

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

export type NodeType =
  | "readPdf"
  | "summarize"
  | "sendEmail"
  | "inputText"
  | "custom";

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
