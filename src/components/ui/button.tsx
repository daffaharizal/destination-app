import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-blue-500 text-white hover:bg-blue-600",
        tabToggleActive:
          "bg-white text-blue-500 hover:bg-white rounded-full px-6 py-2 transition font-semibold focus:outline-none focus:ring-0 border-0 ring-0 outline-none",
        tabToggleBase:
          "bg-transparent text-blue-400 hover:bg-transparent hover:text-blue-400 rounded-full px-6 py-2 transition font-semibold focus:outline-none focus:ring-0 border-0 ring-0 outline-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        outlineBlue:
          "border border-blue-500 text-blue-500 hover:bg-blue-100 bg-blue-50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        view: "border border-blue-500 bg-blue-100 hover:bg-blue-200 hover:border-blue-500",
        add: "bg-blue-500 text-white",
        update: "bg-yellow-500 text-white",
        delete: "bg-red-500 text-white",
        warning:
          "border border-yellow-500 bg-yellow-100 hover:bg-yellow-200 hover:border-yellow-500",
        danger:
          "border border-red-500 bg-red-100 hover:bg-red-200 hover:border-red-500",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
