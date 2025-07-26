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
            <strong>Non-technical Users</strong> looking to create custom
            automations with a simple drag-and-drop interface
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Professionals</strong> who need to streamline repetitive
            tasks like document processing or summarization
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>Students & Researchers</strong> seeking to extract data from
            PDFs or documents with minimal effort
          </span>
        </li>
        <li className="flex items-start">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>
            <strong>AI Enthusiasts</strong> curious about using AI to automate
            tasks like summarization and content delivery
          </span>
        </li>
      </ul>
    </div>
  );
}
