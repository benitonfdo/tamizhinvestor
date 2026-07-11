import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';

const topics = [
  { slug: 'fundamentals', ta: 'அடிப்படைகள்', en: 'Fundamentals' },
  { slug: 'valuation', ta: 'மதிப்பீடு', en: 'Valuation' },
  { slug: 'bonds', ta: 'காண்கள்', en: 'Bonds' },
  { slug: 'options', ta: 'விருப்பங்கள்', en: 'Options' },
  { slug: 'mutual-funds', ta: 'பכוಷ நிதிகள்', en: 'Mutual Funds' },
  { slug: 'taxation', ta: 'வரி', en: 'Taxation' },
  { slug: 'risk-management', ta: 'ஆபத்து மேலாண்மை', en: 'Risk Management' },
  { slug: 'portfolio', ta: 'போர்ட்ஃபோலியோ', en: 'Portfolio' },
];

export default async function TopicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'ta' ? {
    title: 'தலைப்புகள்',
    description: 'முதலீட்டு உலகின் முக்கிய தலைப்புகளைப் பற்றி ஆராயுங்கள்',
  } : {
    title: 'Topics',
    description: 'Explore core investment topics',
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
            {topics.map((topic) => (
              <article key={topic.slug} className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                <Typography as="h3" className="text-lg font-semibold mb-2 font-sans-tamil">
                  {locale === 'ta' ? topic.ta : topic.en}
                </Typography>
                <Typography as="p" className="text-sm text-muted-foreground">
                  {locale === 'ta'
                    ? `${topic.ta} தொடர்பான கட்டுரைகளைப் படிக்க`
                    : `Read articles about ${topic.en.toLowerCase()}`}
                </Typography>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </Container>
  );
}