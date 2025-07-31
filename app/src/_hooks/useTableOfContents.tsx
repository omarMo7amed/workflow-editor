"use client";

import { createContext, useContext, useState } from "react";
import { ChildrenType, TableOfContentsProps } from "../_types/types";

const TableOfContentsContext = createContext<
  | {
      active: string | undefined;
      setActive: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | undefined
>(undefined);

export default function TableOfContents({
  side,
  children,
  activeTab,
}: TableOfContentsProps) {
  const [active, setActive] = useState<string | undefined>(activeTab);

  return (
    <TableOfContentsContext.Provider value={{ active, setActive }}>
      <aside
        className={`hidden md:block relative ${
          side !== "right" ? "left-0 border-r" : "border-l right-0"
        } w-74 h-[calc(100vh-73px)] overflow-y-auto bg-white border-l border-gray-200 z-40 shadow-md space-y-1`}
      >
        {children}
      </aside>
    </TableOfContentsContext.Provider>
  );
}

function Head({ children }: ChildrenType) {
  return (
    <div className="px-2 py-2 bg-white border-b-2 border-gray-200 shadow-sm rounded-t-lg space-x-4">
      <div className="flex justify-center items-center">
        <div className="border-2 border-gray-200 rounded-md shadow-sm overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function NavItem({ children }: ChildrenType) {
  const { active, setActive } = useTableOfContentsContext();
  const buttonText =
    typeof children === "string" ? children : children?.toString() || "";

  return (
    <button
      className={`cursor-pointer text-sm px-5 py-1.5 transition-colors duration-200
      ${
        active === buttonText
          ? "bg-slate-800 text-white font-semibold shadow-md"
          : "bg-slate-100 text-slate-700 font-medium hover:bg-slate-200"
      }`}
      onClick={() => setActive(buttonText)}
    >
      {buttonText}
    </button>
  );
}

function Body({ children }: ChildrenType) {
  return (
    <nav className="space-y-1 p-2 flex flex-col gap-3 justify-between">
      {children}
    </nav>
  );
}

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
