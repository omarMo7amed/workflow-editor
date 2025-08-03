import { ArrowRight, Circle, Edit3, X } from "lucide-react";
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
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]"
      style={{ top: position.y, left: position.x }}
    >
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Edge Style
      </div>

      <button
        onClick={() => {
          onChangeType(edge.id, "animated");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <ArrowRight className="w-4 h-4" />
        <span>Animated</span>
      </button>

      <button
        onClick={() => {
          onChangeType(edge.id, "pulse");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Circle className="w-4 h-4" />
        <span>Pulse</span>
      </button>

      <hr className="my-1" />

      <button
        onClick={() => {
          onToggleLabel(edge.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Edit3 className="w-4 h-4" />
        <span>Toggle Label</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onDelete(edge.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
      >
        <X className="w-4 h-4" />
        <span>Delete Edge</span>
      </button>
    </div>
  );
};
