import { ReactNode } from "react";
import { useTableOfContentsContext } from "../context/TableOfContents";

export default function Help({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Help") return;
  return <div>{children}</div>;
}
