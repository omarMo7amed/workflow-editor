import motion from "@/app/src/_components/Motion";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import NavItems from "./NavItems";

export default function DesktopNavigation({ pathname }: { pathname: string }) {
  const { user } = useAuth();

  return (
    <>
      <nav className="hidden md:flex items-center gap-8">
        <NavItems pathname={pathname} />
      </nav>
<<<<<<< HEAD

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
=======
>>>>>>> 72c87914f6972d14068f41812ff9f34fbeea407a
    </>
  );
}
