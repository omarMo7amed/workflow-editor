"use client";
import motion from "@/app/src/_components/Motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import FloatingNodes from "./components/FloatingNodes";
import BackgroundGrid from "./components/BackgroundGrid";
import InteractiveConnections from "./components/InteractiveConnections";
import { HEIGHTOFHEADER } from "../src/_utils/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  return (
    <div
      className={`min-h-[calc(100vh-${HEIGHTOFHEADER}px)] bg-gradient-to-br  from-slate-50 via-slate-100 to-slate-200 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <BackgroundGrid />
      <FloatingNodes />
      <InteractiveConnections />

      {/* Content */}
      <motion.section
        className={`min-h-[calc(100vh-${HEIGHTOFHEADER}px)] flex flex-col justify-center items-center px-6 relative  z-10`}
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-slate-800/10 to-slate-700/5"
          variants={fadeInUp}
        />

        <motion.div
          className="text-center max-w-4xl mx-auto relative z-10"
          variants={fadeInUp}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-slate-900 mb-6 tracking-tight"
            variants={fadeInUp}
          >
            Workflow
            <span className="block text-slate-600">Editor</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed font-light"
            variants={fadeInUp}
          >
            Visual automation platform powered by intelligent node-based
            workflows
          </motion.p>

          <motion.button
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Architecture
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={fadeInUp}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-slate-400" />
        </motion.div>
      </motion.section>
    </div>
  );
}
