import EditorSubHeader from "../src/_components/EditorSubHeader";
import WorkflowCanvas from "../src/_components/WorkflowCanvas";
import { ReactFlowProvider } from "reactflow";

export default function Editor() {
  return (
    <div className="relative flex-1">
      <ReactFlowProvider>
        <EditorSubHeader />
        <WorkflowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
