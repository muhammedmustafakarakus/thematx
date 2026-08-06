import React from "react";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-alt text-muted border border-border",
  primary: "bg-primary-50 text-primary border border-primary-100",
  secondary: "bg-surface-alt text-foreground border border-border-light",
  success: "bg-success-light text-success border border-green-200",
  warning: "bg-warning-light text-warning border border-amber-200",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  );
}
