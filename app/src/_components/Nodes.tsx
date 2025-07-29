import { ReactNode } from "react";
import { useTableOfContentsContext } from "../_hooks/useTableOfContents";

export default function Nodes({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Nodes") return;

  return <div className="flex flex-col gap-10">{children}</div>;
}
