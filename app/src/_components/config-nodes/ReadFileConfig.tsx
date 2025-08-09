import SelectionInput from "../SelectionInput";
import { File, X } from "lucide-react";
import { Action, State } from "../../_types/types";
import { Dispatch } from "react";

interface ReadFileConfigProps {
  state: State;
  dispatch: Dispatch<Action>;
  uploadedFiles: File[];
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
        options={uploadedFiles.map((file: File) => ({
          value: file.name,
          label: file.name,
        }))}
        value={state.choosedFile || ""}
        onSelectChange={(selected) =>
          dispatch({ type: "setChoosedFile", payload: selected })
        }
      />
      {state.choosedFile && (
        <div className="-mt-5 flex justify-between bg-slate-50 rounded-md p-1.5 hover:bg-slate-100">
          <div className="flex items-center space-x-2 min-w-0">
            <File size={16} className="flex-shrink-0 " />
            <span className="text-sm text-gray-900 truncate">
              {state.choosedFile}
            </span>
          </div>
          <button
            onClick={() => dispatch({ type: "removeChoosedFile" })}
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
