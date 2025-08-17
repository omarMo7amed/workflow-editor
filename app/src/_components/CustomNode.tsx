"use client";

import { nodeConfig, NodeStatusConfig } from "../_utils/constants";
import { Handle, Position } from "reactflow";
import { NodeStatus, NodeType } from "../_types/types";
import { motion } from "framer-motion";
import { getNodeStatusStyles } from "../_utils/helper";
import NodePanel from "./NodePanel";
import useActiveTabs from "../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";

interface CustomNodeProps {
  data: {
    label: string;
    type: Exclude<NodeType, "note">;
    id: string;
    description?: string;
    choosedFile?: string;
    output?: string | File;
    reportFormat?: string;
    status: NodeStatus;
  };
  selected: boolean;
}

export default function CustomNode({ data, selected }: CustomNodeProps) {
  const mode = useFlowStore((state) => state.mode);
  const { deleteNode, getCurrentNode } = useFlowStore();
  const { setRight, setCurrentNodeId } = useActiveTabs();

  const node = getCurrentNode(data.id);
  const isEditor = mode === "Editor";

  const config = nodeConfig[data.type] || nodeConfig.readFile;
  const { icon: NodeIcon } = config;

  const { Icon: StatusIcon } =
    data.status === "idle" && isEditor
      ? {}
      : NodeStatusConfig[data.status] || {};

  const { iconColor, statusIconColor, animation } = getNodeStatusStyles(
    data.status
  );

  return (
    <div
      className="group relative"
      {...(mode === "Editor" && {
        onDoubleClick: () => {
          setRight("Inspector");
          setCurrentNodeId(data.id);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.code === "Delete") deleteNode(data.id);
        },
        title: data.choosedFile || "No File Assigned Yet",
      })}
    >
      {isEditor && <NodePanel node={node!} onDelete={deleteNode} />}

      <div
        tabIndex={0}
        className={`rounded-2xl border-2 transition-all duration-200 outline-none
          ${selected ? config.borderClass.selected : config.borderClass.default}
          bg-gradient-to-br ${config.bgGradient} ${config.hoverGradient}
          ${config.borderClass.hover} ${config.focusShadow}
          ${
            isEditor
              ? ""
              : `${NodeStatusConfig[data.status].color} ${animation}`
          }
          px-4 py-4`}
      >
        <div className="flex items-center p-2">
          <div className="relative">
            <NodeIcon
              size={44}
              className={
                !isEditor
                  ? `${iconColor} ${
                      data.status === "running" ? "animate-spin" : ""
                    }`
                  : config.iconColor
              }
            />
            {StatusIcon && (
              <div className="absolute -top-4 -right-4">
                <StatusIcon
                  size={20}
                  className={`${statusIconColor} ${animation}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Handles */}
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

      {/* Label */}
      <div
        className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-md font-semibold whitespace-nowrap ${config.textColor}`}
      >
        {data.label}
      </div>
    </div>
  );
}
