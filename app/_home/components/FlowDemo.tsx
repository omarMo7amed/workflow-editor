import { useState, useEffect } from "react";
import { flowDemoSteps } from "@/app/src/_utils/constants";
import motion from "@/app/src/_components/Motion";
import Step from "./StepFlowDemo";

export default function FlowDemo() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowDemoSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #64748b 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, #475569 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="relative z-10">
        <motion.h3
          className="text-3xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Watch Your Workflow Come to Life
        </motion.h3>

        <div className="flex items-center justify-center space-x-8">
          {flowDemoSteps.map((step, index) => (
            <Step
              length={flowDemoSteps.length}
              step={step}
              index={index}
              key={step.label}
              activeStep={activeStep}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <motion.p
            className="text-slate-300 text-lg"
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {flowDemoSteps[activeStep].label}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
