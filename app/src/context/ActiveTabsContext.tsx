import { createContext, ReactNode, useContext, useState } from "react";
import { ActiveTabsContextType } from "../_types/types";

const ActiveTabsContext = createContext<ActiveTabsContextType | undefined>(
  undefined
);

export function ActiveTabsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [left, setLeft] = useState("Load");
  const [right, setRight] = useState("Nodes");
  const [currentNodeId, setCurrentNodeId] = useState<string | undefined>(
    undefined
  );

  return (
    <ActiveTabsContext.Provider
      value={{
        left,
        right,
        setLeft,
        setRight,
        currentNodeId,
        setCurrentNodeId,
      }}
    >
      {children}
    </ActiveTabsContext.Provider>
  );
}

export default function useActiveTabs() {
  const context = useContext(ActiveTabsContext);
  if (context === undefined) {
    throw new Error(
      "ActiveTabsContext must be used within a ActiveTabsContextProvider"
    );
  }
  return context;
}
