import { Edit3, Settings, Trash } from "lucide-react";

import { useFlowStore } from "@/app/_store/flowStore";
import { Edge } from "reactflow";
import { useRef } from "react";

interface NodePanelProps {
  edge: Edge;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

export default function EdgePanel({
  edge,
  onDelete,
  onToggle,
}: NodePanelProps) {
  const ellipsisRef = useRef<HTMLButtonElement>(null);
  const { setEdgeContext } = useFlowStore();

  function handleEllipsisClick() {
    if (ellipsisRef.current) {
      const rect = ellipsisRef.current.getBoundingClientRect();
      setEdgeContext({
        item: edge,
        position: {
          x: rect.left + 20,
          y: rect.bottom + 20,
        },
      });
    }
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 py-5 -top-12 h-16 w-16  duration-300 ease-out">
      <div className="flex justify-between gap-1.5 items-center">
        <button
          aria-label="Delete"
          className="text-gray-600 p-2 bg-slate-200/70 rounded-md cursor-pointer hover:text-red-600 transition-colors duration-200"
          onClick={() => onDelete?.(edge.id)}
        >
          <Trash size={18} />
        </button>

        <button
          aria-label="Delete"
          className="text-gray-600 p-2 bg-slate-200/70 rounded-md cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => onToggle?.(edge.id)}
        >
          <Edit3 size={18} />
        </button>

        <button
          title="settings"
          aria-label="settings"
          className="text-gray-600 p-2 bg-slate-200/70 rounded-md cursor-pointer hover:text-blue-600 transition-colors duration-200"
          ref={ellipsisRef}
          onClick={handleEllipsisClick}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}
