/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { Upload } from "lucide-react";
import type { FileUploadProps } from "../_types/types";
import { useFlowStore } from "@/app/_store/flowStore";
import toast from "react-hot-toast";
import UploadFilesList from "./UploadFilesList";

const MAX_TOTAL_FILES = 5;

const acceptedFileTypes: Record<string, string> = {
  "application/pdf": ".pdf",
  "application/msword": ".doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "text/plain": ".txt",
};

export function FileUpload({
  acceptedFileType = ".pdf,.doc,.docx,.txt",
  maxFileSize = 10,
  multiple = true,
  workflowId,
  nodeId,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadedFiles = useFlowStore((s) => s.uploadedFiles);
  const setUploadedFiles = useFlowStore((s) => s.setUploadedFiles);

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
      e.target.value = ""; // reset so same file can be picked again
    }
  };

  const handleFiles = async (files: File[]) => {
    const existingKeys = new Set(
      uploadedFiles.map((f) => `${f.name}-${f.size}`)
    );

    const validFiles: File[] = [];

    for (const file of files) {
      const key = `${file.name}-${file.size}`;
      const sizeMB = file.size / (1024 * 1024);

      if (!acceptedFileTypes[file.type]) {
        toast.error(`Only these file types are allowed: ${acceptedFileType}`);
        continue;
      }

      if (sizeMB > maxFileSize) {
        toast.error(`${file.name} exceeds ${maxFileSize}MB`);
        continue;
      }

      if (existingKeys.has(key)) {
        toast.error(`${file.name} is already uploaded`);
        continue;
      }

      validFiles.push(file);
      existingKeys.add(key);
    }

    if (uploadedFiles.length + validFiles.length > MAX_TOTAL_FILES) {
      toast.error(`Only ${MAX_TOTAL_FILES} files are allowed in total`);
      return;
    }

    if (validFiles.length > 0) {
      setIsUploading(true);

      try {
        const uploadPromises = validFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          if (workflowId) formData.append("workflowId", workflowId);
          if (nodeId) formData.append("nodeId", nodeId);

          const response = await fetch("/api/files", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Upload failed");
          }

          return await response.json();
        });

        await Promise.all(uploadPromises);

        // Add files to local state for immediate UI feedback
        const updated = [...uploadedFiles, ...validFiles];
        setUploadedFiles(updated);

        toast.success(`${validFiles.length} file(s) uploaded successfully`);
      } catch (error: any) {
        toast.error(error.message || "Upload failed");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeFile = async (index: number) => {
    const fileToRemove = uploadedFiles[index];

    try {
      const response = await fetch(`/api/files?fileId=${fileToRemove.name}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Delete failed");
      }

      const updated = uploadedFiles.filter((_, i) => i !== index);
      setUploadedFiles(updated);
      toast.success("File removed successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove file");
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 min-h-44 flex flex-col justify-center cursor-pointer transition-colors ${
          isDragOver ? "bg-blue-50" : "border-gray-300 hover:border-gray-400"
        } ${isUploading ? "opacity-50 pointer-events-none" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        aria-label="Attach or drag and drop your file"
        role="button"
        tabIndex={0}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2.5">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-blue-600 hover:text-blue-500">
              {isUploading ? "Uploading..." : "Click to upload"}
            </span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            Up to {MAX_TOTAL_FILES} files, {maxFileSize}MB max each
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          className="hidden"
          onChange={handleFileSelect}
          accept={acceptedFileType}
          disabled={isUploading}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <UploadFilesList files={uploadedFiles} removeFile={removeFile} />
      )}
    </div>
  );
}
