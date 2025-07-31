import { FileEdit } from "lucide-react";
import { Handle, Position } from "reactflow";
import NodePanel from "./NodePanel";

export default function SummarizeNode({
  data,
  selected,
}: {
  data: { label: string };
  selected: boolean;
}) {
  return (
    <div className="group relative">
      <NodePanel />

      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
          ${selected ? "border-amber-600" : "border-amber-400"}
          bg-gradient-to-br from-amber-50 to-amber-100
          hover:from-amber-100 hover:to-amber-200
          hover:shadow-xl focus:shadow-[0_0_0_6px_rgba(245,158,11,0.4)]
          px-4 py-4`}
      >
        <div className="flex p-2 items-center">
          <FileEdit size={44} className="text-amber-500" />
        </div>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md text-gray-600 font-bold whitespace-nowrap">
        {data.label}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-amber-500 border-2 border-white shadow-sm"
      />

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-amber-500 border-2 border-white shadow-sm"
      />
    </div>
  );
}
