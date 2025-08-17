/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { motion } from "framer-motion";
import {
  FileText,
  MessageSquare,
  Mail,
  FileBarChart,
  Play,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

interface WorkflowNodeProps {
  data: any;
  selected: boolean;
}

const iconMap = {
  "read-file": FileText,
  summarize: MessageSquare,
  "send-email": Mail,
  "generate-report": FileBarChart,
  start: Play,
};

const statusIcons = {
  pending: Clock,
  running: Clock,
  success: CheckCircle,
  error: XCircle,
};

const statusColors = {
  pending: "bg-gray-100 border-gray-300",
  running: "bg-blue-100 border-blue-400 animate-pulse",
  success: "bg-green-100 border-green-400",
  error: "bg-red-100 border-red-400",
};

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ data, selected }) => {
  const IconComponent = iconMap[data.type] || FileText;
  const StatusIcon = statusIcons[data.status];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className={`
        relative px-4 py-3 rounded-lg border-2 min-w-[180px] shadow-md
        ${statusColors[data.status]}
        ${selected ? "ring-2 ring-blue-400" : ""}
        transition-all duration-200
      `}
    >
      {/* <Handle type="target" position={Position.Top} className="w-3 h-3" /> */}

      <div className="flex items-center space-x-3">
        <div className="relative">
          <IconComponent
            size={24}
            className={`
              ${
                data.status === "running"
                  ? "text-blue-600 animate-spin"
                  : "text-gray-600"
              }
              ${data.status === "success" ? "text-green-600" : ""}
              ${data.status === "error" ? "text-red-600" : ""}
            `}
          />

          <div className="absolute -top-1 -right-1">
            <StatusIcon
              size={12}
              className={`
                ${data.status === "pending" ? "text-gray-400" : ""}
                ${
                  data.status === "running" ? "text-blue-500 animate-pulse" : ""
                }
                ${data.status === "success" ? "text-green-500" : ""}
                ${data.status === "error" ? "text-red-500" : ""}
              `}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="font-semibold text-sm text-gray-800">
            {data.label}
          </div>
          {data.result && data.status === "success" && (
            <div className="text-xs text-gray-600 mt-1">
              {data.result.filesRead && `Files: ${data.result.filesRead}`}
              {data.result.summaryLength &&
                `Length: ${data.result.summaryLength} chars`}
              {data.result.emailsSent && `Emails: ${data.result.emailsSent}`}
              {data.result.pages && `Pages: ${data.result.pages}`}
            </div>
          )}
        </div>
      </div>

      {/* <Handle type="source" position={Position.Bottom} className="w-3 h-3" /> */}
    </motion.div>
  );
};

export default WorkflowNode;
