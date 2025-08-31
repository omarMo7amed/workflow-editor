import { PortfolioValueCardProps } from "../../_types/types";

export default function PortfolioValueCard({
  id,
  title,
  items,
}: PortfolioValueCardProps) {
  return (
    <div className="space-y-3" id={id}>
      <h3 className="font-medium text-gray-900">{title}</h3>
      <ul className="text-sm text-gray-600 space-y-1">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
