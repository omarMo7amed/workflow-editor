// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useState, useEffect } from "react";
// import { createClient } from "../src/_lib/supabase/client";
// import {
//   getUserWorkflows,
//   deleteWorkflow,
// } from "../src/_lib/supabase/workflows";

// import ConfirmationModal from "../src/_components/dashboard/ConfirmationModal";

// import { DashboardWorkflow, Workflow } from "../src/_types/types";

// export default function Page() {
//   const [workflows, setWorkflows] = useState<DashboardWorkflow[]>([]);
//   const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [workflowToDelete, setWorkflowToDelete] =
//     useState<DashboardWorkflow | null>(null);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const supabase = createClient();

//   useEffect(() => {
//     async function getUser() {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUser(user);
//       return user;
//     }

//     async function fetchWorkflows() {
//       try {
//         const currentUser = await getUser();
//         if (!currentUser) {
//           return;
//         }

//         const data = await getUserWorkflows(currentUser.id);

//         const transformedWorkflows: DashboardWorkflow[] = (data || []).map(
//           (workflow: Workflow) => ({
//             id: workflow.id,
//             name: workflow.name,
//             description: workflow.description || "No description provided",
//             status: "success" as const, // Default status
//             nodes: workflow.nodes ? Object.keys(workflow.nodes).length : 0,
//             lastRun: "2 hours ago", // Mock data - would come from execution logs
//             executions: Math.floor(Math.random() * 200), // Mock data
//           })
//         );

//         setWorkflows(transformedWorkflows);
//       } catch (error) {
//         console.error("Error fetching workflows:", error);
//       }
//     }

//     fetchWorkflows();
//   }, [supabase]);

//   const confirmDeleteWorkflow = async () => {
//     if (workflowToDelete && user) {
//       try {
//         await deleteWorkflow(workflowToDelete.id, user.id);
//         setWorkflows(workflows.filter((w) => w.id !== workflowToDelete.id));
//         setWorkflowToDelete(null);
//       } catch (error) {
//         console.error("Error deleting workflow:", error);
//       }
//     }
//   };

//   const confirmBulkDelete = async () => {
//     if (user) {
//       try {
//         // Delete all selected workflows
//         await Promise.all(
//           selectedWorkflows.map((id) => deleteWorkflow(id, user.id))
//         );
//         setWorkflows(
//           workflows.filter((w) => !selectedWorkflows.includes(w.id))
//         );
//         setSelectedWorkflows([]);
//       } catch (error) {
//         console.error("Error deleting workflows:", error);
//       }
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-73px)] bg-gray-50 flex">
//       {/* Delete Single Workflow Modal */}
//       <ConfirmationModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={confirmDeleteWorkflow}
//         title="Delete Workflow"
//         message={`Are you sure you want to delete "${workflowToDelete?.name}"? This action cannot be undone.`}
//         confirmText="Delete Workflow"
//         confirmationPhrase="delete my workflow"
//         type="danger"
//       />

//       {/* Bulk Delete Modal */}
//       <ConfirmationModal
//         isOpen={showBulkDeleteModal}
//         onClose={() => setShowBulkDeleteModal(false)}
//         onConfirm={confirmBulkDelete}
//         title="Delete Selected Workflows"
//         message={`Are you sure you want to delete ${
//           selectedWorkflows.length
//         } selected workflow${
//           selectedWorkflows.length > 1 ? "s" : ""
//         }? This action cannot be undone.`}
//         confirmText="Delete Workflows"
//         confirmationPhrase="delete my workflows"
//         type="danger"
//       />
//     </div>
//   );
// }
