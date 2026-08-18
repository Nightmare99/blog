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
 * conceit, and the exact same sticker treatment, as the main portfolio
 * site: every screen reads as a route being inspected.
 */
export function PanelHeader({ path, status = "200 OK", className }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b-2 border-void-line bg-signal-lime px-4 py-2.5 font-mono text-xs text-void",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-void/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-void/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-void/70" />
        </span>
        <span className="ml-2 truncate font-semibold">{path}</span>
      </div>
      <span className="shrink-0 font-semibold">{status}</span>
    </div>
  )
}
