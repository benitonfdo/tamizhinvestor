import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';

const terms = [
  { slug: 'pe-ratio', ta: 'PE விகிதம்', en: 'PE Ratio' },
  { slug: 'roe', ta: 'ROE', en: 'ROE' },
  { slug: 'dividend-yield', ta: 'இனக்கலச் சதவீதம்', en: 'Dividend Yield' },
  { slug: 'market-cap', ta: 'சந்தை மூலதனம்', en: 'Market Cap' },
  { slug: 'eps', ta: 'EPS', en: 'EPS' },
  { slug: 'book-value', ta: 'புத்தக மதிப்பு', en: 'Book Value' },
  { slug: 'debt-equity', ta: 'கடன்-பங்கு விகிதம்', en: 'Debt/Equity' },
  { slug: 'compound-interest', ta: 'சங்க வட்டி', en: 'Compound Interest' },
];

export default async function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'ta' ? {
    title: 'சொல்லகராதி',
    description: 'முதலீட்டு சொற்களை தமிழில் புரிந்து கொள்ளுங்கள்',
  } : {
    title: 'Glossary',
    description: 'Understand investment terms in Tamil',
  };

  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-2xl">
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold">
            {t.title}
          </Typography>
          <Typography as="lead">
            {t.description}
          </Typography>
        </div>
      </Section>

      <Section variant="muted">
        <Container size="lg">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((term) => (
              <article key={term.slug} className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                <Typography as="h3" className="text-lg font-semibold mb-2 font-sans-tamil">
                  {locale === 'ta' ? term.ta : term.en}
                </Typography>
                <Typography as="p" className="text-sm text-muted-foreground">
                  {locale === 'ta'
                    ? `${term.ta} விளக்கம் விரைவில்`
                    : `${term.en} definition coming soon`}
                </Typography>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </Container>
  );
}