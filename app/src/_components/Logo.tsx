import motion from "@/app/src/_components/Motion";
import { Workflow } from "lucide-react";
import { redirect } from "next/navigation";

export default function Logo() {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      onClick={() => redirect("/")}
    >
      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
        <Workflow className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-bold text-slate-900">WorkflowEditor</span>
    </motion.div>
  );
}
