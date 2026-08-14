import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { posts, CATEGORY_COLOR, formatDate } from "@/lib/posts"
import { cn } from "@/lib/utils"

function TerminalTail() {
  const recent = posts.slice(0, 4)
  return (
    <div className="panel scan-line mb-16 overflow-hidden">
      <div className="flex items-center justify-between border-b border-void-line px-4 py-2.5 font-mono text-xs">
        <div className="flex items-center gap-2 text-ink-muted">
          <span className="flex shrink-0 gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-signal-rose/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-teal/70" />
          </span>
          <span className="ml-2 text-ink-faint">tail -f system.log</span>
        </div>
        <span className="text-signal-teal/80">live</span>
      </div>
      <div className="space-y-1.5 px-5 py-4 font-mono text-[0.8rem] leading-relaxed">
        {recent.map((p, i) => (
          <div key={p.slug} className="flex gap-3 text-ink-muted">
            <span className="text-ink-faint">{formatDate(p.meta.date)}</span>
            <span className={cn("text-signal-teal/70")}>
              [{p.meta.category}]
            </span>
            <span className={i === 0 ? "text-ink" : ""}>
              {p.meta.title}
              {i === 0 && <span className="caret" />}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BlogIndex() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 flex items-center gap-3 font-mono text-xs">
            <span className="text-signal-teal">log</span>
            <span className="h-px w-8 bg-void-line" />
            <span className="data-label">/blog</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            System log
          </h1>
          <p className="mt-3 text-ink-muted">
            Notes from building and shipping things — engineering write-ups,
            observations, and the occasional postmortem.
          </p>
        </div>

        <TerminalTail />

        <div className="flex max-w-3xl flex-col gap-4">
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
                className="panel panel-hover group block p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
                      <span
                        className={cn(
                          "flex items-center gap-1.5",
                          CATEGORY_COLOR[post.meta.category]
                        )}
                      >
                        <span className="status-dot" />
                        {post.meta.category}
                      </span>
                      <span>{formatDate(post.meta.date)}</span>
                      <span>·</span>
                      <span>{post.meta.readTime}</span>
                      <span className="ml-auto text-ink-faint">
                        #{String(post.seq).padStart(3, "0")}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-ink transition-colors group-hover:text-signal-teal">
                      {post.meta.title}
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
      </div>
    </section>
  )
}
