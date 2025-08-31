"use client";
import { FileText, Upload, Play, Eye } from "lucide-react";

export default function GettingStartedGuide() {
  const steps = [
    {
      icon: <Upload className="h-4 w-4 text-blue-600" />,
      title: "Upload Files",
      description:
        "Start by uploading files in the Load tab. Supported formats: DOC, DOCX, TXT. You can upload 5 files up to 10MB each.",
    },
    {
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: "Add Nodes",
      description:
        "Drag and drop nodes from the Nodes tab onto the canvas. Connect them by dragging from output handles to input handles.",
    },
    {
      icon: <Eye className="h-4 w-4 text-blue-600" />,
      title: "Configure Nodes",
      description:
        "Click on any node to configure it in the Inspector tab. Set parameters like email addresses, report formats, etc.",
    },
    {
      icon: <Play className="h-4 w-4 text-green-600" />,
      title: "Execute",
      description:
        "Execute individual nodes or the entire workflow using the execute buttons. Monitor progress in the Analyze tab.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-700 my-4">
          Steps to Get Started
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* vertical line */}
        <div className="absolute left-2 top-0 h-full border-l border-gray-300"></div>

        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start">
              {/* Icon directly on the line */}
              <div className="absolute -left-1 flex items-center justify-center p-1  rounded-full bg-white border border-gray-300">
                {step.icon}
              </div>

              {/* Step content */}
              <div className="ml-8">
                <h4 className="font-medium text-slate-900">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">💡 Quick Tip</h4>
        <p className="text-sm text-yellow-800">
          Start with a simple workflow: Upload a document → Read File →
          Summarize → Email.
        </p>
      </div>
    </div>
  );
}
