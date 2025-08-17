/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "./supabase/server";

//GET

export async function getWorkflowById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error fetching workflow: ${error.message}`);
  }

  return data;
}

export async function getWorkflowsByUserId(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .select(
      `
    id,
    name,
    description,
    nodes,
    edges,
    execution_logs (
      status,
      finished_at
    )
  `
    )
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Error fetching workflow executions: ${error.message}`);
  }
  //keep in mind, i have no entry execution_log yet

  console.log("Fetched workflows:", data);

  return data.map((w) => {
    const log = w.execution_logs[0];

    return {
      id: w.id,
      name: w.name,
      description: w.description,
      nodes: w.nodes,
      edges: w.edges,
      status: log?.status ?? "pending",
      lastRun: log?.finished_at ?? null,
    };
  });
}

//when  creating a workflow, we need to create an entry in the execution_logs table (it doesn't done yet)

export async function createWorkflow(
  userId: string,
  name: string,
  description: string
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .insert({
      user_id: userId,
      name,
      description,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Error creating workflow: ${error.message}`);
  }

  return data;
}
