import {
  BarChart,
  BarChart3,
  BookOpen,
  Brain,
  FileEdit,
  FileText,
  Mail,
} from "lucide-react";
import {
  availableNodeType,
  DevObjective,
  docsNavigationItems as NavigationItems,
  NodeType,
  PortfolioValueCardProps,
  TechnologiesTypes,
} from "../_types/types";
import { Edge, Node } from "reactflow";
import ReadFileConfig from "../_components/config-nodes/ReadFileConfig";
import ReportConfig from "../_components/config-nodes/ReportConfig";
import EmailConfig from "../_components/config-nodes/EmailConfig";

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
  { name: "Next.js 15", desc: "App Router, RSC" },
  { name: "TypeScript", desc: "Type Safety" },
  { name: "Tailwind CSS", desc: "Utility-First Styling" },
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

export const Integrations = [
  {
    name: "OpenAI API",
    desc: "GPT integration for AI processing nodes",
  },
  {
    name: "IndexedDB",
    desc: "Client-side database for workflow persistence",
  },
  {
    name: "Mock Service Worker",
    desc: "API mocking for development and testing",
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

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: { x: 150, y: 100 },
    data: { label: "Start", type: "start", id: "0" },
  },
];

export const initialEdges: Edge[] = [];

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
