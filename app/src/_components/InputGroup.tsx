import { InputHTMLAttributes } from "react";

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  id: string;
  value?: string | number;
  readOnly?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputGroup({
  type,
  label,
  id,
  value,
  readOnly = false,
  placeholder,
  onChange,
  ...props
}: InputGroupProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-600 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full border-2 p-1.5 border-gray-300 rounded-xl  ${
          readOnly
            ? "bg-gray-200"
            : "focus:ring-gray-400 focus:ring-2 focus:border-none focus:outline-none focus:ring-offset-1 transition duration-150 placeholder-gray-400 focus:shadow-lg focus:shadow-gray-200/30"
        } `}
        {...props}
      />
    </div>
  );
}
