import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-none border-2 px-2 py-0.5 text-[0.7rem] font-mono font-semibold tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-signal-lime focus:ring-offset-1 focus:ring-offset-void",
  {
    variants: {
      variant: {
        default:
          "border-void-line bg-signal-lime text-void",
        secondary:
          "border-void-line bg-void-raised text-ink-muted",
        outline: "border-void-line text-ink-muted hover:bg-signal-lime hover:text-void",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
