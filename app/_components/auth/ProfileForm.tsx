/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { updateProfile } from "../../_lib/auth/profile-actions";
import InputGroup from "../InputGroup";
import Button from "../Button";
import { useEnterKey } from "@/app/_hooks/useEnterKey";

interface ProfileFormProps {
  initialName: string;
  email: string;
  onNameUpdate: (name: string) => void;
}

export default function ProfileForm({
  initialName,
  email,
  onNameUpdate,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (name === initialName) {
      setError("No changes to save");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile(name.trim());
      onNameUpdate(name.trim());
      setSuccess("Profile updated successfully");
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEnterKey(() => {
    handleSubmit(new Event("submit") as any).catch(() => {});
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputGroup
        id="name"
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
          setSuccess("");
        }}
        placeholder="Enter your full name"
        error={error}
      />

      <InputGroup
        id="email"
        label="Email Address"
        type="email"
        value={email}
        readOnly={true}
        placeholder="Your email address"
      />

      {success && <p className="text-green-600 text-sm">{success}</p>}

      <Button
        type="submit"
        degree="main"
        disabled={isLoading || name === initialName}
        extraStyle="w-full rounded-md"
      >
        {isLoading ? "Updating..." : "Update Profile"}
      </Button>
    </form>
  );
}
