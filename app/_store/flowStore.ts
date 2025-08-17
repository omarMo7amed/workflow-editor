/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
} from "reactflow";
import type {
  EdgeType,
  EditorMode,
  ExecutionLog,
  NodeStatus,
  NodeType,
} from "../src/_types/types";
import { calcCoordinatesOfNode, getInitialState } from "../src/_utils/helper";
import { initialEdges, initialNodes } from "../src/_utils/constants";
import {
  handleEmail,
  handleReadFile,
  handleReport,
  handleSummarize,
} from "../src/_lib/workflows/actions";

interface ContextMenu<T> {
  position: { x: number; y: number };
  item: T;
}

// data:{
//   id: string;
//   label: string;
//   type: NodeType;
//   description: string;
//   choosedFile: string;
//   output: string | File;
//   reportFormat: "PDF";
//   status: "idle" | "pending" | "running" | "success" | "error";
// }

interface FlowState {
  nodeMap: Map<string, Node>;
  edgeMap: Map<string, Edge>;
  nodeIdCounter: number;
  uploadedFiles: File[];
  stats: { success: number; error: number; duration: number; total: number };
  currentExecutedNode: Node | null;
  nodesLength: number;
  noteIdCounter: number;
  executionProgress: number;
  isExecuting: boolean;
  mode: EditorMode;
  reservedFilesByNode: Map<string, string>;
  reservedFilesByFile: Map<string, string>;
  labelCounters: Record<string, number>;
  editingNode: Node | null;
  executions: ExecutionLog[];
  nodeContext: ContextMenu<Node> | null;
  edgeContext: ContextMenu<Edge> | null;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  getNodes: () => Node[];
  getEdges: () => Edge[];
  getCurrentNode: (id?: string) => Node | undefined;

  addNode: (
    type: NodeType,
    label: string,
    position?: { x: number; y: number }
  ) => void;
  addEdge: (edge: Edge) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  duplicateNode: (node: Node) => void;
  editNode: (id: string, newData: Partial<Node["data"]>) => void;
  toggleEdgeLabel: (id: string) => void;
  editEdgeLabel: (id: string, newLabel: string) => void;

  changeEdgeType: (id: string, newType: EdgeType) => void;
  updateNodeStatus: (id: string, status: NodeStatus) => void;

  startExecution: (nodeId: string) => string;
  finishExecution: (
    executionId: string,
    status: NodeStatus,
    output?: any
  ) => void;

  setEdgeContext: (context: ContextMenu<Edge>) => void;
  setNodeContext: (context: ContextMenu<Node>) => void;
  setExecutionProgress: (value: number) => void;
  setEditingNode: (node: Node | null) => void;
  setUploadedFiles: (files: File[]) => void;
  setIsExecuting: (value: boolean) => void;
  setMode: (mode: EditorMode) => void;

  executeWorkflow: () => Promise<void>;
  resetWorkflowExecution: () => void;

