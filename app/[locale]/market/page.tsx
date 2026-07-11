import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { format } from 'date-fns';

// Generate last 10 weeks of ISO week strings
const weeks = Array.from({ length: 10 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i * 7);
  const year = d.getFullYear();
  const week = Math.ceil((d.getDate() + new Date(year, 0, 1).getDay()) / 7);
  return `${year}-W${week.toString().padStart(2, '0')}`;
});

export default async function MarketPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'ta' ? {
    title: 'சந்தை முன்னோட்டம்',
    description: 'வாராந்திர சந்தை அரிவுத்தாள் மற்றும் பகுப்பாய்வு',
  } : {
    title: 'Market Outlook',
    description: 'Weekly market digest and analysis',
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
          <div className="space-y-4">
            {weeks.map((week) => (
              <article key={week} className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <Typography as="h3" className="text-lg font-semibold font-mono">
                    {week}
                  </Typography>
                  <Typography as="span" className="text-sm font-medium text-primary">
                    {locale === 'ta' ? 'படிக்க' : 'Read'}
                  </Typography>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </Container>
  );
}