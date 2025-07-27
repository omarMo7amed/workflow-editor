import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditorHeader() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <button
          className="cursor-pointer bg-slate-200 rounded-full hover:bg-slate-300 focus:ring-2 focus:ring-slate-400 transition-colors duration-200 p-1"
          onClick={() => router.back()}
          aria-label="go back"
        >
          <ChevronLeft size={24} className="text-slate-900 " />
        </button>

        <div>
          <p className="text-md text-slate-900">Your Automation Pipeline</p>
          <p className="text-xs text-slate-600"> Workflow Automation </p>
        </div>
      </div>

      <div className="flex-1 mx-auto flex justify-center items-center">
        <p className="bg-slate-200/50 text-slate-700 px-4 text-sm py-1 rounded-xl ">
          Diagram view
        </p>
      </div>

      <div className="flex gap-3">
        <button className="bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-2 focus:ring-slate-400 transition-colors duration-200 px-4 py-1.5 rounded-xl text-sm font-medium cursor-pointer">
          Discard
        </button>

        <button className="bg-slate-900 text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 transition-colors duration-200 px-4 py-1.5 rounded-xl text-sm font-semibold cursor-pointer">
          Execute Workflow
        </button>
      </div>
    </div>
  );
}
