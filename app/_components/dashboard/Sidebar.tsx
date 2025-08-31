"use client";
import { GitBranch, Settings, User, LogOut, Book } from "lucide-react";
import { useUser } from "../../context/UserProvider";
import { signOut } from "../../_lib/auth/actions";
import { usePathname } from "next/navigation";
import SmallSpinner from "../SmallSpinner";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const { user, clearUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const pahtname = usePathname();
  const isActive = (path: string) => {
    return pahtname === path
      ? "bg-slate-900 text-white"
      : "bg-slate-100 text-gray-700 hover:bg-slate-200";
  };

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
    clearUser();
    setIsLoading(false);
  }

  if (!user) {
    return null;
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">Dashboard</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard/workflows"
              className={`flex items-center p-2 text-sm font-medium rounded-md ${isActive(
                "/dashboard/workflows"
              )}`}
            >
              <GitBranch className="w-4 h-4 mr-3" />
              Workflows
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className={`flex items-center p-2 text-sm font-medium rounded-md transition-colors ${isActive(
                "/dashboard/settings"
              )}`}
            >
              <Settings className="w-4 h-4 mr-3" />
              Settings
            </Link>
          </li>

          <li>
            <Link
              href="/docs"
              className={`flex items-center p-2 text-sm font-medium rounded-md transition-colors ${isActive(
                "/docs"
              )}`}
            >
              <Book className="w-4 h-4 mr-3" />
              Docs
            </Link>
          </li>
        </ul>
      </nav>

      {/* User Profile */}
      <div className="px-2 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <User className="w-5 h-5 text-gray-600" />
            )}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="ml-3 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
          >
            {isLoading ? <SmallSpinner /> : <LogOut className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
