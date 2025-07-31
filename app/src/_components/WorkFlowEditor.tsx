"use client";
import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  MarkerType,
} from "reactflow";
import { X, Edit3, Copy, Circle, Zap, ArrowRight } from "lucide-react";

import "reactflow/dist/style.css";

import ReportNode from "./ReportNode";
import ReadFileNode from "./ReadFileNode";
import SummarizeNode from "./SummarizeNode";
import SendEmailNode from "./SendEmailNode";
import EditorSubHeader from "./EditorSubHeader";
import StartNode from "./StartNode";

// Custom Animated Edge Component
const AnimatedEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 3,
          stroke: "url(#animated-gradient)",
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
            className="nodrag nopan bg-white px-2 py-1 rounded-full border border-gray-300 shadow-sm text-xs font-medium text-gray-600"
          >
            {data.label || "Flow"}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

// Pulse Edge Component
const PulseEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <defs>
        <linearGradient
          id={`pulse-gradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-100 0;100 0;-100 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          strokeWidth: 4,
          stroke: `url(#pulse-gradient-${id})`,
          filter: "drop-shadow(0 0 6px rgba(59, 130, 246, 0.4))",
        }}
      />
    </>
  );
};

// Register custom edge types
const edgeTypes = {
  animated: AnimatedEdge,
  pulse: PulseEdge,
};

