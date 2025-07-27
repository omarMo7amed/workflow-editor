import { TableOfContentsProps } from "../_types/types";
import { HEIGHTOFHEADER } from "../_utils/constants";

export default function TableOfContents({ side }: TableOfContentsProps) {
  return (
    <aside
      className={`hidden md:block relative ${
        side !== "right" ? "left-0 border-r" : "border-l right-0"
      } w-80 h-[calc(100vh-${HEIGHTOFHEADER}px)] overflow-y-auto bg-white border-l border-gray-200 z-40 shadow-md`}
    >
      <div className="p-6">
        <h3 className="text-lg font-semibold h-full text-gray-900 mb-4">
          Contents
        </h3>
        <nav className="space-y-1"></nav>
      </div>
    </aside>
  );
}
