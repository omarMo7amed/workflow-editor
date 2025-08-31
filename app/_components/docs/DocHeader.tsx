export default function DocHeader() {
  return (
    <div className="space-y-6" id="overview">
      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        Workflow Automation Platform
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed">
        A powerful platform for designing, executing, and managing workflows
        with a visual editor. Create and edit workflows using an intuitive
        drag-and-drop interface, execute them with AI-powered summarization via
        Groq API, and generate downloadable reports, all seamlessly integrated
        with Supabase for secure data management and scalable performance.
      </p>
    </div>
  );
}
