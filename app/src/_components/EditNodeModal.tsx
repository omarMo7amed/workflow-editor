import { useState } from "react";
import { Node } from "reactflow";

export const EditNodeModal = ({
  node,
  onSave,
  onClose,
}: {
  node: Node | null;
  onSave: (nodeId: string, label: string, type: string) => void;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState(node?.data.label || "");
  const [nodeType, setNodeType] = useState(node?.data.type || "readFile");

  if (!node) return null;

  const handleSave = () => {
    onSave(node.id, label, nodeType);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-4">Edit Node</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Node Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter node label"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Node Type
          </label>
          <select
            value={nodeType}
            onChange={(e) => setNodeType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="readFile">Read File</option>
            <option value="summarize">Summarize</option>
            <option value="email">Send Email</option>
            <option value="report">Generate Report</option>
            <option value="start">Start</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
