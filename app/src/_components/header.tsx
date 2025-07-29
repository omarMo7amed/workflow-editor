"use client";
import motion from "@/app/src/_components/Motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import EditorHeader from "./EditorHeader";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const pathname: string = usePathname();
  const isEditor = pathname === "/editor";

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
