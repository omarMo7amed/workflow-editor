"use client"

import { motion, type Variants, type Easing } from "framer-motion"

export function AnimatedRobot() {
  const robotVariants: Variants = {
    initial: { scale: 0.8, opacity: 0, y: 20 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as Easing },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeInOut" as Easing },
    },
  }

  const eyeVariants: Variants = {
    blink: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 },
    },
  }

  const antennaVariants: Variants = {
    wave: {
      rotate: [-10, 10, -10],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as Easing,
      },
    },
  }

  return (
    <motion.div
      variants={robotVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="mb-8 flex justify-center"
    >
      <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-2xl">
        {/* Body */}
        <motion.rect x="60" y="80" width="80" height="100" rx="10" fill="#334155" stroke="#3b82f6" strokeWidth="2" />

        {/* Head */}
        <motion.rect x="70" y="40" width="60" height="50" rx="8" fill="#475569" stroke="#3b82f6" strokeWidth="2" />

        {/* Antenna */}
        <motion.line
          variants={antennaVariants}
          animate="wave"
          x1="100"
          y1="40"
          x2="100"
          y2="20"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <motion.circle
          variants={antennaVariants}
          animate="wave"
          cx="100"
          cy="20"
          r="4"
          fill="#2563eb"
          className="drop-shadow-lg"
        />

        {/* Eyes */}
        <motion.circle variants={eyeVariants} animate="blink" cx="85" cy="60" r="6" fill="#3b82f6" />
        <motion.circle variants={eyeVariants} animate="blink" cx="115" cy="60" r="6" fill="#3b82f6" />

        {/* Mouth */}
        <motion.rect
          x="90"
          y="70"
          width="20"
          height="8"
          rx="4"
          fill="#1f2937"
          initial={{ scaleX: 1 }}
          animate={{
            scaleX: [1, 0.8, 1],
            transition: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />

        {/* Arms */}
        <motion.rect
          x="40"
          y="90"
          width="15"
          height="40"
          rx="7"
          fill="#6b7280"
          stroke="#3b82f6"
          strokeWidth="2"
          animate={{
            rotate: [-5, 5, -5],
            transition: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />
        <motion.rect
          x="145"
          y="90"
          width="15"
          height="40"
          rx="7"
          fill="#6b7280"
          stroke="#3b82f6"
          strokeWidth="2"
          animate={{
            rotate: [5, -5, 5],
            transition: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        />

        {/* Legs */}
        <rect x="75" y="180" width="15" height="15" rx="7" fill="#6b7280" />
        <rect x="110" y="180" width="15" height="15" rx="7" fill="#6b7280" />
      </svg>
    </motion.div>
  )
}
