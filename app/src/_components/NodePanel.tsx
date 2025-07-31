import { Copy, Pen, Settings, Trash } from "lucide-react";
import { MouseEventHandler } from "react";

interface NodePanelProps {
  onSetting?: MouseEventHandler<HTMLButtonElement>;
  onDuplicate?: MouseEventHandler<HTMLButtonElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
}

export default function NodePanel({
  onSetting,
  onDuplicate,
  onEdit,
  onDelete,
}: NodePanelProps) {
  return (
    <div className="bg-slate-300/50 backdrop-blur-md absolute left-0 p-2 rounded-xl -top-10 w-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
      <div className="flex justify-between items-center">
        <button
          className="text-gray-600 cursor-pointer hover:text-amber-700 transition-colors duration-200"
          onClick={onSetting}
        >
          <Settings size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-amber-700 transition-colors duration-200"
          onClick={onDuplicate}
        >
          <Copy size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-amber-700 transition-colors duration-200"
          onClick={onEdit}
        >
          <Pen size={16} />
        </button>

        <button
          className="text-gray-600 cursor-pointer hover:text-amber-700 transition-colors duration-200"
          onClick={onDelete}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
