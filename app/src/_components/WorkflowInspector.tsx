import { useState } from "react";
import NodeInfo from "./NodeInfo";
import EditableInputs from "./EditableInputs";
import ActionsPanel from "./ActionsPanel";
import NodeConnections from "./NodeConnections";

const WorkflowInspector = () => {
  const [activeNodeType, setActiveNodeType] = useState<string>("Read PDF");

  const handleNodeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveNodeType(e.target.value);
  };

  const changeConnections = () => {
    //  logic here
  };

  const pauseNode = () => {
    //  logic here
  };

  const executeNode = () => {
    //  logic here
  };

  const deleteNode = () => {
    //  logic here
  };

  return (
    <div>
      <NodeInfo onNodeTypeChange={handleNodeTypeChange} />
      <EditableInputs activeNodeType={activeNodeType} />
      <NodeConnections changeConnections={changeConnections} />
      <ActionsPanel
        onPause={pauseNode}
        onExecute={executeNode}
        onDelete={deleteNode}
      />
    </div>
  );
};

export default WorkflowInspector;
