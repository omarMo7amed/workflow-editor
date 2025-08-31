/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserProvider";
import toast from "react-hot-toast";

import SearchControls from "../../_components/dashboard/SearchControls";
import CreateWorkFlow from "../../_components/dashboard/CreateWorkFlow";
import WorkflowTable from "../../_components/dashboard/WorkflowTable";
import ConfirmationModal from "../../_components/ConfirmationModal";

import { useWorkflowStore } from "@/app/_store/workflowStore";

import Spinner from "../../_components/Spinner";
import { Workflow } from "../../_types/types";
import { getWorkflowsByUserId } from "@/app/_lib/data-service";
import EditWorkflowModal from "@/app/_components/dashboard/EditWorkflowModal";

export default function Workflows() {
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useUser();
  const filterWorkflows = useWorkflowStore((state) => state.filterWorkflows);
  const setWorkflows = useWorkflowStore((state) => state.setWorkflows);
  const workflows = useWorkflowStore((state) => state.workflows);
  const deleteWf = useWorkflowStore((state) => state.delete);
  const create = useWorkflowStore((state) => state.create);
  const save = useWorkflowStore((state) => state.save);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] =
    useState<Partial<Workflow> | null>(null);

  useEffect(() => {
    async function fetchWorkflows() {
      if (user === null) return;
      setIsLoading(true);
      const data = await getWorkflowsByUserId(user.id);

      if (data) {
        setWorkflows(data);
      }
      setIsLoading(false);
    }

    fetchWorkflows();
    // setWorkflows(workflows);
  }, [user, setWorkflows]);

  if (!user) return null;

  const filtered = filterWorkflows(query);

  const handleDeleteWorkflow = async () => {
    if (!workflowId) return;
    try {
      await deleteWf(workflowId);
      toast.success("Workflow deleted successfully");
    } catch (err: any) {
      toast.error("Failed to delete workflow");
      console.error("Delete error:", err.message || err);
    } finally {
      setIsDeleteOpen(false);
    }
  };

  const handleEditClick = (workflow: Partial<Workflow>) => {
    setEditingWorkflow(workflow);
    setIsEditOpen(true);
  };

  const handleBulkDelete = async () => {
    if (selectedWorkflows.length === 0) return;
    try {
      for (const id of selectedWorkflows) {
        await deleteWf(id);
      }
      toast.success("Workflows deleted successfully");
    } catch (err: any) {
      console.error("Bulk delete error:", err.message || err);
      toast.error("Failed to delete workflows");
    } finally {
      setShowBulkDeleteModal(false);
      setSelectedWorkflows([]);
    }
  };

  const handleCreateWorkflow = async (formData: any) => {
    if (!user) return;

    if (workflows.length >= 10) {
      toast.error("You can only create up to 10 workflows");
      return;
    }

    try {
      await create(user.id, formData.name, formData.description);
      toast.success("Workflow created successfully");
    } catch (err: any) {
      console.error("Create error:", err.message || err);
      toast.error("Failed to create workflow");
    }
  };

  const toggleWorkflowSelection = (id: string) => {
    setSelectedWorkflows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleEditWorkflow = async (
    id: string,
    data: { name: string; description: string }
  ) => {
    try {
      await save(id, data);
      toast.success("Workflow updated successfully");
    } catch (err: any) {
      toast.error("Failed to update workflow");
      console.error("Update error:", err.message || err);
    }
  };

  const selectAllWorkflows = () => {
    if (selectedWorkflows.length === filtered.length) {
      setSelectedWorkflows([]);
    } else {
      setSelectedWorkflows(filtered.map((w) => w.id!));
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <SearchControls
        query={query}
        setQuery={setQuery}
        selectedCount={selectedWorkflows.length}
        onBulkDelete={() => {
          if (selectedWorkflows.length > 0) setShowBulkDeleteModal(true);
        }}
        setIsOpen={setIsCreateOpen}
      />

      {isLoading ? (
        <Spinner />
      ) : filtered.length === 0 && query && workflows.length !== 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No results found for “{query}”</p>
        </div>
      ) : (
        <WorkflowTable
          workflows={filtered || workflows}
          selectedWorkflows={selectedWorkflows}
          onToggleSelect={toggleWorkflowSelection}
          onSelectAll={selectAllWorkflows}
          onEdit={handleEditClick}
          onDelete={(id) => {
            setWorkflowId(id);
            setIsDeleteOpen(true);
          }}
          setIsOpen={setIsCreateOpen}
        />
      )}

      <CreateWorkFlow
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        onCreateWorkflow={handleCreateWorkflow}
      />

      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={setIsDeleteOpen}
        onConfirm={handleDeleteWorkflow}
        title="Delete Workflow"
        message={`Are you sure you want to delete this workflow?`}
        confirmText="Delete Workflow"
        confirmationPhrase="delete-workflow"
        type="danger"
      />

      <ConfirmationModal
        isOpen={showBulkDeleteModal}
        onClose={setShowBulkDeleteModal}
        onConfirm={handleBulkDelete}
        title="Delete Workflows"
        message={`Are you sure you want to delete the selected workflows?`}
        confirmText="Delete"
        confirmationPhrase="delete-workflow"
        type="danger"
      />

      <EditWorkflowModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        workflow={editingWorkflow}
        onEditWorkflow={handleEditWorkflow}
      />
    </div>
  );
}
