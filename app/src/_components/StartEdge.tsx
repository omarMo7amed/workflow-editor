/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "reactflow";
import { Plus } from "lucide-react";

export default function StartEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
}: any) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const isUnconnected = !data?.connected;

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#94a3b8", strokeWidth: 3 }}
      />
      {isUnconnected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${targetX}px, ${targetY}px)`,
              pointerEvents: "none",
              background: "white",
              border: "2px solid #94a3b8",
              borderRadius: "999px",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={12} strokeWidth={3} className="text-slate-600" />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
