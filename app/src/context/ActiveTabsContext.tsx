import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ActiveTabsContextType = {
  left: string;
  right: string;
  currentNodeId: string | undefined;
  setCurrentNodeId: Dispatch<SetStateAction<string | undefined>>;
  setLeft: Dispatch<SetStateAction<string>>;
  setRight: Dispatch<SetStateAction<string>>;
};

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
