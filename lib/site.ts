export const siteConfig = {
  name: 'தமிழ் இன்வெஸ்டர்',
  nameEn: 'Tamil Investor',
  tagline: 'Stock Insight',
  taglineTa: 'பங்கு நுண்ணறிவு',
  description: 'தமிழில் முதலீட்டு கல்வி — பங்கு சந்தை, காண்கள், விருப்பங்கள் மற்றும் மேல்.',
  descriptionEn: 'Investment education in Tamil — stocks, bonds, options, and beyond.',
  url: 'https://tamizhinvestor.in',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/your-org/tamizhinvestor',
    twitter: 'https://twitter.com/tamizhinvestor',
  },
  locales: ['ta', 'en'] as const,
  defaultLocale: 'ta' as const,
};

export type Locale = (typeof siteConfig.locales)[number];