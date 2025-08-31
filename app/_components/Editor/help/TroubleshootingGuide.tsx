"use client";
import { useState } from "react";
import {
  XCircle,
  Wifi,
  FileX,
  Mail,
  Settings,
  ChevronRight,
  ChevronDown,
  Workflow,
} from "lucide-react";

const commonErrors = [
  {
    icon: Workflow,
    title: "Connecting Nodes Issues",
    symptoms: ["Can not connect nodes", "Connect multiple nodes to one node"],
    solutions: [
      "we have validations in place to prevent invalid connections",
      "Check the rules of node connections in the Connecting Nodes",
    ],
  },
  {
    icon: FileX,
    title: "File Upload Issues",
    symptoms: [
      "File not uploading",
      "Unsupported file format",
      "File too large",
    ],
    solutions: [
      "Check file format: Only PDF, DOC, DOCX, TXT are supported",
      "Ensure file size is under 10MB",
      "Try refreshing the page and uploading again",
      "Check your internet connection",
    ],
  },
  {
    icon: XCircle,
    title: "Node Execution Failures",
    symptoms: [
      "Node shows error state",
      "Execution stops unexpectedly",
      "No output generated",
    ],
    solutions: [
      "Check if all required inputs are connected",
      "Verify node configuration in the Inspector panel",
      "Ensure previous nodes completed successfully",
      "Check the execution logs in the Analyze tab",
    ],
  },
  {
    icon: Mail,
    title: "Email Sending Problems",
    symptoms: [
      "Email not sent",
      "Invalid email address error",
      "SMTP connection failed",
    ],
    solutions: [
      "Verify the recipient email address is valid",
      "Check SMTP configuration in project settings",
      "Ensure email content is not empty",
      "Check if email service is properly configured",
    ],
  },
  {
    icon: Wifi,
    title: "Connection Issues",
    symptoms: ["API calls failing", "Slow execution", "Timeout errors"],
    solutions: [
      "Check your internet connection",
      "Refresh the page and try again",
      "Verify API keys are properly configured",
      "Contact support if issues persist",
    ],
  },
  {
    icon: Settings,
    title: "Configuration Errors",
    symptoms: [
      "Missing required parameters",
      "Invalid configuration",
      "Workflow won't start",
    ],
    solutions: [
      "Check all nodes have required configurations set",
      "Verify email addresses, file paths, and other parameters",
      "Ensure all nodes are properly connected",
      "Review the Getting Started guide for proper setup",
    ],
  },
];

export default function TroubleshootingGuide() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => (prev === title ? null : title));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 my-4">
          Troubleshooting Common Issues
        </h3>
      </div>

      <div className="space-y-4 ">
        {commonErrors.map((error, index) => {
          const Icon = error.icon;
          const isExpanded = expanded === error.title;

          return (
            <div key={index} className="border border-slate-300 rounded-md">
              {/* Header */}
              <button
                onClick={() => toggleExpand(error.title)}
                className="w-full flex items-center justify-between p-2 text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-slate-800 text-sm">
                    {error.title}
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
                <div className="p-3 pt-0 space-y-2">
                  <div>
                    <h5 className="text-xs font-medium text-slate-600">
                      Common Symptoms:
                    </h5>
                    <ul className="text-xs text-slate-500 space-y-1 mt-1">
                      {error.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-slate-600">
                      Solutions:
                    </h5>
                    <ul className="text-xs text-slate-500 space-y-1 mt-1">
                      {error.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1"></div>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
