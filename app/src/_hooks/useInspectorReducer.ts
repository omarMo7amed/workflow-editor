import { Dispatch, useReducer } from "react";
import { Node } from "reactflow";
import { Action, State } from "../_types/types";

const initialState = (node: Node | undefined): State => ({
  choosedFile: node?.data.choosedFile || "",
  label: node?.data.label || "",
  reportFormat: node?.data.reportFormat || "",
  email: node?.data.email || "",
  description: node?.data.description || "",
  hasChanges: false,
  removeFile: false,
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ready":
      return initialState(action.payload);

    case "setLabel":
      return {
        ...state,
        label: action.payload,
        hasChanges: action.payload !== state.label || state.hasChanges,
      };

    case "setDescription":
      return {
        ...state,
        description: action.payload,
        hasChanges: action.payload !== state.description || state.hasChanges,
      };

    case "setChoosedFile":
      return {
        ...state,
        choosedFile: action.payload,
        hasChanges: action.payload !== state.choosedFile || state.hasChanges,
        removeFile: false,
      };

    case "setReportFormat":
      return {
        ...state,
        reportFormat: action.payload,
        hasChanges: action.payload !== state.reportFormat || state.hasChanges,
      };

    case "setEmail":
      return {
        ...state,
        email: action.payload,
        hasChanges: action.payload !== state.email || state.hasChanges,
      };

    case "removeChoosedFile":
      return {
        ...state,
        choosedFile: "",
        removeFile: true,
        hasChanges: state.choosedFile !== "" || state.hasChanges,
      };

    case "reset":
      return { ...initialState(action.payload), hasChanges: false };

    default:
      return state;
  }
}

export function useInspectorReducer(
  node: Node | undefined
): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, node, initialState);

  return [state, dispatch];
}
