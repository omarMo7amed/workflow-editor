/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { Play, Edit3, Trash2, Clock } from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";
import { WorkflowDashboard } from "../../_types/types";

interface WorkflowRowProps {
  workflow: WorkflowDashboard;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onExecute: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (workflow: WorkflowDashboard) => void;
}
export default function WorkflowRow({
  workflow,
  isSelected,
  onToggleSelect,
  onExecute,
  onEdit,
  onDelete,
}: WorkflowRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "running":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(workflow.id)}
          className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />

        <div className="grid grid-cols-12 gap-4 w-full items-center">
          {/* Workflow Info */}
          <div className="col-span-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  {workflow.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {workflow.description}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="col-span-2">
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                workflow.status
              )}`}
            >
              {getStatusIcon(workflow.status)}
              <span className="ml-1 capitalize">{workflow.status}</span>
            </div>
          </div>

          {/* Nodes */}
          <div className="col-span-2">
            <div className="text-sm text-gray-900">
              {workflow.nodes.length || 0} nodes
            </div>
            <div className="text-xs text-gray-500">runs</div>
          </div>

          {/* Last Run */}
          <div className="col-span-2">
            <div className="flex items-center text-sm text-gray-900">
              <Clock className="w-3 h-3 mr-1" />
              {workflow.lastRun || "Never"}
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onExecute(workflow.id)}
                className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                title="Execute"
                aria-label="Execute Workflow"
              >
                <Play className="w-4 h-4" />
              </button>

              <button
                onClick={() => onEdit(workflow.id)}
                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Edit"
                aria-label="Edit Workflow"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete"
                aria-label="Delete Workflow"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <ConfirmationModal
                isOpen={isOpen}
                onClose={() => {
                  setIsOpen(false);
                }}
                onConfirm={() => onDelete(workflow)}
                title="Delete Workflow"
                message={`Are you sure you want to delete "${workflow?.name}"? This action cannot be undone.`}
                confirmText="Delete Workflow"
                confirmationPhrase="delete-workflow"
                type="danger"
              />

              {/* Bulk Delete Modal */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
