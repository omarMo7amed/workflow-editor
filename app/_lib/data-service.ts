/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { notFound } from "next/navigation";
import { ExecutionLog } from "../_types/types";
import { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "./auth/actions";
import { createSafeFilename } from "../_utils/helper";

// GET
export async function getWorkflowsByUserId(userId: string) {
  if (!userId) return;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .select("id, name, description, nodes, edges, status, last_run_at")
    .eq("user_id", userId);

  if (error) throw new Error(`Error fetching workflows: ${error.message}`);

  return data;
}

export async function getWorkflowById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();
  return data;
}

export async function getFilesByWorkflowId(workflowId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_files")
    .select("*")
    .eq("workflow_id", workflowId);

  if (error) notFound();
  return data;
}

export async function getExecutionsLogsByWorkflow(workflowId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("execution_logs")
    .select("*")
    .eq("workflow_id", workflowId);

  if (error) throw new Error(`Error fetching execution logs: ${error.message}`);
  return data;
}

export async function getWorkflowStats(workflowId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("workflow_stats")
    .select("success, error, duration, total")
    .eq("workflow_id", workflowId);

  if (error) throw new Error(`Error fetching workflow stats: ${error.message}`);

  return data[0];
}

//POST
export async function uploadFileByWorkflow(
  userId: string,
  workflowId: string,
  nodeId: string | null,
  file: File
) {
  const supabase = await createClient();

  if (!userId || !workflowId) {
    throw new Error("User ID, workflow ID, and file are required");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error(
      "File size exceeds the 10MB limit. Please upload a smaller file."
    );
  }

  if (!file || !(file instanceof File)) {
    throw new Error("Invalid file provided");
  }
  const safeFilename = createSafeFilename(file.name);

  const storagePath = `${userId}/${workflowId}/${safeFilename}`;

  const { error: uploadError } = await supabase.storage
    .from("user-files")
    .upload(storagePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data, error } = await supabase
    .from("user_files")
    .insert([
      {
        user_id: userId,
        workflow_id: workflowId,
        node_id: nodeId ?? null,
        filename: storagePath.split("/").pop(),
        original_filename: file.name,
        file_size: file.size,
        mime_type: file.type,
        storage_path: storagePath,
        uploaded_at: new Date().toISOString(),
      },
    ])
    .select("*")
    .single();

  if (error) throw error;

  return data;
}

export async function uploadReportByWorkflow(
  workflowId: string,
  userId: string,
  buffer: Buffer | null,
  fileName: string,
  format: "CSV" | "PDF" | "DOCX"
) {
  const supabase = await createClient();

  const contentType =
    format === "PDF"
      ? "application/pdf"
      : format === "DOCX"
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "text/csv";

  const storagePath = `${userId}/${workflowId}/${fileName}`;

  const { data: fileMeta, error: statError } = await supabase.storage
    .from("reports")
    .list(`${userId}/${workflowId}`, { search: fileName });

  if (statError) throw statError;

  if (fileMeta && fileMeta.length > 0) {
    const { data: signed } = await supabase.storage
      .from("reports")
      .createSignedUrl(storagePath, 60 * 60 * 2);

    if (!signed?.signedUrl) throw new Error("Failed to create signed URL");

    return { reportUrl: signed.signedUrl, existed: true };
  }

  if (!buffer) {
    throw new Error("File does not exist and no buffer provided to create one");
  }

  const { error: uploadError } = await supabase.storage
    .from("reports")
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (uploadError) throw uploadError;

  const { data: signed } = await supabase.storage
    .from("reports")
    .createSignedUrl(storagePath, 60 * 60 * 2);

  if (!signed?.signedUrl) throw new Error("Failed to create signed URL");

  return { reportUrl: signed.signedUrl, existed: false };
}

// CREATE
export async function createWorkflow(
  userId: string,
  name: string,
  description: string
) {
  if (!userId || !name) {
    throw new Error("User ID and workflow name are required");
  }
  const settings = { nodeIdCounter: 1, noteIdCounter: 0, executionProgress: 0 };
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .insert({ user_id: userId, name, description, settings })
    .select("*")
    .single();

  if (error) throw new Error(`Error creating workflow: ${error.message}`);
  revalidatePath("/dashboard/workflows");
  return data;
}

export async function createExecutionLog(log: ExecutionLog) {
  const supabase = await createClient();

  const { error } = await supabase.from("execution_logs").upsert(
    {
      user_id: log.user_id,
      node_id: log.node_id,
      workflow_id: log.workflow_id,
      node_label: log.node_label,
      status: log.status,
      error_message: log.error_message ?? null,
      output: log.output,
      duration: log.duration ?? 0,
      finished_at: log.finished_at,
      started_at: log.started_at,
      file_name: log.file_name ?? null,
    },
    { onConflict: "workflow_id,node_id" }
  );

  if (error) {
    throw new Error(`Error creating execution log: ${error.message}`);
  }
}

// UPDATE
export async function updateWorkflowName(id: string, name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .update({ name })
    .eq("id", id);

  if (error) throw new Error(`Error updating workflow name: ${error.message}`);
  revalidatePath("/dashboard/workflows");
  return data;
}

export async function updateWorkflow(id: string, payload: any) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("workflows")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(`Error updating workflow: ${error.message}`);
  return data;
}

export async function updateWorkflowStats(
  workflow_id: string,
  payload: {
    success?: number;
    error?: number;
    duration?: number;
    total?: number;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("workflow_stats")
    .update(payload)
    .eq("workflow_id", workflow_id);

  if (error) throw new Error(`Error updating workflow stats: ${error.message}`);
}

export async function updateWorkflowSettings(
  workflow_id: string,
  settings: any
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("workflows")
    .update({ settings, updated_at: new Date().toISOString() })
    .eq("id", workflow_id);

  if (error)
    throw new Error(`Error updating workflow settings: ${error.message}`);
}

// DELETE
export async function deleteWorkflowById(id: string) {
  if (!id) {
    console.warn("No workflow ID provided for deletion");
    return;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("workflows").delete().eq("id", id);
  if (error) throw new Error(`Error deleting workflow: ${error.message}`);

  await deleteReportByWorkflow(supabase, id);

  revalidatePath("/dashboard/workflows");
}

export async function deleteFileById(fileId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_files")
    .delete()
    .eq("id", fileId)
    .select("*");

  if (error) throw new Error(`Error deleting file: ${error.message}`);

  const deleted = data?.[0];

  if (!deleted) {
    throw new Error("File not found or already deleted from database");
  }

  const { error: storageError } = await supabase.storage
    .from("user-files")
    .remove([deleted.storage_path]);

  if (storageError) {
    throw new Error(
      `Error deleting file from storage: ${storageError.message}`
    );
  }

  return data;
}

export async function deleteReportByWorkflow(
  supabase: SupabaseClient,
  workflowId: string
) {
  const user = await getCurrentUser();

  if (!user) throw new Error("Unauthorized");

  const { data: files, error: listError } = await supabase.storage
    .from("reports")
    .list(`${user.id}/${workflowId}`);

  if (listError) throw listError;

  if (files.length > 0) {
    const paths = files.map((f) => `${user.id}/${workflowId}/${f.name}`);
    const { error: removeError } = await supabase.storage
      .from("reports")
      .remove(paths);

    if (removeError) throw removeError;
  }
}
