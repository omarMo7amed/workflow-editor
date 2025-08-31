export default function EditorLoading() {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate/30 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="border-blue-500 h-16 w-16 border-t-2 border-b-2  rounded-full animate-spin" />
        <p className="mt-4 text-slate-800 font-medium">Loading...</p>
      </div>
    </div>
  );
}
