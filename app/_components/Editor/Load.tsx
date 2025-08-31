import useActiveTabs from "../../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import toast from "react-hot-toast";
import { ReactNode } from "react";

export default function Load({ children }: { children: ReactNode }) {
  const executeWorkflow = useFlowStore((s) => s.executeWorkflow);
  const isExecuting = useFlowStore((s) => s.isExecuting);
  const setMode = useFlowStore((s) => s.setMode);
  const left = useActiveTabs().left;

  if (left !== "Load") return;

  const handleExecute = (e?: React.MouseEvent) => {
    // this the fucking worst bug i ever seen in my life
    e?.preventDefault();
    e?.stopPropagation();
    setMode("Executions");
    async function execute() {
      const result = await executeWorkflow();
      if (result?.data) toast.success(result.data);
    }

    setTimeout(execute, 300);
  };

  return (
    <>
      {children}

      <button
        disabled={isExecuting}
        type="button"
        className="px-4 py-2 text-sm cursor-pointer transition-colors duration-200 focus:ring-2 focus:ring-slate-400 bg-slate-900 font-semibold text-white hover:bg-slate-700 rounded-md"
        onClick={handleExecute}
      >
        {isExecuting ? "Executing..." : "Execute Workflow"}
      </button>
    </>
  );
}
