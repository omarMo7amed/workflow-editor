import { useEffect, useRef, useState } from "react";
import { Connection } from "../../src/_types/types";
import motion from "@/app/src/_components/Motion";

export default function InteractiveConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  //remember ya zmeeeeeeeeeeeeeeeel 73 height of the navigation bar

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newConnections: Connection[] = [];
      for (let i = 0; i < 3; i++) {
        const angle = (Math.PI * 2 * i) / 3;
        const distance = 100 + Math.random() * 50;
        newConnections.push({
          id: i,
          x1: e.clientX,
          y1: e.clientY - 73,
          x2: e.clientX + Math.cos(angle) * distance,
          y2: e.clientY + Math.sin(angle) * distance - 73,
        });
      }
      setConnections(newConnections);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 pointer-events-none"
      width="100%"
      height="100%"
    >
      {connections.map((connection) => (
        <motion.line
          key={connection.id}
          x1={connection.x1}
          y1={connection.y1}
          x2={connection.x2}
          y2={connection.y2}
          stroke="rgba(51, 65, 85, 0.2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </svg>
  );
}
