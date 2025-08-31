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
  UploadedFile,
} from "../_types/types";
import {
  calcCoordinatesOfNode,
  createNode,
  downloadReport,
  getInitialState,
  handleEmail,
  handleReadFile,
  handleReport,
  handleSummarize,
} from "../_utils/helper";

import { useWorkflowStore } from "./workflowStore";
import {
  createExecutionLog,
  getExecutionsLogsByWorkflow,
  getFilesByWorkflowId,
  getWorkflowStats,
  updateWorkflowStats,
} from "../_lib/data-service";
import { STARTNODE } from "../_utils/constants";
import { summary } from "framer-motion/client";

interface ContextMenu<T> {
  position: { x: number; y: number };
  item: T;
}

interface FlowState {
  nodeMap: Map<string, Node>;
  edgeMap: Map<string, Edge>;
  currentNodeId: string | null;
  nodeIdCounter: number;
  uploadedFiles: UploadedFile[];
  edgeIdCounter: number;
  stats: { success: number; error: number; duration: number; total: number };
  currentExecutedNode: Node | null;
  nodesLength: number;
  isLoading: boolean;
  noteIdCounter: number;
  executionProgress: number;
  isExecuting: boolean;
  mode: EditorMode;
  reservedFilesByNode: Map<string, string>; // nodeId -> fileName
  reservedFilesByFile: Map<string, string>; // fileName -> nodeId
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
  loadWorkflow: (workflowId: string) => Promise<void>;

  startExecution: (nodeId: string) => string;
  finishExecution: (
    executionId: string,
    status: NodeStatus,
    output: any | null,
    errorMessage: string | null
  ) => void;
  setIsLoading: (value: boolean) => void;
  setEdgeContext: (context: ContextMenu<Edge>) => void;
  setNodeContext: (context: ContextMenu<Node>) => void;
  setExecutionProgress: (value: number) => void;
  setEditingNode: (node: Node | null) => void;
  setUploadedFiles: (files: UploadedFile[]) => void;
  setIsExecuting: (value: boolean) => void;
  setMode: (mode: EditorMode) => void;
  setCurrentNodeId: (id: string | null) => void;

  executeNode: (
    id: string
  ) => Promise<{ data: string | null; error: string | null }>;
  executeWorkflow: () => Promise<{
    data: string | null;
    error: string | null;
  } | void>;
  resetWorkflowExecution: () => void;

  clearContexts: () => void;
  clearWorkflow: () => void;

  serializeFlowState: () => {
    nodes: Node[];
    edges: Edge[];
    settings: {
      nodeIdCounter: number;
      edgeIdCounter: number;
      noteIdCounter: number;
      executionProgress: number;
      labelCounters: Record<string, number>;
    };
  };
}

