"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "../Button";
import InputGroup from "../InputGroup";
import type { Workflow } from "../../_types/types";
import { useOutsideClick } from "@/app/_hooks/useOutSideClick";

interface EditWorkflowModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  workflow: Partial<Workflow> | null;
  onEditWorkflow: (
    id: string,
    data: { name: string; description: string }
  ) => void;
}

export default function EditWorkflowModal({
  isOpen,
  setIsOpen,
  workflow,
  onEditWorkflow,
}: EditWorkflowModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (workflow && isOpen) {
      setName(workflow.name || "");
      setDescription(workflow.description || "");
    }
  }, [workflow, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflow || !name.trim()) return;

    setIsLoading(true);
    try {
      await onEditWorkflow(workflow.id!, {
        name: name.trim(),
        description: description.trim(),
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update workflow:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setDescription("");
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClose);

  if (!isOpen || !workflow) return null;

  return (
    <div className="fixed inset-0 bg-gray-800/50  flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Workflow</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputGroup
            id="status"
            label="Status"
            type="text"
            value={workflow.status || "pending"}
            readOnly
          />

          <InputGroup
            id="name"
            label="Workflow Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter workflow name"
            required
          />

          <InputGroup
            id="description"
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter workflow description (optional)"
            rows={3}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              degree="secondary"
              extraStyle="px-4 py-2 rounded-md"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              degree="main"
              extraStyle="px-4 py-2 rounded-md"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? "Updating..." : "Update Workflow"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
