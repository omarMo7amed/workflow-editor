"use client";

import { useFlowStore } from "@/app/_store/flowStore";
import { motion } from "framer-motion";

export default function ProgressBar() {
  const executionProgress = useFlowStore((s) => s.executionProgress);
  const nodesLength = useFlowStore((s) => s.nodesLength);
  const executions = useFlowStore((s) => s.executions);

  const completedCount = executions.filter(
    (e) => e.status === "success"
  ).length;

  return (
    <motion.div
      className="w-full mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center gap-4 p-3 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl backdrop-blur-sm ">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 48 48">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgb(148, 163, 184)"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
              animate={{
                strokeDashoffset:
                  2 * Math.PI * 20 * (1 - executionProgress / 100),
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(51, 65, 85)" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage in center */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <span className="text-3xl font-bold text-slate-700">
              {Math.round(executionProgress)}%
            </span>
          </motion.div>
        </div>

        {/* Steps info */}
        <motion.div
          className="text-sm flex flex-col items-center"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="font-medium text-slate-700 mb-1">Steps Completed</div>
          <div className="flex items-center gap-2 text-center">
            <motion.span
              className="text-lg font-bold text-green-600"
              key={completedCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {completedCount}
            </motion.span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-medium">{nodesLength}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
