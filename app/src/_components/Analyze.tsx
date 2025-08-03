import { ReactNode } from "react";
import { useTableOfContentsContext } from "../context/TableOfContents";

export default function Analyze({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Analyze") return;

  return <div>{children}</div>;
}
