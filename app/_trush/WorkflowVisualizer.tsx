/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useCallback } from "react";
import { ReactFlow, Background, Controls, MiniMap } from "reactflow";

import { useFlowStore } from "@/app/_store/flowStore";
import StartNode from "../src/_components/StartNode";
import NoteNode from "../src/_components/NoteNode";
import CustomExecutionNode from "./CustomExecutionNode";
import CustomEdge from "../src/_components/CustomEdge";
import CustomControls from "../src/_components/CustomControl";

const nodeTypes = {
  start: StartNode,
  readFile: CustomExecutionNode,
  summarize: CustomExecutionNode,
  email: CustomExecutionNode,
  report: CustomExecutionNode,
  note: NoteNode,
};

const edgeTypes = {
  animated: CustomEdge,
  pulse: CustomEdge,
  running: CustomEdge,
  done: CustomEdge,
  error: CustomEdge,
};

interface WorkflowVisualizerProps {
  executionData?: Record<string, any>; // maps nodeId -> results
}

const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({
  executionData = {},
}) => {
  const {
    updateNodeStatus,
    changeEdgeType,
    onNodesChange,
    onEdgesChange,
    getNodes,
    getEdges,
  } = useFlowStore();

  const nodes = getNodes();
  const edges = getEdges();

  return (
    <div className="h-full w-full relative bg-gray-50">
      {/* React Flow */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="bg-gray-50"
      >
        <Background
          className="bg-gradient-to-br from-slate-50 to-slate-100"
          gap={20}
          color="#e2e8ff"
        />
        <CustomControls isLocked={false} setIsLocked={() => {}} />
        <MiniMap className="bg-white border border-gray-200 rounded-lg shadow-lg" />
      </ReactFlow>
    </div>
  );
};

export default WorkflowVisualizer;
