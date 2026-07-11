import { z } from 'zod';

export const Level = z.enum(['basics', 'intermediate', 'advanced']);
export type Level = z.infer<typeof Level>;

export const BilingualString = z.object({
  ta: z.string().min(1, 'Tamil text is required'),
  en: z.string().min(1, 'English text is required'),
});

export const ArticleFrontmatter = z.object({
  title: BilingualString,
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  topic: z.array(z.string()).min(1, 'At least one topic is required'),
  level: Level,
  tags: z.array(z.string()).default([]),
  author: z.string().default('tamizhinvestor'),
  publishedAt: z.string().datetime({ offset: true }),
  updatedAt: z.string().datetime({ offset: true }),
  reviewedBy: z.string().optional(),
  sources: z.array(z.string().url()).default([]),
  readingTime: z.number().int().positive(),
  summary: BilingualString,
}).refine(
  (data) => data.level === 'basics' || !!data.reviewedBy,
  { message: 'reviewedBy is required for intermediate and advanced articles', path: ['reviewedBy'] }
);

export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatter>;