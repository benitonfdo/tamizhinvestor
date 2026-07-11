import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { notFound } from 'next/navigation';

const weekRegex = /^\d{4}-W\d{2}$/;

export default async function MarketDetailPage({ params }: { params: Promise<{ locale: string; date: string }> }) {
  const { locale, date } = await params;

  if (!weekRegex.test(date)) notFound();

  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-3xl">
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold font-mono">
            {date}
          </Typography>
          <Typography as="lead">
            {locale === 'ta'
              ? 'இந்த வாரத்தின் சந்தை முன்னோட்டம் விரைவில் பதிவேற்றப்படும்.'
              : 'This week\'s market outlook will be published soon.'
            }
          </Typography>
        </div>
      </Section>
    </Container>
  );
}