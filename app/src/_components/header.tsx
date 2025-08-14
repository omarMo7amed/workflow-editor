"use client";
import motion from "@/app/src/_components/Motion";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import EditorHeader from "./EditorHeader";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { user, signOut } = useAuth();
  const pathname: string = usePathname();
  const isEditor = pathname === "/editor";
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) return null;
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`${
          isEditor ? "max-w-[1600px]" : "max-w-7xl"
        } mx-auto px-6 py-4`}
      >
        {isEditor ? (
          <EditorHeader />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <Logo />
              <DesktopNavigation pathname={pathname} />
              
              {/* Auth Section */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="w-4 h-4" />
                      <span>{user.user_metadata?.full_name || user.email}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      href="/auth/login"
                      className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
              
              <button
                className="md:hidden text-slate-900 "
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 cursor-pointer" />
                ) : (
                  <Menu className="w-6 h-6 cursor-pointer" />
                )}
              </button>
            </div>

            <MobileNavigation mobileMenuOpen={mobileMenuOpen} />
          </>
        )}
      </div>
    </motion.header>
  );
}
