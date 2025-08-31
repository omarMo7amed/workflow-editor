import { ReactNode } from "react";

interface ButtonProps {
  degree?: "main" | "secondary" | "danger";
  extraStyle?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (arg?: unknown) => void;
  type?: "button" | "submit";
  title?: string;
}

export default function Button({
  degree = "main",
  extraStyle,
  children,
  disabled = false,
  onClick,
  type = "button",
  title = "",
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 text-sm cursor-pointer transition-colors duration-200 focus:ring-2 focus:ring-slate-400";

  const degreeStyles = {
    main: " bg-slate-900 font-semibold text-white hover:bg-slate-700",
    secondary: " bg-slate-200 hover:bg-slate-300",
    danger: " bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${degreeStyles[degree] || degreeStyles.main} ${
        extraStyle || ""
      }`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
}
