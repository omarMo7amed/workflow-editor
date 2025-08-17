// "use client";
// import { useState, useEffect } from "react";
// import {
//   Search,
//   Settings,
//   Play,
//   Trash2,
//   Edit3,
//   Plus,
//   Clock,
//   GitBranch,
//   User,
//   Bell,
//   LogOut,
//   X,
//   AlertTriangle,
// } from "lucide-react";

// // Reusable Confirmation Modal Component
// interface ConfirmationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   message: string;
//   confirmText: string;
//   confirmationPhrase?: string;
//   type?: "danger" | "info" | "success";
// }

// const ConfirmationModal = ({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   message,
//   confirmText,
//   confirmationPhrase,
//   type = "danger",
// }: ConfirmationModalProps) => {
//   const [inputValue, setInputValue] = useState("");
//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     if (confirmationPhrase) {
//       setIsValid(inputValue === confirmationPhrase);
//     } else {
//       setIsValid(true);
//     }
//   }, [inputValue, confirmationPhrase]);

//   useEffect(() => {
//     if (!isOpen) {
//       setInputValue("");
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleConfirm = () => {
//     if (isValid) {
//       onConfirm();
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               {type === "danger" && (
//                 <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
//                   <AlertTriangle className="w-5 h-5 text-red-600" />
//                 </div>
//               )}
//               <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>

//           <p className="text-gray-600 mb-4">{message}</p>

//           {confirmationPhrase && (
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Type &quot;{confirmationPhrase}&quot; to confirm:
//               </label>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
//                 placeholder={confirmationPhrase}
//               />
//             </div>
//           )}

//           <div className="flex justify-end space-x-3">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleConfirm}
//               disabled={!isValid}
//               className={`px-4 py-2 rounded-md transition-colors ${
//                 isValid
//                   ? "bg-red-600 hover:bg-red-700 text-white"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {confirmText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WorkflowDashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [workflowToDelete, setWorkflowToDelete] = useState<null | {
//     id: string;
//     name: string;
//   }>(null);
//   const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);

//   // Mock user data
//   const user = {
//     name: "John Doe",
//     email: "john.doe@company.com",
//     avatar: null,
//   };

//   // Mock workflows data
//   const [workflows, setWorkflows] = useState([
//     {
//       id: "1",
//       name: "Customer Onboarding Flow",
//       description: "Automated workflow for new customer registration and setup",
//       status: "success",
//       nodes: 12,
//       lastRun: "2 hours ago",
//       created: "2024-08-10",
//       updated: "2024-08-15",
//       executions: 156,
//     },
//     {
//       id: "2",
//       name: "Email Marketing Campaign",
//       description: "Weekly newsletter and promotional email automation",
//       status: "success",
//       nodes: 8,
//       lastRun: "1 day ago",
//       created: "2024-08-05",
//       updated: "2024-08-14",
//       executions: 89,
//     },
//     {
//       id: "3",
//       name: "Inventory Management",
//       description: "Stock level monitoring and automatic reordering system",
//       status: "paused",
//       nodes: 15,
//       lastRun: "1 week ago",
//       created: "2024-07-20",
//       updated: "2024-08-12",
//       executions: 234,
//     },
//     {
//       id: "4",
//       name: "Social Media Posting",
//       description: "Automated content publishing across multiple platforms",
//       status: "draft",
//       nodes: 6,
//       lastRun: "Never",
//       created: "2024-08-14",
//       updated: "2024-08-14",
//       executions: 0,
//     },
//   ]);

//   const filteredWorkflows = workflows.filter(
//     (workflow) =>
//       workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleExecuteWorkflow = (workflowId: string) => {
//     console.log(`Executing workflow ${workflowId}`);
//     // Add your execution logic here
//   };

//   const handleEditWorkflow = (workflowId: string) => {
//     // Navigate to editor
//     window.location.href = `/editor/workflow/${workflowId}`;
//   };

//   const handleDeleteWorkflow = (workflow: string) => {
//     setWorkflowToDelete(workflow);
//     setShowDeleteModal(true);
//   };

//   const confirmDeleteWorkflow = () => {
//     if (workflowToDelete) {
//       setWorkflows(workflows.filter((w) => w.id !== workflowToDelete.id));
//       setWorkflowToDelete(null);
//     }
//   };

//   const handleBulkDelete = () => {
//     if (selectedWorkflows.length > 0) {
//       setShowBulkDeleteModal(true);
//     }
//   };

//   const confirmBulkDelete = () => {
//     setWorkflows(workflows.filter((w) => !selectedWorkflows.includes(w.id)));
//     setSelectedWorkflows([]);
//   };

//   const toggleWorkflowSelection = (workflowId: string) => {
//     setSelectedWorkflows((prev) =>
//       prev.includes(workflowId)
//         ? prev.filter((id) => id !== workflowId)
//         : [...prev, workflowId]
//     );
//   };

//   const selectAllWorkflows = () => {
//     if (selectedWorkflows.length === filteredWorkflows.length) {
//       setSelectedWorkflows([]);
//     } else {
//       setSelectedWorkflows(filteredWorkflows.map((w) => w.id));
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "success":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "running":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "pending":
//         return "bg-gray-100 text-gray-800 border-gray-200";
//       case "error":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "success":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "running":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "pending":
//         return "bg-gray-100 text-gray-800 border-gray-200";
//       case "error":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//         {/* Logo/Brand */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <GitBranch className="w-4 h-4 text-white" />
//             </div>
//             <span className="ml-3 text-xl font-bold text-gray-900">
//               WorkFlow
//             </span>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-6">
//           <ul className="space-y-2">
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg"
//               >
//                 <GitBranch className="w-5 h-5 mr-3" />
//                 Workflows
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <Settings className="w-5 h-5 mr-3" />
//                 Settings
//               </a>
//             </li>
//           </ul>
//         </nav>

//         {/* User Profile */}
//         <div className="p-6 border-t border-gray-200">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//               {user.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//               ) : (
//                 <User className="w-5 h-5 text-gray-600" />
//               )}
//             </div>
//             <div className="ml-3 flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">
//                 {user.name}
//               </p>
//               <p className="text-xs text-gray-500 truncate">{user.email}</p>
//             </div>
//             <button className="ml-3 text-gray-400 hover:text-gray-600 transition-colors">
//               <LogOut className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 Manage and execute your automation workflows
//               </p>
//             </div>

//             <div className="flex items-center space-x-4">
//               <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Bell className="w-5 h-5" />
//               </button>

//               <div className="flex items-center">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
//                   {user.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="w-8 h-8 rounded-full"
//                     />
//                   ) : (
//                     <User className="w-4 h-4 text-gray-600" />
//                   )}
//                 </div>
//                 <span className="text-sm font-medium text-gray-900">
//                   {user.name}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="flex-1 p-6">
//           {/* Controls */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
//               <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search workflows..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full sm:w-80"
//                   />
//                 </div>

//                 {selectedWorkflows.length > 0 && (
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm text-gray-600">
//                       {selectedWorkflows.length} selected
//                     </span>
//                     <button
//                       onClick={handleBulkDelete}
//                       className="px-3 py-1 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors text-sm"
//                     >
//                       Delete Selected
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
//                 <Plus className="w-4 h-4" />
//                 <span>Create Workflow</span>
//               </button>
//             </div>
//           </div>

//           {/* Workflows List */}
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//             {filteredWorkflows.length > 0 ? (
//               <>
//                 {/* Table Header */}
//                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       checked={
//                         selectedWorkflows.length === filteredWorkflows.length
//                       }
//                       onChange={selectAllWorkflows}
//                       className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                     <div className="grid grid-cols-12 gap-4 w-full text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       <div className="col-span-4">Workflow</div>
//                       <div className="col-span-2">Status</div>
//                       <div className="col-span-2">Nodes</div>
//                       <div className="col-span-2">Last Run</div>
//                       <div className="col-span-2">Actions</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Workflow Items */}
//                 <div className="divide-y divide-gray-200">
//                   {filteredWorkflows.map((workflow) => (
//                     <div
//                       key={workflow.id}
//                       className="px-6 py-4 hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={selectedWorkflows.includes(workflow.id)}
//                           onChange={() => toggleWorkflowSelection(workflow.id)}
//                           className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                         />

//                         <div className="grid grid-cols-12 gap-4 w-full items-center">
//                           {/* Workflow Info */}
//                           <div className="col-span-4">
//                             <div className="flex items-start">
//                               <div className="flex-1">
//                                 <h3 className="text-sm font-medium text-gray-900 mb-1">
//                                   {workflow.name}
//                                 </h3>
//                                 <p className="text-xs text-gray-500 line-clamp-2">
//                                   {workflow.description}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Status */}
//                           <div className="col-span-2">
//                             <div
//                               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
//                                 workflow.status
//                               )}`}
//                             >
//                               {getStatusIcon(workflow.status)}
//                               <span className="ml-1 capitalize">
//                                 {workflow.status}
//                               </span>
//                             </div>
//                           </div>

//                           {/* Nodes */}
//                           <div className="col-span-2">
//                             <div className="text-sm text-gray-900">
//                               {workflow.nodes} nodes
//                             </div>
//                             <div className="text-xs text-gray-500">
//                               {workflow.executions} runs
//                             </div>
//                           </div>

//                           {/* Last Run */}
//                           <div className="col-span-2">
//                             <div className="flex items-center text-sm text-gray-900">
//                               <Clock className="w-3 h-3 mr-1" />
//                               {workflow.lastRun}
//                             </div>
//                           </div>

//                           {/* Actions */}
//                           <div className="col-span-2">
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 onClick={() =>
//                                   handleExecuteWorkflow(workflow.id)
//                                 }
//                                 className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
//                                 title="Execute"
//                               >
//                                 <Play className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleEditWorkflow(workflow.id)}
//                                 className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
//                                 title="Edit"
//                               >
//                                 <Edit3 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteWorkflow(workflow)}
//                                 className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                                 title="Delete"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </>
//             ) : (
//               /* Empty State */
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <GitBranch className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   No workflows found
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {searchTerm
//                     ? "Try adjusting your search terms"
//                     : "Create your first workflow to get started"}
//                 </p>
//                 <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
//                   Create New Workflow
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Delete Single Workflow Modal */}

//     </div>
//   );
// };

// export default WorkflowDashboard;
