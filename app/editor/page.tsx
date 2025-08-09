"use client";

import { ActiveTabsContextProvider } from "../src/context/ActiveTabsContext";
import WorkflowInspector from "../src/_components/WorkflowInspector";
import InstructionField from "../src/_components/InstructionField";
import TableOfContents from "../src/context/TableOfContents";
import { FileUpload } from "../src/_components/FileUpload";
import NodeControls from "../src/_components/NodeControls";
import DefaultNodes from "../src/_components/DefaultNodes";
import QuickGuide from "../src/_components/QuickGuide";
import Inspector from "../src/_components/Instpector";
import Analyze from "../src/_components/Analyze";
import Button from "../src/_components/Button";
import Load from "../src/_components/Load";
import Help from "../src/_components/Help";
import Editor from "./Editor";
import Nodes from "../src/_components/Nodes";
// import Nodes from "../src/context/NodesContext";

export default function Page() {
  const handleFilesUpload = (files: File[]) => {
    console.log("Files uploaded in TableOfContents:", files);
    // Handle the uploaded files here
    // You can pass this data up to parent components or process it as needed
  };

  return (
    <section className="grid grid-cols-[max-content_1fr_max-content] mx-auto">
      <ActiveTabsContextProvider>
        <TableOfContents side="left" activeTab="Load">
          <TableOfContents.Head>
            <TableOfContents.NavItem>Load</TableOfContents.NavItem>
            <TableOfContents.NavItem>Analyze</TableOfContents.NavItem>
          </TableOfContents.Head>

          <TableOfContents.Body>
            <Load>
              <FileUpload
                onFilesUpload={handleFilesUpload}
                acceptedFileType=".pdf,.doc,.docx,.txt"
                maxFileSize={10}
                multiple={true}
              />

              <InstructionField />

              <Button degree="main" extraStyle="rounded-md">
                Execute Workflow
              </Button>
            </Load>

            <Analyze>Soon</Analyze>
          </TableOfContents.Body>
        </TableOfContents>

        <Editor />

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
              <QuickGuide />
            </Nodes>

            <Inspector>
              <WorkflowInspector />
            </Inspector>

            <Help> help</Help>
          </TableOfContents.Body>
        </TableOfContents>
      </ActiveTabsContextProvider>
    </section>
  );
}
