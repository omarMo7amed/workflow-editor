"use client";

import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
} from "reactflow";
import { NodeType } from "../src/_types/types";
import { getInitialState } from "../src/_utils/helper";
import {
  initialEdges,
  initialNodes,
  initialNotes,
} from "../src/_utils/constants";

interface ContextMenu<T> {
  position: { x: number; y: number };
  item: T;
}

interface FlowState {
  nodeMap: Map<string, Node>;
  edgeMap: Map<string, Edge>;
  nodeIdCounter: number;
  noteIdCounter: number;
  labelCounters: Record<string, number>;
  noteCounters: Record<string, number>;
  editingNode: Node | null;
  nodeContext: ContextMenu<Node> | null;
  edgeContext: ContextMenu<Edge> | null;

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;

  getNodes: () => Node[];
  getEdges: () => Edge[];
  getCurrentNode: (id: string) => Node | undefined;

  addNode: (
    type: NodeType,
    label?: string,
    position?: { x: number; y: number }
  ) => void;
  addEdge: (edge: Edge) => void;
  deleteNode: (id: string) => void;
  deleteEdge: (id: string) => void;
  duplicateNode: (node: Node) => void;
  editNode: (id: string, label: string, type: string) => void;
  changeEdgeType: (id: string, type: string) => void;
  toggleEdgeLabel: (id: string) => void;

  addNote: (label?: string) => void;
  editNote: (noteId: string, label?: string, description?: string) => void;
  deleteNote: (noteId: string) => void;

  setEditingNode: (node: Node | null) => void;
  setNodeContext: (context: ContextMenu<Node>) => void;
  setEdgeContext: (context: ContextMenu<Edge>) => void;
  clearContexts: () => void;
  clearWorkflow: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => {
  const nodeMap = new Map(initialNodes.map((n) => [n.id, n]));
  const edgeMap = new Map(initialEdges.map((e) => [e.id, e]));
  const noteMap = new Map(initialNotes.map((e) => [e.id, e]));

  return {
    nodeMap,
    edgeMap,
    noteMap,
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

    getNodes: () => Array.from(get().nodeMap.values()),
    getEdges: () => Array.from(get().edgeMap.values()),

    addNode: (type, label, position) => {
      set((state) => {
        const id = state.nodeIdCounter.toString();
        const count = state.labelCounters?.[type] || 1;

        const labelBase =
          label ||
          {
            readFile: "Read File",
            summarize: "Summarize",
            email: "Send Email",
            report: "Generate Report",
            start: "Start",
            note: "Note",
          }[type] ||
          type;

        const newLabel = `${labelBase} ${count <= 1 ? "" : count}`;

        const newNode: Node = {
          id,
          type,
          position: position || {
            x: Math.random() * 400 + 100,
            y: Math.random() * 300 + 100,
          },
          data: { id, label: newLabel, type },
        };

        state.nodeMap.set(id, newNode);
        return {
          nodeMap: new Map(state.nodeMap),
          nodeIdCounter: state.nodeIdCounter + 1,
          labelCounters: {
            ...state.labelCounters,
            [type]: count + 1,
          },
        };
      });
    },

    // addNote: (label) => {
    //   set((state) => {
    //     const id = `note-${state.noteIdCounter}`;
    //     const count = state.noteCounters?.[label] || 1;

    //     const newLabel = `${label || "Note"} ${count <= 1 ? "" : count}`;

    //     const newNote: Node = {
    //       id,
    //       type: "note",
    //       position: {
    //         x: state.noteIdCounter * 300 + 100,
    //         y: state.noteIdCounter * 200 + 100,
    //       },
    //       data: { id, label: newLabel, description: "" },
    //     };

    //     state.nodeMap.set(id, newNote);
    //     return {
    //       nodeMap: new Map(state.nodeMap),
    //       noteIdCounter: state.noteIdCounter + 1,
    //       noteCounters: {
    //         ...state.noteCounters,
    //         [label]: count + 1,
    //       },
    //     };
    //   });
    // },

    addEdge: (edge) =>
      set((state) => {
        const newEdges = addEdge(edge, Array.from(state.edgeMap.values()));
        return { edgeMap: new Map(newEdges.map((e) => [e.id, e])) };
      }),

    deleteNode: (id) =>
      set((state) => {
        state.nodeMap.delete(id);
        const filteredEdges = Array.from(state.edgeMap.values()).filter(
          (e) => e.source !== id && e.target !== id
        );
        return {
          nodeMap: new Map(state.nodeMap),
          edgeMap: new Map(filteredEdges.map((e) => [e.id, e])),
        };
      }),

    deleteEdge: (id) =>
      set((state) => {
        state.edgeMap.delete(id);
        return { edgeMap: new Map(state.edgeMap) };
      }),

    duplicateNode: (node) => get().addNode(node.data.type, node.data.label),

    editNode: (id, label, type) =>
      set((state) => {
        const node = state.nodeMap.get(id);
        if (!node) return {};
        const updatedNode = {
          ...node,
          type,
          data: { ...node.data, label, type },
        };
        state.nodeMap.set(id, updatedNode);
        return { nodeMap: new Map(state.nodeMap) };
      }),

    changeEdgeType: (id, newType) =>
      set((state) => {
        const edge = state.edgeMap.get(id);
        if (!edge) return {};
        const updatedEdge = {
          ...edge,
          data: { ...edge.data, edgeType: newType },
        };
        state.edgeMap.set(id, updatedEdge);
        return { edgeMap: new Map(state.edgeMap) };
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

    setEditingNode: (node) => set(() => ({ editingNode: node })),

    getCurrentNode: (id: string) => get().nodeMap.get(id),

    setNodeContext: (context) =>
      set(() => ({
        nodeContext: { item: context.item, position: context.position },
      })),

    setEdgeContext: (context) =>
      set(() => ({
        edgeContext: { item: context.item, position: context.position },
      })),

    clearContexts: () =>
      set(() => ({ nodeContext: null, edgeContext: null, editingNode: null })),

    clearWorkflow: () => {
      set(() => {
        return {
          nodeMap: new Map(initialNodes.map((node) => [node.id, node])),
          edgeMap: new Map(initialEdges.map((edge) => [edge.id, edge])),
          noteMap: new Map(initialEdges.map((edge) => [edge.id, edge])),
          ...getInitialState(),
        };
      });
    },
  };
});
