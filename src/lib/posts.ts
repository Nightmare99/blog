import type { ComponentType } from "react"

export type Category = "engineering" | "notes" | "career"

export interface PostMeta {
  title: string
  date: string
  excerpt: string
  tags: string[]
  category: Category
  readTime: string
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

export const CATEGORY_COLOR: Record<Category, string> = {
  engineering: "text-signal-teal",
  notes: "text-signal-blue",
  career: "text-signal-amber",
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })
}
