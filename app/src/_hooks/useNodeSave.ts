import { useFlowStore } from "@/app/_store/flowStore";
import toast from "react-hot-toast";
import { Node } from "reactflow";
import { Action, State } from "../_types/types";
import { Dispatch } from "react";

export function useNodeSave(
  node: Node | undefined,
  state: State,
  dispatch: Dispatch<Action>
) {
  const { editNode, reservedFilesByFile, reservedFilesByNode, getCurrentNode } =
    useFlowStore();

  return function save() {
    if (!node || !state.hasChanges) return;

    const currentFile = reservedFilesByNode.get(node.id) || "";

    if (state.choosedFile && state.choosedFile !== currentFile) {
      const ownerNodeId = reservedFilesByFile.get(state.choosedFile);

      if (ownerNodeId && ownerNodeId !== node.id) {
        const currentNode = getCurrentNode(ownerNodeId);
        toast.error(
          `This file is already assigned to node ${currentNode?.data.label}`
        );
        return;
      }

      if (currentFile) {
        reservedFilesByNode.delete(node.id);
        reservedFilesByFile.delete(currentFile);
      }

      reservedFilesByNode.set(node.id, state.choosedFile);
      reservedFilesByFile.set(state.choosedFile, node.id);
    }

    if (state.removeFile && currentFile) {
      reservedFilesByNode.delete(node.id);
      reservedFilesByFile.delete(currentFile);
    }

    editNode(node.id, {
      label: state.label,
      ...(node.type === "note" && { description: state.description }),
      ...(node.type === "email" && { email: state.email }),
      ...(node.type === "report" && { reportFormat: state.reportFormat }),
      ...(node.type === "readFile" && { choosedFile: state.choosedFile }),
    });

    dispatch({ type: "reset", payload: node });
  };
}
