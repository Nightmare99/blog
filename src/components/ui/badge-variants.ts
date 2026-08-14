import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-sm border px-2 py-0.5 text-[0.7rem] font-mono tracking-tight transition-colors focus:outline-none focus:ring-1 focus:ring-signal-teal focus:ring-offset-1 focus:ring-offset-void",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-signal-teal text-void font-semibold",
        secondary:
          "border-void-line bg-void-raised text-ink-muted",
        outline: "border-void-line text-ink-muted hover:border-signal-teal/40 hover:text-signal-teal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
