"use client";

import { useInspectorReducer } from "../../../_hooks/useInspectorReducer";
import { availableNodes, nodeConfigMap } from "../../../_utils/constants";
import { useEnterKey } from "../../../_hooks/useEnterKey";
import { useNodeSave } from "../../../_hooks/useNodeSave";
import { useFlowStore } from "@/app/_store/flowStore";
import { Action, NodeType } from "../../../_types/types";
import { Dispatch, useEffect } from "react";
import InputGroup from "../../InputGroup";
import toast from "react-hot-toast";
import Button from "../../Button";

export default function WorkflowInspector() {
  const getCurrentNode = useFlowStore((s) => s.getCurrentNode);
  const deleteNode = useFlowStore((s) => s.deleteNode);
  const uploadedFiles = useFlowStore((s) => s.uploadedFiles);
  const currentNodeId = useFlowStore((s) => s.currentNodeId);
  const executeNode = useFlowStore((s) => s.executeNode);
  const node = getCurrentNode(currentNodeId!);
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

  async function handleExecuteNode() {
    const { data, error } = await executeNode(currentNodeId!);
    if (error) {
      toast.error(`Error: ${error}`);
    } else {
      toast.success(`Node ${data} executed successfully`);
    }
  }

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
            onClick={handleExecuteNode}
            className="w-full md:w-auto px-4 py-2 text-sm bg-slate-600 text-white rounded hover:bg-slate-500 transition cursor-pointer"
          >
            Execute Node
          </button>

          <Button
            degree="main"
            onClick={save}
            disabled={!state.hasChanges}
            extraStyle={`rounded-md disabled:bg-slate-600`}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </section>
  );
}
