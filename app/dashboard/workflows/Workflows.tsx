/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import SearchControls from "@/app/src/_components/dashboard/SearchControls";
import WorkflowTable from "@/app/src/_components/dashboard/WorkflowTable";
import { createWorkflow } from "@/app/src/_lib/data-service";
import { FormCreateWorkflow } from "@/app/src/_types/types";
import { useUser } from "@/app/src/context/UserProvider";
import { useState } from "react";

interface DashboardWorkflow {
  id: string;
  name: string;
  description: string;
  status: "success" | "error" | "pending" | "running";
  nodes: [];
  edges: [];
  lastRun: string;
}

export default function Workflows({ workflows: data }: { workflows: any[] }) {
  const [workflows, setWorkflows] = useState(data);
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workflowToDelete, setWorkflowToDelete] =
    useState<DashboardWorkflow | null>(null);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.name.toLowerCase().includes(query.toLowerCase()) ||
      workflow.description.toLowerCase().includes(query.toLowerCase())
  );

  if (!user) return null;

  const handleExecuteWorkflow = (workflowId: string) => {
    console.log(`Executing workflow ${workflowId}`);
    // Add your execution logic here
  };

  const handleEditWorkflow = (workflowId: string) => {
    // Navigate to editor
    window.location.href = `/editor/workflow/${workflowId}`;
  };

  const handleDeleteWorkflow = (workflow: DashboardWorkflow) => {
    setWorkflowToDelete(workflow);
    setShowDeleteModal(true);
  };

  const handleBulkDelete = () => {
    if (selectedWorkflows.length > 0) {
      setShowBulkDeleteModal(true);
    }
  };
  const toggleWorkflowSelection = (workflowId: string) => {
    setSelectedWorkflows((prev) =>
      prev.includes(workflowId)
        ? prev.filter((id) => id !== workflowId)
        : [...prev, workflowId]
    );
  };

  const selectAllWorkflows = () => {
    if (selectedWorkflows.length === filteredWorkflows.length) {
      setSelectedWorkflows([]);
    } else {
      setSelectedWorkflows(filteredWorkflows.map((w) => w.id));
    }
  };

  const handleCreateWorkflow = async (formData: FormCreateWorkflow) => {
    const data = await createWorkflow(
      user.id,
      formData.name,
      formData.description
    );

    setWorkflows((prev) => [...prev, data]);
  };

  return (
    <div className="flex-1 p-6">
      <SearchControls
        query={query}
        setQuery={setQuery}
        selectedCount={selectedWorkflows.length}
        onBulkDelete={handleBulkDelete}
        onCreateWorkflow={handleCreateWorkflow}
      />

      <WorkflowTable
        workflows={filteredWorkflows}
        selectedWorkflows={selectedWorkflows}
        onToggleSelect={toggleWorkflowSelection}
        onSelectAll={selectAllWorkflows}
        onExecute={handleExecuteWorkflow}
        onEdit={handleEditWorkflow}
      />
    </div>
  );
}
