import { ReactNode } from "react";
import Button from "./Button";
import { useFlowStore } from "@/app/_store/flowStore";
import useActiveTabs from "../context/ActiveTabsContext";
import toast from "react-hot-toast";

export default function Load({ children }: { children: ReactNode }) {
  const { left, setLeft } = useActiveTabs();
  const { executeWorkflow, setMode, nodeMap } = useFlowStore();
  const isExecuting = useFlowStore((s) => s.isExecuting);

  if (left !== "Load") return;

  const handleExecute = () => {
    if (nodeMap.size < 2) {
      toast.error("Add Actions First");
      return;
    }
    setMode("Executions");

    setLeft("Analyze");
    async function execute() {
      try {
        await executeWorkflow();
        toast.success("Workflow has been executed successfully");
      } catch {
        toast.error("Workflow has an error");
      }
    }

    setTimeout(execute, 300);
  };

  return (
    <>
      {children}

      <Button
        disabled={isExecuting}
        degree="main"
        extraStyle="rounded-md"
        onClick={handleExecute}
      >
        {isExecuting ? "Executing..." : "Execute Workflow"}
      </Button>
    </>
  );
}
