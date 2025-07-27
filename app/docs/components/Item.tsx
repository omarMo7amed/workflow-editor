import { docsNavigationItems as NavigationItems } from "@/app/src/_types/types";
import { ChevronRight } from "lucide-react";

export default function Item({
  item,
  scrollToSection,
  activeSection,
}: {
  item: NavigationItems;
  scrollToSection: (id: string) => void;
  activeSection: string;
}) {
  return (
    <button
      aria-label={item.title}
      key={item.id}
      onClick={() => {
        scrollToSection(item.id);
      }}
      className={`
          w-full text-left px-3 py-2 rounded-md text-sm transition-colors cursor-pointer
          ${item.level === 2 ? "ml-4" : ""}
          ${
            activeSection === item.id
              ? "bg-blue-50 text-slate-700 border-l-2 border-slate-600"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
    >
      <div className="flex items-center">
        {item.level === 2 && <ChevronRight size={14} className="mr-2" />}
        {item.title}
      </div>
    </button>
  );
}
