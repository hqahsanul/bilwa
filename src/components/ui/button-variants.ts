import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative inline-flex shrink-0 transform-gpu items-center justify-center gap-2 whitespace-nowrap rounded-[0.875rem] px-4 text-sm font-medium select-none touch-manipulation shadow-none transition-[background-color,border-color,color,opacity,transform] duration-200 ease-out active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border border-border bg-muted text-foreground hover:bg-accent",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "border border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        signal: "border border-signal bg-signal text-signal-foreground hover:bg-signal/90",
        white: "border border-border bg-card text-foreground hover:bg-muted",
        destructive: "border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "h-auto border border-transparent bg-transparent px-0 text-foreground underline-offset-4 hover:text-muted-foreground hover:underline active:scale-100",
      },
      size: {
        default: "h-9 gap-2 px-4",
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        lg: "h-10 gap-2 px-5 text-[15px]",
        icon: "h-9 w-9 gap-0 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export { buttonVariants };
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;