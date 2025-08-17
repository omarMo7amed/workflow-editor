import {
  ChevronDown,
  ChevronRight,
  File,
  Info,
  Pause,
  Play,
  Timer,
} from "lucide-react";
import { CheckCircle, XCircle, Loader, Clock } from "lucide-react";

import StatusBadge from "./StatusBadge";
import { ExecutionLog } from "../_types/types";
import { useState } from "react";

const statusConfig = {
  success: {
    color: "#22C55E",
    bgColor: "#F0FDF4",
    icon: CheckCircle,
    label: "Success",
  },
  error: {
    color: "#EF4444",
    bgColor: "#FEF2F2",
    icon: XCircle,
    label: "Error",
  },
  running: {
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    icon: Loader,
    label: "Running",
  },
  pending: {
    color: "#94A3B8",
    bgColor: "#F8FAFC",
    icon: Clock,
    label: "Pending",
  },
  idle: {
    color: "#22C55E",
    bgColor: "#F0FDF4",
    icon: CheckCircle,
    label: "Success",
  },
};

export default function ExecutionLogCard({
  execution,
}: {
  execution: ExecutionLog;
}) {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const config = statusConfig[execution.status];
  const StatusIcon = config.icon;

  const formatTime = (timestamp: string | null): string => {
    if (!timestamp) return "--:--:--";
    return new Date(timestamp).toLocaleTimeString("en-US", { hour12: false });
  };

  const formatDuration = (duration: number | null): string => {
    if (duration === null) return "--";
    return `${duration}s`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpand((prev) => !prev)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isExpand ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              <StatusIcon
                className={`w-5 h-5 ${
                  execution.status === "running" ? "animate-spin" : ""
                }`}
                style={{ color: config.color }}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {execution.nodeLabel}
              </h3>
              <p className="text-sm text-gray-500">
                Node ID: {execution.nodeId}
              </p>
            </div>
          </div>
          <StatusBadge status={execution.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Started:</span>
            <span className="font-medium">
              {formatTime(execution.startedAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Pause className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Finished:</span>
            <span className="font-medium">
              {formatTime(execution.finishedAt)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">
              {formatDuration(execution.duration)}
            </span>
          </div>
        </div>

        {execution.choosedFile && (
          <div className="mt-3 flex items-center gap-2 text-sm">
            <File className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">File:</span>
            <span className="font-medium text-blue-600">
              {execution.choosedFile}
            </span>
          </div>
        )}
      </div>

      {isExpand && true && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Output Details
            </span>
          </div>
          <div className="bg-white rounded border p-3 text-sm text-gray-800 font-mono">
            {execution.output}
          </div>
        </div>
      )}
    </div>
  );
}
