"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { createAdminClient } from "../supabase/admin";

export async function updateProfile(name: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: name,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function uploadAvatar(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const file = formData.get("avatar") as File;

  if (!file || file.size === 0) {
    throw new Error("No file selected");
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image file");
  }

  // Validate file size (5MB max)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("File size must be less than 5MB");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const timestamp = Date.now();
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const avatarUrlWithCacheBust = `${publicUrl}?t=${timestamp}`;

  const { error: dbError } = await supabase
    .from("users")
    .update({
      avatar_url: avatarUrlWithCacheBust,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (dbError) {
    console.error("Database update error:", dbError);
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      avatar_url: avatarUrlWithCacheBust,
    },
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  revalidatePath("/dashboard/settings");

  return { success: true, avatarUrl: avatarUrlWithCacheBust };
}

export async function deleteAccount() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message || "User not authenticated");
  }

  const supabaseAdmin = await createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    throw new Error(error.message);
  }

  redirect("/auth/signin");
}
