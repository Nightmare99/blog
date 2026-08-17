---
name: generate-blog-post
description: Use this when the user asks to write, draft, generate, structure, or fine-tune a blog post (.mdx file in src/content/posts/). Triggers on "write a blog post", "generate post", "draft post about X", "create blog entry", or "blog-post-generation".
---

# Generate Blog Post

Follow these steps to draft, refine, or generate high-quality, engaging `.mdx` blog posts for this repository.

## 1. Determine Title & Slug

- Choose a short, descriptive kebab-case filename: `src/content/posts/<slug>.mdx` (e.g. `process-vs-execution.mdx`).
- Title must express a concrete opinion or takeaway, avoiding generic topic labels (e.g. *"Process vs execution: why it's time to shed the agile bloat"*, NOT *"Agile Notes"*).

## 2. Frontmatter Specifications

Every post must begin with a JavaScript `meta` export (not YAML):

```mdx
export const meta = {
  title: "...",                       // Punchy, takeaway-focused
  date: "YYYY-MM-DD",                 // ISO date for ordering
  excerpt: "...",                     // One-sentence summary for search & previews
  tags: ["agile", "engineering"],     // Free-form array of topics
  categories: ["career"],             // Must be one or more from: "engineering", "notes", "career", "personal"
  readTime: "3 min read",             // ~200 words/min eyeball
}
```

### Controlled Categories:
- `engineering`: Technical write-ups, postmortems, architecture notes.
- `career`: Work reflections, project retrospectives, process critiques.
- `notes`: Short observations, TILs, quick thought logs.
- `personal`: Life updates, non-work reflections, memories.

## 3. High-Quality Content & Voice Guidelines

- **First-Person & Specific**: Write from direct experience, grounded in concrete details, real files, real error logs, and actual software patterns.
- **Zero Generic Filler**: Never use clichés like *"In today's fast-paced tech world..."*, *"Let's dive in"*, or vague productivity buzzwords.
- **Punchy Narrative Arc**:
  1. **Hook**: State the core tension or scenario immediately.
  2. **The Problem / Circus**: Critique the status quo or explain what broke.
  3. **The Pivot**: Introduce the counter-intuitive take or solution.
  4. **Actionable Takeaways / Primitives**: Provide clear, numbered or bulleted principles.
- **No Uncited / Made-Up Statistics**: Never invent fake percentages, benchmark numbers, or uncited hours. Use conceptual, representative visuals or cite real sources.

## 4. Visual Diagrams & Component Layouts

When illustrating complex concepts, use clean responsive HTML/Tailwind flex panels matching the site's dark design system (`.panel` CSS class):

```jsx
<div className="panel my-8 overflow-hidden p-5 font-mono text-xs text-ink-muted">
  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-void-line pb-3 mb-5">
    <span className="data-label text-signal-teal">FIGURE 1.0 // TITLE</span>
    <span className="text-[10px] text-ink-faint">SUBTITLE</span>
  </div>
  {/* Responsive flex layout bars or conceptual diagrams */}
</div>
```

## 5. Formatting & MDX Rules

- **Headings**: Use `##` sparingly for major section breaks (styled as uppercase mono rules in teal). Use `###` for subheadings.
- **Lists**: Standard Markdown bullet points render with `▸` markers.
- **Code Blocks**: Fenced triple backticks (```) render as bordered terminal panels.
- **Blockquotes**: `> quote` renders as muted italic asides.

## 6. Build Verification

After creating or updating `src/content/posts/<slug>.mdx`:
1. Run `npm run build` using `execute_shell`.
2. Confirm TypeScript compilation (`tsc`) and Vite MDX bundle generation pass with zero errors.