export const useFlowStore = create<FlowState>((set, get) => {
  return {
    ...getInitialState(),

    loadWorkflow: async (workflowId: string) => {
      const workflow = useWorkflowStore.getState().currentWorkflow;
      if (!workflow || workflow.id !== workflowId) {
        console.warn(
          "Workflow not loaded in workflowStore. You might want to fetch it first."
        );
        return;
      }

      get().clearWorkflow();
      get().clearContexts();
      get().setIsLoading(true);
      const settings = workflow.settings || {};

      const nodeMap = new Map(workflow?.nodes?.map((n: Node) => [n.id, n]));
      const edgeMap = new Map(workflow?.edges?.map((e: Edge) => [e.id, e]));

      if (!nodeMap.has("1")) nodeMap.set(STARTNODE.id, STARTNODE);

      const uploadedFiles = await getFilesByWorkflowId(workflowId);
      const executions = await getExecutionsLogsByWorkflow(workflowId);
      const stats = await getWorkflowStats(workflowId);

      get().setIsLoading(false);

      set({
        ...getInitialState(),
        ...settings,
        nodeMap,
        edgeMap,
        uploadedFiles,
        executions,
        stats,
        nodesLength: Math.max(workflow.nodes?.length || 1, -1),
      });
    },

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

          const newNode: Node = createNode(type, id, newLabel, coords);

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
            nodesLength: isNote ? state.nodesLength : state.nodesLength + 1,
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

          const newLabelCounters = {
            ...state.labelCounters,
          };

          return {
            nodeMap: newNodeMap,
            edgeMap: newEdgeMap,
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

    startExecution: (nodeId: string) => {
      const node = get().nodeMap.get(nodeId);
      const workflow = useWorkflowStore.getState().currentWorkflow;

      if (!node) throw new Error(`Node with id ${nodeId} not found`);
      if (!workflow?.id) throw new Error("No workflow loaded");

      const executionId = `exec-${Date.now()}`;
      const startedAt = new Date().toISOString();

      set((state) => ({
        executions: [
          ...state.executions,
          {
            id: executionId, // virtual id
            user_id: workflow.user_id!,
            workflow_id: workflow.id!,
            node_id: nodeId,
            node_label: node.data.label,
            file_name: node.data.fileName || null,
            status: "running",
            error_message: null,
            output: null,
            duration: null,
            started_at: startedAt,
            finished_at: "",
          },
        ],
      }));

      return executionId;
    },

    finishExecution: async (
      executionId: string,
      status: NodeStatus,
      output: any | null,
      errorMessage: string | null
    ) => {
      let finishedLog: ExecutionLog | null = null;

      set((state) => {
        const updated = state.executions.map((exec) => {
          if (exec.id !== executionId) return exec;

          const finishedAt = new Date().toISOString();
          const duration = exec.started_at
            ? Math.floor(
                (new Date(finishedAt).getTime() -
                  new Date(exec.started_at).getTime()) /
                  1000
              )
            : null;

          finishedLog = {
            ...exec,
            status,
            finished_at: finishedAt,
            duration,
            output: output ? JSON.stringify(output) : "",
            error_message: errorMessage,
          };

          return finishedLog;
        });

        return { executions: updated };
      });

      if (finishedLog) {
        await createExecutionLog(finishedLog);
      }
    },

    addEdge: (edge) =>
      set((state) => {
        edge.id = `edge-${state.edgeIdCounter + 1}`;
        const newEdges = addEdge(edge, Array.from(state.edgeMap.values()));
        const newEdgeMap = new Map(newEdges.map((e) => [e.id, e]));

        return {
          edgeMap: newEdgeMap,
          edgeIdCounter: state.edgeIdCounter + 1,
        };
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

    setIsLoading: (value) => set({ isLoading: value }),

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

    setUploadedFiles: (files: UploadedFile[]) =>
      set(() => ({
        uploadedFiles: files,
      })),

    setCurrentNodeId: (id) => set({ currentNodeId: id }),

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
        nodesLength: 1,
        stats: { success: 0, error: 0, duration: 0, total: 0 },
        currentExecutedNode: null,
      });
    },

    executeWorkflow: async () => {
      const workflow = useWorkflowStore.getState().currentWorkflow;
      if (workflow?.id === undefined) {
        set({ isExecuting: false });
        throw new Error("No workflow loaded for execution");
      }

      const nodes = get()
        .getNodes()
        .filter((n) => n.data.type !== "note");

      if (nodes.length <= 1) {
        return {
          data: null,
          error: "No nodes to execute , Start add some actions",
        };
      }

      const edges = get().getEdges();
      const totalSteps = nodes.length;

      if (totalSteps === 0) {
        set({ isExecuting: false });
        return;
      }

      const stats = { success: 0, error: 0, duration: 0, total: totalSteps };
      const visited = new Set<string>();
      const startNode = STARTNODE;
      const startTime = Date.now() - 2;
      const save = useWorkflowStore.getState().save;

      const saveWorkflow = async (updates: any) => {
        await save(workflow.id!, {
          ...updates,
          settings: {
            ...workflow.settings,
            ...(updates.settings || {}),
          },
        });
      };

      const updateProgress = async () => {
        const progress = Math.round((stats.success / totalSteps) * 100);
        set({ executionProgress: progress, stats: { ...stats } });
        await saveWorkflow({
          status: "running",
          settings: { executionProgress: progress },
        });
      };

      const executeNode = async (nodeId: string, input?: any) => {
        if (visited.has(nodeId)) return;
        visited.add(nodeId);

        const node = get().getCurrentNode(nodeId);
        if (!node) return;
        get().currentExecutedNode = node;

        const execId = get().startExecution(nodeId);
        get().updateNodeStatus(nodeId, "running");

        try {
          let result = input;
          if (node.data.output) {
            result = node.data.output;
            get().updateNodeStatus(nodeId, "running");
            await new Promise((res) => setTimeout(res, 1000));
          } else {
            switch (node.data.type) {
              case "readFile":
                if (!node.data.filePath) {
                  set({ isExecuting: false });
                  get().updateNodeStatus(nodeId, "error");
                  get().finishExecution(
                    execId,
                    "error",
                    null,
                    "File path is required"
                  );
                  stats.error++;
                  return;
                }
                result = await handleReadFile(node.data.filePath);
                break;

              case "summarize":
                if (!node.data.input && !result) {
                  set({ isExecuting: false });
                  get().updateNodeStatus(nodeId, "error");
                  get().finishExecution(
                    execId,
                    "error",
                    null,
                    "No input text provided for summarization"
                  );
                  stats.error++;
                  return;
                }
                result = await handleSummarize(result ?? node.data.input);
                if (!result) {
                  set({ isExecuting: false });
                  get().updateNodeStatus(nodeId, "error");
                  get().finishExecution(
                    execId,
                    "error",
                    null,
                    "Summarization failed"
                  );
                  stats.error++;
                  return;
                }

                break;

              case "email": {
                let reportUrl =
                  typeof result === "object" ? result.reportUrl : null;

                if (!node.data.to) {
                  get().updateNodeStatus(nodeId, "error");
                  get().finishExecution(
                    execId,
                    "error",
                    null,
                    "No email address provided"
                  );
                  stats.error++;
                  return;
                }

                if (!reportUrl) {
                  const { reportUrl: fallback } = await handleReport(
                    node.data.reportFormat || "PDF",
                    result,
                    workflow.id!
                  );

                  if (!fallback) {
                    get().updateNodeStatus(nodeId, "error");
                    get().finishExecution(
                      execId,
                      "error",
                      null,
                      "No report URL generated"
                    );
                    stats.error++;
                    return;
                  }

                  reportUrl = fallback;
                }

                await handleEmail(node.data.to, {
                  summary: typeof result === "string" ? result : result.summary,
                  reportUrl,
                });

                result = {
                  summary: typeof result === "string" ? result : result.summary,
                  reportUrl,
                };
                break;
              }

              case "report": {
                let reportUrl = null;
                const report = await handleReport(
                  node.data.reportFormat || "PDF",
                  result,
                  workflow.id!
                );

                reportUrl = report?.reportUrl;

                if (!reportUrl) {
                  get().updateNodeStatus(nodeId, "error");
                  get().finishExecution(
                    execId,
                    "error",
                    null,
                    "No report URL generated"
                  );
                  stats.error++;
                  return;
                }

                result = { reportUrl, summary: result };

                break;
              }

              default:
                console.warn(`Unknown node type: ${node.data.type}`);
            }
          }
          get().editNode(nodeId, { output: result });
          get().updateNodeStatus(nodeId, "success");
          get().finishExecution(execId, "success", result, null);

          stats.success++;
          await updateProgress();

          // continue to adjacent nodes
          const children = edges.filter((e) => e.source === nodeId);
          for (const child of children) {
            get().changeEdgeType(child.id, "running");
            await executeNode(child.target, result);
            get().changeEdgeType(child.id, "done");
          }
        } catch (err: any) {
          console.error(`Node ${nodeId} failed:`, err);
          get().updateNodeStatus(nodeId, "error");
          get().finishExecution(execId, "error", null, err.message);

          stats.error++;
          set({ stats: { ...stats } });

          await saveWorkflow({
            status: "error",
            settings: { executionProgress: get().executionProgress },
          });
        }
      };

      try {
        set({
          isExecuting: true,
          executionProgress: 0,
          executions: [],
          stats: { ...stats },
        });

        await saveWorkflow({
          status: "running",
          last_run_at: new Date().toISOString(),
        });

        if (startNode) await executeNode(startNode.id);
        const updatedNodes = get().getNodes();
        const updatedEdges = get().getEdges();

        // finish workflow
        stats.duration = Math.max(
          0,
          Math.floor((Date.now() - startTime) / 1000) - 2
        );
        const finalStatus = stats.error > 0 ? "error" : "success";
        const progress = Math.round((stats.success / totalSteps) * 100);

        set({ stats: { ...stats }, executionProgress: progress });

        await saveWorkflow({
          status: finalStatus,
          last_run_at: new Date().toISOString(),
          settings: {
            executionProgress: progress,
            labelCounters: get().labelCounters,
            nodeIdCounter: get().nodeIdCounter,
            edgeIdCounter: get().edgeIdCounter,
            noteIdCounter: get().noteIdCounter,
          },
          nodes: updatedNodes,
          edges: updatedEdges,
        });

        await updateWorkflowStats(workflow.id, stats);
        if (!stats.error && stats.success === totalSteps)
          return { data: "Workflow executed successfully", error: null };
      } catch (err) {
        console.error("Workflow execution failed:", err);
      } finally {
        set({ isExecuting: false });
      }
    },

    executeNode: async (id: string) => {
      const node = get().getCurrentNode(id);
      const workflowId = useWorkflowStore.getState().currentWorkflow?.id;
      if (!node) throw new Error(`Node with id ${id} not found`);
      if (workflowId === undefined) {
        return { data: null, error: "No workflow loaded" };
      }

      get().updateNodeStatus(id, "running");

      try {
        let result;
        const nodeType = node.data.type;
        const edges = get().getEdges();

        if (nodeType === "readFile") {
          if (!node.data.filePath) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "No File Assigned yet" };
          }
          result = await handleReadFile(node.data.filePath);

          if (!result) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "File is empty or not found" };
          }

          get().editNode(id, { output: result });
        } else if (nodeType === "summarize") {
          if (!node.data.input) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "No Text Provided to Summarize" };
          }
          result = await handleSummarize(node.data.input);

          if (!result) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "Summarization failed" };
          }
          get().editNode(id, { output: result });
        } else if (nodeType === "email") {
          if (!node.data.to) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "No email address provided" };
          }
          if (!node.data.input) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "No Data Provided to Send" };
          }
          result = await handleEmail(node.data.to, node.data.input);
          if (!result) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "Email sending failed" };
          }
        } else if (nodeType === "report") {
          result = await handleReport(
            node.data.reportFormat || "PDF",
            node.data.input,
            workflowId
          );
          if (!result?.reportUrl) {
            get().updateNodeStatus(id, "error");
            return { data: null, error: "No Report URL Generated" };
          }
          await downloadReport(result.reportUrl);
        } else {
          return { data: null, error: "Unknown Node Type" };
        }

        // pass output to children (only in-memory)
        const children = edges.filter((e) => e.source === id);
        for (const child of children) {
          const targetNode = get().getCurrentNode(child.target);
          if (!targetNode) continue;
          get().editNode(child.target, { input: result });
        }

        get().updateNodeStatus(id, "success");
        await useWorkflowStore.getState().saveCurrentState(workflowId);

        return { error: null, data: node.data.label };
      } catch (error: any) {
        console.error(`Node ${id} execution failed:`, error);
        get().updateNodeStatus(id, "error");
        return { error: error.message || "something went wrong", data: null };
      }
    },

    clearContexts: () =>
      set(() => ({ nodeContext: null, edgeContext: null, editingNode: null })),

    clearWorkflow: () => {
      const nodeMap = new Map<string, Node>();

      nodeMap.set(STARTNODE.id, STARTNODE);

      set(() => {
        return {
          ...getInitialState(),
          nodeMap,
        };
      });
    },

    serializeFlowState: () => {
      const {
        nodeIdCounter,
        noteIdCounter,
        edgeIdCounter,
        executionProgress,
        labelCounters,
        nodeMap,
        edgeMap,
      } = get();

      const nodes = Array.from(nodeMap.values());
      const edges = Array.from(edgeMap.values());
      return {
        nodes,
        edges,
        settings: {
          edgeIdCounter,
          nodeIdCounter,
          noteIdCounter,
          executionProgress,
          labelCounters,
        },
      };
    },
  };
});
