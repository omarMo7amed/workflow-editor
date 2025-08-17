/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signInWithEmail } from "../../_lib/auth/actions";
import SignInWithGoogle from "./SignInWithGoogle";
import { useRouter } from "next/navigation";
import SmallSpinner from "../SmallSpinner";
import InputGroup from "../InputGroup";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "../Button";
import Link from "next/link";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await signInWithEmail(formData.email, formData.password);

      router.push("/workflows");
    } catch (error: any) {
      setErrors({ submit: error.message || "Invalid credentials" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="text-slate-400">Sign in to continue your workflow</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputGroup
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
        />

        <InputGroup
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
        />

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
          >
            <p className="text-red-400 text-sm text-center">{errors.submit}</p>
          </motion.div>
        )}

        <Button
          type="submit"
          degree="main"
          disabled={isLoading}
          extraStyle="w-full py-2.5 flex items-center justify-center gap-2 rounded-md disabled:opacity-50"
        >
          {isLoading && <SmallSpinner />}
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-slate-500">OR</span>
        </div>
      </div>
      <SignInWithGoogle />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-4"
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-400">
              New to our platform?
            </span>
          </div>
        </div>

        <Link
          href="/auth/signup"
          className="block w-full text-center py-2 text-blue-600 hover:text-blue-400 transition-colors duration-200 font-medium"
        >
          Create an account
        </Link>
      </motion.div>
    </div>
  );
}