  clearContexts: () => void;
  clearWorkflow: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => {
  const nodeMap = new Map(initialNodes.map((n) => [n.id, n]));
  const edgeMap = new Map(initialEdges.map((e) => [e.id, e]));

  return {
    nodeMap,
    edgeMap,

    ...getInitialState(),

    onNodesChange: (changes) => {
      const currentNodes = get().getNodes();
      const updatedNodes = applyNodeChanges(changes, currentNodes);
      const updatedMap = new Map(updatedNodes.map((n) => [n.id, n]));
      set(() => ({ nodeMap: updatedMap }));
    },

    onEdgesChange: (changes) => {
      const currentEdges = get().getEdges();
      const updatedEdges = applyEdgeChanges(changes, currentEdges);
      const updatedMap = new Map(updatedEdges.map((e) => [e.id, e]));
      set(() => ({ edgeMap: updatedMap }));
    },

    addNode: (type, label, position) => {
      try {
        set((state) => {
          const isNote = type === "note";
          const id = isNote
            ? `note-${state.noteIdCounter}`
            : `node-${state.nodeIdCounter}`;

          const count = (state.labelCounters?.[label] || 0) + 1;
          const newLabel = `${label} ${count === 1 ? "" : count}`;

          const newLabelCounters = {
            ...state.labelCounters,
            [label]: count,
          };

          const coords =
            position ||
            calcCoordinatesOfNode(
              isNote ? state.noteIdCounter : state.nodeIdCounter,
              type
            );

          const newNode: Node = {
            id,
            type,
            position: coords,
            data: {
              id,
              label: newLabel,
              type,
              description: "",
              choosedFile: "",
              extractedText: "",
              reportFormat: "PDF",
              status: "idle",
            },
          };

          const newNodeMap = new Map(state.nodeMap);
          newNodeMap.set(id, newNode);

          return {
            nodeMap: newNodeMap,
            nodeIdCounter: isNote
              ? state.nodeIdCounter
              : state.nodeIdCounter + 1,
            noteIdCounter: isNote
              ? state.noteIdCounter + 1
              : state.noteIdCounter,
            labelCounters: newLabelCounters,
          };
        });
      } catch (e) {
        throw new Error(e as string | undefined);
      }
    },

    deleteNode: (id) => {
      try {
        set((state) => {
          const node = state.nodeMap.get(id);
          if (!node) return {};

          const isNote = node.type === "note";

          const currentFile = state.reservedFilesByNode.get(id);
          if (currentFile) {
            state.reservedFilesByNode.delete(id);
            state.reservedFilesByFile.delete(currentFile);
          }

          const newNodeMap = new Map(state.nodeMap);
          newNodeMap.delete(id);

          const newEdgeMap = new Map(
            Array.from(state.edgeMap.values())
              .filter((e) => e.source !== id && e.target !== id)
              .map((e) => [e.id, e])
          );

          const match = node.data.label.match(/^(.*?)(?: \d+)?$/);
          const baseLabel = match ? match[1] : node.data.label;

          const newLabelCounters = {
            ...state.labelCounters,
          };

          if (newLabelCounters[baseLabel]) {
            newLabelCounters[baseLabel] = Math.max(
              newLabelCounters[baseLabel] - 1,
              0
            );
          }

          return {
            nodeMap: newNodeMap,
            edgeMap: newEdgeMap,
            nodeIdCounter: isNote
              ? state.nodeIdCounter
              : state.nodeIdCounter - 1,
            noteIdCounter: isNote
              ? state.noteIdCounter - 1
              : state.noteIdCounter,
            labelCounters: newLabelCounters,
            reservedFilesByNode: new Map(state.reservedFilesByNode),
            reservedFilesByFile: new Map(state.reservedFilesByFile),
          };
        });
      } catch (e) {
        throw new Error(e as string | undefined);
      }
    },

    editNode: (id, newData) => {
      try {
        set((state) => {
          const node = state.nodeMap.get(id);

          if (!node) return {};

          const updatedNode = {
            ...node,
            data: { ...node.data, ...newData },
          };

          const newNodeMap = new Map(state.nodeMap);
          newNodeMap.set(id, updatedNode);

          return { nodeMap: newNodeMap };
        });
      } catch (e) {
        throw new Error(e as string | undefined);
      }
    },

    updateNodeStatus: (id, status) => {
      set((state) => {
        const node = state.nodeMap.get(id);
        if (!node) return {};
        const updatedNode = {
          ...node,
          data: { ...node.data, status },
        };
        const newNodeMap = new Map(state.nodeMap);
        newNodeMap.set(id, updatedNode);
        return { nodeMap: newNodeMap };
      });
    },

    startExecution: (nodeId) => {
      const node = get().nodeMap.get(nodeId);
      if (!node) throw new Error(`Node with id ${nodeId} not found`);

      const executionId = `exec-${Date.now()}`;
      const startedAt = new Date().toISOString();

      set((state) => ({
        executions: [
          ...state.executions,
          {
            id: executionId,
            nodeId,
            nodeLabel: node.data.label,
            status: "running",
            startedAt,
            finishedAt: null,
            output: null,
            choosedFile: node.data.choosedFile || undefined,
            duration: null,
          },
        ],
      }));

      return executionId;
    },

    finishExecution: (executionId, status, output = null) => {
      set((state) => ({
        executions: state.executions.map((exec) => {
          if (exec.id !== executionId) return exec;

          const finishedAt = new Date().toISOString();
          const duration = exec.startedAt
            ? Math.floor(
                (new Date(finishedAt).getTime() -
                  new Date(exec.startedAt).getTime()) /
                  1000
              )
            : null;

          return {
            ...exec,
            status,
            finishedAt,
            duration,
            output,
          };
        }),
      }));
    },

    addEdge: (edge) =>
      set((state) => {
        const newEdges = addEdge(edge, Array.from(state.edgeMap.values()));
        const newEdgeMap = new Map(newEdges.map((e) => [e.id, e]));

        return { edgeMap: newEdgeMap };
      }),

    deleteEdge: (id) =>
      set((state) => {
        state.edgeMap.delete(id);
        return { edgeMap: new Map(state.edgeMap) };
      }),

    duplicateNode: (node) => get().addNode(node.data.type, node.data.label),

    changeEdgeType: (id, newType) =>
      set((state) => {
        const edge = state.edgeMap.get(id);

        if (!edge) return {};
        const updatedEdge = {
          ...edge,
          data: { ...edge.data, edgeType: newType },
        };

        const newEdgeMap = new Map(state.edgeMap);
        newEdgeMap.set(id, updatedEdge);
        return { edgeMap: newEdgeMap };
      }),

    toggleEdgeLabel: (id) =>
      set((state) => {
        const edge = state.edgeMap.get(id);
        if (!edge) return {};
        const updatedEdge = {
          ...edge,
          data: {
            ...edge.data,
            showLabel: !edge.data?.showLabel,
            label: edge.data?.label || "Flow",
          },
        };
        state.edgeMap.set(id, updatedEdge);
        return { edgeMap: new Map(state.edgeMap) };
      }),

    editEdgeLabel: (id, newLabel) =>
      set((state) => {
        const edge = state.edgeMap.get(id);

        if (!edge) return {};
        const updatedEdge = {
          ...edge,
          data: {
            ...edge.data,
            label: newLabel || "Flow",
          },
        };

        const newEdgeMap = state.edgeMap;
        newEdgeMap.set(id, updatedEdge);

        return { edgeMap: newEdgeMap };
      }),

    getNodes: () => Array.from(get().nodeMap.values()),

    getEdges: () => Array.from(get().edgeMap.values()),

    getCurrentNode: (id?: string) => {
      if (!id) return;
      return get().nodeMap.get(id);
    },

    setIsExecuting: (value) => set({ isExecuting: value }),

    setExecutionProgress: (value) => set({ executionProgress: value }),

    setMode: (mode) => set({ mode }),

    setEditingNode: (node) => set({ editingNode: node }),

    setNodeContext: (context) =>
      set(() => {
        const { x, y } = context.position;
        const position = {
          x: x - 300,
          y: y - 100,
        };

        return {
          nodeContext: { item: context.item, position: position },
        };
      }),

    setEdgeContext: (context) =>
      set(() => {
        const { x, y } = context.position;
        const position = {
          x: x - 300,
          y: y - 100,
        };

        return {
          edgeContext: { item: context.item, position: position },
        };
      }),

    setUploadedFiles: (files: File[]) =>
      set(() => ({
        uploadedFiles: files,
      })),

    resetWorkflowExecution: () => {
      const nodes = get()
        .getNodes()
        .map((node) => ({
          ...node,
          data: { ...node.data, status: "pending" },
        }));

      const edges = get()
        .getEdges()
        .map((edge) => ({
          ...edge,
          data: { ...edge.data, edgeType: "animated" },
        }));

      set({
        isExecuting: false,
        executionProgress: 0,
        executions: [],
        nodeMap: new Map(nodes.map((n) => [n.id, n])),
        edgeMap: new Map(edges.map((e) => [e.id, e])),
        nodesLength: 0,
        stats: { success: 0, error: 0, duration: 0, total: 0 },
        currentExecutedNode: null,
      });
    },

    executeWorkflow: async () => {
      try {
        set({
          isExecuting: true,
          executionProgress: 0,
          executions: [],
          stats: { success: 0, error: 0, duration: 0, total: 0 },
        });

        const nodes = get()
          .getNodes()
          .filter((n) => n.data.type !== "note");
        const edges = get().getEdges();
        const totalSteps = nodes.length;

        if (totalSteps === 0) {
          set({ isExecuting: false });
          return;
        }

        set({ nodesLength: totalSteps - 1 });

        let startTimes = 0;
        let previousOutput: string | null = null; // Track output from previous node

        for (let i = 1; i < totalSteps; i++) {
          const nodeId = nodes[i].id;
          const currentNode = nodes[i];
          set({
            currentExecutedNode: get().getCurrentNode(nodeId),
          });

          const execId = get().startExecution(nodeId);
          get().updateNodeStatus(nodeId, "running");

          edges.forEach((edge) =>
            edge.target === nodeId
              ? get().changeEdgeType(edge.id, "running")
              : edge
          );

          const start = Date.now();
          let result;
          const nodeType = currentNode.data.type;

          try {
            if (nodeType === "readFile") {
              result = await handleReadFile(currentNode);
              previousOutput = result; // Store for next node
            } else if (nodeType === "summarize") {
              if (!previousOutput) {
                throw new Error("No input text for summarize node");
              }
              result = await handleSummarize(currentNode, previousOutput);
              previousOutput = result; // Store for next node
            } else if (nodeType === "email") {
              const content = previousOutput || "No content available";
              result = await handleEmail(currentNode, content);
            } else if (nodeType === "report") {
              const content = previousOutput || "No content available";
              result = await handleReport(currentNode, content);
            } else {
              console.warn(`Unknown node type: ${nodeType}`);
              result = "Unknown node type";
            }

            const duration = Date.now() - start;
            startTimes += duration;

            if (nodeType === "readFile" && result) {
              get().editNode(nodeId, { extractedText: result });
            }

            get().updateNodeStatus(nodeId, "success");
            get().finishExecution(execId, "success", result);

            // Update stats
            set((state) => {
              const success = state.stats.success + 1;
              const total = state.stats.total + 1;
              const duration = startTimes / 1000;

              return {
                stats: {
                  ...state.stats,
                  success,
                  total,
                  duration,
                },
              };
            });
          } catch (error) {
            console.error(`Node ${nodeId} execution failed:`, error);

            get().updateNodeStatus(nodeId, "error");
            get().finishExecution(execId, "error", null);

            set((state) => ({
              stats: {
                ...state.stats,
                error: state.stats.error + 1,
                total: state.stats.total + 1,
              },
            }));

            // Continue with next node even if current fails
          }

          set({ executionProgress: (i / (totalSteps - 1)) * 100 });
        }

        // Mark all edges as done
        const doneEdges = edges.map((edge) => ({
          ...edge,
          data: { ...edge.data, edgeType: "done" },
        }));

        set({
          isExecuting: false,
          edgeMap: new Map(doneEdges.map((e) => [e.id, e])),
        });
      } catch (e) {
        console.error("Workflow execution failed:", e);
        set((state) => ({
          isExecuting: false,
          stats: {
            ...state.stats,
            error: state.stats.error + 1,
            total: state.stats.total + 1,
          },
        }));
        throw new Error(e as string | undefined);
      }
    },

    clearContexts: () =>
      set(() => ({ nodeContext: null, edgeContext: null, editingNode: null })),

    clearWorkflow: () => {
      set(() => {
        return {
          nodeMap: new Map(initialNodes.map((node) => [node.id, node])),
          edgeMap: new Map(initialEdges.map((edge) => [edge.id, edge])),
          ...getInitialState(),
        };
      });
    },
  };
});

