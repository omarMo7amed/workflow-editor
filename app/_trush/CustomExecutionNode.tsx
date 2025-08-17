import { nodeConfig, NodeStatusConfig } from "../src/_utils/constants";
import { Handle, Position } from "reactflow";
import { NodeStatus, NodeType } from "../src/_types/types";
import { motion } from "framer-motion";
import { getNodeStatusStyles } from "../src/_utils/helper";

interface CustomNodeProps {
  data: {
    label: string;
    type: Exclude<NodeType, "note">;
    id: string;
    description?: string;
    choosedFile?: string;
    extractedText?: string;
    reportFormat?: string;
    status: NodeStatus;
  };
  selected: boolean;
}

export default function CustomExecutionNode({
  data,
  selected,
}: CustomNodeProps) {
  const config = nodeConfig[data.type] || nodeConfig.readFile;
  const { icon: NodeIcon } = config;
  const { Icon: StatusIcon } = NodeStatusConfig[data.status];
  const { iconColor, statusIconColor, animation } = getNodeStatusStyles(
    data.status
  );

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-2xl border-2 transition-all duration-200 outline-none
        ${selected ? config.borderClass.selected : config.borderClass.default}
        ${NodeStatusConfig[data.status].color} ${animation}
        bg-gradient-to-br ${config.bgGradient} ${config.hoverGradient} ${
        config.borderClass.hover
      } ${config.focusShadow}
        px-4 py-4`}
    >
      <div className="flex items-center p-2">
        <div className="relative">
          <NodeIcon
            size={44}
            className={`${iconColor} ${
              data.status === "running" ? "animate-spin" : ""
            }`}
          />
          <div className="absolute -top-4 -right-4">
            <StatusIcon
              size={20}
              className={`${statusIconColor} ${animation}`}
            />
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: config.receptorColor,
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
          backgroundColor: config.receptorColor,
        }}
      />

      <div
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-md font-semibold whitespace-nowrap ${config.textColor}`}
      >
        {data.label}
      </div>
    </motion.div>
  );
}
