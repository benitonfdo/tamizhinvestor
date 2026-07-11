# Phase 0 — Foundations, Scaffold & Pipeline Design

**Goal:** A working Next.js shell on a new `redesign` branch, design system, content schema, and GitHub Action prototypes. Ready to start writing seed articles in Phase 1.

**Working branch:** `redesign` (off `main`). Existing static site stays on `main` untouched until Phase 5.

**At start of Phase 0:** delete existing repo files (`index.html`, `largecap.html`, `midcap.html`, `smallcap.html`, `CNAME`, `assets/`, `data/`, `scripts/`, `.nojekyll`, existing `README.md`, `.github/workflows/`) on the `redesign` branch. `main` is untouched.

**Stack (locked in):** Next.js 14 App Router + TypeScript strict · Tailwind + shadcn/ui · MDX (`@next/mdx` + `gray-matter`) · `next-intl` for equal Tamil + English · Zod for validation · Noto Sans Tamil + Noto Sans · Grok API · GitHub Actions · pnpm.

---

## Chunk breakdown (4 chunks, all `simple` complexity)

### Chunk A — Scaffold, deps, design system

**Creates:** `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `components.json`, `.gitignore` (overwrite), `app/globals.css`, `app/layout.tsx`, `app/not-found.tsx`, `components/ui/{button,card}.tsx`, `components/theme-provider.tsx`, `components/theme-toggle.tsx`, `components/brand-mark.tsx` (SVG extracted from current header), `components/{container,section,typography}.tsx`, `lib/{utils,site}.ts`, `public/favicon.svg`.

**Key deps:** `next ^14.2`, `react ^18.3`, `next-intl ^3.20`, `next-themes`, `@next/mdx`, `@mdx-js/{loader,react} ^3`, `gray-matter`, `reading-time`, `zod ^3.23`, `clsx`, `tailwind-merge`, `class-variance-authority`, `@radix-ui/react-slot`, `lucide-react`. Dev: `typescript ^5.5`, `tailwindcss ^3.4`, `eslint-config-next`, `prettier + prettier-plugin-tailwindcss`, `tsx`.

**Scripts:** `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `content:validate`.

**Design tokens:** accent = deep green (finance/trust); `background/foreground/muted/border/card/accent` each with dark variant; `font-sans` = Inter + Noto Sans Tamil fallback; `font-tamil` = Noto Sans Tamil primary; extended typography scale (display, h1–h4, lead, body, small).

**Acceptance:** `pnpm dev` runs · `pnpm build` succeeds · `pnpm lint` + `pnpm typecheck` pass · dark/light toggle works on placeholder root · brand mark matches current site · Tamil chars render.

---

### Chunk B — i18n + placeholder routes (equal bilingual)

**Creates:** `middleware.ts`, `i18n/{config,request}.ts`, `messages/ta.json` + `messages/en.json`, `app/[locale]/layout.tsx`, and placeholder pages under `app/[locale]/` for: home, topics (index + `[topic]`), articles (`[topic]/[slug]`), glossary (index + `[slug]`), paths (index + `[slug]`), market (index + `[date]`), plus `not-found.tsx`.

**Locale routing:** default `ta` (Tamil) at `/`, English at `/en`. `lang` attribute on `<html>` set per locale. `hreflang` links in root layout. Hand-written UI strings in both message files (no AI for UI strings — must be accurate).

**UI string keys:** `nav.{home,topics,paths,glossary,market}` · `common.{search,readMore,estimatedTime,lastUpdated,sources}` · `home.hero.{eyebrow,title,description,cta}` · `home.featured.title`, `home.latest.title` · `topics/paths/glossary/market.{title,description}` · `footer.{disclaimer,about,contact}`.

**Acceptance:** `/` = Tamil, `/en` = English · `<html lang>` updates per locale · `hreflang` present · all 10 routes return 200 in correct language · `/fr` 404s cleanly · no hardcoded strings in components.

---

### Chunk C — Content schema (Zod) + MDX + seed data

**Creates:** `content/README.md`, `content/schema/{article,glossary,market-update,topic,path,index}.ts`, `content/articles/fundamentals/pe-ratio/{ta.mdx,en.mdx}` (seed), `content/glossary/pe-ratio.json` (seed), `content/topics.json` + `content/paths.json` (seed), `content/market/2026-w28.mdx` (seed, frontmatter only), `scripts/validate-content.ts`, `mdx-components.tsx`.

**Approach:** plain MDX + `gray-matter` for frontmatter. No Contentlayer (deprecated). Validator script walks content, parses with gray-matter, runs Zod.

