# Writing a new post

This is a personal log — engineering write-ups, career notes, and personal
entries (updates, feelings, memories) all live side by side. Every post is
an `.mdx` file in `src/content/posts/`. There is no CMS and no database:
adding a post means adding a file.

## 1. Create the file

`src/content/posts/<slug>.mdx` — the filename (minus `.mdx`) becomes the
URL slug at `/blog/<slug>`. Use kebab-case, short, descriptive:
`gh-pages-oidc-503.mdx`, not `Post About The Deploy Bug.mdx`.

## 2. Required frontmatter

Every post starts with a `meta` export — plain JS, not YAML frontmatter:

```mdx
export const meta = {
  title: "Why my GitHub Pages deploy failed (and it wasn't my fault)",
  date: "2026-07-10",              // ISO yyyy-mm-dd. Drives ordering.
  excerpt: "One or two sentences shown on the index card and in previews.",
  tags: ["github-actions", "ci-cd", "postmortem"],   // free-form, unlimited
  categories: ["engineering"],      // controlled vocabulary, see below — can have more than one
  readTime: "3 min read",           // rough eyeball: ~200 words/min
  // pinned: true,                  // optional — see "Pinning" below. Omit for a normal post.
}
```

The full type is in `src/lib/posts.ts` (`PostMeta`) — that file is the
source of truth if this doc and the code ever disagree.

`tags` and `categories` are different things: `tags` is free-form (any
string, as many as make sense — `"github-actions"`, `"ci-cd"`, whatever
the post is actually about). `categories` is a small, fixed, color-coded
vocabulary the index's category filter is built on — you can list more
than one, but don't invent new ones without also adding a color for them
in `CATEGORY_COLOR` and `CATEGORY_CHIP_ACTIVE` in `src/lib/posts.ts`.

### Categories

| category      | color   | for |
|---------------|---------|-----|
| `engineering` | teal    | technical write-ups, postmortems, build notes |
| `notes`       | blue    | shorter observations, TILs, things that don't need a full write-up |
| `career`      | amber   | work reflections, project retrospectives, lessons from a role |
| `personal`    | violet  | updates, feelings, memories — non-work entries |

Most posts should have exactly one. Give a post two only when it
genuinely straddles both — e.g. `["career", "personal"]` for a reflection
that's really about how a project affected you personally — not as a way
to get more visibility in each filter.

Posts don't need to be sequenced or numbered — `seq` is assigned
automatically from `date`, oldest first, and the index displays newest
first. You only ever need to set `date`; ordering takes care of itself.

### Search, filter, pagination

All three are handled by the index page automatically (`src/hooks/usePostFilters.ts`)
— nothing to configure per post. Search matches `title`, `excerpt`, and
`tags`; the category chips filter on `categories`; the list paginates at
6 posts per page. The one thing that affects how well a post surfaces
there is writing an accurate `excerpt` and a few real `tags` — both are
part of what search matches against.

### Pinning

Set `pinned: true` to keep a post in its own section at the top of the
index, above the paginated list, on every page — it's for things worth
surfacing regardless of how far back they were written (this "What this
space is" post is pinned as the standing intro). Pinned posts still
respect the active search/category filter — they're exempt from
pagination, not from filtering. The section is collapsible (state
persists in the visitor's browser via `localStorage`, not per post).

Use it sparingly — one or two posts, not a growing list. If everything
is pinned, nothing is.

## 3. Body

Everything after the `meta` export is the post body, written in MDX
(Markdown + JSX). Plain Markdown is enough for almost everything:

- `## Heading` becomes an uppercase mono section rule (teal, with a
  trailing hairline) — use it for major section breaks, not every
  subheading. `### Heading` is a quieter subheading for anything finer.
- Fenced code blocks (```) render as bordered terminal panels — use them
  for actual code/logs/config, not for arbitrary emphasis.
- `> blockquote` renders muted and italic — good for an aside or a quoted
  error message you're *not* treating as a code block.
- Bullet lists use a `▸` marker matching the rest of the site; numbered
  lists use plain mono numerals.

All of this is styled in `src/index.css` under `.post-content` — that's
the file to touch if a post needs a markup shape that isn't styled yet.

## 4. Voice

Write in first person, grounded in specifics — real numbers, real file
names, real errors, actual outcomes. Avoid generic filler ("in today's
fast-paced world...", "let's dive in"). Short posts that say something
concrete beat long posts that pad. For personal entries this still holds:
specific and honest beats vague and sentimental.

A post can be short. `readTime` under 3 minutes is fine.

## 5. Preview and ship

```bash
npm install   # first time only
npm run dev   # http://localhost:5173/blog/
```

Check the post at `/blog/<slug>`, then:

```bash
git add src/content/posts/<slug>.mdx
git commit -m "Add post: <title>"
git push origin master
```

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds
and deploys to `https://nightmare99.github.io/blog/` automatically —
nothing else to do.

## When asked to draft a post from bullet points

Given a list of raw points (what happened, what was learned, how it felt),
turn them into a post by:

1. Picking the right `categories` (usually just one) from the table above.
2. Writing a title that states the actual takeaway, not a vague topic
   label (`"Why my GitHub Pages deploy failed (and it wasn't my fault)"`,
   not `"Some CI Notes"`).
3. Keeping the given points as the backbone of the post — don't invent
   details, numbers, or feelings that weren't in the input. If a point is
   thin, it's fine for the section to be short.
4. Using `##` sparingly — only where there's a real shift in topic.
5. Writing the `excerpt` last, as a one-sentence summary of the actual
   takeaway, not a generic teaser.
