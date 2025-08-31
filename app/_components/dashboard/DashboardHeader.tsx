import motion from "../Motion";
import { User } from "lucide-react";
import Image from "next/image";
import Logo from "../Logo";
import Link from "next/link";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-[73px]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-screen mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Link
                href={"/dashboard/settings"}
                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3"
              >
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </Link>
              <span className="text-sm font-medium capitalize text-gray-900">
                {user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
