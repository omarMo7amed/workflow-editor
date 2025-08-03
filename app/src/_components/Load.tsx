import { ReactNode } from "react";
import { useTableOfContentsContext } from "../context/TableOfContents";

export default function Load({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Load") return;

  return <>{children}</>;
}
