import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { AnchorHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-xl px-6 py-3 font-medium transition-all duration-300",
        "active:scale-95",
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30"
          : "border border-gray-600 bg-transparent text-white hover:border-indigo-500 hover:bg-indigo-500/10",
        className
      )}
    >
      {children}
    </button>
  );
}

// Add this new component below or alongside your existing Button


interface ResumeButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  fileName?: string;
  label?: string;
}

export function ResumeButton({
  fileName = "Gopikrishnan_resume.pdf",
  label = "Resume",
  className,
  ...props
}: ResumeButtonProps) {
  return (
    <a
      href={`/${fileName}`}
      download
      className={clsx(
        "rounded-xl px-6 py-3 font-medium transition-all duration-300",
        "border border-gray-600 bg-transparent text-white",
        "hover:border-indigo-500 hover:bg-indigo-500/10",
        className
      )}
      {...props}
    >
      {label}
    </a>
  );
}