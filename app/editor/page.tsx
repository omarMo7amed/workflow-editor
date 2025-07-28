"use client";
import Button from "../src/_components/Button";
import { FileUpload } from "../src/_components/FileUpload";
import InstructionField from "../src/_components/InstructionField";
import TableOfContents from "../src/_components/TableOfContents";
import Editor from "./Editor";
import { useWorkflowStore } from "../src/_hooks/useWorkflowStore";

export default function Page() {
  const { addNode } = useWorkflowStore();

  const handleFilesUpload = (files: File[]) => {
    console.log("Files uploaded in TableOfContents:", files);
    // Handle the uploaded files here
    // You can pass this data up to parent components or process it as needed
  };

  return (
    <section className="grid grid-cols-[max-content_1fr_max-content] mx-auto">
      <TableOfContents side={"left"} activeTab="Nodes">
        <TableOfContents.Head>
          <TableOfContents.NavItem>Nodes</TableOfContents.NavItem>
        </TableOfContents.Head>

        <TableOfContents.Body>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addNode("readPdf")}
              className="bg-slate-200 rounded p-2 hover:bg-slate-300"
            >
              📄 Read PDF
            </button>
            <button
              onClick={() => addNode("summarize")}
              className="bg-slate-200 rounded p-2 hover:bg-slate-300"
            >
              🧠 Summarize
            </button>
            <button
              onClick={() => addNode("sendEmail")}
              className="bg-slate-200 rounded p-2 hover:bg-slate-300"
            >
              ✉️ Send Email
            </button>
            <button
              onClick={() => addNode("report")}
              className="bg-slate-200 rounded p-2 hover:bg-slate-300"
            >
              📊 Report
            </button>
          </div>
        </TableOfContents.Body>
      </TableOfContents>

      <Editor />

      <TableOfContents side={"right"} activeTab="Load">
        <TableOfContents.Head>
          <TableOfContents.NavItem>Load</TableOfContents.NavItem>
          <TableOfContents.NavItem>Analyze</TableOfContents.NavItem>
        </TableOfContents.Head>

        <TableOfContents.Body>
          <FileUpload
            onFilesUpload={handleFilesUpload}
            acceptedFileTypes=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt,.md"
            maxFileSize={10}
            multiple={true}
          />

          <InstructionField />

          <Button degree="main" extraStyle="rounded-md">
            Execute Workflow
          </Button>
        </TableOfContents.Body>
      </TableOfContents>
    </section>
  );
}
