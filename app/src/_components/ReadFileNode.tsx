import { FileText } from "lucide-react";
import { Handle, Position } from "reactflow";
import NodePanel from "./NodePanel";

export default function ReadFileNode({
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
          ${selected ? "border-emerald-600" : "border-emerald-400"}
          bg-gradient-to-br from-emerald-50 to-emerald-100
          hover:from-emerald-100 hover:to-emerald-200
          hover:shadow-xl focus:shadow-[0_0_0_6px_rgba(16,185,129,0.4)]
          px-4 py-4`}
      >
        <div className="flex p-2 items-center">
          <FileText size={44} className="text-emerald-500" />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-emerald-500 border-2 border-white shadow-sm"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-emerald-500 border-2 border-white shadow-sm"
      />

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md  text-gray-600 font-bold whitespace-nowrap">
        {data.label}
      </div>
    </div>
  );
}
