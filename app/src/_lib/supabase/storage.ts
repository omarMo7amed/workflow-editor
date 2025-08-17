"use server";
import { createClient } from "./server";

export async function uploadFile(
  file: File,
  userId: string,
  workflowId?: string,
  nodeId?: string
) {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("user-files")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Save file metadata to database
  const { data: fileRecord, error: dbError } = await supabase
    .from("user_files")
    .insert({
      user_id: userId,
      filename: fileName,
      original_filename: file.name,
      file_size: file.size,
      mime_type: file.type,
      storage_path: filePath,
      workflow_id: workflowId,
      node_id: nodeId,
    })
    .select()
    .single();

  if (dbError) {
    // Clean up uploaded file if database insert fails
    await supabase.storage.from("user-files").remove([filePath]);
    throw new Error(`Database error: ${dbError.message}`);
  }

  return fileRecord;
}

export async function getFileUrl(filePath: string) {
  const supabase = await createClient();

  const { data } = await supabase.storage
    .from("user-files")
    .createSignedUrl(filePath, 3600); // 1 hour expiry

  return data?.signedUrl;
}

export async function deleteFile(fileId: string, userId: string) {
  const supabase = await createClient();
  const { data: fileRecord, error: fetchError } = await supabase
    .from("user_files")
    .select("storage_path")
    .eq("id", fileId)
    .eq("user_id", userId)
    .single();

  if (fetchError || !fileRecord) {
    throw new Error("File not found");
  }

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("user-files")
    .remove([fileRecord.storage_path]);

  if (storageError) {
    throw new Error(`Storage deletion failed: ${storageError.message}`);
  }

  const { error: dbError } = await supabase
    .from("user_files")
    .delete()
    .eq("id", fileId)
    .eq("user_id", userId);

  if (dbError) {
    throw new Error(`Database deletion failed: ${dbError.message}`);
  }
}

export async function getUserFiles(userId: string, workflowId?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("user_files")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false });

  if (workflowId) {
    query = query.eq("workflow_id", workflowId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Failed to fetch files: ${error.message}`);
  }

  return data;
}
