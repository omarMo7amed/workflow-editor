import { useState } from "react";
import SearchField from "./SearchField";
import { useFlowStore } from "@/app/_store/flowStore";
import { useOutsideClick } from "../_hooks/useOutSideClick";
import { availableNodes } from "../_utils/constants";

export default function NodeControls() {
  const { addNode } = useFlowStore();
  const [query, setQuery] = useState<string>("");
  const containerRef = useOutsideClick<HTMLDivElement>(() => setQuery(""));

  const filteredNodes = query
    ? availableNodes.filter((node) =>
        node.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative" ref={containerRef}>
      <SearchField query={query} setQuery={setQuery} />

      {query && (
        <div className="absolute top-full left-0 right-0 mt-2 z-20">
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {filteredNodes.length > 0 ? (
              <>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs text-gray-600">
                    {filteredNodes.length} result
                    {filteredNodes.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredNodes.map((node) => (
                    <button
                      key={node.type}
                      className="cursor-pointer w-full py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 flex items-center space-x-3 px-4"
                      onClick={() => {
                        addNode(node.type);
                        setQuery("");
                      }}
                    >
                      <node.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{node.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-gray-500">
                  No nodes found matching &quot;{query}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
