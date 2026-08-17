import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Pin } from "lucide-react"
import { PostCard } from "@/components/PostCard"
import { usePersistedState } from "@/hooks/usePersistedState"
import { cn } from "@/lib/utils"
import type { PostEntry } from "@/lib/posts"

export function PinnedSection({ posts }: { posts: PostEntry[] }) {
  const [collapsed, setCollapsed] = usePersistedState("blog:pinned-collapsed", false)

  if (posts.length === 0) return null

  return (
    <div className="mb-8">
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
        className="flex w-full items-center justify-between gap-3 rounded-sm border border-void-line bg-void-raised px-4 py-2.5 transition-colors hover:border-signal-teal/30"
      >
        <span className="flex items-center gap-2.5">
          <Pin className="h-3.5 w-3.5 text-signal-teal" />
          <span className="data-label">pinned</span>
          <span className="font-mono text-xs text-ink-faint">· {posts.length}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-ink-faint transition-transform duration-300",
            !collapsed && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="pinned-list"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} pinned />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
