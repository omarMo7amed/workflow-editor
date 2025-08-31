"use client";
import { useState } from "react";
import {
  FileText,
  MessageSquare,
  Mail,
  BarChart3,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const nodeTypes = [
  {
    type: "readFile",
    name: "Read File",
    icon: FileText,
    description: "Extracts text content from uploaded files",
    inputs: ["File path or uploaded file"],
    outputs: ["Extracted text content"],
    configuration: "You must assign file in the Inspector panel",
  },
  {
    type: "summarize",
    name: "Summarize",
    icon: MessageSquare,
    description: "Creates a summary of the input text using AI",
    inputs: ["Text content to summarize"],
    outputs: ["Summarized text"],
    configuration: "No configuration needed",
  },
  {
    type: "email",
    name: "Send Email",
    icon: Mail,
    description: "Sends email with the processed content",
    inputs: ["Content to send"],
    outputs: ["Email delivery status"],
    configuration: "Configure recipient email address in the Inspector panel",
  },
  {
    type: "report",
    name: "Generate Report",
    icon: BarChart3,
    description: "Creates formatted reports from the input data",
    inputs: ["Data to include in report"],
    outputs: ["Generated report"],
    configuration:
      "Select report format (PDF, CSV, DOCX) in the Inspector panel, the default is PDF",
  },
];

export default function NodeTypesGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (type: string) => {
    setExpanded((prev) => (prev === type ? null : type));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-700 my-4">
        Nodes Overview
      </h3>

      {nodeTypes.map((node) => {
        const Icon = node.icon;
        const isExpanded = expanded === node.type;

        return (
          <div key={node.type} className="border border-slate-300 rounded-md">
            {/* Header */}
            <button
              onClick={() => toggleExpand(node.type)}
              className="w-full flex items-center justify-between p-2 text-left cursor-pointer "
            >
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-800 text-sm">
                  {node.name}
                </span>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-slate-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-500" />
              )}
            </button>

            {/* Expandable Content with smooth transition */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-3 pt-0 text-sm text-slate-600 space-y-3">
                <p>{node.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium text-slate-700">Inputs</h5>
                    <ul className="list-disc list-inside text-slate-500 space-y-0.5">
                      {node.inputs.map((input, i) => (
                        <li key={i}>{input}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-slate-700">Outputs</h5>
                    <ul className="list-disc list-inside text-slate-500 space-y-0.5">
                      {node.outputs.map((output, i) => (
                        <li key={i}>{output}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  <span className="font-medium text-slate-600">
                    Configuration:
                  </span>{" "}
                  {node.configuration}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md text-xs">
        <h4 className="font-medium text-yellow-900">🔗 Connecting Nodes</h4>
        <p className="text-yellow-800 mt-1">
          Connect nodes by dragging from the output handle (right side) of one
          node to the input handle (left side) of another. The data flows
          between them automatically.
        </p>
      </div>
    </div>
  );
}
