// import { useEffect, useState } from "react";
// import InputGroup from "./InputGroup";
// import SelectionInput from "./SelectionInput";

// export default function EditableInputs({
//   nodeName,
//   activeNodeType,
// }: {
//   nodeName: string;
//   activeNodeType: string;
// }) {
//   const [label, setNodeLabel] = useState<string>(
//     nodeName || "Select Node First"
//   );

//   console.log(label);

//   useEffect(() => {
//     setNodeLabel(nodeName);
//   }, [nodeName]);

//   return (
//     <>
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">
//         Editable Inputs
//       </h3>

//       <div className="form-group mb-4">
//         <InputGroup
//           type="text"
//           label="Rename"
//           value={label}
//           onChange={(e) => setNodeLabel(e.target.value)}
//           id="rename"
//           placeholder="Node Name"
//         />
//       </div>

//       {activeNodeType === "Send Email" && (
//         <div className="form-group mb-4">
//           <InputGroup
//             type="email"
//             label="Email"
//             id="email"
//             placeholder="example@gmail.com"
//           />
//         </div>
//       )}

//       {activeNodeType === "Generate Report" && (
//         <SelectionInput
//           id="format"
//           label="Format"
//           options={[
//             { value: "PDF", label: "PDF" },
//             { value: "CSV", label: "CSV" },
//             { value: "Docx", label: "Docx" },
//           ]}
//         />
//       )}
//     </>
//   );
// }
