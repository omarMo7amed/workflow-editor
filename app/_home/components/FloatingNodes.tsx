import { useEffect, useRef, useState } from "react";
import { Node } from "../../src/_types/types";

export default function FloatingNodes() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createNode = (): Node => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 8 + 4,
      opacity: Math.random() * 0.4 + 0.2,
      type: Math.floor(Math.random() * 3) as 0 | 1 | 2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.3 - 0.2,
    });

    // Initialize nodes
    const initialNodes = Array.from({ length: 20 }, createNode);
    setNodes(initialNodes);

    // Add new nodes periodically
    const interval = setInterval(() => {
      setNodes((prev) => {
        const filteredNodes = prev.filter(
          (node) =>
            node.y > -50 &&
            node.y < window.innerHeight + 50 &&
            node.x > -50 &&
            node.x < window.innerWidth + 50
        );

        if (filteredNodes.length < 25) {
          return [...filteredNodes, createNode()];
        }
        return filteredNodes;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          x: node.x + node.vx,
          y: node.y + node.vy,
        }))
      );
    };

    const animationFrame = setInterval(animate, 50);
    return () => clearInterval(animationFrame);
  }, []);

  const renderNode = (node: Node) => {
    const baseClasses = "absolute transition-all duration-300";
    const style: React.CSSProperties = {
      left: node.x,
      top: node.y,
      width: node.size,
      height: node.size,
      opacity: node.opacity,
    };

    switch (node.type) {
      case 0: // Circle
        return (
          <div
            key={node.id}
            className={`${baseClasses} bg-slate-400 rounded-full`}
            style={style}
          />
        );
      case 1: // Square
        return (
          <div
            key={node.id}
            className={`${baseClasses} bg-slate-500 rounded-sm`}
            style={style}
          />
        );
      case 2: // Diamond
        return (
          <div
            key={node.id}
            className={`${baseClasses} bg-slate-600 transform rotate-45`}
            style={style}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {nodes.map(renderNode)}
    </div>
  );
}
