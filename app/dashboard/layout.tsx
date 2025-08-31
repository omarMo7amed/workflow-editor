import { redirect } from "next/navigation";
import Sidebar from "../_components/dashboard/Sidebar";
import { getCurrentUser } from "../_lib/auth/actions";
import UserProvider from "../context/UserProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/auth/signin");
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      <UserProvider initialUser={currentUser}>
        <Sidebar />
        <div className="flex-1 flex flex-col p-4">{children}</div>
      </UserProvider>
    </div>
  );
}
