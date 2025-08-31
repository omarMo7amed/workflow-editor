import EditorLayout from "../../../_components/Editor/EditorLayout";
import { getWorkflowById } from "../../../_lib/data-service";
import { Workflow } from "../../../_types/types";

export default async function Page({ params }: any) {
  const { id } = params;
  const workflow: Partial<Workflow> = await getWorkflowById(id);

  return <EditorLayout workflow={workflow} />;
}
