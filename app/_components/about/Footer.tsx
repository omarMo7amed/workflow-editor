"use client";
import { motion, MotionProps } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import ScrollToTopButton from "./ScrollToButton";
import BottomBar from "./BottomBar";
import CTASection from "./CTASection";

const containerVariants: MotionProps["variants"] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      className="bg-slate-900 text-white relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10">
        <motion.div
          className="container mx-auto px-6 py-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <CTASection />
        </motion.div>

        <BottomBar isInView={isInView} />

        <ScrollToTopButton />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/5 to-transparent blur-3xl pointer-events-none" />
      </div>
    </footer>
  );
}
