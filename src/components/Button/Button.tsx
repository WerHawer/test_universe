import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  PropsWithChildren & {
    variant?: "regular" | "controls";
  };

export const Button = ({
  children,
  className,
  variant = "regular",
  ...props
}: ButtonProps) => {
  const classes =
    variant === "controls"
      ? "w-[25px] h-[25px] px-0 py-0 text-xs"
      : "w-full px-4 py-2";

  return (
    <button
      {...props}
      className={`flex content-center justify-center flex-wrap  text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700 ${classes} ${className}`}
    >
      {children}
    </button>
  );
};
