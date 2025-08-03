import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  EdgeProps,
} from "reactflow";

type EdgeType = "animated" | "pulse" | "startEdge";

interface EdgeConfig {
  strokeWidth: number;
  stroke?: string;
  filter?: string;
  markerColor: string;
  strokeDasharray?: string;
}

interface CustomEdgeData {
  label?: string;
  showLabel?: boolean;
  edgeType?: string;
}

const edgeConfig: Record<EdgeType, EdgeConfig> = {
  animated: {
    strokeWidth: 3,
    markerColor: "#64748b",
  },
  pulse: {
    strokeWidth: 4,
    filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))",
    markerColor: "#3b82f6",
  },
  startEdge: {
    strokeWidth: 3,
    stroke: "#64748b",
    markerColor: "#64748b",
    strokeDasharray: "5,5",
  },
};

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
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeType = data?.edgeType || "animated";
  const config = edgeConfig[edgeType as EdgeType] || edgeConfig.animated;
  const markerId = `marker-arrow-${id}`;
  const gradientId = `gradient-${edgeType}-${id}`;
  console.log(data?.edgeType);

  return (
    <>
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

        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            stopColor={config.markerColor}
            stopOpacity={edgeType === "animated" ? "0.5" : "0.2"}
          />
          <stop offset="50%" stopColor={config.markerColor} stopOpacity="1" />
          <stop
            offset="100%"
            stopColor={config.markerColor}
            stopOpacity={edgeType === "animated" ? "0.5" : "0.2"}
          />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-200 0;200 0;-200 0"
            dur={edgeType === "animated" ? "3s" : "2s"}
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {/* Main visible edge */}
      <BaseEdge
        path={edgePath}
        style={{
          ...style,
          pointerEvents: "none",
          strokeWidth: config.strokeWidth,
          stroke: `url(#${gradientId})`,
          filter: config.filter,
        }}
        markerEnd={`url(#${markerId})`}
      />

      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        style={{ pointerEvents: "stroke" }}
        onContextMenu={(e) => {
          e.preventDefault();
          const customEvent = new CustomEvent("edge-context-menu", {
            detail: { edgeId: id, x: e.clientX, y: e.clientY },
          });
          window.dispatchEvent(customEvent);
        }}
      />

      {data?.showLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              pointerEvents: "all",
            }}
            className="nodrag nopan bg-white px-2 py-1 rounded-full border border-gray-300 shadow-sm text-xs font-medium text-gray-600 outline-none"
          >
            {data.label || "Flow"}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
