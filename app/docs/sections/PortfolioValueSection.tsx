import { portfolioValues } from "@/app/src/_utils/constants";
import PortfolioValueCard from "../components/PortfolioValueCard";

export default function PortfolioValueSection() {
  return (
    <section className="space-y-6" id="portfolio-value">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        How This Tool Adds Value
      </h2>

      <div className="prose prose-gray max-w-none">
        <p>
          This visual workflow editor is built to simplify how you perform
          repetitive digital tasks. Without needing coding knowledge, you can
          read documents, summarize content using AI, and send results — all
          from your browser.
        </p>
        <p>Below are the core ways this tool is designed to help you:</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {portfolioValues.map((value) => (
          <PortfolioValueCard
            key={value.id}
            id={value.id}
            title={value.title}
            items={value.items}
          />
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-blue-800">
          Whether you&#39;re a student, a professional, or just curious about AI
          — this project gives you an intuitive, no-code environment to test out
          powerful automations in seconds.
        </p>
      </div>
    </section>
  );
}
