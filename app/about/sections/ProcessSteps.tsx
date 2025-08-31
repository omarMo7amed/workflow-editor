"use client";
import { motion, useInView, MotionProps } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Define interfaces for type safety
interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  features: string[];
}

interface StepContentProps {
  step: Step;
  index: number;
}

interface StepFeatureProps {
  feature: string;
}

interface SectionHeaderProps {
  isInView: boolean;
}

// Animation variants
const containerVariants: MotionProps["variants"] = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const stepVariants: MotionProps["variants"] = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1,
    },
  },
};

const textVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, scale: 0.8, rotateY: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const numberVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

const featureVariants: MotionProps["variants"] = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Step data
const steps: Step[] = [
  {
    number: "01",
    title: "Design Your Workflow",
    description:
      "Use our intuitive visual editor to create workflows that match your business processes. Drag, drop, and connect - it's that simple.",
    image: "/images/process-step-1.webp",
    reverse: false,
    features: ["Visual Editor", "Drag & Drop", "Custom Logic"],
  },
  {
    number: "02",
    title: "Execute & Monitor",
    description:
      "Launch your workflows with a single click and watch them run automatically. Monitor progress in real-time and get instant notifications.",
    image: "/images/process-step-2.webp",
    reverse: true,
    features: [
      "Real-time Monitoring",
      "Instant Notifications",
      "Auto-execution",
    ],
  },
  {
    number: "03",
    title: "Analyze & Optimize",
    description:
      "Receive AI-powered insights and comprehensive reports. Understand what's working and continuously improve your processes.",
    image: "/images/process-step-3.webp",
    reverse: false,
    features: ["AI Insights", "Performance Reports", "Continuous Optimization"],
  },
];

// StepFeature component
function StepFeature({ feature }: StepFeatureProps) {
  return (
    <motion.div
      variants={featureVariants}
      className="flex items-center space-x-3"
    >
      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
        <svg
          className="w-3 h-3 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-slate-700 font-medium">{feature}</span>
    </motion.div>
  );
}

// StepContent component
function StepContent({ step, index }: StepContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      variants={stepVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`grid lg:grid-cols-2 gap-12 items-center ${
        step.reverse ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      {/* Text Content */}
      <motion.div
        className={step.reverse ? "lg:col-start-2" : ""}
        variants={textVariants}
      >
        <div className="relative">
          {/* Large Number Background */}
          <motion.div
            variants={numberVariants}
            className="text-8xl lg:text-9xl font-bold text-slate-200/50 absolute -top-8 -left-4 z-0 select-none"
          >
            {step.number}
          </motion.div>

          <div className="relative z-10">
            {/* Step Badge */}
            <motion.div
              variants={featureVariants}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                Step {step.number}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={textVariants}
              className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight"
            >
              {step.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={textVariants}
              className="text-lg text-slate-600 leading-relaxed mb-8"
            >
              {step.description}
            </motion.p>

            {/* Features List */}
            <motion.div variants={containerVariants} className="space-y-3 mb-8">
              {step.features.map((feature, idx) => (
                <StepFeature key={idx} feature={feature} />
              ))}
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              variants={textVariants}
              className="flex items-center space-x-4"
            >
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: isInView ? "48px" : 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {step.title}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Image */}
      <motion.div
        className={`relative ${step.reverse ? "lg:col-start-1" : ""}`}
        variants={imageVariants}
      >
        {/* Floating Background Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Image Container */}
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.02,
            rotateY: step.reverse ? -5 : 5,
            rotateX: 2,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={step.image}
            alt={`${step.title} - Workflow automation step ${step.number}`}
            width={500}
            height={500}
            className="relative rounded-3xl shadow-2xl w-full h-[300px]"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
            }}
            priority={index === 0}
          />

          {/* Overlay Badge */}
          <motion.div
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <span className="text-sm font-semibold text-slate-700">
              Step {step.number}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// SectionHeader component
function SectionHeader({ isInView }: SectionHeaderProps) {
  return (
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
          How It Works
        </span>
      </motion.div>

      <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6 leading-tight">
        Streamline Your Business
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          In Three Simple Steps
        </span>
      </h2>

      <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
        Get started in minutes with our intuitive process. From design to
        execution, we&#39;ve made workflow automation simple, powerful, and
        accessible.
      </p>
    </motion.div>
  );
}

// Main ProcessSteps component
export default function ProcessSteps() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-20  max-w-7xl mx-auto">
      <div className="container mx-auto px-6">
        <SectionHeader isInView={isInView} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-32"
        >
          {steps.map((step, index) => (
            <StepContent key={index} step={step} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-slate-600 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium">Ready to get started?</span>
            <motion.svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
