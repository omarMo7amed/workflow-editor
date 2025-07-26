import {
  docsNavigationItems as NavigationItems,
  TableOfContentsProps,
} from "@/app/src/_types/types";
import { docsNavigationItems } from "@/app/src/_utils/constants";
import Item from "./Item";
import { useEffect, useState } from "react";

export default function TableOfContents({
  activeSection,
}: TableOfContentsProps) {
  const [selected, setSelected] = useState<string>("");
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    console.log("table", element?.id);
    if (element?.id === activeSection) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    console.log(selected);
  });

  return (
    <aside className="hidden md:block fixed left-0 w-80 h-[calc(100vh-80px)] overflow-y-auto bg-white border-l border-gray-200 z-40">
      <div className="p-6">
        <h3 className="text-lg font-semibold h-full text-gray-900 mb-4">
          Contents
        </h3>
        <nav className="space-y-1">
          {docsNavigationItems.map((item: NavigationItems) => (
            <Item
              item={item}
              key={item.id}
              scrollToSection={scrollToSection}
              activeSection={activeSection}
              setSelected={setSelected}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
