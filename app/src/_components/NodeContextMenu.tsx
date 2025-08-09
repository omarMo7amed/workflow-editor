import { Copy, Edit3, Settings, Trash } from "lucide-react";
import { Node } from "reactflow";
import useActiveTabs from "../context/ActiveTabsContext";

export const NodeContextMenu = ({
  node,
  onDuplicate,
  onDelete,
  onEdit,
  onClose,
  position,
}: {
  node: Node;
  onDuplicate: (node: Node) => void;
  onDelete: (nodeId: string) => void;
  onEdit: (node: Node | null) => void;
  onClose: () => void;
  position: { x: number; y: number };
}) => {
  const { setRight, setCurrentNodeId } = useActiveTabs();

  if (node.type === "start") return null;

  return (
    <div
      className="absolute z-50  bg-white rounded-lg shadow-xl text-slate-700 border border-gray-200 min-w-[180px]"
      style={{ top: position.y, left: position.x }}
    >
      {/* Edit Button */}
      <button
        onClick={() => onEdit(node)}
        className="flex items-center gap-2 px-2  py-3 cursor-pointer w-full text-left hover:bg-slate-100 transition-colors text-sm"
      >
        <Edit3 className="w-4 h-4 " />
        <span>Edit</span>
      </button>

      <button
        onClick={() => {
          onDuplicate(node);
          onClose();
        }}
        className="flex items-center gap-2 px-2  py-3 cursor-pointer w-full text-left hover:bg-slate-100  transition-colors text-sm"
      >
        <Copy className="w-4 h-4 text-green-400" />
        <span>Duplicate</span>
      </button>

      <button
        onClick={() => {
          setRight("Inspector");
          setCurrentNodeId(node.id);
          onClose();
        }}
        className="flex items-center gap-2 px-2  py-3 cursor-pointer w-full text-left hover:bg-slate-100  transition-colors text-sm"
      >
        <Settings className="w-4 h-4 text-blue-400" />
        <span>Settings</span>
      </button>

      <div className="border-t border-gray-200"></div>

      <button
        onClick={() => {
          onDelete(node.id);
          onClose();
        }}
        className="flex items-center gap-2 px-2  py-3 cursor-pointer w-full text-left hover:bg-slate-100  transition-colors text-sm "
      >
        <Trash className="w-4 h-4 text-red-600" />
        <span>Delete</span>
      </button>
    </div>
  );
};
