export default function TargetAudienceCard() {
  return (
    <div
      className="bg-gray-50 rounded-lg p-6 border border-gray-200"
      id="target-audience"
    >
      <h3 className="text-lg font-medium text-gray-900 mb-3">
        Target Audience
      </h3>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Non-technical Users</strong> seeking an intuitive visual editor to design and manage workflows without coding expertise
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Business Professionals</strong> aiming to automate repetitive tasks and generate downloadable reports (PDF/CSV) for streamlined operations
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Students & Researchers</strong> who need to create, execute, and summarize workflows with AI-powered insights from the Groq API
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Workflow Automation Enthusiasts</strong> interested in leveraging Supabase-backed storage and execution history to manage complex workflows
          </span>
        </li>
      </ul>
    </div>
  );
}