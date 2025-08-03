import { EditorSubHeaderPorps } from "../_types/types";
import motion from "./Motion";

export default function EditorSubHeader({
  activeTab,
  onActiveTab,
}: EditorSubHeaderPorps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="absolute top-0 left-1/2 -translate-x-1/2  flex justify-center z-50"
    >
      <div className="flex items-center  justify-center gap-2 p-1.5 bg-slate-300/30 backdrop-blur-md rounded-md shadow-xl">
        <button
          onClick={() => onActiveTab("Editor")}
          className={`text-xs font-medium  cursor-pointer px-3 py-1 rounded-md  ${
            activeTab === "Editor"
              ? "bg-slate-700 text-slate-100 font-semibold "
              : "hover:text-blue-600 text-slate-700 "
          }    duration-200 tracking-wide`}
        >
          Editor
        </button>

        <button
          onClick={() => onActiveTab("Executor")}
          className={`text-xs font-medium text-slate-100 cursor-pointer px-3 py-1 rounded-md ${
            activeTab === "Executor"
              ? "bg-slate-700 text-slate-100 font-semibold"
              : "hover:text-blue-600 text-slate-700 "
          }    duration-200 tracking-wide`}
        >
          Executor
        </button>
      </div>
    </motion.div>
  );
}
