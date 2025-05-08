"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "accent" | "white"
  className?: string
}

export function LoadingSpinner({ size = "md", color = "primary", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  }

  const colorClasses = {
    primary: "border-primary/30 border-t-primary",
    secondary: "border-secondary/30 border-t-secondary",
    accent: "border-accent/30 border-t-accent",
    white: "border-white/30 border-t-white",
  }

  return (
    <div
      className={cn("animate-spin rounded-full", sizeClasses[size], colorClasses[color], className)}
      role="status"
      aria-label="Loading"
    />
  )
}

