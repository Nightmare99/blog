import { cn } from "@/lib/utils"

interface PanelHeaderProps {
  /** e.g. "GET /blog/building-a-system-map" */
  path: string
  /** e.g. "200 OK" */
  status?: string
  className?: string
}

/**
 * Terminal/HTTP-request-styled chrome used atop each panel — the same
 * conceit as the main portfolio site, where every screen reads as a
 * route being inspected.
 */
export function PanelHeader({ path, status = "200 OK", className }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-void-line px-4 py-2.5 font-mono text-xs",
        className
      )}
    >
      <div className="flex items-center gap-2 text-ink-muted min-w-0">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-signal-rose/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal-teal/70" />
        </span>
        <span className="ml-2 truncate text-ink-faint">{path}</span>
      </div>
      <span className="shrink-0 text-signal-teal/80">{status}</span>
    </div>
  )
}
