"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-200/20 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="relative">
        {/* Background Rotating Rings */}
        <motion.div
          className="absolute inset-0 w-32 h-32 -translate-x-6 -translate-y-6"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-slate-300/20 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-28 h-28 -translate-x-4 -translate-y-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-slate-400/15 rounded-full" />
        </motion.div>

        <motion.div
          className="absolute inset-0 w-24 h-24 -translate-x-2 -translate-y-2"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-slate-500/10 rounded-full" />
        </motion.div>

        {/* Main Logo Container */}
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute top-1/2 left-1/2 w-5 h-5 rounded-lg shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)",
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 5px rgba(203, 213, 225, 0.5), 0 0 10px rgba(203, 213, 225, 0.3)",
                "0 0 15px rgba(203, 213, 225, 0.8), 0 0 25px rgba(203, 213, 225, 0.6)",
                "0 0 5px rgba(203, 213, 225, 0.5), 0 0 10px rgba(203, 213, 225, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Top Right Node */}
          <motion.div
            className="absolute top-2 right-2 w-3.5 h-3.5 rounded-lg shadow-lg"
            style={{
              background: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.7],
              scale: [0, 1.3, 1, 1],
              rotate: [0, 90, 270, 360],
              y: [0, -2, 0, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.2,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Bottom Left Node */}
          <motion.div
            className="absolute bottom-2 left-2 w-3.5 h-3.5 rounded-lg shadow-lg"
            style={{
              background: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.7],
              scale: [0, 1.3, 1, 1],
              rotate: [0, 90, 270, 360],
              y: [0, -2, 0, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.4,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Bottom Right Node */}
          <motion.div
            className="absolute bottom-2 right-4 w-3 h-3 rounded-lg shadow-lg"
            style={{
              background: "linear-gradient(135deg, #64748b 0%, #475569 100%)",
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.7],
              scale: [0, 1.3, 1, 1],
              rotate: [0, 90, 270, 360],
              y: [0, -2, 0, -1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.6,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Connection Lines */}
          <motion.div
            className="absolute top-5 left-7 w-6 h-0.5 origin-left"
            style={{
              background: "linear-gradient(90deg, #cbd5e1, transparent)",
              transform: "rotate(-25deg)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 1, 0.8],
              opacity: [0, 1, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.8,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-8 left-5 w-5 h-0.5 origin-left"
            style={{
              background: "linear-gradient(90deg, #cbd5e1, transparent)",
              transform: "rotate(135deg)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 1, 0.8],
              opacity: [0, 1, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute top-7 left-7 w-7 h-0.5 origin-left"
            style={{
              background: "linear-gradient(90deg, #cbd5e1, transparent)",
              transform: "rotate(45deg)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 1, 0.8],
              opacity: [0, 1, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.2,
              ease: "easeInOut",
            }}
          />

          {/* Enhanced Data Flow Particles */}
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full shadow-sm"
            style={{
              background: "radial-gradient(circle, #f1f5f9 0%, #e2e8f0 100%)",
            }}
            initial={{ x: 38, y: 38, opacity: 0, scale: 0 }}
            animate={{
              x: [38, 48, 38],
              y: [38, 20, 38],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full shadow-sm"
            style={{
              background: "radial-gradient(circle, #f1f5f9 0%, #e2e8f0 100%)",
            }}
            initial={{ x: 38, y: 38, opacity: 0, scale: 0 }}
            animate={{
              x: [38, 20, 38],
              y: [38, 56, 38],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1.7,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full shadow-sm"
            style={{
              background: "radial-gradient(circle, #f1f5f9 0%, #e2e8f0 100%)",
            }}
            initial={{ x: 38, y: 38, opacity: 0, scale: 0 }}
            animate={{
              x: [38, 58, 38],
              y: [38, 50, 38],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: 1.9,
              ease: "easeInOut",
            }}
          />

          {/* Micro Particles */}
          <motion.div
            className="absolute w-0.5 h-0.5 bg-slate-200 rounded-full"
            animate={{
              x: [20, 30, 45, 60],
              y: [20, 15, 10, 5],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: 2.2,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute w-0.5 h-0.5 bg-slate-200 rounded-full"
            animate={{
              x: [40, 30, 20, 10],
              y: [40, 50, 60, 70],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 2.4,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute w-0.5 h-0.5 bg-slate-200 rounded-full"
            animate={{
              x: [40, 50, 65, 75],
              y: [40, 45, 50, 55],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: 2.6,
              ease: "linear",
            }}
          />
        </div>

        {/* Enhanced Outer Effects */}
        <motion.div
          className="absolute inset-0 w-20 h-20 border rounded-xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.7, 0.3],
            borderColor: [
              "rgba(148, 163, 184, 0.2)",
              "rgba(148, 163, 184, 0.5)",
              "rgba(148, 163, 184, 0.2)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -inset-2 w-24 h-24 border border-slate-300/10 rounded-2xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional Ambient Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-slate-300/50 rounded-full"
            style={{
              left: `${20 + Math.random() * 40}px`,
              top: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x: [0, (Math.random() - 0.5) * 20],
              y: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
