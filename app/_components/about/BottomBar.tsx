import { motion, MotionProps } from "framer-motion";

interface BottomBarProps {
  isInView: boolean;
}

const itemVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function BottomBar({ isInView }: BottomBarProps) {
  return (
    <motion.div
      className="border-t border-slate-700 bg-slate-950/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="text-center">
          <motion.div
            className="text-slate-400 text-sm"
            variants={itemVariants}
          >
            © 2025 WorkflowEditor. All rights reserved. Empowering businesses
            through intelligent automation.
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
