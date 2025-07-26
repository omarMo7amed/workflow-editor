import { usePathname } from "next/navigation";
import motion from "@/app/src/_components/Motion";
import { ArrowRight } from "lucide-react";
import NavItems from "./NavItems";

export default function DesktopNavigation() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <NavItems pathname={pathname} />
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <motion.a
          href="/editor"
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
