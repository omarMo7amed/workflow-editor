import useActiveTabs from "../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import { nodeConfig } from "../_utils/constants";
import { Handle, Position } from "reactflow";
import { NodeType } from "../_types/types";
import NodePanel from "./NodePanel";

interface CustomNodeProps {
  data: {
    label: string;
    type: Exclude<NodeType, "note">;
    id: string;
    description?: string;
    choosedFile?: string;
    extractedText?: string;
    reportFormat?: string;
    status: "idle" | "excute" | "finish" | "error";
  };
  selected: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const { duplicateNode, deleteNode, getCurrentNode, setEditingNode } =
    useFlowStore();

  const { setRight, setCurrentNodeId } = useActiveTabs();
  const node = getCurrentNode(data.id);

  const config = nodeConfig[data.type] || nodeConfig.readFile;
  const Icon = config.icon;

  return (
    <div
      className="group relative"
      onDoubleClick={() => {
        setRight("Inspector");
        setCurrentNodeId(data.id);
      }}
      onKeyDown={(e) => {
        if (e.code === "Delete") deleteNode(data.id);
      }}
      title={`${data.choosedFile || "No File Assigned Yet"}`}
    >
      <NodePanel
        node={node!}
        onDuplicate={duplicateNode}
        onEdit={setEditingNode}
        onDelete={deleteNode}
      />

      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
    ${selected ? config.borderClass.selected : config.borderClass.default}
    bg-gradient-to-br ${config.bgGradient}
    ${config.hoverGradient}
    ${config.borderClass.hover}
    ${config.focusShadow}
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
