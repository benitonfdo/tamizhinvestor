import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; topic: string; slug: string }> }) {
  const { locale, topic, slug } = await params;

  // Placeholder - real content will be loaded from MDX in Phase 1
  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-3xl">
          <Typography as="p" className="text-sm font-medium text-primary uppercase tracking-wider">
            {topic}
          </Typography>
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold">
            {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </Typography>
          <Typography as="lead">
            {locale === 'ta'
              ? 'இந்த கட்டுரை விரைவில் பதிவேற்றப்படும்.'
              : 'This article will be published soon.'
            }
          </Typography>
        </div>
      </Section>
    </Container>
  );
}