**Article schema enforces:**
- `title.ta` + `title.en` (both required, both non-empty) — equal bilingual.
- `summary.ta` + `summary.en` (both required).
- `level: 'basics' | 'intermediate' | 'advanced'`.
- `topic: string[]` ≥ 1.
- `tags: string[]`.
- `publishedAt` + `updatedAt` as ISO datetime.
- `reviewedBy` **required** for `intermediate` and `advanced` (refine rule). Optional for `basics` (auto-publish OK).
- `sources: url[]` ≥ 0 but encouraged ≥ 1.
- `readingTime: positive int`.
- `slug: /^[a-z0-9-]+$/`.

**Glossary schema:** `slug`, `term.{ta,en}`, `definition.{ta,en}`, `relatedTerms`, `topics`, `updatedAt`.

**Market update schema:** `week: /^\d{4}-W\d{2}$/` (ISO week), `publishedAt`, `summary.{ta,en}`, `keyPoints: BilingualString[]` (3–7), `sources`.

**Validator CLI:** `pnpm content:validate` walks content, prints summary (total / valid / invalid with errors per file), exits non-zero on any failure.

**Custom MDX components:** `<Callout type="info|warn|tip">`, `<Source url label>`, `<Definition term>` (auto-resolves from glossary).

**Seed data:** 1 bilingual article (PE ratio, basics level), 1 glossary term, 4 topics (fundamentals, valuation, bonds, options), 1 path (fundamentals track referencing seed article), 1 market update (frontmatter only).

**Acceptance:** validator passes on seed · tampering with frontmatter fails with clear error · seed article renders at `/articles/fundamentals/pe-ratio` and `/en/...` · reading time displays · custom MDX components render · bilingual enforcement fails when `en` missing.

---

### Chunk D — GitHub Actions, docs, .env.example

**Creates:** `.github/workflows/{content-validate,ai-generate,ai-refresh}.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `.env.example`, new `README.md`, `docs/{architecture,content-author-guide,ai-pipeline}.md`.

**`content-validate.yml`:** triggers on `pull_request` touching `content/**`. Runs `npm ci` + `npm run content:validate`. Fails PR on validation error.

**`ai-generate.yml`:** `workflow_dispatch` with inputs `topic`, `level`, `language` (ta|en|both), `title_idea`. Calls a stub `scripts/ai-generate.ts` in Phase 0 (prints "Grok integration pending"), real wiring in Phase 2. Uses `peter-evans/create-pull-request` for PR creation. **For `basics`, PR auto-merges if validation passes; for intermediate/advanced, PR stays open for human review.**

**`ai-refresh.yml`:** cron `0 13 * * 5` (Friday 6:30 PM IST). Stub in Phase 0, real in Phase 4.

**Secrets documented** (not set in Phase 0): `GROK_API_KEY`, `GROK_MODEL=grok-3-mini`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Phase 4).

**README sections:** what this is · quick start · how to add an article by hand (→ content-author-guide) · how the AI pipeline works (→ ai-pipeline) · branch model · deployment · license.

**`docs/architecture.md`:** one-page stack + folder layout + data flow.

**Acceptance:** workflow files valid YAML · stub scripts exit cleanly without secrets · README documents branch model · docs cross-link correctly · `.env.example` committed, no real `.env`.

---

## Cross-chunk constraints

- **No new dependencies** outside Chunk A's list unless approved.
- **Bilingual is non-negotiable** for UI strings and article frontmatter — enforced by validator.
- **No live-site impact during Phase 0** — `redesign` branch only.
- **TypeScript strict** enabled.
- **Accessibility:** semantic HTML, ARIA, keyboard nav, Tamil font fallback (system Tamil if Noto fails).
- **No emoji in UI** unless matching current site convention.

---

## Verification (end of Phase 0)

```bash
pnpm install && pnpm typecheck && pnpm lint && pnpm build && pnpm content:validate
pnpm dev   # manual smoke: /, /en, /articles/fundamentals/pe-ratio, /glossary/pe-ratio
```

Manual checks: Tamil renders correctly, locale switcher updates `<html lang>`, dark/light persists, validator error messages are helpful.

---

## Explicitly NOT in Phase 0

- Real Grok integration (Phase 2 — needs prompt engineering + curated sources)
- Live market refresh (Phase 4)
- Comments, newsletter, search (Phases 3–4)
- Per-stock pages, sector pages (current stock-list pages — not relevant to the new education portal)
- Learning paths UI with progress (Phase 3)
- More than 1 seed article (Phase 1)
- Vercel deploy / DNS cutover (Phase 5)
- Any changes to `main` branch.

---

## Builder instructions (apply to each chunk)

For each chunk:
1. Read this spec.
2. Implement only the files listed for that chunk.
3. Run `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm content:validate` (where applicable).
4. If any of those fail, fix and retry **once**. If still failing, report the failure and stop.
5. Commit with a message scoped to the chunk, e.g. `chore(phase-0): scaffold next.js app`.

After all four chunks complete, I (orchestrator) will run the full Phase 0 verification block above and report results.