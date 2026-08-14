import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { posts } from "@/lib/posts"

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-void-line bg-void/85 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-mono text-sm text-ink"
          >
            <span className="status-dot text-signal-teal" />
            <span className="font-semibold tracking-tight">vishal.kumar</span>
            <span className="text-ink-faint">/blog</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-xs text-ink-faint sm:inline">
              {String(posts.length).padStart(2, "0")} entries logged
            </span>
            <a
              href="https://nightmare99.github.io/"
              className="flex items-center gap-1.5 font-mono text-xs text-ink-muted transition-colors hover:text-signal-teal"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              portfolio
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
