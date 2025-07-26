export default function DocsPurposeSection() {
  return (
    <section className="space-y-6" id="documentation-purpose">
      <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
        About This Documentation
      </h2>

      <div className="prose prose-gray max-w-none">
        <p>
          This documentation is designed to support two main groups: end users
          who want to build workflows with ease, and developers who are
          interested in how this application works under the hood.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* End Users */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">For End Users</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Learn how to create and connect nodes step by step</li>
            <li>• Understand what each workflow node does</li>
            <li>• Discover real examples for building useful automations</li>
            <li>• Get help with issues or common mistakes</li>
          </ul>
        </div>

        {/* Developers */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">For Developers</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Explore app structure, folder layout, and data flow</li>
            <li>• See how drag-and-drop, node execution, and caching work</li>
            <li>
              • Learn how AI integration is handled in a frontend-only app
            </li>
            <li>• Use this as a reference for building similar editors</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-gray-700 text-sm">
          Whether you&#39;re here to build your first automation or to learn
          from the system&#39;s architecture and implementation — this
          documentation is your companion. It explains both how to use the app
          effectively and how its internal logic works for anyone curious to
          dive deeper.
        </p>
      </div>
    </section>
  );
}
