"use client"

import { motion, type Variants, type Easing } from "framer-motion"

export function ErrorDisplay() {
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as Easing },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="initial" animate="animate">
      {/* Error Code */}
      <motion.div variants={itemVariants} className="mb-6">
        <motion.h1
          className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600"
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
            transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          404
        </motion.h1>
      </motion.div>

      {/* Message */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-3xl font-bold text-slate-700 mb-4">Beep Boop! Page Not Found</h2>
        <p className="text-slate-500 text-lg leading-relaxed">
          The page you're looking for seems to have wandered off into the digital void.
        </p>
      </motion.div>
    </motion.div>
  )
}
