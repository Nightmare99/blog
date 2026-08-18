import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Pin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { CATEGORY_COLOR, formatDate, type PostEntry } from "@/lib/posts"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: PostEntry
  index?: number
  pinned?: boolean
}

export function PostCard({ post, index = 0, pinned = false }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={`/${post.slug}`}
        className={cn(
          "panel panel-hover group relative block p-6 transition-transform duration-300 hover:-translate-y-0.5",
          pinned && "pl-7"
        )}
      >
        {pinned && (
          <span
            aria-hidden
            className="absolute inset-y-2 left-2 w-1 bg-signal-lime"
          />
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
              {pinned && (
                <span className="flex items-center gap-1 text-signal-lime">
                  <Pin className="h-3 w-3 fill-current" />
                </span>
              )}
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
            <h2 className="mt-2 flex items-center gap-2 text-lg font-bold text-ink transition-colors group-hover:text-signal-cyan">
              {post.meta.title}
              <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-signal-cyan opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{post.meta.excerpt}</p>
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
  )
}
