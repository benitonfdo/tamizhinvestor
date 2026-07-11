import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { notFound } from 'next/navigation';

const termData: Record<string, { ta: string; en: string }> = {
  'pe-ratio': { ta: 'PE விகிதம்', en: 'PE Ratio' },
  roe: { ta: 'ROE', en: 'ROE' },
  'dividend-yield': { ta: 'இனக்கலச் சதவீதம்', en: 'Dividend Yield' },
  'market-cap': { ta: 'சந்தை மூலதனம்', en: 'Market Cap' },
  eps: { ta: 'EPS', en: 'EPS' },
  'book-value': { ta: 'புத்தக மதிப்பு', en: 'Book Value' },
  'debt-equity': { ta: 'கடன்-பங்கு விகிதம்', en: 'Debt/Equity' },
  'compound-interest': { ta: 'சங்க地区 வட்டி', en: 'Compound Interest' },
};

export default async function GlossaryTermPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const data = termData[slug];

  if (!data) notFound();

  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-3xl">
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold font-sans-tamil">
            {locale === 'ta' ? data.ta : data.en}
          </Typography>
          <Typography as="lead">
            {locale === 'ta'
              ? `${data.ta} விளக்கம் விரைவில் வரும்`
              : `${data.en} definition coming soon`}
          </Typography>
        </div>
      </Section>
    </Container>
  );
}