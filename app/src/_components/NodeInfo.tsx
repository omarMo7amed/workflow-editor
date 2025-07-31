import InputGroup from "./InputGroup";

export default function NodeInfo({
  onNodeTypeChange,
}: {
  onNodeTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Node Info</h3>

      <div className="mb-4">
        <InputGroup
          type="text"
          label="Node Type"
          id="nodeType"
          value="Node Type"
          placeholder="x"
          readOnly={true}
        />
      </div>

      <div className="mb-4">
        <InputGroup
          type="text"
          label="Node Id"
          id="nodeId"
          value="Node Id "
          placeholder="x"
          readOnly={true}
        />
      </div>

      <div className="flex flex-col gap-1.5 mb-4">
        <span>Position</span>
        <div className="flex justify-between gap-2">
          <InputGroup type="number" label="X :" id="X" placeholder="X" />
          <InputGroup type="number" label="Y :" id="Y" placeholder="Y" />
        </div>
      </div>
    </>
  );
}
