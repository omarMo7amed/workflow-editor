import SelectionInput from "../../SelectionInput";
import { File, X } from "lucide-react";
import { Action, State, UploadedFile } from "../../../_types/types";
import { Dispatch } from "react";
import toast from "react-hot-toast";

interface ReadFileConfigProps {
  state: State;
  dispatch: Dispatch<Action>;
  uploadedFiles: UploadedFile[];
}

export default function ReadFileConfig({
  state,
  dispatch,
  uploadedFiles,
}: ReadFileConfigProps) {
  return (
    <>
      <SelectionInput
        id="file-select"
        label="Choose File"
        options={uploadedFiles.map((file: UploadedFile, index: number) => ({
          key: file.id,
          value: String(index),
          label: file.filename,
        }))}
        value={state.fileName || ""}
        onSelectChange={(selected) => {
          const file = uploadedFiles.find((f, idx) => f.filename === selected);
          if (!file) return toast.error("Selected file not found");

          dispatch({
            type: "setFile",
            payload: {
              fileName: file?.filename || "",
              filePath: file?.storage_path || "",
            },
          });
        }}
      />
      {state.fileName && (
        <div className="-mt-5 flex justify-between bg-slate-50 rounded-md p-1.5 hover:bg-slate-100">
          <div className="flex items-center space-x-2 min-w-0">
            <File size={16} className="flex-shrink-0 " />
            <span className="text-sm text-gray-900 truncate">
              {state.fileName}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: "removeFile" })}
            className="ml-2 text-gray-400 hover:text-red-500 flex-shrink-0 cursor-pointer"
            aria-label="remove selected file"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}
