import { SearchFieldProps } from "../_types/types";
import { Search, X } from "lucide-react";

export default function SearchField({ query, setQuery }: SearchFieldProps) {
  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="relative flex items-center">
      <Search
        className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 pointer-events-none z-10"
        size={18}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onBlur={clearSearch}
        placeholder="What is the next ?"
        className="
         pl-12 pr-12 py-2 h-10
        border-2 border-gray-200 rounded-xl
        bg-white/80 backdrop-blur-sm
        text-gray-700 placeholder-gray-400
        transition-all duration-500 ease-out
        w-full focus:border-gray-400 focus:ring-4 focus:ring-gray-100
        focus:shadow-lg focus:shadow-gray-200/30
        hover:border-gray-300 hover:shadow-md
        outline-none
      "
        name="searchNode"
        aria-label="search for node to add"
      />

      {query && (
        <button
          onClick={clearSearch}
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
