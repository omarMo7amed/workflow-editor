"use client";

import React, { useState, useMemo } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Loader,
  Pause,
  Play,
  Filter,
  ChevronDown,
  ChevronRight,
  File,
  Calendar,
  Timer,
  Activity,
  AlertCircle,
  Info,
} from "lucide-react";

// Types
interface ExecutionLog {
  id: string;
  nodeId: string;
  nodeLabel: string;
  status: "success" | "error" | "running" | "pending";
  startedAt: string | null;
  finishedAt: string | null;
  output: string | null;
  choosedFile?: string;
  duration: number | null;
}

interface ExecutionCounts {
  total: number;
  success: number;
  error: number;
  running: number;
  pending: number;
}

interface StatusConfig {
  color: string;
  bgColor: string;
  icon: any;
  label: string;
}

type StatusFilter = "all" | "success" | "error" | "running" | "pending";

// Status configuration
const statusConfig: Record<string, StatusConfig> = {
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
};

// Mock data
const mockExecutions: ExecutionLog[] = [
  {
    id: "1",
    nodeId: "node-1",
    nodeLabel: "Read File",
    status: "success",
    startedAt: "2024-08-12T10:30:15Z",
    finishedAt: "2024-08-12T10:30:18Z",
    output: "Successfully read file: document.pdf (2.3MB)",
    choosedFile: "document.pdf",
    duration: 3,
  },
  {
    id: "2",
    nodeId: "node-2",
    nodeLabel: "Text Extraction",
    status: "success",
    startedAt: "2024-08-12T10:30:18Z",
    finishedAt: "2024-08-12T10:30:22Z",
    output:
      "Extracted 1,245 words from PDF content. Text preprocessing completed.",
    duration: 4,
  },
  {
    id: "3",
    nodeId: "node-3",
    nodeLabel: "Data Validation",
    status: "running",
    startedAt: "2024-08-12T10:30:22Z",
    finishedAt: null,
    output: "Validating extracted data structure...",
    duration: null,
  },
  {
    id: "4",
    nodeId: "node-4",
    nodeLabel: "Generate Summary",
    status: "pending",
    startedAt: null,
    finishedAt: null,
    output: null,
    duration: null,
  },
  {
    id: "5",
    nodeId: "node-5",
    nodeLabel: "Email Report",
    status: "error",
    startedAt: "2024-08-12T10:29:45Z",
    finishedAt: "2024-08-12T10:29:47Z",
    output:
      "Failed to send email: SMTP connection timeout. Please check your email configuration.",
    duration: 2,
  },
];

const mockExecutionProgress = 65;

// Custom Hook
const useExecutionData = (
  executions: ExecutionLog[],
  statusFilter: StatusFilter
) => {
  const filteredExecutions = useMemo(() => {
    if (statusFilter === "all") return executions;
    return executions.filter((execution) => execution.status === statusFilter);
  }, [executions, statusFilter]);

  const executionCounts: ExecutionCounts = useMemo(() => {
    return {
      total: executions.length,
      success: executions.filter((e) => e.status === "success").length,
      error: executions.filter((e) => e.status === "error").length,
      running: executions.filter((e) => e.status === "running").length,
      pending: executions.filter((e) => e.status === "pending").length,
    };
  }, [executions]);

  return {
    filteredExecutions,
    executionCounts,
  };
};

// Progress Bar Component
interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Execution Progress</span>
        </div>
        <span className="text-sm font-medium text-gray-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Status Badge Component
interface StatusBadgeProps {
  status: "success" | "error" | "running" | "pending";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      <Icon
        className={`w-3.5 h-3.5 ${status === "running" ? "animate-spin" : ""}`}
      />
      {config.label}
    </div>
  );
};

// Filter Bar Component
interface FilterOption {
  key: StatusFilter;
  label: string;
  count: number;
}

interface FilterBarProps {
  statusFilter: StatusFilter;
  onChange: (filter: StatusFilter) => void;
  executionCounts: ExecutionCounts;
}

