// import { useEffect, useState } from "react";
// import InputGroup from "./InputGroup";

// export default function NodeInfo({
//   nodeType,
//   nodeId,
//   position,
// }: {
//   nodeType?: string;
//   nodeId?: string;
//   position: { x: number; y: number };
// }) {
//   const [coords, setCoords] = useState(position);

//   useEffect(() => {
//     setCoords(position);
//   }, [position]);

//   return (
//     <>
//       <h3 className="text-lg font-semibold text-gray-700 mb-4">Node Info</h3>

//       <div className="mb-4">
//         <InputGroup
//           type="text"
//           label="Node Type"
//           id={nodeType || "nodeType"}
//           value={nodeType}
//           placeholder="x"
//           readOnly={true}
//         />
//       </div>

//       <div className="mb-4">
//         <InputGroup
//           type="text"
//           label="Node Id"
//           id={nodeId || "nodeId"}
//           value={nodeId}
//           placeholder="x"
//           readOnly={true}
//         />
//       </div>

//       <div className="flex flex-col gap-1.5 mb-4">
//         <span>Position</span>
//         <div className="flex justify-between gap-2">
//           <InputGroup
//             type="number"
//             value={coords.x}
//             onChange={(e) =>
//               setCoords((coords) => ({ ...coords, x: Number(e.target.value) }))
//             }
//             label="X :"
//             id="X"
//             placeholder="X"
//           />

//           <InputGroup
//             type="number"
//             value={coords.y}
//             onChange={(e) =>
//               setCoords((coords) => ({ ...coords, y: Number(e.target.value) }))
//             }
//             label="Y :"
//             id="Y"
//             placeholder="Y"
//           />
//         </div>
//       </div>
//     </>
//   );
// }
