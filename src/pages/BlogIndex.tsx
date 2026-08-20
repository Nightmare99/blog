import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react"
import { PostCard } from "@/components/PostCard"
import { PinnedSection } from "@/components/PinnedSection"
import { LogStats } from "@/components/LogStats"
import {
  posts as allPosts,
  ALL_CATEGORIES,
  CATEGORY_COLOR,
  CATEGORY_CHIP_ACTIVE,
  formatDate,
} from "@/lib/posts"
import { cn } from "@/lib/utils"
import { usePostFilters } from "@/hooks/usePostFilters"

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function BlogIndex() {
  const latest = allPosts[0]
  const {
    query,
    activeCategories,
    page,
    totalPages,
    pinnedPosts,
    posts,
    totalMatches,
    hasActiveFilters,
    setQuery,
    toggleCategory,
    setPage,
    clearFilters,
  } = usePostFilters()

  return (
    <section className="relative py-10 md:py-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header row: title block + stats readout, paired side by side
            at matching height — not sticky, scoped to this row only. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-4 flex items-center gap-3 font-mono text-xs"
            >
              <span className="flex h-7 w-7 items-center justify-center border-2 border-void-line bg-void-raised font-bold text-signal-cyan shadow-brutal-sm">
                &gt;_
              </span>
              <span className="h-0.5 w-8 bg-void-line" />
              <span className="data-label">/blog</span>
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-6xl"
            >
              System log
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.22 }}
              className="mt-4 max-w-lg text-base italic text-ink-muted md:text-lg"
            >
              Engineering write-ups, career notes, and the occasional
              personal entry — everything logged in one place, timestamped
              and tagged.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="mt-7 flex items-center gap-2 font-mono text-xs text-ink-faint"
            >
              <span className="status-dot text-signal-lime" />
              <span>
                {allPosts.length} {allPosts.length === 1 ? "entry" : "entries"}{" "}
                indexed · latest {formatDate(latest.meta.date)}
              </span>
            </motion.div>
          </div>

          {/* Stats readout, desktop only — matched height with the title
              block via lg:items-stretch on the row above. */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <LogStats posts={allPosts} className="h-full" />
          </motion.div>
        </div>

        {/* Search + category filter */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-9 flex flex-col gap-4"
        >
          <div className="relative max-w-lg">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search entries..."
              aria-label="Search entries"
              className="w-full border-2 border-void-line bg-void-raised py-2.5 pl-10 pr-10 font-mono text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-signal-lime focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-signal-lime"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ALL_CATEGORIES.map((category) => {
              const active = activeCategories.includes(category)
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-1.5 border-2 px-2.5 py-1 font-mono text-xs font-semibold transition-transform duration-150",
                    active
                      ? CATEGORY_CHIP_ACTIVE[category]
                      : "border-void-line text-ink-muted hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-void-raised hover:shadow-brutal-sm"
                  )}
                >
                  <span className={cn("status-dot", active ? "text-void" : CATEGORY_COLOR[category])} />
                  {category}
                </button>
              )
            })}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-mono text-xs font-semibold text-ink-faint underline-offset-2 transition-colors hover:text-signal-lime hover:underline"
              >
                clear
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <p className="font-mono text-xs text-ink-faint">
              {totalMatches} {totalMatches === 1 ? "match" : "matches"}
            </p>
          )}
        </motion.div>

        <div className="mt-8">
          <PinnedSection posts={pinnedPosts} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pinnedPosts.length === 0 && posts.length === 0 && (
              <div className="panel flex flex-col items-center gap-2 px-6 py-16 text-center md:col-span-2">
                <span className="font-mono text-xs font-semibold text-signal-pink">no matches</span>
                <p className="text-sm text-ink-muted">
                  Nothing in the log matches that search or filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-2 font-mono text-xs font-semibold text-signal-lime hover:underline"
                >
                  clear filters
                </button>
              </div>
            )}

            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between font-mono text-xs font-semibold text-ink-faint">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="flex items-center gap-1.5 transition-colors hover:text-signal-lime disabled:pointer-events-none disabled:opacity-30"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              prev
            </button>
            <span>
              page {String(page).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="flex items-center gap-1.5 transition-colors hover:text-signal-lime disabled:pointer-events-none disabled:opacity-30"
            >
              next
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
