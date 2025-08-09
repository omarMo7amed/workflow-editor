// components/node-config/ReportConfig.tsx
import React, { Dispatch } from "react";

import SelectionInput from "../SelectionInput";
import { Action, State } from "../../_types/types";

interface ReportConfigProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export default function ReportConfig({ state, dispatch }: ReportConfigProps) {
  return (
    <SelectionInput
      id="report-format"
      label="Report Format"
      options={[
        { value: "PDF", label: "PDF" },
        { value: "CSV", label: "CSV" },
        { value: "DOCX", label: "DOCX" },
      ]}
      value={state.reportFormat}
      onSelectChange={(value: string) =>
        dispatch({ type: "setReportFormat", payload: value })
      }
    />
  );
}
