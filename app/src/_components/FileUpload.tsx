"use client";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { FileUploadProps } from "../_types/types";
import UploadFiles from "./UploadFilesList";
import toast from "react-hot-toast";

export function FileUpload({
  onFilesUpload,
  acceptedFileTypes = ".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt",
  maxFileSize = 10,
  multiple = true,
}: FileUploadProps) {
  const MAX_TOTAL_FILES = 5;

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const uploadedKeys = useRef<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
      // remember yastaaaaaa Browsers behave differently depending on how the file is selected
      e.target.value = "";
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: File[] = [];

    for (const file of files) {
      const sizeMB = file.size / (1024 * 1024);
      const key = `${file.name}-${file.size}`;

      if (sizeMB > maxFileSize) {
        toast.error(`${file.name} exceeds ${maxFileSize}MB`, {
          removeDelay: 2,
        });
        continue;
      }

      if (uploadedKeys.current.has(key)) {
        toast.error(`${file.name} is already uploaded`);
        continue;
      }

      newFiles.push(file);
      uploadedKeys.current.add(key);
    }

    const totalFiles = uploadedFiles.length + newFiles.length;

    if (totalFiles > MAX_TOTAL_FILES) {
      toast.error(`Only ${MAX_TOTAL_FILES} files are allowed in total`);
      return;
    }

    const updated = [...uploadedFiles, ...newFiles];
    setUploadedFiles(updated);
    onFilesUpload?.(newFiles);
  };

  const removeFile = (index: number) => {
    const file = uploadedFiles[index];
    const key = `${file.name}-${file.size}`;
    uploadedKeys.current.delete(key);

    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 min-h-44 flex flex-col justify-center cursor-pointer transition-colors ${
          isDragOver ? " bg-blue-50" : "border-gray-300 hover:border-gray-400"
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
          accept={acceptedFileTypes}
        />
      </div>

      {uploadedFiles.length > 0 && (
        <UploadFiles files={uploadedFiles} removeFile={removeFile} />
      )}
    </div>
  );
}
