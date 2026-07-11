import { z } from 'zod';
import { BilingualString } from './article';

export const Topic = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  name: BilingualString,
  description: BilingualString,
  order: z.number().int().positive().default(0),
});

export type Topic = z.infer<typeof Topic>;