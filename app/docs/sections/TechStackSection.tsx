import { Integrations, Libraries, Technologies } from "../../_utils/constants";
import TechItem from "../../_components/docs/TechItem";
import { TechnologiesTypes } from "../../_types/types";

export default function TechStack() {
  return (
    <section
      className="space-y-6"
      id="tech-stack"
      aria-label="This Section for technical only"
    >
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Technology Stack <span className="text-red-600"> (Technical Only)</span>
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Core Framework & Tools
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Technologies.map((tech) => (
              <li
                key={tech.name}
                className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
              >
                <div className="font-medium text-gray-900 text-sm">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">{tech.desc}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Specialized Libraries
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Libraries.map((tech: TechnologiesTypes) => (
              <TechItem tech={tech} key={tech.name} />
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Data & Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Integrations.map((tech: TechnologiesTypes) => (
              <TechItem tech={tech} key={tech.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
