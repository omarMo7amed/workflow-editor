import {
  BarChart,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  FileEdit,
  FileText,
  Mail,
  XCircle,
} from "lucide-react";
import {
  availableNodeType,
  DefaultNode,
  DevObjective,
  EdgeConfig,
  EdgeType,
  docsNavigationItems as NavigationItems,
  NodeStatus,
  NodeType,
  PortfolioValueCardProps,
  TechnologiesTypes,
} from "../_types/types";
import { Edge, Node } from "reactflow";
import ReadFileConfig from "../_components/Editor/config-nodes/ReadFileConfig";
import ReportConfig from "../_components/Editor/config-nodes/ReportConfig";
import EmailConfig from "../_components/Editor/config-nodes/EmailConfig";

export const docsNavigationItems: NavigationItems[] = [
  { id: "overview", title: "Overview", level: 1 },
  { id: "what-is-this", title: "What is the AI Workflow Editor?", level: 1 },
  { id: "target-audience", title: "Target Audience", level: 2 },
  { id: "development-objectives", title: "Development Objectives", level: 1 },
  { id: "architecture-mastery", title: "Architecture Mastery", level: 2 },
  { id: "ux-innovation", title: "UX Innovation", level: 2 },
  { id: "ai-integration", title: "AI Integration", level: 2 },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    level: 2,
  },
  { id: "tech-stack", title: "Technology Stack", level: 1 },
  {
    id: "frontend-architecture",
    title: "Frontend-Only Architecture",
    level: 1,
  },
  { id: "portfolio-value", title: "Portfolio & Reference Value", level: 1 },
  { id: "how-it-helps", title: "How it Helps", level: 2 },
  { id: "no-backend-needed", title: "No Backend Required", level: 2 },
  { id: "smart-ai-features", title: "Smart AI Features", level: 2 },
  { id: "documentation-purpose", title: "About This Documentation", level: 1 },
];

export const devObjectives: DevObjective[] = [
  {
    id: "architecture-mastery",
    icon: "A",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Architecture Mastery",
    description:
      "Experience our drag-and-drop interface that makes complex automation simple. Built with scalable architecture and smart state management, so your workflows run smoothly whether you're processing one document or thousands.",
  },
  {
    id: "ux-innovation",
    icon: "U",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    title: "UX Innovation",
    description:
      "Every click, drag, and interaction is designed to feel natural and responsive. Real-time feedback, smooth animations, and intuitive navigation help you focus on your work, not learning the tool.",
  },
  {
    id: "ai-integration",
    icon: "I",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "AI Integration",
    description:
      "Connect to multiple AI services including GPT-4, Claude, and specialized models. Process documents, generate summaries, extract data, and automate content creation with industry-leading AI capabilities.",
  },
  {
    id: "performance-optimization",
    icon: "P",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    title: "Performance Optimization",
    description:
      "Advanced caching, smart resource management, and optimized processing ensure your workflows run quickly and reliably, even with large documents and complex automation chains.",
  },
];

export const portfolioValues: PortfolioValueCardProps[] = [
  {
    id: "how-it-helps",
    title: "How This Tool Helps You",
    items: [
      "Visually automate tasks without writing code",
      "Extract and summarize content from PDFs",
      "Send processed information via email automatically",
      "Use simple drag-and-drop to build your flow",
    ],
  },
  {
    id: "no-backend-needed",
    title: "No Backend Required",
    items: [
      "Everything works inside your browser",
      "No account or signup needed to use the tool",
      "You can save your progress automatically",
      "Mock APIs simulate server behavior safely",
    ],
  },
  {
    id: "smart-ai-features",
    title: "Smart AI Features",
    items: [
      "Reads PDF content for you instantly",
      "Summarizes long text using OpenAI",
      "Automatically connects one step to another",
      "Provides real-time visual feedback while executing",
    ],
  },
];

export const Technologies: TechnologiesTypes[] = [
  {
    name: "Next.ts",
    desc: "App Router with Server Actions for seamless backend communication",
  },
  { name: "TypeScript", desc: "Type-safe development for robust code" },
  {
    name: "Tailwind CSS",
    desc: "Utility-first styling for modern, responsive UI",
  },
];

export const Libraries = [
  {
    name: "React Flow",
    desc: "Advanced node-based editor with custom nodes, edges, and minimap",
  },
  {
    name: "Zustand",
    desc: "Lightweight state management with persistence and middleware",
  },
  {
    name: "Framer Motion",
    desc: "High-performance animations and gesture handling",
  },
  {
    name: "Lucide React",
    desc: "Icon library for building consistent, elegant UI with lightweight SVG icons",
  },
];

export const Integrations: TechnologiesTypes[] = [
  {
    name: "Supabase",
    desc: "Authentication, database, and storage for secure and scalable data management",
  },
  {
    name: "Groq API",
    desc: "AI-powered text summarization for workflow execution results",
  },
];

export const flowDemoSteps = [
  { icon: FileText, label: "Read PDF", color: "bg-slate-600" },
  { icon: Brain, label: "AI Process", color: "bg-slate-700" },
  { icon: Mail, label: "Send Email", color: "bg-slate-800" },
];

