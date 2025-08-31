export default function FrontendArchSection() {
  return (
    <section className="space-y-6" id="fullstack-architecture">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Full-Stack Architecture
      </h2>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-amber-800 text-xs font-bold">!</span>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-2">
              Secure and Scalable Setup
            </h3>
            <p className="text-amber-700 text-sm">
              This app leverages a full-stack architecture with user
              authentication, cloud storage, and backend processing. Sign up or
              log in to access your workflows, which are securely stored and
              executed via Supabase and integrated APIs.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p>
          The Workflow Automation Platform is built to deliver a fast, secure,
          and scalable experience using Next.js, Zustand, Supabase, and the Groq
          API. Here&#39;s what happens behind the scenes — combining frontend
          reactivity with backend reliability:
        </p>

        <ul className="space-y-2">
          <li>
            <strong>State Management:</strong> Frontend state is handled
            efficiently with Zustand for workflows, filtering, and session
            caching, ensuring smooth UI updates.
          </li>
          <li>
            <strong>Authentication and User Data:</strong> Secure login via
            Supabase handles user sessions, profiles, and avatars stored in
            cloud buckets.
          </li>
          <li>
            <strong>Workflow Persistence:</strong> Workflows are saved to
            Supabase database, allowing retrieval, editing, and execution across
            devices.
          </li>
          <li>
            <strong>Execution and Integration:</strong> Backend Server Actions
            trigger the workflow engine, which integrates with Groq API for
            summarization and generates reports (PDF/CSV) stored in Supabase.
          </li>
          <li>
            <strong>Real-Time Feedback:</strong> Execution status and results
            are fetched and displayed in real time, with support for execution
            history and downloadable reports.
          </li>
        </ul>
      </div>
    </section>
  );
}
