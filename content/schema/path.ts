import { z } from 'zod';
import { BilingualString } from './article';

export const Path = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: BilingualString,
  description: BilingualString,
  articleSlugs: z.array(z.string()).default([]),
  order: z.number().int().positive().default(0),
});

export type Path = z.infer<typeof Path>;