const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  onChange,
  executionCounts,
}) => {
  const filterOptions: FilterOption[] = [
    { key: "all", label: "All", count: executionCounts.total },
    { key: "success", label: "Success", count: executionCounts.success },
    { key: "error", label: "Error", count: executionCounts.error },
    { key: "running", label: "Running", count: executionCounts.running },
    { key: "pending", label: "Pending", count: executionCounts.pending },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-5 h-5 text-gray-600" />
        <span className="font-medium text-gray-900">Filter Executions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              statusFilter === option.key
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
            <span
              className={`px-1.5 py-0.5 rounded text-xs ${
                statusFilter === option.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {option.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Execution Log Card Component
interface ExecutionLogCardProps {
  execution: ExecutionLog;
  isExpanded: boolean;
  onToggle: () => void;
}

const ExecutionLogCard: React.FC<ExecutionLogCardProps> = ({
  execution,
  isExpanded,
  onToggle,
}) => {
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
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isExpanded ? (
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

      {isExpanded && execution.output && (
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
};

// Execution Statistics Component
interface ExecutionStatsProps {
  executions: ExecutionLog[];
}

interface Stats {
  total: number;
  success: number;
  error: number;
  running: number;
  pending: number;
  avgDuration: number;
}

const ExecutionStats: React.FC<ExecutionStatsProps> = ({ executions }) => {
  const stats: Stats = useMemo(() => {
    const total = executions.length;
    const success = executions.filter((e) => e.status === "success").length;
    const error = executions.filter((e) => e.status === "error").length;
    const running = executions.filter((e) => e.status === "running").length;
    const pending = executions.filter((e) => e.status === "pending").length;

    const completedExecutions = executions.filter((e) => e.duration !== null);
    const avgDuration =
      completedExecutions.length > 0
        ? completedExecutions.reduce((acc, e) => acc + (e.duration || 0), 0) /
          completedExecutions.length
        : 0;

    return { total, success, error, running, pending, avgDuration };
  }, [executions]);
};

// Empty State Component
interface EmptyStateProps {
  onRunWorkflow?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRunWorkflow }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Activity className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Executions Yet
      </h3>
      <p className="text-gray-600 mb-4">
        No workflow has been executed yet. Run your workflow to see logs here.
      </p>
      {onRunWorkflow && (
        <button
          onClick={onRunWorkflow}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Play className="w-4 h-4" />
          Run Workflow
        </button>
      )}
    </div>
  );
};

// Main Analyze Section Component
interface AnalyzeSectionProps {
  executions?: ExecutionLog[];
  executionProgress?: number;
  onRunWorkflow?: () => void;
}

const AnalyzeSection: React.FC<AnalyzeSectionProps> = ({
  executions = mockExecutions,
  executionProgress = mockExecutionProgress,
  onRunWorkflow,
}) => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const { filteredExecutions, executionCounts } = useExecutionData(
    executions,
    statusFilter
  );
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleCardExpansion = (executionId: string): void => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(executionId)) {
        newSet.delete(executionId);
      } else {
        newSet.add(executionId);
      }
      return newSet;
    });
  };

  const handleRunWorkflow = () => {
    if (onRunWorkflow) {
      onRunWorkflow();
    } else {
      console.log("Running workflow...");
    }
  };

  if (executions.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Workflow Analysis
            </h1>
            <p className="text-gray-600">
              Monitor and analyze your workflow execution logs
            </p>
          </div>
          <EmptyState onRunWorkflow={handleRunWorkflow} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Workflow Analysis
          </h1>
          <p className="text-gray-600">
            Monitor and analyze your workflow execution logs
          </p>
        </div>

        <ProgressBar progress={executionProgress} />

        <ExecutionStats executions={executions} />

        <FilterBar
          statusFilter={statusFilter}
          onChange={setStatusFilter}
          executionCounts={executionCounts}
        />

        <div className="space-y-3">
          {filteredExecutions.map((execution) => (
            <ExecutionLogCard
              key={execution.id}
              execution={execution}
              isExpanded={expandedCards.has(execution.id)}
              onToggle={() => toggleCardExpansion(execution.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeSection;
