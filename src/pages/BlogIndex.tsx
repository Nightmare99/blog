import { Link } from "react-router-dom"
import { lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  posts as allPosts,
  ALL_CATEGORIES,
  CATEGORY_COLOR,
  CATEGORY_CHIP_ACTIVE,
  formatDate,
} from "@/lib/posts"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { usePostFilters } from "@/hooks/usePostFilters"

const DnaHelix = lazy(() => import("@/components/scene/DnaHelix"))

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

function Helix({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Suspense fallback={null}>
        <DnaHelix />
      </Suspense>
    </div>
  )
}

export function BlogIndex() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const latest = allPosts[0]
  const {
    query,
    activeCategories,
    page,
    totalPages,
    posts,
    totalMatches,
    hasActiveFilters,
    setQuery,
    toggleCategory,
    setPage,
    clearFilters,
  } = usePostFilters()

  return (
    <div className="relative">
      {/* Ambient background — fixed to the viewport so the same atmosphere
          carries the whole page, not just the top of it. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal-teal/10 blur-[100px] md:h-[420px] md:w-[420px] md:blur-[110px]" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-signal-violet/10 blur-[90px] md:h-[320px] md:w-[320px] md:blur-[100px]" />
        {/* Helix as ambient backdrop on small screens — sits behind the
            content column rather than taking its own block in the flow. */}
        {!isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute inset-0"
          >
            <Helix className="h-full w-full" />
          </motion.div>
        )}
      </div>

      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
            {/* Left column: identity + full entry list */}
            <div>
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="mb-4 flex items-center gap-3 font-mono text-xs"
              >
                <span className="text-signal-teal">log</span>
                <span className="h-px w-8 bg-void-line" />
                <span className="data-label">/blog</span>
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl"
              >
                System log
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mt-4 max-w-lg text-base text-ink-muted md:text-lg"
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
                <span className="status-dot text-signal-teal" />
                <span>
                  {allPosts.length} {allPosts.length === 1 ? "entry" : "entries"}{" "}
                  indexed · latest {formatDate(latest.meta.date)}
                </span>
              </motion.div>

              {/* Search + category filter */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ duration: 0.7, delay: 0.42 }}
                className="mt-9 flex flex-col gap-4"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="search entries..."
                    aria-label="Search entries"
                    className="w-full rounded-sm border border-void-line bg-void-raised py-2.5 pl-9 pr-9 font-mono text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-signal-teal/50 focus:outline-none focus:ring-1 focus:ring-signal-teal/30"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-signal-teal"
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
                          "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-xs transition-colors",
                          active
                            ? CATEGORY_CHIP_ACTIVE[category]
                            : "border-void-line text-ink-muted hover:border-ink-faint hover:text-ink"
                        )}
                      >
                        <span className={cn("status-dot", CATEGORY_COLOR[category])} />
                        {category}
                      </button>
                    )
                  })}
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="font-mono text-xs text-ink-faint underline-offset-2 transition-colors hover:text-signal-teal hover:underline"
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

              <div className="mt-8 flex flex-col gap-4">
                {posts.length === 0 && (
                  <div className="panel flex flex-col items-center gap-2 px-6 py-16 text-center">
                    <span className="font-mono text-xs text-signal-rose">no matches</span>
                    <p className="text-sm text-ink-muted">
                      Nothing in the log matches that search or filter.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-2 font-mono text-xs text-signal-teal hover:underline"
                    >
                      clear filters
                    </button>
                  </div>
                )}

                {posts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                  >
                    <Link
                      to={`/${post.slug}`}
                      className="panel panel-hover group block p-6 transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
                            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                              {post.meta.categories.map((category) => (
                                <span
                                  key={category}
                                  className={cn("flex items-center gap-1.5", CATEGORY_COLOR[category])}
                                >
                                  <span className="status-dot" />
                                  {category}
                                </span>
                              ))}
                            </span>
                            <span>{formatDate(post.meta.date)}</span>
                            <span>·</span>
                            <span>{post.meta.readTime}</span>
                            <span className="ml-auto text-ink-faint">
                              #{String(post.seq).padStart(3, "0")}
                            </span>
                          </div>
                          <h2 className="mt-2 flex items-center gap-2 text-lg font-semibold text-ink transition-colors group-hover:text-signal-teal">
                            {post.meta.title}
                            <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-signal-teal opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </h2>
                          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                            {post.meta.excerpt}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {post.meta.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-between font-mono text-xs text-ink-faint">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="flex items-center gap-1.5 transition-colors hover:text-signal-teal disabled:pointer-events-none disabled:opacity-30"
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
                    className="flex items-center gap-1.5 transition-colors hover:text-signal-teal disabled:pointer-events-none disabled:opacity-30"
                  >
                    next
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right column: helix, desktop only, stays in view while the
                left column scrolls past it. */}
            {isDesktop && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="sticky top-24 h-[520px] w-full"
              >
                <Helix className="h-full w-full" />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
