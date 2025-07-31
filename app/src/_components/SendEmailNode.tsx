import { Mail } from "lucide-react";
import { Handle, Position } from "reactflow";
import NodePanel from "./NodePanel";

export default function ReadFileNode({
  data,
  selected,
}: {
  data: { label: string; fileName?: string };
  selected: boolean;
}) {
  return (
    <div className="group relative">
      <NodePanel />

      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
          ${selected ? "border-slate-600" : "border-slate-400"}
          bg-gradient-to-br from-slate-200 to-slate-100
          hover:from-slate-100 hover:to-slate-200
          hover:shadow-lg hover:border-slate-400 focus:shadow-[0_0_0_6px_rgba(71,85,105,0.3)]
          px-4 py-4`}
      >
        <div className="flex p-2 items-center">
          <Mail size={44} className="text-slate-600" />
        </div>
        {data.fileName && (
          <div className="text-sm text-slate-500 mt-1">{data.fileName}</div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-slate-600 border-2 border-white shadow-sm"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-slate-600 border-2 border-white shadow-sm"
      />

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md text-slate-700 font-semibold whitespace-nowrap">
        {data.label}
      </div>
    </div>
  );
}
