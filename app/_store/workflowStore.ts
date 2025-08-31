import { create } from "zustand";
import {
  createWorkflow,
  deleteWorkflowById,
  updateWorkflow,
} from "../_lib/data-service";
import { Workflow } from "../_types/types";
import { useFlowStore } from "./flowStore";

export type WorkflowStatus = "success" | "error" | "pending" | "running";

interface WorkflowState {
  workflows: Partial<Workflow>[];
  currentWorkflow: Partial<Workflow> | null;
  isLoading: boolean;

  error: string | null;

  setCurrentWorkflow: (workflow: Partial<Workflow>) => void;
  setWorkflows: (workflows: Partial<Workflow>[]) => void;

  create: (userId: string, name: string, desc: string) => Promise<void>;
  filterWorkflows: (query: string) => Partial<Workflow>[];

  save: (id: string, payload: Partial<Workflow>) => Promise<void>;
  saveCurrentState: (id: string, payload?: Partial<Workflow>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  bulkDelete: (ids: string[]) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  workflows: [],
  currentWorkflow: null,
  isLoading: false,
  error: null,

  async create(userId, name, desc) {
    const newWf = await createWorkflow(userId, name, desc);
    set((state) => ({ workflows: [...state.workflows, newWf] }));
  },

  async delete(id) {
    if (!id) return;
    await deleteWorkflowById(id);
    set((state) => ({
      workflows: state.workflows.filter((w) => w.id !== id),
      currentWorkflow:
        state.currentWorkflow?.id === id ? null : state.currentWorkflow,
    }));
  },

  //it work but i will think in another solution

  async bulkDelete(ids) {
    for (const id of ids) {
      await deleteWorkflowById(id);
    }
    set((state) => ({
      workflows: state.workflows.filter((w) => !ids.includes(w.id!)),
    }));
  },

  async saveCurrentState(id: string, payload?: Partial<Workflow>) {
    try {
      if (!id) return;

      const { nodes, edges, settings } = useFlowStore
        .getState()
        .serializeFlowState();

      const updatedPayload: Partial<Workflow> = {
        ...payload,
        updated_at: new Date().toISOString(),
        nodes,
        edges,
        settings,
      };

      const updated = await updateWorkflow(id, updatedPayload);

      set((state) => ({
        workflows: state.workflows.map((w) => (w.id === id ? updated : w)),
        currentWorkflow:
          state.currentWorkflow?.id === id ? updated : state.currentWorkflow,
      }));
    } catch (error) {
      console.error("Error saving workflow:", error);
      throw error;
    }
  },

  async save(id: string, payload: Partial<Workflow>) {
    try {
      if (!payload || id === undefined) return;

      const updated = await updateWorkflow(id, payload);

      set((state) => ({
        workflows: state.workflows.map((w) => (w.id === id ? updated : w)),
        currentWorkflow:
          state.currentWorkflow?.id === id ? updated : state.currentWorkflow,
      }));
    } catch (error) {
      console.error("Error saving workflow:", error);
      throw error;
    }
  },

  setWorkflows(workflows) {
    set({ workflows });
  },

  setCurrentWorkflow(workflow) {
    set({ currentWorkflow: workflow });
  },

  filterWorkflows(query) {
    const { workflows } = get();
    return workflows.filter(
      (workflow) =>
        workflow?.name?.toLowerCase().includes(query.toLowerCase()) ||
        workflow?.description?.toLowerCase().includes(query.toLowerCase())
    );
  },
}));
