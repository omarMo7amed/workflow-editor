/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useRef } from "react";
import { User, Upload, Loader2 } from "lucide-react";
import { uploadAvatar } from "../../_lib/auth/profile-actions";
import Button from "../Button";
import Image from "next/image";

interface ProfilePhotoUploadProps {
  currentAvatar?: string;
  userName: string;
  onAvatarUpdate: (avatarUrl: string) => void;
}

export default function ProfilePhotoUpload({
  currentAvatar,
  userName,
  onAvatarUpdate,
}: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const result = await uploadAvatar(formData);

      if (result.success && result.avatarUrl) {
        onAvatarUpdate(result.avatarUrl);
      }
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {currentAvatar ? (
            <Image
              src={currentAvatar || "/placeholder.svg"}
              alt={userName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-gray-500" />
          )}
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <Button
          type="button"
          degree="secondary"
          onClick={handleFileSelect}
          disabled={isUploading}
          extraStyle="flex items-center gap-2 rounded-md"
        >
          <Upload className="w-4 h-4" />
          {isUploading ? "Uploading..." : "Change Photo"}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <p className="text-xs text-gray-500 mt-2">
          JPG, PNG or GIF. Max size 5MB.
        </p>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
