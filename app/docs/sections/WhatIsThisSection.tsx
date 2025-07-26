import TargetAudienceCard from "../components/TargetAudienceCard";

export default function WhatIsThisSection() {
  return (
    <section className="space-y-6" id="what-is-this">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        What is the AI Workflow Editor?
      </h2>

      <div className="prose prose-gray max-w-none">
        <p>
          The AI Workflow Editor is a sophisticated frontend application that
          enables users to create, edit, and execute automation workflows
          through an intuitive visual interface. Built entirely in the browser,
          it simulates the experience of enterprise workflow platforms while
          showcasing advanced frontend development techniques.
        </p>

        <p>
          Users can drag and drop nodes representing different actions—from
          reading PDFs and processing documents to integrating with AI services
          and sending notifications—to build complex automation pipelines
          without writing code.
        </p>
      </div>

      <TargetAudienceCard />
    </section>
  );
}
