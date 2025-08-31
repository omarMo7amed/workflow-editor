import { getCurrentUser } from "@/app/_lib/auth/actions";
import { getWorkflowsByUserId } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";
import Workflows from "./Workflows";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/auth/signin");
  }

  return <Workflows />;
}
