import * as React from "react";
import { cn } from "@/lib/utils"; // kalau belum ada utils.ts, ganti saja dengan className langsung

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
