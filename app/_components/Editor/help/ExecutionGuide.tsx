"use client";
import { useState } from "react";
import {
  Play,
  PlayCircle,
  Pause,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronDown,
  BarChart3,
} from "lucide-react";

const sections = [
  {
    id: "individual",
    title: "Execute Individual Nodes",
    icon: PlayCircle,
    color: "text-blue-500",
    content: (
      <>
        <p className="text-xs text-slate-500">
          Test individual nodes before running the full workflow:
        </p>
        <ol className="text-xs text-slate-600 space-y-1 ml-5 list-decimal">
          <li>Click on any node to select it</li>
          <li>
            Go to the <strong>Inspector</strong> tab
          </li>
          <li>
            Click the <strong>“Execute Node”</strong> button
          </li>
          <li>Monitor the execution status and results</li>
        </ol>
      </>
    ),
  },
  {
    id: "workflow",
    title: "Execute Full Workflow",
    icon: Play,
    color: "text-green-500",
    content: (
      <>
        <p className="text-xs text-slate-500">
          Run the entire workflow from start to finish:
        </p>
        <ol className="text-xs text-slate-600 space-y-1 ml-5 list-decimal">
          <li>Ensure all nodes are properly connected</li>
          <li>Configure all required node parameters</li>
          <li>
            Click the <strong>“Execute Workflow”</strong> button
          </li>
          <li>
            Monitor progress in the <strong>Analyze</strong> tab
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "states",
    title: "Execution States",
    icon: Pause,
    color: "text-orange-500",
    content: (
      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div>
          <span>
            <strong>Idle:</strong> Node is ready to execute
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse"></div>
          <span>
            <strong>Running:</strong> Node is currently executing
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          <span>
            <strong>Success:</strong> Node completed successfully
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <XCircle className="w-3.5 h-3.5 text-red-500" />
          <span>
            <strong>Error:</strong> Node failed to execute
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "tips",
    title: "Execution Tips",
    icon: CheckCircle,
    color: "text-green-600",
    content: (
      <ul className="text-xs text-slate-600 space-y-1 list-disc ml-5">
        <li>Always test individual nodes before running the full workflow</li>
        <li>
          Check the <strong>Analyze</strong> tab for detailed execution logs
        </li>
        <li>Ensure all required configurations are set before execution</li>
        <li>Monitor the progress bar to track workflow completion</li>
      </ul>
    ),
  },
  {
    id: "monitoring",
    title: "Monitoring Execution",
    icon: BarChart3,
    color: "text-blue-600",
    content: (
      <p className="text-xs text-slate-600">
        Use the <strong>Analyze</strong> tab to monitor workflow execution in
        real-time. You’ll see progress bars, execution statistics, and detailed
        logs of each step.
      </p>
    ),
  },
];

export default function ExecutionGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 my-4">
        Workflow Execution
      </h3>

      {sections.map((section) => {
        const Icon = section.icon;
        const isExpanded = expanded === section.id;

        return (
          <div key={section.id} className="border border-slate-300 rounded-md">
            {/* Header */}
            <button
              onClick={() => toggleExpand(section.id)}
              className="w-full flex items-center justify-between p-2 text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${section.color}`} />
                <span className="font-medium text-slate-800 text-sm">
                  {section.title}
                </span>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500" />
              )}
            </button>

            {/* Expandable Content */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-3 pt-0">{section.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
