"use client";
import { Dispatch, useReducer } from "react";
import { Node } from "reactflow";
import { Action, State } from "../_types/types";

const initialState = (node: Node | undefined): State => ({
  fileName: node?.data.fileName || "",
  filePath: node?.data.filePath || "",
  label: node?.data.label || "",
  reportFormat: node?.data.reportFormat || "",
  email: node?.data.to || "",
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

    case "setFile":
      return {
        ...state,
        fileName: action.payload.fileName,
        filePath: action.payload.filePath,
        hasChanges:
          action.payload.fileName !== state.fileName || state.hasChanges,
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

    case "removeFile":
      return {
        ...state,
        fileName: "",
        filePath: "",
        removeFile: true,
        hasChanges: state.fileName !== "" || state.hasChanges,
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
