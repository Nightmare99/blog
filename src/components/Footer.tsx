export function Footer() {
  return (
    <footer className="border-t-2 border-void-line py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 font-mono text-xs text-ink-faint md:flex-row md:px-8">
        <span>© {new Date().getFullYear()} Vishal Kumar</span>
        <div className="flex items-center gap-4">
          <a href="https://nightmare99.github.io/" className="transition-colors hover:text-signal-lime">
            portfolio
          </a>
          <a href="https://github.com/nightmare99" className="transition-colors hover:text-signal-lime">
            github
          </a>
          <a href="https://www.linkedin.com/in/mnq-/" className="transition-colors hover:text-signal-lime">
            linkedin
          </a>
        </div>
      </div>
    </footer>
  )
}
