
import { ReactFlowProvider } from "reactflow";

export default function Editor({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1">
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </div>
  );
}
