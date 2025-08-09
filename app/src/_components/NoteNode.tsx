import { useFlowStore } from "@/app/_store/flowStore";
import { PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useInspectorReducer } from "../_hooks/useInspectorReducer";
import { useNodeSave } from "../_hooks/useNodeSave";

interface NoteNodeProps {
  data: {
    id: string;
    label: string;
    description?: string;
  };
}

export default function NoteNode({ data }: NoteNodeProps) {
  const { deleteNode, getCurrentNode } = useFlowStore();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const note = getCurrentNode(data.id);
  const [state, dispatch] = useInspectorReducer(note);
  const save = useNodeSave(note, state, dispatch);

  useEffect(() => {
    dispatch({ type: "ready", payload: note });
  }, [note, dispatch]);

  return (
    <div
      className={`
        rounded-lg border-2 shadow-md transition-all duration-200 
        hover:shadow-lg bg-yellow-100 border-yellow-400 
        w-48 h-32 p-3 flex flex-col
      `}
      role="button"
      onKeyDown={(e) => {
        if (e.code === "Delete") deleteNode(data.id);
      }}
      tabIndex={0}
      aria-label="Note node"
    >
      <div className="flex items-center justify-between mb-1">
        {isEditingLabel ? (
          <input
            className="text-sm font-semibold text-gray-800 w-full bg-transparent border-b border-yellow-300 focus:outline-none"
            value={state.label}
            onChange={(e) =>
              dispatch({ type: "setLabel", payload: e.target.value })
            }
            onBlur={() => {
              save();
              setIsEditingLabel(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                save();
                setIsEditingLabel(false);
              }
            }}
            autoFocus
          />
        ) : (
          <h4
            className="text-sm font-semibold text-gray-800 truncate w-full"
            onClick={() => setIsEditingLabel(true)}
          >
            {data.label || "note"}
          </h4>
        )}

        <PencilIcon
          className="w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer flex-shrink-0 ml-1"
          onClick={() => setIsEditingLabel(true)}
          aria-label="Edit note"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        {isEditingDescription ? (
          <textarea
            value={state.description}
            onChange={(e) => {
              console.log(state.description);
              dispatch({ type: "setDescription", payload: e.target.value });
            }}
            onBlur={() => {
              save();
              setIsEditingDescription(false);
            }}
            className="w-full h-full text-sm text-slate-900 bg-transparent focus:outline-none resize-none"
            autoFocus
            aria-label="Edit note content"
          />
        ) : (
          <p
            className={`text-sm ${
              state.description ? "text-slate-900" : "text-slate-500"
            } whitespace-pre-wrap break-words  line-clamp-4`}
            onDoubleClick={() => setIsEditingDescription(true)}
          >
            {state.description || "Double-click to add description"}
          </p>
        )}
      </div>
    </div>
  );
}
