import InputGroup from "./InputGroup";
import SelectionInput from "./SelectionInput";

export default function EditableInputs({
  activeNodeType,
}: {
  activeNodeType: string;
}) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Editable Inputs
      </h3>

      <div className="form-group mb-4">
        <InputGroup
          type="text"
          label="Rename"
          id="rename"
          placeholder="Node Name"
        />
      </div>

      {activeNodeType === "sendEmail" && (
        <div className="form-group mb-4">
          <InputGroup
            type="email"
            label="Email"
            id="email"
            placeholder="Email"
          />
        </div>
      )}

      {activeNodeType === "report" || (
        <SelectionInput
          id="format"
          label="Format"
          options={[
            { value: "PDF", label: "PDF" },
            { value: "CSV", label: "CSV" },
            { value: "Docx", label: "Docx" },
          ]}
        />
      )}
    </>
  );
}
