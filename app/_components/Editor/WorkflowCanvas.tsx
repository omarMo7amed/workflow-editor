"use client";
import { availableNodes, connectionRules } from "../../_utils/constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFlowStore } from "@/app/_store/flowStore";
import { EdgeContextMenu } from "./EdgeContextMenu";
import { NodeContextMenu } from "./NodeContextMenu";
import { EditNodeModal } from "./EditNodeModal";
import CustomControls from "./CustomControl";
import { NodeType } from "../../_types/types";
import CustomNode from "./CustomNode";
import CustomEdge from "./CustomEdge";
import StartNode from "./StartNode";
import toast from "react-hot-toast";
import NoteNode from "./NoteNode";
import Toolbar from "./Toolbar";
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
import useConfirmBeforeReload from "../../_hooks/useConfirmBeforeReload";
import EditorLoading from "./EditorLoading";

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

export default function WorkflowCanvas() {
  const mode = useFlowStore((s) => s.mode);
  const {
    getNodes,
    getEdges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    addNode,
    deleteNode,
    duplicateNode,
    deleteEdge,
    changeEdgeType,
    toggleEdgeLabel,
    setNodeContext,
    setEdgeContext,
    clearContexts,
    nodeContext,
    edgeContext,
    setEditingNode,
  } = useFlowStore();
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const project = useReactFlow().project;
  const lastInvalidRef = useRef<string | null>(null);
  const isLoading = useFlowStore((s) => s.isLoading);

  const editingNode = useFlowStore((s) => s.editingNode);

  const nodes = getNodes();
  const edges = getEdges();

  useConfirmBeforeReload();

  const isEditor = mode === "Editor";

  useEffect(() => {
    if (isEditor) {
      setIsLocked(false);
    } else {
      setIsLocked(true);
    }
  }, [isEditor]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      const newEdge: Edge = {
        id: `temp`,
        type: "animated",
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle ?? undefined,
        targetHandle: params.targetHandle ?? undefined,
        data: { showLabel: false },
      };

      addEdge(newEdge);
    },
    [addEdge]
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
    <div style={{ width: "100%", height: "calc(100vh - 73px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        zoomOnScroll={!isLocked}
        panOnDrag={!isLocked}
        nodesDraggable={!isLocked}
        nodesConnectable={!isLocked}
        elementsSelectable={!isLocked}
        onPaneClick={clearContexts}
        onConnect={isEditor ? onConnect : undefined}
        onConnectEnd={onConnectEnd}
        panOnScroll={!isLocked}
        isValidConnection={isValidConnection}
        onNodeContextMenu={isLocked ? undefined : onNodeContextMenu}
        onEdgeContextMenu={isLocked ? undefined : onEdgeContextMenu}
        onDrop={isLocked ? undefined : handleDropNode}
        onDragOver={isLocked ? undefined : handleDragOver}
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

        <CustomControls
          isEditor={isEditor}
          isLocked={isLocked}
          setIsLocked={setIsLocked}
        />

        {isEditor && <Toolbar />}

        <Background
          className="bg-gradient-to-br from-slate-50 to-slate-100"
          gap={20}
          size={isEditor ? 4 : undefined}
          color="#e2e8ff"
        />
        {isLoading && <EditorLoading />}
      </ReactFlow>
      {isEditor && nodeContext && (
        <NodeContextMenu
          node={nodeContext.item}
          position={nodeContext.position}
          onDuplicate={duplicateNode}
          onEdit={setEditingNode}
          onDelete={deleteNode}
          onClose={clearContexts}
        />
      )}
      {isEditor && editingNode && (
        <EditNodeModal
          node={editingNode}
          onClose={() => {
            setEditingNode(null);
            clearContexts();
          }}
        />
      )}
      {isEditor && edgeContext && (
        <EdgeContextMenu
          edge={edgeContext.item}
          position={edgeContext.position}
          onChangeType={changeEdgeType}
          onToggleLabel={toggleEdgeLabel}
          onDelete={deleteEdge}
          onClose={clearContexts}
        />
      )}
    </div>
  );
}
