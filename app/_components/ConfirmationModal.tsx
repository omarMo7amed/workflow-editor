"use client";
import { useEnterKey } from "../_hooks/useEnterKey";
import { X, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import SmallSpinner from "./SmallSpinner";
import { useOutsideClick } from "../_hooks/useOutSideClick";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: (x: boolean) => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmationPhrase?: string;
  type?: "danger" | "warning";
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmationPhrase,
  type = "danger",
}: ConfirmationModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() => onClose(false));

  useEffect(() => {
    if (confirmationPhrase) {
      setIsValid(inputValue === confirmationPhrase);
    } else {
      setIsValid(true);
    }
  }, [inputValue, confirmationPhrase]);

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    await onConfirm();
    setIsSubmitting(false);
    onClose(false);
  };

  useEnterKey(handleConfirm, !!confirmationPhrase && isValid);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-gray-800/50  flex items-center justify-center z-50">
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {type === "danger" && (
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-gray-400 cursor-pointer
               hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-gray-600 mb-4">{message}</p>

          {confirmationPhrase && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type &quot;{confirmationPhrase}&quot; to confirm:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                placeholder={confirmationPhrase}
              />
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => onClose(false)}
              disabled={isSubmitting}
              className="px-4 py-2 text-gray-700 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isValid || isSubmitting}
              className={`px-4 py-2 cursor-pointer rounded-md transition-colors ${
                isValid && !isSubmitting
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? <SmallSpinner /> : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
