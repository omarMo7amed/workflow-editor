import { ReactNode } from "react";

interface ButtonProps {
  degree?: "main" | "secondary";
  extraStyle?: string;
  children: ReactNode;
  onClick?: (arg?: unknown) => void;
}

export default function Button({
  degree = "main",
  extraStyle,
  children,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "px-4 py-1.5 text-sm cursor-pointer transition-colors duration-200 focus:ring-2 focus:ring-slate-400";

  const degreeStyles = {
    main: " bg-slate-900 font-semibold text-white hover:bg-slate-700",
    secondary: " bg-slate-200 hover:bg-slate-300",
  };

  return (
    <button
      className={`${baseStyles} ${degreeStyles[degree] || degreeStyles.main} ${
        extraStyle || ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
