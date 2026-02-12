// src/components/ui/Button.tsx
import React, { ButtonHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Função utilitária para combinar classes do tailwind com segurança
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline-primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-(--color-brand-blue) text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-purple-600 text-white hover:bg-purple-700 shadow-md",
    "outline-primary": "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base font-medium",
    lg: "px-8 py-4 text-lg font-bold",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;