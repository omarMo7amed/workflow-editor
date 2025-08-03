import { Copy, Pen, Trash } from "lucide-react";
import { Node } from "reactflow";

interface NodePanelProps {
  node: Node;
  onDuplicate?: (node: Node) => void;
  onEdit?: (id: string, label?: string, type?: string) => void;
  onDelete?: (id: string) => void;
}

export default function NodePanel({
  node,
  onDuplicate,
  onEdit,
  onDelete,
}: NodePanelProps) {
  return (
    <div className="bg-slate-300/50 backdrop-blur-md absolute left-0 p-2 rounded-xl -top-10 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
      <div className="flex justify-between items-center">
        {/* <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={(}
        >
          <Settings size={16} />
        </button> */}

        <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => onDuplicate?.(node)}
        >
          <Copy size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          onClick={() => onEdit?.(node.data.id)}
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
