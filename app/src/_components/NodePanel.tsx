import { Ellipsis, Play, Settings, Trash } from "lucide-react";
import useActiveTabs from "../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import { Node } from "reactflow";
import { useRef } from "react";

interface NodePanelProps {
  node: Node;
  onDelete?: (id: string) => void;
}

export default function NodePanel({ node, onDelete }: NodePanelProps) {
  const { setRight, setCurrentNodeId } = useActiveTabs();
  const ellipsisRef = useRef<HTMLButtonElement>(null);
  const { setNodeContext } = useFlowStore();

  function handleEllipsisClick() {
    if (ellipsisRef.current) {
      const rect = ellipsisRef.current.getBoundingClientRect();
      setNodeContext({
        item: node,
        position: {
          x: rect.left + 20,
          y: rect.bottom + 20,
        },
      });
    }
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 py-5 -top-12 h-16 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
      <div className="flex justify-between items-center">
        <button
          title="settings"
          aria-label="settings"
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => {
            setRight("Inspector");
            setCurrentNodeId(node.id);
          }}
        >
          <Settings size={16} />
        </button>

        <button
          title="Execute"
          aria-label="Excute current node"
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => {
            setRight("Inspector");
            setCurrentNodeId(node.id);
          }}
        >
          <Play size={16} />
        </button>

        <button
          aria-label="Delete"
          className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors duration-200"
          onClick={() => onDelete?.(node.data.id)}
        >
          <Trash size={16} />
        </button>

        <button
          ref={ellipsisRef}
          aria-label="More"
          className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors duration-200"
          onClick={handleEllipsisClick}
        >
          <Ellipsis size={16} />
        </button>
      </div>
    </div>
  );
}