// saveWorkflow: async (name?: string) => {
//   const state = get();
//   set({ isSaving: true });

//   try {
//     const workflowData = {
//       name: name || state.currentWorkflowName,
//       nodes: state.getNodes(),
//       edges: state.getEdges(),
//       settings: {
//         nodeIdCounter: state.nodeIdCounter,
//         noteIdCounter: state.noteIdCounter,
//         labelCounters: state.labelCounters,
//       },
//     };

//     const url = state.currentWorkflowId
//       ? `/api/workflows/${state.currentWorkflowId}`
//       : "/api/workflows";

//     const method = state.currentWorkflowId ? "PUT" : "POST";

//     const response = await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(workflowData),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || "Failed to save workflow");
//     }

//     const result = await response.json();

//     set({
//       currentWorkflowId: result.workflow.id,
//       currentWorkflowName: result.workflow.name,
//       isWorkflowSaved: true,
//       isSaving: false,
//     });
//   } catch (error: any) {
//     set({ isSaving: false });
//     throw error;
//   }
// },

// loadWorkflow: async (workflowId: string) => {
//   try {
//     const response = await fetch(`/api/workflows/${workflowId}`);

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || "Failed to load workflow");
//     }

//     const result = await response.json();
//     const workflow = result.workflow;

//     // Restore workflow state
//     const nodeMap = new Map(workflow.nodes.map((n: Node) => [n.id, n]));
//     const edgeMap = new Map(workflow.edges.map((e: Edge) => [e.id, e]));

//     set({
//       nodeMap,
//       edgeMap,
//       currentWorkflowId: workflow.id,
//       currentWorkflowName: workflow.name,
//       isWorkflowSaved: true,
//       nodeIdCounter: workflow.settings?.nodeIdCounter || 1,
//       noteIdCounter: workflow.settings?.noteIdCounter || 0,
//       labelCounters: workflow.settings?.labelCounters || {},
//     });
//   } catch (error: any) {
//     throw error;
//   }
// },
