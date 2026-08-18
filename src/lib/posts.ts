import type { ComponentType } from "react"

export type Category = "engineering" | "notes" | "career" | "personal"

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  categories: Category[]
  readTime: string
  /** Pinned posts always sit in a separate section above the paginated list. */
  pinned?: boolean
}

export interface PostEntry {
  slug: string
  seq: number
  meta: PostMeta
  Component: ComponentType
}

interface PostModule {
  meta: PostMeta
  default: ComponentType
}

const modules = import.meta.glob<PostModule>("/src/content/posts/*.mdx", {
  eager: true,
})

const chronological: Omit<PostEntry, "seq">[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split("/").pop()!.replace(/\.mdx$/, ""),
    meta: mod.meta,
    Component: mod.default,
  }))
  .sort((a, b) => a.meta.date.localeCompare(b.meta.date))

/** Newest first for display, but `seq` reflects true publish order (like a log). */
export const posts: PostEntry[] = chronological
  .map((p, i) => ({ ...p, seq: i + 1 }))
  .reverse()

export function getPost(slug: string): PostEntry | undefined {
  return posts.find((p) => p.slug === slug)
}

export const ALL_CATEGORIES: Category[] = ["engineering", "notes", "career", "personal"]

export const CATEGORY_COLOR: Record<Category, string> = {
  engineering: "text-signal-cyan",
  notes: "text-signal-violet",
  career: "text-signal-amber",
  personal: "text-signal-pink",
}

/** Literal (non-templated) class strings so Tailwind's content scanner picks them up. */
export const CATEGORY_CHIP_ACTIVE: Record<Category, string> = {
  engineering: "border-void-line bg-signal-cyan text-void shadow-brutal-sm",
  notes: "border-void-line bg-signal-violet text-void shadow-brutal-sm",
  career: "border-void-line bg-signal-amber text-void shadow-brutal-sm",
  personal: "border-void-line bg-signal-pink text-void shadow-brutal-sm",
}

/** Literal solid-fill classes for the category distribution bars on the index. */
export const CATEGORY_FILL: Record<Category, string> = {
  engineering: "bg-signal-cyan",
  notes: "bg-signal-violet",
  career: "bg-signal-amber",
  personal: "bg-signal-pink",
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}
