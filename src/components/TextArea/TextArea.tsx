import { forwardRef, TextareaHTMLAttributes } from "react";

type TextAreaProps = {
  placeholder?: string;
  rows?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder = "Уведіть текст тут...", rows = 5, ...rest }, ref) => {
    return (
      <textarea
        {...rest}
        className="w-full p-2 text-gray-900 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        rows={rows}
        placeholder={placeholder}
        ref={ref}
        data-testid="textarea"
      />
    );
  },
);
