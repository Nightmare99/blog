import { Link } from "react-router-dom"

export function NotFound() {
  return (
    <section className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <span className="font-mono text-xs text-signal-rose">404 NOT FOUND</span>
      <h1 className="mt-3 text-2xl font-semibold text-ink">
        No entry at this route<span className="caret" />
      </h1>
      <p className="mt-3 max-w-sm text-ink-muted">
        That log entry doesn't exist, or it moved.
      </p>
      <Link
        to="/"
        className="mt-6 font-mono text-sm text-signal-teal hover:underline"
      >
        ← back to /blog
      </Link>
    </section>
  )
}
