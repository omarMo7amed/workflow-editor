"use client";

import { availableNodes, connectionRules } from "../src/_utils/constants";
import { useCallback, useRef, useState } from "react";
import { useFlowStore } from "@/app/_store/flowStore";
import { EdgeContextMenu } from "../src/_components/EdgeContextMenu";
import { NodeContextMenu } from "../src/_components/NodeContextMenu";
import { EditNodeModal } from "../src/_components/EditNodeModal";
import CustomControls from "../src/_components/CustomControl";
import { NodeType } from "../src/_types/types";
import CustomNode from "../src/_components/CustomNode";
import CustomEdge from "../src/_components/CustomEdge";
import StartNode from "../src/_components/StartNode";
import toast from "react-hot-toast";
import NoteNode from "../src/_components/NoteNode";
import Toolbar from "../src/_components/Toolbar";
import ReactFlow, {
  Background,
  MiniMap,
  Connection,
  Edge,
  MarkerType,
  Node,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
// import useActiveTabs from "../context/ActiveTabsContext";

const edgeTypes = {
  animated: CustomEdge,
  pulse: CustomEdge,
  running: CustomEdge,
  done: CustomEdge,
  error: CustomEdge,
};

const nodeTypes = {
  start: StartNode,
  readFile: CustomNode,
  summarize: CustomNode,
  email: CustomNode,
  report: CustomNode,
  note: NoteNode,
};

export default function WorkflowEditor() {
  const {
    getNodes,
    getEdges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    deleteNode,
    duplicateNode,
    deleteEdge,
    addNode,
    changeEdgeType,
    toggleEdgeLabel,
    setNodeContext,
    setEdgeContext,
    nodeContext,
    edgeContext,
    setEditingNode,
    clearContexts,
  } = useFlowStore();
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const { project } = useReactFlow();
  const lastInvalidRef = useRef<string | null>(null);
  const editingNode = useFlowStore((s) => s.editingNode);

  const nodes = getNodes();
  const edges = getEdges();

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const edgeId = `e${edges.length + 1}`;
      const newEdge: Edge = {
        id: edgeId,
        type: "animated",
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle ?? undefined,
        targetHandle: params.targetHandle ?? undefined,
        data: { showLabel: false },
      };

      addEdge(newEdge);
    },
    [edges.length, addEdge]
  );

  const handleDropNode = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const bounds = e.currentTarget.getBoundingClientRect();
      const position = project({
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top,
      });

      addNode(type as NodeType, availableNodes[type as NodeType], position);
    },
    [project, addNode]
  );

  const onConnectEnd = useCallback(() => {
    lastInvalidRef.current = null;
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return false;

      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const allowedTargets = connectionRules[sourceNode.type as string] || [];
      const isAllowed = allowedTargets.includes(targetNode.type as string);

      if (!isAllowed) {
        const invalidKey = `${connection.source}-${connection.target}`;
        if (lastInvalidRef.current !== invalidKey) {
          lastInvalidRef.current = invalidKey;
          toast.error(
            `${sourceNode.type} can't connect with ${targetNode.type}`
          );
        }
      }

      return isAllowed;
    },
    [nodes]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeContextMenu = useCallback(
    (e: React.MouseEvent, node: Node) => {
      e.preventDefault();
      setNodeContext({ item: node, position: { x: e.clientX, y: e.clientY } });
    },
    [setNodeContext]
  );

  const onEdgeContextMenu = useCallback(
    (e: React.MouseEvent, edge: Edge) => {
      e.preventDefault();
      setEdgeContext({ item: edge, position: { x: e.clientX, y: e.clientY } });
    },
    [setEdgeContext]
  );

  return (
    <>
      <div style={{ width: "100%", height: "calc(100vh - 73px)" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectEnd={onConnectEnd}
          zoomOnScroll={!isLocked}
          panOnDrag={!isLocked}
          panOnScroll={!isLocked}
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
          isValidConnection={isValidConnection}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          onPaneClick={clearContexts}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onDrop={handleDropNode}
          onDragOver={handleDragOver}
          className="bg-gradient-to-br from-slate-50 to-slate-100"
          connectionLineStyle={{
            strokeWidth: 3,
            stroke: "#64748b",
            strokeDasharray: "5,5",
            animation: "dash 1s linear infinite",
          }}
          defaultEdgeOptions={{
            style: { strokeWidth: 3, stroke: "#64748b" },
            type: "animated",
            markerEnd: { type: MarkerType.ArrowClosed, color: "#64748b" },
          }}
        >
          <MiniMap className="bg-white border border-gray-200 rounded-lg shadow-lg" />

          <CustomControls isLocked={isLocked} setIsLocked={setIsLocked} />

          <Toolbar />

          <Background
            className="bg-gradient-to-br from-slate-50 to-slate-100"
            gap={20}
            size={4}
            color="#e2e8ff"
          />
        </ReactFlow>
      </div>

      {nodeContext && (
        <NodeContextMenu
          node={nodeContext.item}
          position={nodeContext.position}
          onDuplicate={duplicateNode}
          onEdit={setEditingNode}
          onDelete={deleteNode}
          onClose={clearContexts}
        />
      )}

      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onClose={() => {
            setEditingNode(null);
            clearContexts();
          }}
        />
      )}

      {edgeContext && (
        <EdgeContextMenu
          edge={edgeContext.item}
          position={edgeContext.position}
          onChangeType={changeEdgeType}
          onToggleLabel={toggleEdgeLabel}
          onDelete={deleteEdge}
          onClose={clearContexts}
        />
      )}

      {(nodeContext || edgeContext) && (
        <div className="fixed inset-0 z-40" onClick={clearContexts} />
      )}
    </>
  );
}
