import { ReactNode } from "react";

import useActiveInspector from "../../context/ActiveTabsContext";

export default function Inspector({ children }: { children: ReactNode }) {
  const { right } = useActiveInspector();

  if (right !== "Inspector") return;

  return <div>{children}</div>;
}
