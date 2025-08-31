"use client"

import { motion, type Variants, type Easing } from "framer-motion"
import { Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function NavigationButtons() {
  const router = useRouter()

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
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
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
        >
          <Home size={20} />
          Go Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={router.back}
          className="flex items-center gap-2 cursor-pointer bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
        >
          <ArrowLeft size={20} />
          Go Back
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
