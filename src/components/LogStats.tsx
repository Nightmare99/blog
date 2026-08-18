import { PanelHeader } from "@/components/ui/panel-header"
import { ALL_CATEGORIES, CATEGORY_COLOR, CATEGORY_FILL, formatDate, type PostEntry } from "@/lib/posts"
import { cn } from "@/lib/utils"

/**
 * Replaces the old DNA helix. Same underlying idea — a glanceable read of
 * how the log breaks down by category — translated into a flat terminal
 * readout instead of a 3D scene, to match the brutalist redesign.
 */
export function LogStats({ posts }: { posts: PostEntry[] }) {
  const latest = posts[0]
  const pinnedCount = posts.filter((p) => p.meta.pinned).length
  const breakdown = ALL_CATEGORIES.map((category) => ({
    category,
    count: posts.filter((p) => p.meta.categories.includes(category)).length,
  }))
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count))

  return (
    <div className="panel overflow-hidden">
      <PanelHeader path="GET /blog/stats" />
      <div className="p-6">
        <div className="flex items-end justify-between border-b-2 border-void-line pb-5">
          <span className="text-5xl font-bold leading-none tracking-tight text-ink">
            {String(posts.length).padStart(2, "0")}
          </span>
          <span className="data-label pb-1">entries logged</span>
        </div>

        <div className="mt-5 space-y-3.5">
          {breakdown.map(({ category, count }) => (
            <div key={category} className="font-mono text-xs">
              <div className="mb-1.5 flex items-center justify-between">
                <span className={cn("flex items-center gap-1.5", CATEGORY_COLOR[category])}>
                  <span className="status-dot" />
                  {category}
                </span>
                <span className="text-ink-faint">{String(count).padStart(2, "0")}</span>
              </div>
              <div className="h-2 w-full border-2 border-void-line bg-void">
                <div
                  className={cn("h-full", CATEGORY_FILL[category])}
                  style={{ width: `${Math.max(4, (count / maxCount) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-2 border-t-2 border-void-line pt-4 font-mono text-xs text-ink-faint">
          <div className="flex items-center justify-between">
            <span>latest</span>
            <span className="text-ink-muted">{formatDate(latest.meta.date)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>pinned</span>
            <span className="text-signal-lime">{String(pinnedCount).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
