import { useFlowStore } from "@/app/_store/flowStore";
import { FileText, BookOpen, Mail, BarChart, Plus } from "lucide-react";

export type NodeType = "readFile" | "summarize" | "email" | "report";

interface DefaultNode {
  type: NodeType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const defaultNodes: DefaultNode[] = [
  {
    type: "readFile",
    label: "Read File",
    icon: FileText,
    color: "text-green-500",
  },
  {
    type: "summarize",
    label: "Summarize",
    icon: BookOpen,
    color: "text-amber-500",
  },
  { type: "email", label: "Send Email", icon: Mail, color: "text-slate-500" },
  {
    type: "report",
    label: "Generate Report",
    icon: BarChart,
    color: "text-blue-500",
  },
];

export default function DefaultNodes() {
  const { addNode } = useFlowStore();

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
              onClick={() => addNode(node.type)}
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
