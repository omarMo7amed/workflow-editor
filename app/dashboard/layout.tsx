import Sidebar from "../src/_components/dashboard/Sidebar";
import { getCurrentUser } from "../src/_lib/auth/actions";
import UserProvider from "../src/context/UserProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
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
