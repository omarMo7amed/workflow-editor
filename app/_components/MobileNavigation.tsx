import motion from "../_components/Motion";
import NavItems from "./NavItems";

export default function MobileNavigation({
  mobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
}) {
  return (
    <motion.div
      className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: mobileMenuOpen ? 1 : 0,
        height: mobileMenuOpen ? "auto" : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="pt-4 pb-2 space-y-2">
        <NavItems extraStyle="py-2" />

        <div className="pt-4 space-y-2">
          <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors w-full">
            Get Started
          </button>
        </div>
      </nav>
    </motion.div>
  );
}
