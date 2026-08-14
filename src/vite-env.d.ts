/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const meta: {
    title: string
    date: string
    excerpt: string
    tags: string[]
    category: 'engineering' | 'notes' | 'career'
    readTime: string
  }
  const MDXComponent: ComponentType
  export default MDXComponent
}
