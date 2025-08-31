import SearchField from "../SearchField";
import { Plus } from "lucide-react";
import Button from "../Button";

interface SearchControlsProps {
  query: string;
  setQuery: (value: string) => void;
  selectedCount: number;
  onBulkDelete: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SearchControls({
  query,
  setQuery,
  selectedCount,
  onBulkDelete,
  setIsOpen,
}: SearchControlsProps) {
  return (
    <div className="bg-white  rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <SearchField
            query={query}
            setQuery={setQuery}
            placeholder="Search workflows..."
            className="w-72 transition-all duration-300 focus:w-96"
          />

          {selectedCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedCount} selected
              </span>
              <button
                onClick={onBulkDelete}
                className="px-3 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors text-sm"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>

        <Button
          degree="main"
          onClick={() => setIsOpen(true)}
          extraStyle="flex items-center space-x-2 cursor-pointer rounded-md"
        >
          <Plus className="w-4 h-4" />
          <span>Create Workflow</span>
        </Button>
      </div>
    </div>
  );
}
