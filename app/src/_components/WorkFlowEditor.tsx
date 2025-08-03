"use client";

import { useCallback, useState } from "react";
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

import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import StartNode from "./StartNode";
import EditorSubHeader from "./EditorSubHeader";

import { NodeContextMenu } from "./NodeContextMenu";
import { EdgeContextMenu } from "./EdgeContextMenu";
import { EditNodeModal } from "./EditNodeModal";

import { useFlowStore } from "@/app/_store/flowStore";
import CustomControls from "./CustomControl";
import Toolbar from "./Toolbar";
import { NodeType } from "../_types/types";
import NoteNode from "./NoteNode";

const edgeTypes = {
  animated: CustomEdge,
  pulse: CustomEdge,
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
    editNode,
    addNode,
    changeEdgeType,
    toggleEdgeLabel,
    setNodeContext,
    setEdgeContext,
    nodeContext,
    edgeContext,
    editingNode,
    setEditingNode,
    clearContexts,
  } = useFlowStore();
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const { project } = useReactFlow();
  // const [activeTab, setIsLocked] = useState<boolean>(false);

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

  function handleDropNode(e: React.DragEvent) {
    e.preventDefault();

    const type = e.dataTransfer.getData("application/reactflow");

    if (!type) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const position = project({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });

    addNode(type as NodeType, undefined, position);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

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
        <EditorSubHeader activeTab="Editor" onActiveTab={() => {}} />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          zoomOnScroll={!isLocked}
          panOnDrag={!isLocked}
          panOnScroll={!isLocked}
          nodesDraggable={!isLocked}
          nodesConnectable={!isLocked}
          elementsSelectable={!isLocked}
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
          onEdit={setEditingNode}
          onDuplicate={duplicateNode}
          onDelete={deleteNode}
          onClose={clearContexts}
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

      {editingNode && (
        <EditNodeModal
          node={editingNode}
          onSave={editNode}
          onClose={() => setEditingNode(null)}
        />
      )}

      {(nodeContext || edgeContext) && (
        <div className="fixed inset-0 z-40" onClick={clearContexts} />
      )}
    </>
  );
}
