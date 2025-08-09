import { Copy, Pen, Settings, Trash } from "lucide-react";
import { Node } from "reactflow";
import useActiveTabs from "../context/ActiveTabsContext";

interface NodePanelProps {
  node: Node;
  onDuplicate?: (node: Node) => void;
  onEdit?: (node: Node) => void;
  onDelete?: (id: string) => void;
}

export default function NodePanel({
  node,
  onDuplicate,
  onEdit,
  onDelete,
}: NodePanelProps) {
  const { setRight, setCurrentNodeId } = useActiveTabs();

  return (
    <div className="absolute left-0 pb-5 -top-7 w-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
      <div className="flex justify-between items-center">
        <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => {
            setRight("Inspector");
            setCurrentNodeId(node.id);
          }}
        >
          <Settings size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => onDuplicate?.(node)}
        >
          <Copy size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => onEdit?.(node)}
        >
          <Pen size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-red-600 transition-colors duration-200"
          onClick={() => onDelete?.(node.data.id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
