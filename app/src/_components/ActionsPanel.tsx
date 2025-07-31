export default function ActionsPanel({
  onPause,
  onExecute,
  onDelete,
}: {
  onPause: () => void;
  onExecute: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Actions</h3>
      <div className="form-group mb-4">
        <button
          className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm mb-2"
          onClick={onPause}
        >
          Pause Node
        </button>
        <button
          className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm mb-2"
          onClick={onExecute}
        >
          Execute Node
        </button>
        <button
          className="w-full px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
          onClick={onDelete}
        >
          Delete Node
        </button>
      </div>
    </>
  );
}
