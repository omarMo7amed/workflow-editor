import ConfirmationModal from "../ConfirmationModal";
import { useWorkflowStore } from "@/app/_store/workflowStore";
import { useCallback, useEffect, useState } from "react";
import { useFlowStore } from "@/app/_store/flowStore";
import { ChevronLeft, Save } from "lucide-react";
import { Workflow } from "../../_types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "../Button";

export default function EditorHeader() {
  const currentWorkflow = useWorkflowStore((s) => s.currentWorkflow);
  const saveCurrentState = useWorkflowStore((s) => s.saveCurrentState);
  const deleteWorkflow = useWorkflowStore((s) => s.delete);
  const nodesLength = useFlowStore((s) => s.nodesLength);
  const clearWorkflow = useFlowStore((s) => s.clearWorkflow);

  const [workflowName, setWorkflowName] = useState(currentWorkflow?.name);
  const [savingWorkflow, setSavingWorkflow] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setWorkflowName(currentWorkflow?.name);
  }, [currentWorkflow, setWorkflowName]);

  const handleSave = useCallback(async () => {
    if (nodesLength <= 1) {
      setIsModalOpen(true);
      if (isConfirmed) {
        setIsConfirmed(false);
        clearWorkflow();
      }
      return;
    }

    if (!currentWorkflow) {
      return;
    }

    const payload: Partial<Workflow> = {
      name: workflowName || currentWorkflow?.name,
    };

    try {
      setSavingWorkflow(true);
      setBlocked(true);
      await saveCurrentState(currentWorkflow.id!, payload);
      setSavingWorkflow(false);
      setTimeout(() => setBlocked(false), 8000);
      toast.success("Workflow saved successfully");
    } catch (error) {
      toast.error("Failed to save workflow");
      console.error("Error saving workflow:", error);
    }
  }, [
    isConfirmed,
    nodesLength,
    clearWorkflow,
    currentWorkflow,
    saveCurrentState,
    workflowName,
  ]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <button
            className="cursor-pointer bg-slate-200 rounded-full hover:bg-slate-300 focus:ring-2 focus:ring-slate-400 transition-colors duration-200 p-1"
            onClick={router.back}
            aria-label="go back"
            title="Go Back"
          >
            <ChevronLeft size={24} className="text-slate-900 " />
          </button>

          <div>
            <p className="text-md text-slate-900">Your Automation Pipeline</p>
            <p className="text-xs text-slate-600">Workflow Automation </p>
          </div>
        </div>

        <div className="flex-1 mx-auto flex gap-2.5 justify-center items-center">
          {isEditingName ? (
            <input
              type="text"
              value={workflowName}
              readOnly={savingWorkflow}
              onChange={(e) => setWorkflowName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              className="border border-yellow-300 text-slate-700 px-4 text-sm py-1 rounded-xl focus:outline-none transition-all duration-200 focus:ring-2 w-0 focus:w-32 focus:ring-yellow-400 bg-yellow-100"
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditingName(true)}
              className={`px-4 text-sm py-1 rounded-xl transition-colors max-w-32 truncate ${
                false
                  ? "bg-slate-200/50 text-slate-700"
                  : "bg-yellow-100 text-yellow-800 border border-yellow-200"
              }`}
            >
              {workflowName || "Untitled Workflow"}
              {/* {!"isWorkflowSaved " && "*"} */}
            </p>
          )}

          <p className="bg-slate-200/50 text-slate-700 px-4 text-sm py-1 rounded-xl ">
            Diagram view
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            degree="secondary"
            onClick={clearWorkflow}
            extraStyle="rounded-md"
          >
            Discard
          </Button>
          <Button
            degree="main"
            extraStyle="rounded-md flex items-center justify-between gap-2"
            onClick={handleSave}
            disabled={savingWorkflow || !currentWorkflow || blocked}
          >
            <Save size={16} />
            {savingWorkflow ? (
              <span className="animate-pulse">Saving...</span>
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          await deleteWorkflow(currentWorkflow?.id || "");
          setIsConfirmed(false);
          router.back();
        }}
        title="Remove Current Workflow?"
        message="Are you sure you want to delete current workflow? This action cannot be undone."
        confirmText="Remove"
      />
    </>
  );
}
