import { Copy, Edit3, X } from "lucide-react";
import { Node } from "reactflow";

export const NodeContextMenu = ({
  node,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
  position,
}: {
  node: Node;
  onEdit: (node: Node) => void;
  onDuplicate: (node: Node) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}) => {
  console.log(node);
  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]"
      style={{ top: position.y, left: position.x }}
    >
      <button
        onClick={() => {
          onEdit(node);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Edit3 className="w-4 h-4" />
        <span>Edit Node</span>
      </button>
      <button
        onClick={() => {
          onDuplicate(node);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Copy className="w-4 h-4" />
        <span>Duplicate</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onDelete(node.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
      >
        <X className="w-4 h-4" />
        <span>Delete Node</span>
      </button>
    </div>
  );
};
