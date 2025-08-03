import { ReactNode } from "react";
import { useTableOfContentsContext } from "../context/TableOfContents";

export default function Inspector({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Inspector") return;
  return <div>{children}</div>;
}
