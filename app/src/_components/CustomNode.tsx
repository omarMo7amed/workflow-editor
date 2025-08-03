import { FileText, Mail, BarChart3, FileEdit } from "lucide-react";
import { Handle, Position } from "reactflow";
import NodePanel from "./NodePanel";
import { NodeType } from "../_types/types";
import { useFlowStore } from "@/app/_store/flowStore";

interface CustomNodeProps {
  data: { label: string; type: NodeType; fileName?: string; id: string };
  selected: boolean;
}

const nodeConfig = {
  readFile: {
    icon: FileText,
    borderColor: "emerald",
    bgGradient: "from-emerald-50 to-emerald-100",
    hoverGradient: "from-emerald-100 to-emerald-200",
    focusShadow: "rgba(16,185,129,0.4)",
    iconColor: "text-emerald-500",
    handleColor: "bg-emerald-500",
    receptorColor: "rgba(16,185,129,1)",
    textColor: "text-gray-600",
  },
  email: {
    icon: Mail,
    borderColor: "slate",
    bgGradient: "from-slate-200 to-slate-100",
    hoverGradient: "from-slate-100 to-slate-200",
    focusShadow: "rgba(71,85,105,0.3)",
    iconColor: "text-slate-600",
    handleColor: "bg-slate-600",
    receptorColor: "rgba(71,85,105,1)",
    textColor: "text-slate-700",
  },
  report: {
    icon: BarChart3,
    borderColor: "blue",
    bgGradient: "from-blue-50 to-slate-50",
    hoverGradient: "from-slate-50 to-blue-50",
    focusShadow: "rgba(59,130,246,0.3)",
    iconColor: "text-blue-700",
    handleColor: "bg-blue-600",
    receptorColor: "rgba(59,130,246,1)",
    textColor: "text-slate-700",
  },
  summarize: {
    icon: FileEdit,
    borderColor: "amber",
    bgGradient: "from-amber-50 to-amber-100",
    hoverGradient: "from-amber-100 to-amber-200",
    focusShadow: "rgba(245,158,11,0.4)",
    iconColor: "text-amber-500",
    handleColor: "bg-amber-500",
    receptorColor: "rgba(245,158,11,1)",
    textColor: "text-gray-600",
  },
};

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const { duplicateNode, deleteNode, getCurrentNode } = useFlowStore();

  const config = nodeConfig[data.type] || nodeConfig.readFile;
  const Icon = config.icon;

  const node = getCurrentNode(data.id);
  console.log("id", node?.data.id);
  console.log(node);

  return (
    <div className="group relative">
      <NodePanel
        node={node!}
        onDuplicate={duplicateNode}
        // onEdit={editNode}
        onDelete={deleteNode}
      />

      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
          ${
            selected
              ? `border-${config.borderColor}-600`
              : `border-${config.borderColor}-400`
          }
          bg-gradient-to-br ${config.bgGradient}
          hover:${config.hoverGradient}
          hover:shadow-lg hover:border-${config.borderColor}-400
          focus:shadow-[0_0_0_6px_${config.focusShadow}]
          px-4 py-4`}
      >
        <div className="flex p-2 items-center">
          <Icon size={44} className={config.iconColor} />
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: `${config.receptorColor}`,
        }}
      />

      <Handle
        type="target"
        position={Position.Left}
        className={`w-3 h-3 ${config.handleColor} border-2 border-white shadow-sm`}
        style={{
          width: "10px",
          height: "20px",
          borderRadius: "4px",
          backgroundColor: `${config.receptorColor}`,
        }}
      />

      <div
        className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-md ${config.textColor} font-semibold whitespace-nowrap`}
      >
        {data.label}
      </div>
    </div>
  );
}
