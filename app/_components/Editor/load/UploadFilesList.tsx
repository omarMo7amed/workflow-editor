import { UploadFilesListProps } from "../../../_types/types";
import { File, X } from "lucide-react";
import SmallSpinner from "../../SmallSpinner";

export default function UploadFilesList({
  files,
  removeFile,
  deleteingIndex,
  onDeleteingIndex,
}: UploadFilesListProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-900">
        Uploaded Files ({files.length})
      </h4>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <div className="flex-1 flex items-center space-x-2 min-w-0">
              <File size={16} className="flex-shrink-0 " />
              <span className="text-sm text-gray-900 truncate">
                {file.filename}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-xs text-gray-500 flex-shrink-0">
                ({(file.file_size / (1024 * 1024)).toFixed(3)} MB)
              </span>

              <button
                onClick={() => {
                  removeFile(index);
                  onDeleteingIndex(file.id);
                }}
                className="ml-2 text-gray-400 hover:text-red-500 flex-shrink-0 cursor-pointer"
                aria-label="Remove file"
              >
                {deleteingIndex === file.id ? (
                  <SmallSpinner className="h-4 w-4 border-gray-300 border-t-blue-500" />
                ) : (
                  <X size={16} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
