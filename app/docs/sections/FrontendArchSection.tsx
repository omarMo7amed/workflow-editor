export default function FrontendArchSection() {
  return (
    <section className="space-y-6" id="frontend-architecture">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        Frontend-Only Architecture
      </h2>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-amber-800 text-xs font-bold">!</span>
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-2">
              Zero Setup Required
            </h3>
            <p className="text-amber-700 text-sm">
              This app works entirely in your browser. There’s no backend, no
              login, and nothing to install. Everything you build, run, or save
              stays on your device.
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p>
          The AI Workflow Editor is built to deliver a smooth, full-featured
          experience with no server or cloud requirements. Here&#39;s what
          happens behind the scenes — all within your browser:
        </p>

        <ul className="space-y-2">
          <li>
            <strong>State Persistence:</strong> Your workflows are saved
            automatically to your browser using IndexedDB and localStorage.
          </li>
          <li>
            <strong>Mock API Simulation:</strong> We use mock APIs to mimic real
            server behavior, so you can test without needing an actual backend.
          </li>
          <li>
            <strong>Live-Like Updates:</strong> Your changes update in real time
            — it feels like working in a connected, smart system.
          </li>
          <li>
            <strong>Background Tasks:</strong> File reading, PDF parsing, and
            other heavy logic happen in the background so your interface never
            freezes.
          </li>
          <li>
            <strong>Offline Capability:</strong> Even without internet access,
            your editor still works. Your data is safe locally.
          </li>
        </ul>
      </div>
    </section>
  );
}
