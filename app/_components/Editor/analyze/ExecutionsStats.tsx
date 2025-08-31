import { useFlowStore } from "@/app/_store/flowStore";
import { Calendar } from "lucide-react";
import SmallSpinner from "../../SmallSpinner";

export default function Executionstats() {
  const stats = useFlowStore((s) => s.stats);
  const isExecuting = useFlowStore((s) => s.isExecuting);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center justify-between gap-2 mb-5 p-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">Execution Stats</span>
        </div>
        {isExecuting && <SmallSpinner />}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {isExecuting ? 0 : stats.total}
          </div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {stats.success}
          </div>
          <div className="text-sm text-gray-500">Success</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{stats.error}</div>
          <div className="text-sm text-gray-500">Errors</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">
            {isExecuting ? 0 : stats.duration}s
          </div>
          <div className="text-sm text-gray-500">Duration</div>
        </div>
      </div>
    </div>
  );
}
