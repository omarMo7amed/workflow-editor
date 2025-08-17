"use client";

import AuthGuard from "@/components/AuthGuard";
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
import Nodes from "../src/_components/Nodes";
import Load from "../src/_components/Load";
import Help from "../src/_components/Help";
import Editor from "./Editor";
import ProgressBar from "../src/_components/ProgressBar";
import Logs from "../src/_components/Logs";
import ExecutionStats from "../src/_components/ExecutionsStats";

export default function Page() {
  return (
<<<<<<< HEAD
    <section className="flex min-h-[calc(100vh-73px)] w-full">
=======
    <AuthGuard>
    <section className="grid grid-cols-[max-content_1fr_max-content] mx-auto">
>>>>>>> 72c87914f6972d14068f41812ff9f34fbeea407a
      <ActiveTabsContextProvider>
        <TableOfContents side="left" activeTab="Load">
          <TableOfContents.Head>
            <TableOfContents.NavItem>Load</TableOfContents.NavItem>
            <TableOfContents.NavItem>Analyze</TableOfContents.NavItem>
          </TableOfContents.Head>

          <TableOfContents.Body>
            <Load>
              <FileUpload
                acceptedFileType=".pdf,.doc,.docx,.txt"
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
    </AuthGuard>
  );
}
