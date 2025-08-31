import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../Button";
import InputGroup from "../InputGroup";
import { FormCreateWorkflow } from "../../_types/types";

export default function CreateWorkFlow({
  isOpen,
  setIsOpen,
  onCreateWorkflow,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onCreateWorkflow: (data: FormCreateWorkflow) => void;
}) {
  const [formData, setFormData] = useState<FormCreateWorkflow>({
    name: "",
    description: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      setError("Workflow name is required");
      return;
    }

    if (formData.name.length < 3) {
      setError("Workflow name must be at least 3 characters long");
      return;
    }

    onCreateWorkflow(formData);
    setIsOpen(false);
    setFormData({ name: "", description: "" });
    setError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" && error) {
      setError("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-800/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Workflow</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <InputGroup
                  type="text"
                  label="Workflow Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter unique workflow name"
                  error={error}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-600 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border-2 p-2 border-gray-300 rounded-xl focus:ring-gray-400 focus:ring-2 focus:border-none focus:outline-none focus:ring-offset-1 transition duration-150 placeholder-gray-400 focus:shadow-lg focus:shadow-gray-200/30"
                  rows={4}
                  placeholder="description"
                />
              </div>

              <div className="mb-4">
                <InputGroup
                  type="text"
                  label="Status"
                  id="status"
                  name="status"
                  readOnly={true}
                  value={"Pending"}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  degree="secondary"
                  onClick={() => setIsOpen(false)}
                  type="button"
                  extraStyle="rounded-md"
                >
                  Cancel
                </Button>
                <Button type="submit" degree="main" extraStyle="rounded-md">
                  Create
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
