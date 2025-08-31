/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useState,
  useRef,
  type DragEvent,
  type ChangeEvent,
  useCallback,
} from "react";
import { Upload } from "lucide-react";
import type { FileUploadProps } from "../../../_types/types";
import { useFlowStore } from "@/app/_store/flowStore";
import toast from "react-hot-toast";
import UploadFilesList from "./UploadFilesList";
import { validateFiles } from "../../../_utils/helper";
import {
  deleteFileById,
  uploadFileByWorkflow,
} from "../../../_lib/data-service";
import { useWorkflowStore } from "@/app/_store/workflowStore";

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
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteingIndex, setDeletingIndex] = useState<string | null>(null);
  const uploadedFiles = useFlowStore((s) => s.uploadedFiles);
  const setUploadedFiles = useFlowStore((s) => s.setUploadedFiles);
  const currentWorkflow = useWorkflowStore((s) => s.currentWorkflow);
  const reservedFilesByNode = useFlowStore((s) => s.reservedFilesByNode);
  const editNode = useFlowStore((s) => s.editNode);
  const save = useWorkflowStore((s) => s.save);
  const reservedFilesByFile = useFlowStore((s) => s.reservedFilesByFile);

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
      e.target.value = "";
    }
  };

  const handleFiles = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      try {
        const validFiles = validateFiles(
          files,
          uploadedFiles,
          acceptedFileTypes,
          maxFileSize,
          MAX_TOTAL_FILES
        );

        if (validFiles.length === 0) {
          setIsUploading(false);
          return;
        }

        const uploadResults = await Promise.all(
          validFiles.map((file) =>
            uploadFileByWorkflow(
              currentWorkflow?.user_id || "",
              currentWorkflow?.id || "",
              null,
              file
            )
          )
        );

        setUploadedFiles([...uploadedFiles, ...uploadResults]);

        toast.success(`${validFiles.length} file(s) uploaded successfully`);
      } catch (error: any) {
        toast.error(error.message || "Upload failed");
      } finally {
        setIsUploading(false);
        setDeletingIndex(null);
      }
    },
    [
      currentWorkflow?.id,
      currentWorkflow?.user_id,
      maxFileSize,
      uploadedFiles,
      setUploadedFiles,
    ]
  );

  const removeFile = useCallback(
    async (index: number) => {
      try {
        const file = uploadedFiles[index];
        const assigendNode = reservedFilesByFile.get(file.filename);
        await deleteFileById(uploadedFiles[index].id);
        if (assigendNode) {
          reservedFilesByFile.delete(file.filename);
          reservedFilesByNode.delete(assigendNode);
          editNode(assigendNode, { fileName: "", filePath: "" });
        }
        await save(currentWorkflow?.id || "", {
          nodes: useFlowStore.getState().getNodes(),
        });

        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
        toast.success("File removed successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to remove file");
        setDeletingIndex(null);
      }
    },
    [
      setUploadedFiles,
      uploadedFiles,
      reservedFilesByFile,
      reservedFilesByNode,
      editNode,
      save,
      currentWorkflow?.id,
    ]
  );

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
        <UploadFilesList
          files={uploadedFiles}
          removeFile={removeFile}
          deleteingIndex={deleteingIndex}
          onDeleteingIndex={setDeletingIndex}
        />
      )}
    </div>
  );
}
