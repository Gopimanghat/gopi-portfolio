import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/10",
        "bg-white/5 backdrop-blur-xl",
        "p-8 transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-indigo-500/40",
        "hover:shadow-2xl hover:shadow-indigo-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}