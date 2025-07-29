import { ReactNode } from "react";
import { useTableOfContentsContext } from "../_hooks/useTableOfContents";

export default function Help({ children }: { children: ReactNode }) {
  const { active } = useTableOfContentsContext();

  if (active !== "Help") return;
  return <div>{children}</div>;
}
