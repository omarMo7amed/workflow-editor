/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteAccount } from "../../_lib/auth/profile-actions";
import Button from "../Button";
import { useEnterKey } from "@/app/_hooks/useEnterKey";

export default function DeleteAccountSection() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {
    if (confirmText.toUpperCase() !== "DELETE") {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAccount();
    } catch (err: any) {
      console.error("Delete error:", err);
      setIsDeleting(false);
    }
  };

  useEnterKey(handleDelete);

  if (!showConfirmation) {
    return (
      <div className="border border-red-200 rounded-lg p-6 bg-red-50">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-900">Delete Account</h3>
            <p className="text-sm text-red-700 mt-1">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <Button
              type="button"
              degree="danger"
              onClick={() => setShowConfirmation(true)}
              extraStyle="mt-4 flex items-center gap-2 rounded-md"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-red-900">
            Confirm Account Deletion
          </h3>
          <p className="text-sm text-red-700 mt-1 mb-4">
            This will permanently delete your account, all workflows, and
            associated data. Type <strong>DELETE</strong> to confirm.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE to confirm"
              className="w-full border-2 border-red-300 rounded-md p-2 focus:border-red-500 focus:outline-none"
            />

            <div className="flex space-x-3">
              <Button
                type="button"
                degree="secondary"
                onClick={() => {
                  setShowConfirmation(false);
                  setConfirmText("");
                }}
                extraStyle="rounded-md"
              >
                Cancel
              </Button>

              <Button
                type="button"
                degree="danger"
                onClick={handleDelete}
                disabled={confirmText !== "DELETE" || isDeleting}
                extraStyle="rounded-md"
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
