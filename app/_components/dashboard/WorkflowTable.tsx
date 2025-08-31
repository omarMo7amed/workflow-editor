"use client";

import { GitBranch } from "lucide-react";
import WorkflowRow from "./WorkflowRow";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { Workflow } from "../../_types/types";
import { useState } from "react";

interface WorkflowTableProps {
  workflows: Partial<Workflow>[];
  selectedWorkflows: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onEdit: (workflow: Partial<Workflow>) => void;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: (id: string) => void;
}

export default function WorkflowTable({
  workflows,
  selectedWorkflows,
  onToggleSelect,
  onSelectAll,
  setIsOpen,
  onEdit,
  onDelete,
}: WorkflowTableProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (workflows.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <GitBranch className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No workflows found
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first workflow to get started
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            degree="main"
            extraStyle="px-6 py-3 rounded-lg"
          >
            Create New Workflow
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={selectedWorkflows.length === workflows.length}
            onChange={onSelectAll}
            className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="grid grid-cols-12 gap-4 w-full text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">Workflow</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Nodes</div>
            <div className="col-span-2">Last Run</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-200">
        {workflows.map((workflow) => (
          <WorkflowRow
            key={workflow.id}
            workflow={workflow}
            isSelected={selectedWorkflows.includes(workflow.id!)}
            onEdit={() => onEdit(workflow)}
            onToggleSelect={onToggleSelect}
            onDoubleClick={(id) => {
              setLoadingId(id);
              router.push(`/editor/workflow/${id}`);
            }}
            onDelete={onDelete}
            isLoading={loadingId === workflow.id}
          />
        ))}
      </div>
    </div>
  );
}
