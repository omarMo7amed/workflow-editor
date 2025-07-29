import { Brain, FileText, Mail } from "lucide-react";
import {
  DevObjective,
  docsNavigationItems as NavigationItems,
  PortfolioValueCardProps,
  TechnologiesTypes,
} from "../_types/types";

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
