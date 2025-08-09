"use client";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { FileUploadProps } from "../_types/types";
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
  onFilesUpload,
  acceptedFileType = ".pdf,.doc,.docx,.txt",
  maxFileSize = 10,
  multiple = true,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
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

  const handleFiles = (files: File[]) => {
    const existingKeys = new Set(
      uploadedFiles.map((f) => `${f.name}-${f.size}`)
    );

    const newFiles: File[] = [];

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

      newFiles.push(file);
      existingKeys.add(key);
    }

    if (uploadedFiles.length + newFiles.length > MAX_TOTAL_FILES) {
      toast.error(`Only ${MAX_TOTAL_FILES} files are allowed in total`);
      return;
    }

    if (newFiles.length > 0) {
      const updated = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updated);
      onFilesUpload?.(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 min-h-44 flex flex-col justify-center cursor-pointer transition-colors ${
          isDragOver ? "bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
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
              Click to upload
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
        />
      </div>

      {uploadedFiles.length > 0 && (
        <UploadFilesList files={uploadedFiles} removeFile={removeFile} />
      )}
    </div>
  );
}
