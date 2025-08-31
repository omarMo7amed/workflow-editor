import { useFlowStore } from "@/app/_store/flowStore";
import ExecutionLogCard from "./ExecutionLogCard";

export default function Logs() {
  const { executions } = useFlowStore();

  return (
    <div className="space-y-3 max-h-90 overflow-x-auto">
      {executions.map((execution) => (
        <ExecutionLogCard
          key={`${execution.node_id + execution.id}`}
          execution={execution}
        />
      ))}
    </div>
  );
}
