"use client";
import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  Play,
  AlertTriangle,
  Workflow,
} from "lucide-react";
import GettingStartedGuide from "./GettingStartedGuide";
import NodeTypesGuide from "./NodeTypesGuide";
import ExecutionGuide from "./ExecutionGuide";
import TroubleshootingGuide from "./TroubleshootingGuide";
import ConnectingRules from "./ConnectingRules";

const helpSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: BookOpen,
    component: GettingStartedGuide,
    description: "Learn the basics of creating your first workflow",
  },
  {
    id: "connecting-nodes",
    title: "Connecting Nodes",
    icon: Workflow,
    component: ConnectingRules,
    description: "Learn the rules to create your first workflow",
  },
  {
    id: "node-types",
    title: "Node Types & Usage",
    icon: Play,
    component: NodeTypesGuide,
    description: "Understanding different node types and their functions",
  },
  {
    id: "execution",
    title: "Workflow Execution",
    icon: Play,
    component: ExecutionGuide,
    description: "How to execute workflows and individual nodes",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: AlertTriangle,
    component: TroubleshootingGuide,
    description: "Common errors and how to fix them",
  },
];

export default function HelpContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setActiveSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const ActiveComponent = helpSections.find(
    (section) => section.id === activeSection
  )?.component;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="h-full flex flex-col divide-y divide-2 divide-slate-300">
          {/* Navigation */}
          <nav className="space-y-1 pb-2">
            {helpSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`w-full flex items-center justify-between p-2 text-left rounded-md transition-colors cursor-pointer ${
                      isActive
                        ? "bg-blue-50 text-slate-700"
                        : "text-gray-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </div>
                    {isActive ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {isActive && (
                    <div className="ml-6 mt-1 text-xs text-gray-600">
                      {section.description}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Content */}
          <div className="flex-1 px-2 pb-2">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}
