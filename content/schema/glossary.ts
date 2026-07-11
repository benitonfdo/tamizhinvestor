import { z } from 'zod';
import { BilingualString } from './article';

export const GlossaryTerm = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  term: BilingualString,
  definition: BilingualString,
  relatedTerms: z.array(z.string()).default([]),
  topics: z.array(z.string()).default([]),
  updatedAt: z.string().datetime({ offset: true }),
});

export type GlossaryTerm = z.infer<typeof GlossaryTerm>;