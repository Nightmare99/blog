import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { PanelHeader } from "@/components/ui/panel-header"
import { Badge } from "@/components/ui/badge"
import { getPost, CATEGORY_COLOR, formatDate } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : undefined

  if (!post) return <Navigate to="/" replace />

  const { meta, Component } = post

  return (
    <article className="py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4 md:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-signal-teal"
        >
          ← /blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="panel mb-10 overflow-hidden"
        >
          <PanelHeader path={`GET /blog/${post.slug}`} />
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
              <span className={cn("flex items-center gap-1.5", CATEGORY_COLOR[meta.category])}>
                <span className="status-dot" />
                {meta.category}
              </span>
              <span>{formatDate(meta.date)}</span>
              <span>·</span>
              <span>{meta.readTime}</span>
              <span className="ml-auto">#{String(post.seq).padStart(3, "0")}</span>
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {meta.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {meta.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="post-content">
          <Component />
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-void-line pt-6 font-mono text-xs text-ink-faint">
          <Link to="/" className="transition-colors hover:text-signal-teal">
            ← back to log
          </Link>
          <span>EOF</span>
        </div>
      </div>
    </article>
  )
}
