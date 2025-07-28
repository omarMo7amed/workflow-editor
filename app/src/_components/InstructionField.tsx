export default function InstructionField() {
  return (
    <div className="max-h-44">
      <textarea
        name="instruction"
        placeholder="Your Instructions (optional)"
        className="w-full min-h-20 max-h-44 border-2 p-2 border-gray-200 rounded-xl outline-none focus:ring-gray-400 focus:ring-2 focus:border-none focus:outline-2 focus:ring-offset-2 transition duration-150 text-gray-600 placeholder-gray-400"
      />
    </div>
  );
}
