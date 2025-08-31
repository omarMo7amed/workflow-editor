import { useFlowStore } from "@/app/_store/flowStore";
import { Plus } from "lucide-react";
import { defaultNodes } from "../../../_utils/constants";

export default function DefaultNodes() {
  const addNode = useFlowStore((s) => s.addNode);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 uppercase px-2">
        Default Nodes
      </h4>
      <ul className="space-y-2">
        {defaultNodes.map((node) => (
          <li
            onDragStart={(event) => {
              event.dataTransfer.setData("application/reactflow", node.type);
              event.dataTransfer.effectAllowed = "move";
            }}
            draggable
            key={node.type}
            className="px-3 py-2 bg-white cursor-pointer rounded-lg border border-gray-200 flex justify-between items-center text-sm text-gray-800 hover:shadow-sm transition"
          >
            <div className="flex items-center space-x-2">
              <node.icon className={`w-4 h-4 ${node.color}`} />
              <span>{node.label}</span>
            </div>
            <button
              onClick={() => {
                addNode(node.type, node.label);
              }}
              className={`p-1 text-slate-600 hover:scale-130 hover:text-opacity-80 cursor-pointer`}
              title={`Add ${node.label}`}
            >
              <Plus size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
