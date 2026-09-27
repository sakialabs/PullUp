import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] px-4 text-sm font-bold transition-[transform,background-color,border-color,color] outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-3 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "border border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",
        secondary:
          "border border-[var(--border-strong)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--muted)]",
        soft:
          "border border-transparent bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted-strong)]",
        ghost:
          "border border-transparent bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
        dark:
          "border border-transparent bg-[var(--doorstep)] text-[var(--night-text)] hover:bg-[var(--doorstep-soft)]",
      },
      size: {
        default: "h-11",
        lg: "h-13 rounded-[16px] px-5 text-base",
        sm: "h-9 min-h-9 rounded-xl px-3 text-xs",
        icon: "size-11 min-h-11 shrink-0 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
