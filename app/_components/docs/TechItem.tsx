import { TechnologiesTypes } from "../../_types/types";

export default function TechItem({ tech }: { tech: TechnologiesTypes }) {
  return (
    <div
      key={tech.name}
      className="bg-white border border-gray-200 rounded-lg p-4"
    >
      <div className="font-medium text-gray-900">{tech.name}</div>
      <div className="text-sm text-gray-600 mt-1">{tech.desc}</div>
    </div>
  );
}
