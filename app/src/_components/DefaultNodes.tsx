import { Plus } from "lucide-react";

export default function DefaultNodes() {
  const handleAddNode = (node: string) => {
    console.log(node);
  };

  const defaultNodes = ["Read PDF", "Summarize", "Send Email", "Report"];
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700 uppercase  px-2">
        Default Nodes
      </h4>
      <ul className="space-y-2">
        {defaultNodes.map((node) => (
          <li
            key={node}
            className="px-3 py-2 bg-white rounded-lg border border-gray-200 flex justify-between items-center text-sm text-gray-800 hover:shadow-sm transition"
          >
            <span>{node}</span>

            <button
              onClick={() => handleAddNode(node)}
              className="p-1 text-slate-600 hover:text-slate-800 cursor-pointer"
              title={`Add ${node}`}
            >
              <Plus size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
