import { BarChart3 } from "lucide-react";
import { Handle, Position } from "reactflow";

export default function ReportNode({
  data,
  selected,
}: {
  data: { label: string };
  selected: boolean;
}) {
  return (
    <div className="group relative">
      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
          ${selected ? "border-blue-600" : "border-blue-400"}
          bg-gradient-to-br from-blue-50 to-slate-50
          hover:from-slate-50 hover:to-blue-50
          hover:shadow-lg hover:border-blue-400 focus:shadow-[0_0_0_6px_rgba(59,130,246,0.3)]
          px-4 py-4`}
      >
        <div className="flex p-2 items-center">
          <BarChart3 size={44} className="text-blue-700" />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-600 border-2 border-white shadow-sm"
      />

      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-600 border-2 border-white shadow-sm"
      />

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md text-blue-800 font-semibold whitespace-nowrap">
        {data.label}
      </div>
    </div>
  );
}
