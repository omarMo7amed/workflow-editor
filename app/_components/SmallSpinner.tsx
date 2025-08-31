// Example usage in a page

export default function SmallSpinner({
  className = "h-6 w-6 border-gray-300 border-t-blue-500",
}: {
  className?: string;
}) {
  return <div className={`animate-spin rounded-full border-2 ${className}`} />;
}
