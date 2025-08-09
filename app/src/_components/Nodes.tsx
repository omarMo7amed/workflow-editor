import { useFlowStore } from "@/app/_store/flowStore";
import Modal from "../_components/Modal";
import { ReactNode } from "react";
import { useTableOfContentsContext } from "../context/TableOfContents";

export default function Nodes({ children }: { children: ReactNode }) {
  const { modal, closeModal } = useFlowStore();
  const { active } = useTableOfContentsContext();

  if (active !== "Nodes") return;

  return (
    <div className="flex flex-col gap-10">
      {children}

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        onPrimaryAction={() => {
          closeModal();
        }}
        onSecondaryAction={closeModal}
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
      >
        <h2 className="text-lg font-semibold mb-2">
          {modal.content || "Default Modal"}
        </h2>
        <p className="text-gray-600">
          {modal.content
            ? `You selected the ${modal.content} node. Do you want to proceed?`
            : "No content"}
        </p>
      </Modal>
    </div>
  );
}
