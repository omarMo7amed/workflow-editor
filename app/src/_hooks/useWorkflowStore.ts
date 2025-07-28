"use client";
import { create } from "zustand";
import { v4 as uuid } from "uuid";

// Your Types
export type NodeType = "readPdf" | "summarize" | "sendEmail" | "report";

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    label: string;
    input?: unknown;
    output?: unknown;
    config?: Record<string, unknown>;
  };
}

export interface Workflow {
  id: string;
  name: string;
  createdAt: string;
  nodes: WorkflowNode[];
  edges: Edge[];
}

type WorkflowState = {
  workflow: Workflow;
  addNode: (type: NodeType, position?: { x: number; y: number }) => void;
  renameNode: (nodeId: string, newLabel: string) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNode["data"]>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (source: string, target: string) => void;
  removeEdge: (edgeId: string) => void;
  resetWorkflow: () => void;
};

// Zustand Store
export const useWorkflowStore = create<WorkflowState>((set) => ({
  workflow: {
    id: uuid(),
    name: "New Workflow",
    createdAt: new Date().toISOString(),
    nodes: [],
    edges: [],
  },

  addNode: (type, position = { x: 100, y: 100 }) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        nodes: [
          ...state.workflow.nodes,
          {
            id: uuid(),
            type,
            position,
            data: { label: type }, // Default label = type
          },
        ],
      },
    })),

  renameNode: (nodeId, newLabel) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        nodes: state.workflow.nodes.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, label: newLabel } } : n
        ),
      },
    })),

  updateNodeData: (nodeId, data) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        nodes: state.workflow.nodes.map((n) =>
          n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
        ),
      },
    })),

  removeNode: (nodeId) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        nodes: state.workflow.nodes.filter((n) => n.id !== nodeId),
        edges: state.workflow.edges.filter(
          (e) => e.source !== nodeId && e.target !== nodeId
        ),
      },
    })),

  addEdge: (source, target) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        edges: [...state.workflow.edges, { id: uuid(), source, target }],
      },
    })),

  removeEdge: (edgeId) =>
    set((state) => ({
      workflow: {
        ...state.workflow,
        edges: state.workflow.edges.filter((e) => e.id !== edgeId),
      },
    })),

  resetWorkflow: () =>
    set({
      workflow: {
        id: uuid(),
        name: "New Workflow",
        createdAt: new Date().toISOString(),
        nodes: [],
        edges: [],
      },
    }),
}));
