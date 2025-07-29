export default function InstructionField() {
  return (
    <div className="max-h-44">
      <textarea
        name="instruction"
        placeholder="Your Instructions (optional)"
        className="w-full min-h-20 max-h-44 border-2 p-2 border-gray-300 rounded-xl focus:ring-gray-400 focus:ring-2 focus:border-none focus:outline-2 focus:ring-offset-2 transition duration-150 placeholder-gray-400 focus:shadow-lg focus:shadow-gray-200/30"
      />
    </div>
  );
}
