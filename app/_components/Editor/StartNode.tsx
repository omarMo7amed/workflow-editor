import { LogOutIcon } from "lucide-react";
import { Handle, Position } from "reactflow";
import { focusSearchInput } from "../../_utils/helper";
import useActiveTabs from "../../context/ActiveTabsContext";

export default function StartNode({
  data,
  selected,
}: {
  data: { label: string };
  selected: boolean;
}) {
  const { setRight } = useActiveTabs();

  return (
    <div className="group relative">
      <div
        tabIndex={0}
        title="Go and Add Your First Action"
        className={`rounded-bl-4xl rounded-br-xl rounded-tl-4xl rounded-tr-xl border-2 border-dashed ${
          selected ? "border-blue-600 " : "border-blue-400 "
        } bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200
         transition-all duration-300 cursor-pointer`}
        onClick={() => {
          setRight("Nodes");
          setTimeout(focusSearchInput, 0);
        }}
      >
        <div className="flex items-center justify-center w-20 h-20">
          <LogOutIcon
            size={40}
            className="font-extrabold text-blue-600 group-hover:scale-110 transition-transform duration-200"
          />
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-md  text-gray-600 font-semibold whitespace-nowrap">
        {data.label}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          width: "15px",
          height: "15px",
          backgroundColor: "oklch(62.3% 0.214 259.815)",
        }}
      />
    </div>
  );
}
