import motion from "../Motion";
import { StepProps } from "../../_types/types";

export default function Step({ step, index, activeStep, length }: StepProps) {
  const Icon = step.icon;
  const isActive = index === activeStep;
  const isPassed = index < activeStep;

  return (
    <div key={index} className="flex items-center">
      <motion.div
        className={`relative w-20 h-20 rounded-full flex items-center justify-center ${
          isActive ? step.color : isPassed ? "bg-slate-600" : "bg-slate-700"
        } transition-all duration-500`}
        animate={{
          scale: isActive ? 1.2 : 1,
          boxShadow: isActive
            ? "0 0 30px rgba(100, 116, 139, 0.5)"
            : "0 0 0px rgba(0,0,0,0)",
        }}
      >
        <Icon className="w-10 h-10 text-white" />
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
      </motion.div>

      {index < length - 1 && (
        <motion.div className="w-16 h-1 mx-4 bg-slate-600 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-slate-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width:
                index < activeStep
                  ? "100%"
                  : index === activeStep
                  ? "50%"
                  : "0%",
            }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
    </div>
  );
}
