import { useInspectorReducer } from "../_hooks/useInspectorReducer";
import { useOutsideClick } from "../_hooks/useOutSideClick";
import { AnimatePresence, motion } from "framer-motion";
import { useFlowStore } from "@/app/_store/flowStore";
import { useNodeSave } from "../_hooks/useNodeSave";
import { useEnterKey } from "../_hooks/useEnterKey";
import { nodeConfigMap } from "../_utils/constants";
import { Action, NodeType } from "../_types/types";
import { Dispatch, useEffect } from "react";
import InputGroup from "./InputGroup";
import { Node } from "reactflow";
import Button from "./Button";

export const EditNodeModal = ({
  node,
  onClose,
}: {
  node: Node | undefined;
  onClose: () => void;
}) => {
  const ref = useOutsideClick<HTMLDivElement>(onClose);
  const [state, dispatch] = useInspectorReducer(node);
  const save = useNodeSave(node, state, dispatch);
  const { uploadedFiles } = useFlowStore();

  const handleSave = () => {
    save();
    onClose();
  };

  useEnterKey(handleSave, !!node);

  useEffect(() => {
    dispatch({ type: "ready", payload: node });
  }, [node, dispatch]);

  if (!node) return undefined;

  const nodeType = node.type;

  const ConfigNode = nodeConfigMap[nodeType as Exclude<NodeType, "note">];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-gray-800/50 bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          className="bg-white rounded-xl p-6 w-96 shadow-2xl relative"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          ref={ref}
        >
          <h2 className="text-xl font-bold mb-4">Edit Node</h2>
          <div className="mb-4">
            <InputGroup
              label="Rename Label"
              id="rename-label"
              type="text"
              value={state.label}
              onChange={(e) =>
                dispatch({ type: "setLabel", payload: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            {ConfigNode && (
              <ConfigNode
                state={state}
                dispatch={dispatch as Dispatch<Action>}
                uploadedFiles={uploadedFiles}
              />
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              degree="secondary"
              extraStyle="rounded-lg"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              degree="main"
              onClick={handleSave}
              disabled={!state.hasChanges}
              extraStyle="rounded-md "
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
