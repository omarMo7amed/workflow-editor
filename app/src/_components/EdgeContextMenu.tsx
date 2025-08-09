import { ArrowRight, Circle, Edit3, Trash, X } from "lucide-react";
import { Edge } from "reactflow";

export const EdgeContextMenu = ({
  edge,
  onChangeType,
  onToggleLabel,
  onDelete,
  onClose,
  position,
}: {
  edge: Edge;
  onChangeType: (edgeId: string, type: string) => void;
  onToggleLabel: (edgeId: string) => void;
  onDelete: (edgeId: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}) => {
  return (
    <div
      className="absolute z-50 bg-white rounded-lg text-slate-700 shadow-xl border border-gray-200 min-w-[180px]"
      style={{ top: position.y, left: position.x }}
    >
      {/* Animated Edge */}
      <button
        onClick={() => {
          onChangeType(edge.id, "animated");
          onClose();
        }}
        className="flex items-center gap-2 px-2 py-3 cursor-pointer w-full text-left hover:bg-slate-100 transition-colors text-sm"
      >
        <ArrowRight className="w-4 h-4 text-blue-500" />
        <span>Animated</span>
      </button>

      {/* Pulse Edge */}
      <button
        onClick={() => {
          onChangeType(edge.id, "pulse");
          onClose();
        }}
        className="flex items-center gap-2 px-2 py-3 cursor-pointer w-full text-left hover:bg-slate-100 transition-colors text-sm"
      >
        <Circle className="w-4 h-4 text-green-500" />
        <span>Pulse</span>
      </button>

      <div className="border-t border-gray-200"></div>

      {/* Toggle Label */}
      <button
        onClick={() => {
          onToggleLabel(edge.id);
          onClose();
        }}
        className="flex items-center gap-2 px-2 py-3 cursor-pointer w-full text-left hover:bg-slate-100 transition-colors text-sm"
      >
        <Edit3 className="w-4 h-4 " />
        <span>Toggle Label</span>
      </button>

      <div className="border-t border-gray-200"></div>

      {/* Delete Edge */}
      <button
        onClick={() => {
          onDelete(edge.id);
          onClose();
        }}
        className="flex items-center gap-2 px-2 py-3 cursor-pointer w-full text-left hover:bg-slate-100 transition-colors text-sm"
      >
        <Trash className="w-4 h-4 text-red-600" />
        <span>Delete Edge</span>
      </button>
    </div>
  );
};
