import { Plus, StickyNote } from "lucide-react";
import { focusSearchInput } from "../../_utils/helper";
import { useFlowStore } from "@/app/_store/flowStore";
import useActiveTabs from "../../context/ActiveTabsContext";

export default function Toolbar() {
  const addNode = useFlowStore((s) => s.addNode);
  const setRight = useActiveTabs().setRight;

  return (
    <div className="absolute top-5 right-4 z-50">
      <button
        onClick={() => {
          setRight("Nodes");
          setTimeout(focusSearchInput, 0);
        }}
        title="Add Node"
        className="p-3 w-full rounded-md bg-transparent cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-offset-2 ring-2 ring-slate-300 focwhatus:ring-slate-400 mb-3"
        aria-label="add node"
      >
        <Plus size={18} />
      </button>

      <button
        onClick={() => addNode("note", "Note")}
        title="Write Note"
        className="p-3 w-full rounded-md bg-transparent cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-offset-2 ring-2 ring-slate-300 focus:ring-slate-400"
        aria-label="write note"
      >
        <StickyNote size={18} />
      </button>
    </div>
  );
}
