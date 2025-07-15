import * as React from "react"

type Variant = "default" | "secondary" | "destructive" | "success" | "warning" | "outline"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant
}

function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"

  const variantClass =
    variant === "default"
      ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
      : variant === "secondary"
      ? "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
      : variant === "destructive"
      ? "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"
      : variant === "success"
      ? "border-transparent bg-success text-success-foreground hover:bg-success/80"
      : variant === "warning"
      ? "border-transparent bg-warning text-warning-foreground hover:bg-warning/80"
      : "text-foreground" // outline

  return (
    <div className={`${baseClasses} ${variantClass} ${className}`} {...props} />
  )
}

export { Badge }
