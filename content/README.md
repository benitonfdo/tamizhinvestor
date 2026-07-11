# Content Authoring Guide

This directory contains all content for the Tamil Investor education portal.

## Structure

```
content/
├── articles/           # MDX articles (bilingual: ta.mdx + en.mdx)
│   └── {topic}/
│       └── {slug}/
│           ├── ta.mdx  # Tamil version
│           └── en.mdx  # English version
├── glossary/           # JSON glossary terms
│   └── {slug}.json
├── market/             # Weekly market updates (bilingual frontmatter)
│   └── {YYYY-WNN}.mdx
├── topics.json         # Topic listing with order
├── paths.json          # Learning paths with articleSlugs
└── schema/             # Zod validation schemas
```

## Article Frontmatter (Required)

```yaml
title:
  ta: "Tamil title"
  en: "English title"
slug: "lowercase-with-hyphens"
topic: ["topic-slug-1", "topic-slug-2"]
level: "basics" | "intermediate" | "advanced"
tags: ["tag1", "tag2"]
author: "tamizhinvestor"
publishedAt: "2026-07-10T09:00:00+05:30"
updatedAt: "2026-07-10T09:00:00+05:30"
reviewedBy: ""              # required for intermediate/advanced
sources:
  - "https://source-url.com"
readingTime: 6              # auto-calculated if omitted
summary:
  ta: "Tamil summary"
  en: "English summary"
```

## Rules

1. **Equal bilingual** — Every article must have both `ta.mdx` and `en.mdx` with matching frontmatter keys.
2. **Level gating** — `basics` auto-publishes; `intermediate`/`advanced` require `reviewedBy` and PR review.
3. **Sources** — Cite at least one authoritative source (SEBI, NSE, BSE, RBI, AMFI, reputable finance sites).
4. **Slug** — Lowercase, alphanumeric, hyphens only. Match folder name.
5. **Topics** — Must match a slug in `topics.json`.

## Validation

Run locally before committing:

```bash
npm run content:validate
```

This checks:
- All frontmatter against Zod schemas
- Bilingual completeness (ta + en for every field)
- Level → reviewedBy rule
- Slug format
- Valid URLs in sources
- Topic references exist

## Adding a New Article

1. Create folder: `content/articles/{topic}/{slug}/`
2. Create `ta.mdx` and `en.mdx` with frontmatter + body
3. Run `npm run content:validate`
4. Commit and push — GitHub Action validates on PR

## MDX Components Available

- `<Callout type="info|warn|tip">` — Highlighted boxes
- `<Source url="..." label="..." />` — Citation link
- `<Definition term="slug" />` — Auto-links to glossary