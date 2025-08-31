import motion from "../_components/Motion";

import NavItems from "./NavItems";
import { ArrowRight } from "lucide-react";

export default function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <NavItems pathname={pathname} />
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <motion.a
          href="/auth/signin"
          className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </>
  );
}
