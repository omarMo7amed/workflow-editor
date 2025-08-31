"use client";
import { ActiveTabsContextProvider } from "../../context/ActiveTabsContext";
import { useWorkflowStore } from "@/app/_store/workflowStore";
import WorkflowInspector from "./inspector/WorkflowInspector";
import TableOfContents from "../../context/TableOfContents";
import ExecutionStats from "./analyze/ExecutionsStats";
import InstructionField from "./load/InstructionField";
import { useFlowStore } from "@/app/_store/flowStore";
import EditorSubHeader from "./EditorSubHeader";
import DefaultNodes from "./nodes/DefaultNodes";
import NodeControls from "./nodes/NodeControls";
import ProgressBar from "./analyze/ProgressBar";
import { FileUpload } from "./load/FileUpload";
import { Workflow } from "../../_types/types";
import WorkflowCanvas from "./WorkflowCanvas";
import HelpContent from "./help/HelpContent";
import { memo, useEffect } from "react";
import Inspector from "./Instpector";
import Logs from "./analyze/Logs";
import Analyze from "./Analyze";
import Editor from "./Editor";
import Nodes from "./Nodes";
import Load from "./Load";
import Help from "./Help";

function EditorLayout({ workflow }: { workflow: Partial<Workflow> }) {
  const setCurrentWorkflow = useWorkflowStore((s) => s.setCurrentWorkflow);
  const loadWorkflow = useFlowStore((s) => s.loadWorkflow);

  useEffect(() => {
    setCurrentWorkflow(workflow);
  }, [workflow, setCurrentWorkflow]);

  useEffect(() => {
    async function fetchData() {
      if (workflow) {
        await loadWorkflow(workflow.id!);
      }
    }
    fetchData();
  }, [workflow, loadWorkflow]);

  return (
    <section className="flex min-h-[calc(100vh-73px)] w-full">
      <ActiveTabsContextProvider>
        <TableOfContents side="left" activeTab="Load">
          <TableOfContents.Head>
            <TableOfContents.NavItem>Load</TableOfContents.NavItem>
            <TableOfContents.NavItem>Analyze</TableOfContents.NavItem>
          </TableOfContents.Head>

          <TableOfContents.Body>
            <Load>
              <FileUpload
                acceptedFileType=".doc,.docx,.txt"
                maxFileSize={10}
                multiple={true}
              />

              <InstructionField />
            </Load>

            <Analyze>
              <ProgressBar />
              <ExecutionStats />
              <Logs />
            </Analyze>
          </TableOfContents.Body>
        </TableOfContents>

        <Editor>
          <EditorSubHeader />
          <WorkflowCanvas />
        </Editor>

        <TableOfContents side="right" activeTab={"Nodes"}>
          <TableOfContents.Head>
            <TableOfContents.NavItem>Nodes</TableOfContents.NavItem>
            <TableOfContents.NavItem>Inspector</TableOfContents.NavItem>
            <TableOfContents.NavItem>Help</TableOfContents.NavItem>
          </TableOfContents.Head>

          <TableOfContents.Body>
            <Nodes>
              <NodeControls />
              <DefaultNodes />
            </Nodes>

            <Inspector>
              <WorkflowInspector />
            </Inspector>

            <Help>
              <HelpContent />
            </Help>
          </TableOfContents.Body>
        </TableOfContents>
      </ActiveTabsContextProvider>
    </section>
  );
}

export default memo(EditorLayout);
