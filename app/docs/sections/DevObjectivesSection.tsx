import { devObjectives } from "@/app/src/_utils/constants";
import ObjectiveCard from "../components/ObjectiveCard";
import { DevObjective } from "@/app/src/_types/types";

export default function DevObjectivesSection() {
  return (
    <section className="space-y-6" id="development-objectives">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Why Choose Our AI Workflow Platform?
      </h2>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
        <p className="text-gray-800 leading-relaxed text-lg">
          Our platform combines cutting-edge AI technology with thoughtful
          design to help you automate tasks, process documents, and streamline
          workflows without any coding required.
        </p>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-amber-400 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-800">
              <strong>Ready to get started?</strong> Try creating your first
              workflow with our step-by-step guide, or explore the features
              below to see what&#39;s possible.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {devObjectives.map((objective: DevObjective) => (
          <ObjectiveCard
            key={objective.id}
            id={objective.id}
            icon={objective.icon}
            iconBg={objective.iconBg}
            iconColor={objective.iconColor}
            title={objective.title}
            description={objective.description}
          />
        ))}
      </div>
    </section>
  );
}
