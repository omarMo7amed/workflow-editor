"use client";

import { Edit3, Trash2, Clock } from "lucide-react";
import { formatTimeDifference, getStatusColor } from "../../_utils/helper";
import { WorkflowRowProps } from "@/app/_types/types";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return (
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      );
    case "running":
      return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
    case "pending":
      return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
    case "error":
      return <div className="w-2 h-2 bg-red-500 rounded-full" />;
    default:
      return <div className="w-2 h-2 bg-gray-400 rounded-full" />;
  }
};

export default function WorkflowRow({
  workflow,
  isSelected,
  isLoading,
  onToggleSelect,
  onEdit,
  onDoubleClick,
  onDelete,
}: WorkflowRowProps) {
  const { id, name, description, nodes, status, last_run_at } = workflow;

  return (
    <div
      onDoubleClick={() => !isLoading && onDoubleClick(id!)}
      className={`px-6 py-4 transition-colors ${
        isLoading ? "opacity-50 cursor-wait" : "hover:bg-gray-50 cursor-pointer"
      }`}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          disabled={isLoading}
          onChange={() => onToggleSelect(id!)}
          className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />

        <div className="grid grid-cols-12 gap-4 w-full items-center">
          <div className="col-span-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                status || "pending"
              )}`}
            >
              {getStatusIcon(status || "pending")}
              <span className="ml-1 capitalize">{status || "pending"}</span>
            </div>
          </div>

          <div className="col-span-2">
            <div className="text-sm text-gray-900">
              {Math.max((nodes?.length ?? 0) - 1, 0)} nodes
            </div>
            <div className="text-xs text-gray-500">runs</div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center text-sm text-gray-900">
              {isLoading ? (
                <svg
                  className="animate-spin h-4 w-4 text-blue-600 mr-1"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <Clock className="w-3 h-3 mr-1" />
              )}
              {formatTimeDifference(last_run_at)}
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <button
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Edit"
                aria-label="Edit Workflow"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(id!);
                }}
                className="p-1.5 cursor-pointer text-red-600 hover:bg-red-50 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Delete"
                aria-label="Delete Workflow"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
