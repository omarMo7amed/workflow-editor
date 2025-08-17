import { useFlowStore } from "@/app/_store/flowStore";
import motion from "./Motion";

export default function EditorSubHeader() {
  const { setMode, mode } = useFlowStore();
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="absolute top-0 left-1/2 -translate-x-1/2  flex justify-center z-50"
    >
      <div className="flex items-center  justify-center gap-2 p-1.5 bg-slate-300/30 backdrop-blur-md rounded-md shadow-xl">
        <button
          onClick={() => setMode("Editor")}
          className={`text-xs font-medium  cursor-pointer px-3 py-1 rounded-md  ${
            mode === "Editor"
              ? "bg-slate-700 text-slate-100 font-semibold "
              : "hover:text-blue-600 text-slate-700 "
          }    duration-200 tracking-wide`}
        >
          Editor
        </button>

        <button
          onClick={() => setMode("Executions")}
          className={`text-xs font-medium text-slate-100 cursor-pointer px-3 py-1 rounded-md ${
            mode === "Executions"
              ? "bg-slate-700 text-slate-100 font-semibold"
              : "hover:text-blue-600 text-slate-700 "
          }    duration-200 tracking-wide`}
        >
          Executions
        </button>
      </div>
    </motion.div>
  );
}
