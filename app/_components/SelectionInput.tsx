"use client";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../_hooks/useOutSideClick";

interface Option {
  value: string;
  label: string;
}

interface SelectionInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label?: string;
  options: Option[];
  className?: string;
  value?: string;
  onSelectChange?: (value: string) => void;
}

export default function SelectionInput({
  id,
  label,
  options,
  className = "",
  value = "",
  onSelectChange,
  ...props
}: SelectionInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(value);
    onSelectChange?.(label);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ||
    "Select an option";

  return (
    <div className={`form-group mb-4 ${className}`} {...props}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm text-gray-600 mb-2 font-medium"
        >
          {label}
        </label>
      )}

      <div className="relative" ref={ref}>
        <div
          id={id}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          tabIndex={0}
          className="w-full border-2 p-2 pr-2 border-gray-300 rounded-xl focus:ring-gray-400 focus:ring-2 focus:border-none focus:outline-none focus:ring-offset-2 transition duration-200 placeholder-gray-400 hover:shadow-lg hover:shadow-gray-200/30 focus:scale-[1.02] focus:shadow-xl focus:shadow-gray-200/50 cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
        >
          <span>{selectedLabel}</span>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isOpen && options.length !== 0 && (
          <ul
            id={`${id}-listbox`}
            role="listbox"
            className="absolute w-full mt-2 border-2 border-gray-300 rounded-xl bg-white shadow-lg shadow-gray-200/50 max-h-44 overflow-y-auto z-10 animate-dropdown"
          >
            {options.map((option) => (
              <li
                key={option.label}
                role="option"
                aria-selected={selectedOption === option.value}
                className={`p-2.5 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${
                  selectedOption === option.value
                    ? "bg-gray-50 font-medium"
                    : ""
                }`}
                tabIndex={0}
                onClick={() => handleOptionClick(option.value, option.label)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
        {isOpen && options.length === 0 && (
          <p className="mt-2 ml-2 text-slate-700">No Options Available!</p>
        )}
      </div>
    </div>
  );
}
