import { CustomEdgeData, EdgeType } from "../../_types/types";
import { useEnterKey } from "../../_hooks/useEnterKey";
import { useFlowStore } from "@/app/_store/flowStore";
import { useEffect, useRef, useState } from "react";
import { edgeConfig } from "../../_utils/constants";
import EdgePanel from "./EdgePanel";
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  EdgeProps,
} from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: EdgeProps<CustomEdgeData>) {
  // Path & label positioning
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [label, setLabel] = useState<string | undefined>(data?.label);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toggleEdgeLabel = useFlowStore((s) => s.toggleEdgeLabel);
  const editEdgeLabel = useFlowStore((s) => s.editEdgeLabel);
  const deleteEdge = useFlowStore((s) => s.deleteEdge);
  const mode = useFlowStore((s) => s.mode);

  const isEditor = mode === "Editor";

  const edgeType: EdgeType = (data?.edgeType as EdgeType) || "animated";
  const config = edgeConfig[edgeType] || edgeConfig.animated;

  const gradientId = `gradient-${edgeType}-${id}`;
  const markerId = `marker-arrow-${id}`;

  const handleSave = () => {
    if (label !== undefined) editEdgeLabel(id, label);
    setIsEditingLabel(false);
  };

  const handleMouseEnter = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => setIsHovered(false), 500);
  };

  useEnterKey(handleSave, !!id);

  useEffect(() => {
    setLabel(data?.label);
  }, [data?.label]);

  return (
    <>
      {/* Arrow & stroke definitions */}
      <defs>
        <marker
          id={markerId}
          markerWidth="4"
          markerHeight="4"
          viewBox="0 0 10 8"
          refX="10"
          refY="4"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M 0 0 L 10 4 L 0 8 z" fill={config.markerColor} />
        </marker>

        {/* Gradient for animated edges */}
        {edgeType === "animated" && (
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={config.markerColor}
              stopOpacity="0.5"
            />
            <stop offset="50%" stopColor={config.markerColor} stopOpacity="1" />
            <stop
              offset="100%"
              stopColor={config.markerColor}
              stopOpacity="0.5"
            />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-200 0;200 0;-200 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        )}
      </defs>

      {/* Main edge line */}
      <BaseEdge
        path={edgePath}
        style={{
          ...style,
          pointerEvents: "none",
          strokeWidth: config.strokeWidth,
          stroke:
            edgeType === "animated"
              ? `url(#${gradientId})`
              : config.stroke || config.markerColor,
          strokeDasharray: config.strokeDasharray,
          filter: config.filter,
          animation: config?.animation,
        }}
        markerEnd={`url(#${markerId})`}
      />

      {/* Transparent hitbox for hover */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={40}
        style={{ pointerEvents: "stroke" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Hover menu */}
      {isEditor && isHovered && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX - 20}px, ${
                labelY - 20
              }px)`,
              pointerEvents: "all",
              zIndex: 1000,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <EdgePanel
              edge={{
                id,
                source: "",
                target: "",
                type: edgeType,
                data: data ?? {},
                selected: false,
              }}
              onDelete={deleteEdge}
              onToggle={toggleEdgeLabel}
            />
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Edge label */}
      {data?.showLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontSize: 12,
              pointerEvents: "all",
            }}
            className="nodrag nopan bg-white px-2 py-1 rounded-full border border-gray-300 shadow-sm text-xs font-medium text-gray-600 outline-none"
            onDoubleClick={() => setIsEditingLabel(true)}
            onBlur={handleSave}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isEditingLabel ? (
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-24"
                autoFocus
              />
            ) : (
              <h4>{label}</h4>
            )}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
