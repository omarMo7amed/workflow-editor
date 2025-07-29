import { useState } from "react";
import SearchField from "./SearchField";

export default function NodeControls() {
  const [query, setQuery] = useState<string>("");

  const availableNodes = [
    "Input Node",
    "Output Node",
    "Filter Node",
    "Transform Node",
    "Condition Node",
  ];

  const filteredNodes = query
    ? availableNodes.filter((node) =>
        node.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleAddNode = (type: string) => {
    console.log("Add Node:", type);
    // Insert logic to place the node on the canvas
  };

  return (
    <div className="space-y-6">
      {/* Search Field */}
      <div className="relative">
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
                        key={node}
                        className="w-full py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 flex items-center space-x-3"
                        onClick={() => {
                          handleAddNode(node);
                          setQuery("");
                        }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-gray-700">{node}</span>
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

      {/* Default Node Section */}
    </div>
  );
}
