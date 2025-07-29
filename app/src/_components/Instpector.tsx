import { ReactNode } from "react";
import { useTableOfContentsContext } from "../_hooks/useTableOfContents";

export default function Inspector({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Inspector") return;
  return <div>{children}</div>;
}
