import { motion, MotionProps } from "framer-motion";
import Link from "next/link";

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

export default function CTASection() {
  return (
    <motion.div className="text-center" variants={itemVariants}>
      <h4 className="text-4xl font-semibold mb-4 text-white">
        Ready to Get Started?
      </h4>
      <p className="text-slate-300 mb-6 leading-relaxed max-w-2xl mx-auto">
        Join thousands of businesses already automating their workflows with our
        platform.
      </p>
      <Link href="/auth/signin" passHref>
        <motion.button
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300  cursor-pointer"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get started with WorkflowPro"
        >
          GetStarted
        </motion.button>
      </Link>
    </motion.div>
  );
}
