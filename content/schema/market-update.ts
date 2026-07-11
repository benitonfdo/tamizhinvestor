import { z } from 'zod';
import { BilingualString } from './article';

export const MarketUpdate = z.object({
  week: z.string().regex(/^\d{4}-W\d{2}$/, 'Week must be in ISO format YYYY-WNN'),
  publishedAt: z.string().datetime({ offset: true }),
  summary: BilingualString,
  keyPoints: z.array(BilingualString).min(1).max(7),
  sources: z.array(z.string().url()).default([]),
});

export type MarketUpdate = z.infer<typeof MarketUpdate>;