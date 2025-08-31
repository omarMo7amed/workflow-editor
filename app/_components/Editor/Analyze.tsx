import useActiveTabs from "../../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import { ReactNode } from "react";
import Button from "../Button";

export default function Analyze({ children }: { children: ReactNode }) {
  const resetWorkflowExecution = useFlowStore((s) => s.resetWorkflowExecution);
  const executeWorkflow = useFlowStore((s) => s.executeWorkflow);
  const nodesLength = useFlowStore((s) => s.nodesLength);
  const isExecuting = useFlowStore((s) => s.isExecuting);
  const left = useActiveTabs().left;

  if (left !== "Analyze") return;

  return (
    <div className="flex flex-col gap-5 px-2 py-5">
      <>
        {children}
        <div className="flex gap-2 justify-end">
          <Button
            onClick={resetWorkflowExecution}
            disabled={isExecuting}
            degree="secondary"
            extraStyle="rounded-md"
          >
            Reset
          </Button>

          <Button
            onClick={() => {
              resetWorkflowExecution();
              executeWorkflow();
            }}
            degree="main"
            extraStyle="rounded-md disabled:bg-slate-500 w-32"
            disabled={isExecuting || nodesLength <= 1}
          >
            {isExecuting ? "Executing..." : "Replay"}
          </Button>
        </div>
      </>
    </div>
  );
}