// Node Context Menu Component
const NodeContextMenu = ({
  node,
  onEdit,
  onDuplicate,
  onDelete,
  onClose,
  position,
}: {
  node: Node;
  onEdit: (node: Node) => void;
  onDuplicate: (node: Node) => void;
  onDelete: (nodeId: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}) => {
  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]"
      style={{ top: position.y, left: position.x }}
    >
      <button
        onClick={() => {
          onEdit(node);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Edit3 className="w-4 h-4" />
        <span>Edit Node</span>
      </button>
      <button
        onClick={() => {
          onDuplicate(node);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Copy className="w-4 h-4" />
        <span>Duplicate</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onDelete(node.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
      >
        <X className="w-4 h-4" />
        <span>Delete Node</span>
      </button>
    </div>
  );
};

// Edge Context Menu Component
const EdgeContextMenu = ({
  edge,
  onChangeType,
  onToggleLabel,
  onDelete,
  onClose,
  position,
}: {
  edge: Edge;
  onChangeType: (edgeId: string, type: string) => void;
  onToggleLabel: (edgeId: string) => void;
  onDelete: (edgeId: string) => void;
  onClose: () => void;
  position: { x: number; y: number };
}) => {
  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[160px]"
      style={{ top: position.y, left: position.x }}
    >
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Edge Style
      </div>
      <button
        onClick={() => {
          onChangeType(edge.id, "animated");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <ArrowRight className="w-4 h-4" />
        <span>Animated</span>
      </button>
      <button
        onClick={() => {
          onChangeType(edge.id, "pulse");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Circle className="w-4 h-4" />
        <span>Pulse</span>
      </button>
      <button
        onClick={() => {
          onChangeType(edge.id, "lightning");
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Zap className="w-4 h-4" />
        <span>Lightning</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onToggleLabel(edge.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2 text-sm"
      >
        <Edit3 className="w-4 h-4" />
        <span>Toggle Label</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onDelete(edge.id);
          onClose();
        }}
        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center space-x-2 text-sm text-red-600"
      >
        <X className="w-4 h-4" />
        <span>Delete Edge</span>
      </button>
    </div>
  );
};

// Edit Node Modal
const EditNodeModal = ({
  node,
  onSave,
  onClose,
}: {
  node: Node | null;
  onSave: (nodeId: string, label: string, type: string) => void;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState(node?.data.label || "");
  const [nodeType, setNodeType] = useState(node?.type || "readFile");

  if (!node) return null;

  const handleSave = () => {
    onSave(node.id, label, nodeType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Node</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Node Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter node label"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Node Type
          </label>
          <select
            value={nodeType}
            onChange={(e) => setNodeType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="readFile">Read File</option>
            <option value="summarize">Summarize</option>
            <option value="sendEmail">Send Email</option>
            <option value="report">Generate Report</option>
            <option value="start">Start</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = {
  start: StartNode,
  readFile: ReadFileNode,
  summarize: SummarizeNode,
  sendEmail: SendEmailNode,
  report: ReportNode,
};

const initialNodes: Node[] = [
  {
    id: "0",
    type: "start",
    position: { x: 150, y: 100 },
    data: { label: "Start" },
  },
  {
    id: "1",
    type: "readFile",
    position: { x: 100, y: 280 },
    data: { label: "Read File" },
  },
  {
    id: "2",
    type: "summarize",
    position: { x: 350, y: 380 },
    data: { label: "Summarize" },
  },
  {
    id: "3",
    type: "sendEmail",
    position: { x: 550, y: 320 },
    data: { label: "Send Email" },
  },
  {
    id: "4",
    type: "report",
    position: { x: 750, y: 220 },
    data: { label: "Generate Report" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "pulse",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#64748b",
    },
    data: { label: "Process", showLabel: true },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "pulse",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#64748b",
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "lightning",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#64748b",
    },
  },
];

export default function WorkflowEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeId, setNodeId] = useState(5);
  const [edgeId, setEdgeId] = useState(4);
  const [activeTab, setActiveTab] = useState<string>("Editor");

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  const [contextMenu, setContextMenu] = useState<{
    node: Node;
    position: { x: number; y: number };
  } | null>(null);

  const [edgeContextMenu, setEdgeContextMenu] = useState<{
    edge: Edge;
    position: { x: number; y: number };
  } | null>(null);

  const [editingNode, setEditingNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const newEdge = {
        ...params,
        id: `e${edgeId}`,
        type: "animated",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#64748b",
        },
        data: { showLabel: false },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      setEdgeId((id) => id + 1);
    },
    [setEdges, edgeId]
  );

  const addNewNode = useCallback(
    (type: string, label: string) => {
      const newNode: Node = {
        id: nodeId.toString(),
        type,
        position: {
          x: Math.random() * 400 + 100,
          y: Math.random() * 300 + 100,
        },
        data: { label },
      };
      setNodes((nds) => [...nds, newNode]);
      setNodeId((id) => id + 1);
    },
    [nodeId, setNodes]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    },
    [setNodes, setEdges]
  );

  const deleteEdge = useCallback(
    (edgeId: string) => {
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  const changeEdgeType = useCallback(
    (edgeId: string, type: string) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === edgeId
            ? {
                ...edge,
                type,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  color:
                    type === "lightning"
                      ? "#fbbf24"
                      : type === "pulse"
                      ? "#3b82f6"
                      : "#64748b",
                },
              }
            : edge
        )
      );
    },
    [setEdges]
  );

  const toggleEdgeLabel = useCallback(
    (edgeId: string) => {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === edgeId
            ? {
                ...edge,
                data: {
                  ...edge.data,
                  showLabel: !edge.data?.showLabel,
                  label: edge.data?.label || "Flow",
                },
              }
            : edge
        )
      );
    },
    [setEdges]
  );

  const duplicateNode = useCallback(
    (node: Node) => {
      const newNode: Node = {
        ...node,
        id: nodeId.toString(),
        position: { x: node.position.x + 50, y: node.position.y + 50 },
      };
      setNodes((nds) => [...nds, newNode]);
      setNodeId((id) => id + 1);
    },
    [nodeId, setNodes]
  );

  const editNode = useCallback(
    (nodeId: string, label: string, type: string) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label }, type }
            : node
        )
      );
    },
    [setNodes]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setContextMenu({
        node,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    []
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.preventDefault();
      setEdgeContextMenu({
        edge,
        position: { x: event.clientX, y: event.clientY },
      });
    },
    []
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (node.type === "start") {
        const nodeTypes = [
          { type: "readFile", label: "Read File" },
          { type: "summarize", label: "Summarize" },
          { type: "sendEmail", label: "Send Email" },
          { type: "report", label: "Generate Report" },
        ];
        const randomType =
          nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        addNewNode(randomType.type, randomType.label);
      }
    },
    [addNewNode]
  );

  const onPaneClick = useCallback(() => {
    setContextMenu(null);
    setEdgeContextMenu(null);
  }, []);

  const clearAllNodes = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, [setNodes, setEdges]);

  return (
    <>
      {/* SVG Definitions for animations */}
      <svg width="0" height="0">
        <defs>
          <linearGradient
            id="animated-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#64748b" stopOpacity="1" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.5" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-200 0;200 0;-200 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="" style={{ width: "100%", height: "calc(100vh - 73px)" }}>
        <EditorSubHeader activeTab={activeTab} onActiveTab={handleActiveTab} />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className="bg-gradient-to-br from-slate-50 to-slate-100"
          connectionLineStyle={{
            strokeWidth: 3,
            stroke: "#64748b",
            strokeDasharray: "5,5",
            animation: "dash 1s linear infinite",
          }}
          defaultEdgeOptions={{
            style: {
              strokeWidth: 3,
              stroke: "#64748b",
            },
            type: "animated",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#64748b",
            },
          }}
        >
          <MiniMap
            className="bg-white border border-gray-200 rounded-lg shadow-lg"
            nodeStrokeWidth={3}
            nodeColor={(node) => {
              switch (node.type) {
                case "readFile":
                  return "#10b981";
                case "summarize":
                  return "#8b5cf6";
                case "sendEmail":
                  return "#f97316";
                case "report":
                  return "#6366f1";
                case "start":
                  return "#3b82f6";
                default:
                  return "#64748b";
              }
            }}
          />
          <Controls className="bg-white border border-gray-200 rounded-lg shadow-lg" />
          <Background
            className="bg-gradient-to-br from-slate-50 to-slate-100"
            gap={20}
            size={1}
            color="#e2e8f0"
          />
        </ReactFlow>
      </div>

      {/* Node Context Menu */}
      {contextMenu && (
        <NodeContextMenu
          node={contextMenu.node}
          position={contextMenu.position}
          onEdit={setEditingNode}
          onDuplicate={duplicateNode}
          onDelete={deleteNode}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Edge Context Menu */}
      {edgeContextMenu && (
        <EdgeContextMenu
          edge={edgeContextMenu.edge}
          position={edgeContextMenu.position}
          onChangeType={changeEdgeType}
          onToggleLabel={toggleEdgeLabel}
          onDelete={deleteEdge}
          onClose={() => setEdgeContextMenu(null)}
        />
      )}

      {/* Edit Node Modal */}
      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onSave={editNode}
          onClose={() => setEditingNode(null)}
        />
      )}

      {/* Click overlay to close context menus */}
      {(contextMenu || edgeContextMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setContextMenu(null);
            setEdgeContextMenu(null);
          }}
        />
      )}
    </>
  );
}
