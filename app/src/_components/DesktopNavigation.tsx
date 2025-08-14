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
    </>
  );
}
