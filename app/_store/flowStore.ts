"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
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
import { calcCoordinatesOfNode, getInitialState } from "../src/_utils/helper";
import { initialEdges, initialNodes } from "../src/_utils/constants";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface ContextMenu<T> {
  position: { x: number; y: number };
  item: T;
}

interface FlowState {
  nodeMap: Map<string, Node>;
  edgeMap: Map<string, Edge>;
  nodeIdCounter: number;
  uploadedFiles: File[];
  noteIdCounter: number;
  reservedFilesByNode: Map<string, string>;
  reservedFilesByFile: Map<string, string>;
  labelCounters: Record<string, number>;
  editingNode: Node | null;
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
  changeEdgeType: (id: string, type: string) => void;
  toggleEdgeLabel: (id: string) => void;

  setUploadedFiles: (files: File[]) => void;

  setEditingNode: (node: Node | null) => void;
  setNodeContext: (context: ContextMenu<Node>) => void;
  setEdgeContext: (context: ContextMenu<Edge>) => void;
  clearContexts: () => void;
  clearWorkflow: () => void;

  modal: {
    isOpen: boolean;
    content: string | null;
  };

  openModal: (content: string) => void;
  closeModal: () => void;
}

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => {
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

    getNodes: () => Array.from(get().nodeMap.values()),
    getEdges: () => Array.from(get().edgeMap.values()),

    addNode: (type, label, position) => {
      try {
        set((state) => {
          const isNote = type === "note";
          const id = isNote
            ? `note-${state.noteIdCounter}`
            : `node-${state.nodeIdCounter}`;

          console.log("from add Node", state.editingNode);

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

          toast.success(`${newLabel} added successfully!`);

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
        toast.error("Failed to add node");
        console.error(e);
      }
    },

    deleteNode: (id) =>
      set((state) => {
        const node = state.nodeMap.get(id);
        if (!node) return {};

        const isNote = node.type === "note";

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
          nodeIdCounter: isNote ? state.nodeIdCounter : state.nodeIdCounter - 1,
          noteIdCounter: isNote ? state.noteIdCounter - 1 : state.noteIdCounter,
          labelCounters: newLabelCounters,
        };
      }),

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

          if (node.type !== "note") toast.success("Node updated successfully!");

          return { nodeMap: newNodeMap };
        });
      } catch (e) {
        toast.error("Something is Wrong Try Again");
        console.error("edit node", e);
      }
    },

    addEdge: (edge) =>
      set((state) => {
        const newEdges = addEdge(edge, Array.from(state.edgeMap.values()));
        return { edgeMap: new Map(newEdges.map((e) => [e.id, e])) };
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

    setEditingNode: (node) => {
      console.log("Editing node set to:", node);

      set({ editingNode: node });
    },

    getCurrentNode: (id?: string) => {
      if (!id) return;
      return get().nodeMap.get(id);
    },

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

    clearContexts: () =>
      set(() => ({ nodeContext: null, edgeContext: null, editingNode: null })),

    clearWorkflow: () => {
      set((state) => {
        console.log(state.uploadedFiles);
        return {
          nodeMap: new Map(initialNodes.map((node) => [node.id, node])),
          edgeMap: new Map(initialEdges.map((edge) => [edge.id, edge])),
          noteMap: new Map(initialEdges.map((edge) => [edge.id, edge])),
          ...getInitialState(),
        };
      });
    },

    modal: { isOpen: false, content: null },

    openModal: (content) => set(() => ({ modal: { isOpen: true, content } })),

    closeModal: () => set(() => ({ modal: { isOpen: false, content: null } })),
  };
    },
    {
      name: 'workflow-storage',
      partialize: (state) => ({
        nodeMap: Array.from(state.nodeMap.entries()),
        edgeMap: Array.from(state.edgeMap.entries()),
        nodeIdCounter: state.nodeIdCounter,
        noteIdCounter: state.noteIdCounter,
        labelCounters: state.labelCounters,
        uploadedFiles: state.uploadedFiles,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert arrays back to Maps
          state.nodeMap = new Map(state.nodeMap as any);
          state.edgeMap = new Map(state.edgeMap as any);
        }
      },
    }
  )
);
