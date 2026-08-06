import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  neon?: boolean;
  children: React.ReactNode;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]",
  secondary:
    "bg-primary-50 text-primary hover:bg-primary-100 active:scale-[0.98]",
  ghost:
    "bg-transparent text-muted hover:text-foreground hover:bg-surface-alt active:scale-[0.98]",
  outline:
    "bg-transparent text-foreground border-2 border-border hover:border-primary hover:text-primary active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-6 py-3 text-sm rounded-xl gap-2",
  lg: "px-8 py-4 text-base rounded-xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  neon = false,
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const isPrimary = variant === "primary";
  
  // If neon is true, force it to behave like a primary button structurally (white text, no weird hover colors)
  // because the .btn-neon class gives it a solid primary green background layer.
  const customClasses = neon 
    ? "text-white shadow-md hover:shadow-lg active:scale-[0.98] btn-neon"
    : variantStyles[variant];

  const classes = `
    inline-flex items-center justify-center font-semibold
    transition-all duration-300 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    ${customClasses}
    ${sizeStyles[size]}
    ${className}
  `.trim();

  const renderContent = () => (
    <>
      {neon && (
        <div className="absolute inset-0 rounded-[inherit] bg-primary z-[-1] transition-colors duration-300 group-hover:bg-primary-dark"></div>
      )}
      <span className="relative z-10 flex items-center justify-center gap-[inherit] w-full h-full">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {neon ? renderContent() : children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {neon ? renderContent() : children}
    </button>
  );
}
