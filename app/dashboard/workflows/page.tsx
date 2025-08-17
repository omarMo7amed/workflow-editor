import { getCurrentUser } from "@/app/src/_lib/auth/actions";
import { getWorkflowsByUserId } from "@/app/src/_lib/data-service";
import { redirect } from "next/navigation";
import Workflows from "./Workflows";

export default async function Page() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/auth/signin");
  }

  const workflows = await getWorkflowsByUserId(currentUser.id);

  return <Workflows workflows={workflows} />;
}
