/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "./client";
import type { Node, Edge } from "reactflow";

export interface WorkflowData {
  id?: string;
  name: string;
  description?: string;
  nodes: Node[];
  edges: Edge[];
  settings?: Record<string, any>;
}
const supabase = createClient();

export async function saveWorkflow(workflowData: WorkflowData, userId: string) {
  const { data, error } = await supabase
    .from("workflows")
    .insert({
      user_id: userId,
      name: workflowData.name,
      description: workflowData.description,
      nodes: workflowData.nodes,
      edges: workflowData.edges,
      settings: workflowData.settings || {},
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save workflow: ${error.message}`);
  }

  return data;
}

export async function updateWorkflow(
  workflowId: string,
  workflowData: Partial<WorkflowData>,
  userId: string
) {
  const { data, error } = await supabase
    .from("workflows")
    .update({
      name: workflowData.name,
      description: workflowData.description,
      nodes: workflowData.nodes,
      edges: workflowData.edges,
      settings: workflowData.settings,
      updated_at: new Date().toISOString(),
    })
    .eq("id", workflowId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update workflow: ${error.message}`);
  }

  return data;
}

export async function getUserWorkflows(userId: string) {
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch workflows: ${error.message}`);
  }

  return data;
}

export async function getWorkflow(workflowId: string, userId: string) {
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("id", workflowId)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch workflow: ${error.message}`);
  }

  return data;
}

export async function deleteWorkflow(workflowId: string, userId: string) {
  const { error } = await supabase
    .from("workflows")
    .delete()
    .eq("id", workflowId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Failed to delete workflow: ${error.message}`);
  }
}

export async function saveExecutionLog(executionData: {
  userId: string;
  workflowId: string;
  nodeId: string;
  nodeLabel: string;
  status: "running" | "success" | "error";
  startedAt: string;
  finishedAt?: string;
  duration?: number;
  output?: any;
  errorMessage?: string;
  fileId?: string;
}) {
  const { data, error } = await supabase
    .from("execution_logs")
    .insert(executionData)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save execution log: ${error.message}`);
  }

  return data;
}
