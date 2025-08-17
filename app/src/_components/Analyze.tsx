import { ReactNode } from "react";
import useActiveTabs from "../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import Button from "./Button";

export default function Analyze({ children }: { children: ReactNode }) {
  const { left } = useActiveTabs();
  const { resetWorkflowExecution, executeWorkflow, executionProgress } =
    useFlowStore();
  const isExecuting = useFlowStore((s) => s.isExecuting);

  if (left !== "Analyze") return;

  return (
    <div className="flex flex-col gap-5 px-2 py-5">
      {executionProgress || isExecuting ? (
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
              disabled={isExecuting}
            >
              {isExecuting ? "Executing..." : "Replay"}
            </Button>
          </div>
        </>
      ) : (
        <p className="mx-auto">No executions have occurred yet</p>
      )}
    </div>
  );
}