export const nodeList: availableNodeType[] = [
  { type: "readFile", label: "Read File", icon: FileText },
  { type: "email", label: "Send Email", icon: Mail },
  { type: "report", label: "Generate Report", icon: BarChart },
  { type: "summarize", label: "Summarize", icon: BookOpen },
];

export const availableNodes: Record<NodeType, string> = {
  readFile: "Read File",
  summarize: "Summarize",
  email: "Send Email",
  report: "Generate Report",
  note: "Note",
};

export const nodeConfig = {
  readFile: {
    icon: FileText,
    borderClass: {
      default: "border-emerald-400",
      selected: "border-emerald-600",
      hover: "hover:border-emerald-400",
    },
    bgGradient: "from-emerald-50 to-emerald-100",
    hoverGradient: "hover:from-emerald-100 hover:to-emerald-200",
    focusShadow: "focus:shadow-[0_0_0_6px_rgba(16,185,129,0.4)]",
    iconColor: "text-emerald-500",
    handleColor: "bg-emerald-500",
    receptorColor: "rgba(16,185,129,1)",
    textColor: "text-gray-600",
  },
  email: {
    icon: Mail,
    borderClass: {
      default: "border-slate-400",
      selected: "border-slate-600",
      hover: "hover:border-slate-400",
    },
    bgGradient: "from-slate-200 to-slate-100",
    hoverGradient: "hover:from-slate-100 hover:to-slate-200",
    focusShadow: "focus:shadow-[0_0_0_6px_rgba(71,85,105,0.3)]",
    iconColor: "text-slate-600",
    handleColor: "bg-slate-600",
    receptorColor: "rgba(71,85,105,1)",
    textColor: "text-slate-700",
  },
  report: {
    icon: BarChart3,
    borderClass: {
      default: "border-blue-400",
      selected: "border-blue-600",
      hover: "hover:border-blue-400",
    },
    bgGradient: "from-blue-50 to-slate-50",
    hoverGradient: "hover:from-slate-50 hover:to-blue-50",
    focusShadow: "focus:shadow-[0_0_0_6px_rgba(59,130,246,0.3)]",
    iconColor: "text-blue-700",
    handleColor: "bg-blue-600",
    receptorColor: "rgba(59,130,246,1)",
    textColor: "text-slate-700",
  },
  summarize: {
    icon: FileEdit,
    borderClass: {
      default: "border-amber-400",
      selected: "border-amber-600",
      hover: "hover:border-amber-400",
    },
    bgGradient: "from-amber-50 to-amber-100",
    hoverGradient: "hover:from-amber-100 hover:to-amber-200",
    focusShadow: "focus:shadow-[0_0_0_6px_rgba(245,158,11,0.4)]",
    iconColor: "text-amber-500",
    handleColor: "bg-amber-500",
    receptorColor: "rgba(245,158,11,1)",
    textColor: "text-gray-600",
  },
} as const;

export const nodeConfigMap = {
  readFile: ReadFileConfig,
  report: ReportConfig,
  email: EmailConfig,
  summarize: null,
};

export const edgeConfig: Record<EdgeType, EdgeConfig> = {
  animated: {
    strokeWidth: 3,
    markerColor: "#64748b",
  },
  pulse: {
    strokeWidth: 4,
    filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))",
    markerColor: "#3b82f6",
  },

  running: {
    stroke: "#3B82F6",
    strokeWidth: 3,
    strokeDasharray: "5,5",
    animation: "dash 1s linear infinite",
    markerColor: "#3b82f6",
  },

  done: {
    stroke: "#10B981",
    strokeWidth: 3,
    markerColor: "#10B981",
  },
  error: {
    stroke: "#DC2626",
    strokeWidth: 3,
    markerColor: "#DC2626",
  },
};

export const defaultNodes: DefaultNode[] = [
  {
    type: "readFile",
    label: "Read File",
    icon: FileText,
    color: "text-green-500",
  },
  {
    type: "summarize",
    label: "Summarize",
    icon: BookOpen,
    color: "text-amber-500",
  },
  { type: "email", label: "Send Email", icon: Mail, color: "text-slate-500" },
  {
    type: "report",
    label: "Generate Report",
    icon: BarChart,
    color: "text-blue-500",
  },
];

export const connectionRules: Record<string, string[]> = {
  start: ["readFile", "email"],
  readFile: ["summarize"],
  summarize: ["email", "report"],
  report: ["email"],
  email: [],
};

export const NodeStatusConfig: Record<
  NodeStatus,
  {
    Icon: React.ComponentType<{ size: number; className?: string }>;
    color: string;
    animation?: string;
  }
> = {
  idle: { Icon: Clock, color: "bg-gray-200", animation: "" },
  pending: { Icon: Clock, color: "bg-blue-100", animation: "" },
  running: { Icon: Clock, color: "bg-blue-300", animation: "animate-pulse" },
  success: { Icon: CheckCircle, color: "bg-green-200", animation: "" },
  error: { Icon: XCircle, color: "bg-red-200", animation: "" },
};

export const STARTNODE: Node = {
  id: "1",
  type: "start",
  position: { x: 100, y: 150 },
  data: { label: "Start", type: "start", id: "1" },
};
