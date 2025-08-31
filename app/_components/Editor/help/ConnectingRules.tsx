import { connectionRules } from "../../../_utils/constants";

export default function ConnectingRules() {
  return (
    <section className="bg-white">
      <div className="pb-4 ">
        <h2 className="text-xl font-semibold text-slate-800 tracking-tight my-4">
          Connection Rules
        </h2>
      </div>

      <div className="space-y-4">
        {Object.entries(connectionRules).map(([source, targets]) => (
          <div
            key={source}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100"
          >
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-200 text-slate-800 border border-slate-200">
                {source}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>

            <div className="flex flex-col  gap-2">
              {targets.map((target) => (
                <span
                  key={target}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200"
                >
                  {target}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.keys(connectionRules).length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <p className="text-sm">No connection rules configured</p>
        </div>
      )}
    </section>
  );
}
