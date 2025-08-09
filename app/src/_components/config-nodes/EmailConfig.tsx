// components/node-config/EmailConfig.tsx
import React from "react";

import InputGroup from "../InputGroup";

import { Action, State } from "../../_types/types";
import { Dispatch } from "react";

interface ReadFileConfigProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export default function EmailConfig({ state, dispatch }: ReadFileConfigProps) {
  return (
    <InputGroup
      type="email"
      label="Recipient Email"
      id="email"
      placeholder="example@gmail.com"
      value={state.email}
      onChange={(e) => dispatch({ type: "setEmail", payload: e.target.value })}
    />
  );
}
