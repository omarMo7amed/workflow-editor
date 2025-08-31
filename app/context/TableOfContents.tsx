"use client";

import { createContext, Dispatch, memo, useContext, useEffect } from "react";
import { ChildrenType, TableOfContentsProps } from "../_types/types";
import useActiveTabs from "./ActiveTabsContext";
import { useFlowStore } from "@/app/_store/flowStore";
import { motion } from "framer-motion";

const TableOfContentsContext = createContext<
  | {
      active: string;
      setActive: Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

function TableOfContentsBase({ side, children }: TableOfContentsProps) {
  const { left, right, setLeft, setRight } = useActiveTabs();
  const mode = useFlowStore((s) => s.mode);

  const active = side === "left" ? left : right;
  const setActive = side === "left" ? setLeft : setRight;
  const isExecuting = mode === "Executions";

  return (
    <TableOfContentsContext.Provider value={{ active, setActive }}>
      <motion.aside
        initial={false}
        animate={
          side === "right"
            ? isExecuting
              ? { width: 0, opacity: 0 }
              : { width: 300, opacity: 1 }
            : isExecuting
            ? { width: 450, opacity: 1 }
            : { width: 300, opacity: 1 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`hidden md:block relative ${
          side !== "right" ? "border-r" : "border-l"
        } h-[calc(100vh-73px)] overflow-y-auto bg-white border-gray-200 z-40 shadow-md space-y-1`}
      >
        {children}
      </motion.aside>
    </TableOfContentsContext.Provider>
  );
}

const Head = memo(function Head({ children }: ChildrenType) {
  return (
    <div className="px-2 py-2 bg-white border-b-2 border-gray-200 shadow-sm rounded-t-lg space-x-4">
      <div className="flex justify-center items-center">
        <div className="border-2 border-gray-200 rounded-md shadow-sm overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
});

const Body = memo(function Body({ children }: ChildrenType) {
  return (
    <nav className="space-y-1 p-2 flex flex-col gap-3 justify-between">
      {children}
    </nav>
  );
});

const NavItem = memo(function NavItem({ children }: ChildrenType) {
  const { active, setActive } = useTableOfContentsContext();
  const mode = useFlowStore((s) => s.mode);

  useEffect(() => {
    if (mode === "Executions" && active === "Load") {
      setActive("Analyze");
    }

    if (mode === "Editor" && active === "Analyze") {
      setActive("Load");
    }
  }, [mode, active, setActive]);

  if (typeof children !== "string") return null;
  const buttonText = children;

  const isActive = active === buttonText;
  const isDisabled =
    (mode === "Executions" && buttonText === "Load") ||
    (mode === "Editor" && buttonText === "Analyze");

  return (
    <button
      disabled={isDisabled}
      className={`cursor-pointer text-sm px-5 py-1.5 transition-colors duration-200
      ${
        isDisabled
          ? " cursor-not-allowed bg-slate-200 text-slate-400 font-medium "
          : isActive
          ? "bg-slate-800 text-white font-semibold shadow-md"
          : "bg-slate-100 text-slate-700 font-medium hover:bg-slate-200"
      }`}
      onClick={() => setActive(buttonText)}
    >
      {buttonText}
    </button>
  );
});

type TableOfContentsType = typeof TableOfContentsBase & {
  Head: typeof Head;
  Body: typeof Body;
  NavItem: typeof NavItem;
};

const TableOfContents = memo(
  TableOfContentsBase
) as unknown as TableOfContentsType;

TableOfContents.Head = Head;
TableOfContents.Body = Body;
TableOfContents.NavItem = NavItem;

export function useTableOfContentsContext() {
  const context = useContext(TableOfContentsContext);
  if (context === undefined) {
    throw new Error(
      "useTableOfContentsContext must be used within a TableOfContentsProvider"
    );
  }
  return context;
}

export default TableOfContents;
