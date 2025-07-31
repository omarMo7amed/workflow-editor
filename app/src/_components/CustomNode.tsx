// components/CustomNode.tsx
"use client";
import { memo } from "react";
import { Handle, Position } from "reactflow";
type CustomNodeProps = {
  data: {
    label: string;
  };
};

function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="rounded-full border-2 border-green-500 px-6 py-4 shadow-lg bg-white text-center min-w-[120px]">
      <div className="font-semibold text-gray-800">{data.label}</div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-green-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-green-500"
      />
    </div>
  );
}

export default memo(CustomNode);
