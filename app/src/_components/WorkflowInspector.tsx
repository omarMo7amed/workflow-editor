"use client";

import { useInspectorReducer } from "../_hooks/useInspectorReducer";
import useActiveTabs from "../context/ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import { availableNodes, nodeConfigMap } from "../_utils/constants";
import { useEnterKey } from "../_hooks/useEnterKey";
import { Action, NodeType } from "../_types/types";
import InputGroup from "./InputGroup";
import { Dispatch, useEffect } from "react";
import Button from "./Button";
import { useNodeSave } from "../_hooks/useNodeSave";

export default function WorkflowInspector() {
  const { getCurrentNode, deleteNode, uploadedFiles } = useFlowStore();
  const { currentNodeId } = useActiveTabs();
  const node = getCurrentNode(currentNodeId);
  const [state, dispatch] = useInspectorReducer(node);
  const save = useNodeSave(node, state, dispatch);

  const nodeType = node?.type as NodeType;
  const displayType = availableNodes[nodeType] || "Unknown";
  useEnterKey(save);

  useEffect(() => {
    dispatch({ type: "ready", payload: node });
  }, [node, dispatch]);

  if (!node)
    return (
      <p className="text-sm text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2">
        No node selected
      </p>
    );

  const handleExecute = () => {
    console.log("Executing node", node?.id);
  };

  const ConfigNode = nodeConfigMap[node.type as Exclude<NodeType, "note">];

  return (
    <section className="space-y-6">
      {/* Info */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-700">Node Info</h3>

        <InputGroup
          type="text"
          label="Type"
          id="type"
          value={displayType}
          readOnly
        />
        <InputGroup
          type="text"
          label="Node ID"
          id="nodeId"
          value={node.id}
          readOnly
        />
      </div>

      {/* Editable */}
      <div className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-gray-700">Configuration</h3>
        <InputGroup
          type="text"
          label="Name"
          id="rename"
          value={state.label}
          onChange={(e) =>
            dispatch({ type: "setLabel", payload: e.target.value })
          }
        />
        {ConfigNode && (
          <ConfigNode
            state={state}
            dispatch={dispatch as Dispatch<Action>}
            uploadedFiles={uploadedFiles}
          />
        )}
      </div>

      {/* Actions */}
      <div>
        <h3 className="text-base font-semibold text-gray-700 mb-4">Actions</h3>

        <div className="flex flex-col-reverse gap-3">
          <Button
            degree="secondary"
            onClick={() => deleteNode(node.id)}
            extraStyle="rounded-md"
          >
            Delete Node
          </Button>

          <button
            onClick={handleExecute}
            className="w-full md:w-auto px-4 py-2 text-sm bg-slate-600 text-white rounded hover:bg-slate-500 transition"
          >
            Execute Node
          </button>

          <Button
            degree="main"
            onClick={save}
            disabled={!state.hasChanges}
            extraStyle={`rounded-md disabled:bg-slate-300`}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </section>
  );
}
