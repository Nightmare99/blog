import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { posts as allPosts, ALL_CATEGORIES, type Category } from "@/lib/posts"

const PAGE_SIZE = 6

function parseCategories(raw: string | null): Category[] {
  if (!raw) return []
  const known = new Set<string>(ALL_CATEGORIES)
  return raw.split(",").filter((c): c is Category => known.has(c))
}

export function usePostFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get("q") ?? ""
  const activeCategories = parseCategories(searchParams.get("cat"))
  const activeKey = activeCategories.join(",")
  const requestedPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allPosts.filter((post) => {
      const matchesQuery =
        q.length === 0 ||
        post.meta.title.toLowerCase().includes(q) ||
        post.meta.excerpt.toLowerCase().includes(q) ||
        post.meta.tags.some((t) => t.toLowerCase().includes(q))
      const matchesCategory =
        activeCategories.length === 0 ||
        post.meta.categories.some((c) => activeCategories.includes(c))
      return matchesQuery && matchesCategory
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeKey])

  // Pinned posts sit outside pagination entirely — they're shown in full,
  // on every page, and excluded from the regular (paginated) list below.
  const pinnedPosts = filtered.filter((p) => p.meta.pinned)
  const regularPosts = filtered.filter((p) => !p.meta.pinned)

  const totalPages = Math.max(1, Math.ceil(regularPosts.length / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const paged = regularPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateParams(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams)
    mutate(params)
    setSearchParams(params, { replace: true })
  }

  function setQuery(next: string) {
    updateParams((params) => {
      if (next) params.set("q", next)
      else params.delete("q")
      params.delete("page")
    })
  }

  function toggleCategory(category: Category) {
    updateParams((params) => {
      const next = activeCategories.includes(category)
        ? activeCategories.filter((c) => c !== category)
        : [...activeCategories, category]
      if (next.length) params.set("cat", next.join(","))
      else params.delete("cat")
      params.delete("page")
    })
  }

  function setPage(next: number) {
    updateParams((params) => {
      if (next <= 1) params.delete("page")
      else params.set("page", String(next))
    })
  }

  function clearFilters() {
    setSearchParams({}, { replace: true })
  }

  return {
    query,
    activeCategories,
    page,
    totalPages,
    pinnedPosts,
    posts: paged,
    totalMatches: filtered.length,
    hasActiveFilters: query.length > 0 || activeCategories.length > 0,
    setQuery,
    toggleCategory,
    setPage,
    clearFilters,
  }
}
