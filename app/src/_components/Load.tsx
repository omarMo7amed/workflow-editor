import { ReactNode } from "react";
import { useTableOfContentsContext } from "../_hooks/useTableOfContents";

export default function Load({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Load") return;

  return <>{children}</>;
}
