import { ReactFlowProvider } from "reactflow";
import WorkflowEditor from "../src/_components/WorkFlowEditor";

export default function Editor() {
  return (
    <div className="relative">
      <ReactFlowProvider>
        <WorkflowEditor />
      </ReactFlowProvider>
    </div>
  );
}
