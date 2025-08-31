import { SearchFieldProps } from "../_types/types";
import { Search, X } from "lucide-react";

export default function SearchField({
  query,
  setQuery,
  placeholder,
  className = "",
}: SearchFieldProps) {
  return (
    <div className="relative flex items-center">
      <Search
        className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2    pointer-events-none z-10"
        size={18}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search for node to add..."}
        className={`h-10 px-12 py-2 border-2 border-gray-200 rounded-xl backdrop-blur-sm text-gray-700 placeholder-gray-400 transition duration-150 ease-out hover:border-gray-300 hover:shadow-md focus:border-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 focus:shadow-lg focus:shadow-gray-200/30 
          ${className ? ` ${className}` : "w-full"}
          `}
        id="search-node"
        name="searchNode"
        aria-label="search for node to add"
      />

      {query && (
        <button
          onClick={() => setQuery("")}
          className="
          absolute right-4 top-1/2 transform -translate-y-1/2
          text-gray-400 hover:text-gray-600
          transition-colors duration-200
          p-1 rounded-full hover:bg-gray-100
          z-10
        "
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
