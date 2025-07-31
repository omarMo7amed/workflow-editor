import { X, HelpCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function QuickGuide() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked((click) => !click);
  };

  return (
    <div className="relative">
      {/* Quick Guide Button */}
      <button
        onClick={handleClick}
        className="flex items-center cursor-pointer gap-2 text-slate-900 duration-150 transition  rounded-full "
        aria-label="Quick Guide"
        title="Quick Guide"
      >
        <HelpCircle
          size={24}
          className=" bg-slate-900 text-white rounded-full"
        />
        Quick Guide
      </button>

      {/* Instruction Panel */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative text-sm mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow-md max-w-md"
          >
            <p className="font-medium text-yellow-800">
              To begin building your workflow:
            </p>

            <ol className="list-decimal list-inside mt-2 space-y-2 text-yellow-900">
              <li>
                First, drag and drop your PDF file into the upload area{" "}
                <strong className="font-semibold">(on right side).</strong>
              </li>
              <li>
                Then, add the first node —{" "}
                <strong className="font-semibold">Read PDF</strong> — to start
                the workflow.
              </li>
            </ol>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 cursor-pointer text-yellow-600 hover:text-yellow-800"
            >
              <X size={20} onClick={handleClick} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
