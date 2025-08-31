import {
  docsNavigationItems as NavigationItems,
  TableOfContentsProps,
} from "../../_types/types";
import { docsNavigationItems } from "../../_utils/constants";
import Item from "./Item";

export default function TableOfContents({
  activeSection,
}: TableOfContentsProps) {
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className={`hidden md:block basis-[300px] h-[calc(100vh-73px)] overflow-y-auto bg-white border-l border-gray-200 z-40`}
    >
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
              activeSection={activeSection!}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
