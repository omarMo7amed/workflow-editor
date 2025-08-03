import { Plus, StickyNote } from "lucide-react";
import { focusSearchInput } from "../_utils/helper";
import { useFlowStore } from "@/app/_store/flowStore";

export default function Toolbar() {
  //we have an error here don't forget
  const { addNote } = useFlowStore();

  return (
    <div className="absolute top-5 right-4 z-50">
      <button
        onClick={focusSearchInput}
        title="Add Node"
        className="p-3 w-full rounded-md bg-transparent cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-offset-2 ring-2 ring-slate-300 focwhatus:ring-slate-400 mb-3"
        aria-label="add node"
      >
        <Plus size={18} />
      </button>

      <button
        onClick={() => addNote()}
        title="Write Note"
        className="p-3 w-full rounded-md bg-transparent cursor-pointer hover:bg-gray-200 transition-colors flex items-center justify-center focus:ring-offset-2 ring-2 ring-slate-300 focus:ring-slate-400"
        aria-label="write note"
      >
        <StickyNote size={18} />
      </button>
    </div>
  );
}
