"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../../_lib/auth/actions";
import ProfilePhotoUpload from "../../_components/auth/ProfilePhotoUpload";
import ProfileForm from "../../_components/auth/ProfileForm";
import DeleteAccountSection from "../../_components/auth/DeleteAccountSection";
import { User, Settings, Trash2 } from "lucide-react";
import Spinner from "@/app/_components/Spinner";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleAvatarUpdate = (avatarUrl: string) => {
    if (user) {
      setUser({ ...user, avatar: avatarUrl });
    }
  };

  const handleNameUpdate = (name: string) => {
    if (user) {
      setUser({ ...user, name });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Unable to load user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-6 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-2">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-slate-800" />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage your profile and account preferences
            </p>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Photo */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 mb-4">
              Profile Photo
            </h3>
            <ProfilePhotoUpload
              currentAvatar={user.avatar}
              userName={user.name}
              onAvatarUpdate={handleAvatarUpdate}
            />
          </div>

          {/* Profile Form */}
          <div className="max-w-96">
            <h3 className="text-sm font-medium text-slate-700 mb-4">
              Personal Details
            </h3>
            <ProfileForm
              initialName={user.name}
              email={user.email}
              onNameUpdate={handleNameUpdate}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div>
        <div className="py-4 bg-slate-100 px-3 mb-4 rounded-md">
          <h2 className="text-xl font-semibold text-slate-900 mb-2 flex items-center gap-2 ">
            <Trash2 className="w-5 h-5 text-red-500" />
            Danger Zone
          </h2>
          <p className="text-slate-600 text-sm">
            Irreversible actions that affect your account and data
          </p>
        </div>
        <DeleteAccountSection />
      </div>
    </div>
  );
}
