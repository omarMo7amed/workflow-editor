import { Copy, LogOutIcon, Pen, Settings, Trash } from "lucide-react";
import { Handle, Position } from "reactflow";
import NodePanel from "./NodePanel";

export default function StartNode({
  data,
  selected,
}: {
  data: { label: string };
  selected: boolean;
}) {
  return (
    <div className="group relative transition-all duration-300 ease-in-out">
      <NodePanel />
      <div
        className={`rounded-bl-4xl rounded-br-xl rounded-tl-4xl rounded-tr-xl border-2 border-dashed ${
          selected ? "border-blue-600 shadow-xl" : "border-blue-400"
        } bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer`}
      >
        <div className="flex items-center justify-center w-20 h-20">
          <LogOutIcon
            size={40}
            className="font-extrabold text-blue-600 group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-md  text-gray-600 font-bold whitespace-nowrap">
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500 border-2 border-white shadow-sm"
      />
    </div>
  );
}
