import { ObjectiveCardProps } from "@/app/src/_types/types";

export default function ObjectiveCard({
  id,
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: ObjectiveCardProps) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      id={id}
    >
      <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
        <span
          className={`w-8 h-8 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center mr-3 text-sm font-bold`}
        >
          {icon}
        </span>
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
