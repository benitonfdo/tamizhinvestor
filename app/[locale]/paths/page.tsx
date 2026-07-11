import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';

const paths = [
  { slug: 'fundamentals', ta: 'அடிப்படைகள்', en: 'Fundamentals', taDesc: 'முதலீட்டு அடிப்படைகளை அளவிக்கவும்', enDesc: 'Master investment basics' },
  { slug: 'valuation', ta: 'மதிப்பீடு', en: 'Valuation', taDesc: 'பங்குகளை மதிப்பிடுவதைப் புரிந்து கொள்ளுங்கள்', enDesc: 'Learn to value stocks' },
  { slug: 'bonds', ta: 'காண்கள்', en: 'Bonds', taDesc: 'நியமித വരுவாய் முதலீடுகளில் தேர்வுசெய்யவும்', enDesc: 'Fixed income investing' },
  { slug: 'options', ta: 'விருப்பங்கள்', en: 'Options', taDesc: 'விருப்ப வியாபாரத்தின் அடிப்படைகள்', enDesc: 'Options trading fundamentals' },
  { slug: 'risk-management', ta: 'ஆபத்து மேலாண்மை', en: 'Risk Management', taDesc: 'உங்கள் மூலதனத்தை பாதுகாப்பு செய்யவும்', enDesc: 'Protect your capital' },
];

export default async function PathsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'ta' ? {
    title: 'கற்றல் பாதைகள்',
    description: 'வரிசைமட்டில் வரிசைமட்டில் முதலீட்டை கற்கவும்',
  } : {
    title: 'Learning Paths',
    description: 'Step-by-step guided learning journeys',
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
            {paths.map((path) => (
              <article key={path.slug} className="group p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Typography as="span" className="text-primary font-bold text-xl">→</Typography>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Typography as="h3" className="text-lg font-semibold font-sans-tamil">
                      {locale === 'ta' ? path.ta : path.en}
                    </Typography>
                    <Typography as="p" className="text-sm text-muted-foreground mt-1">
                      {locale === 'ta' ? path.taDesc : path.enDesc}
                    </Typography>
                  </div>
                  <Typography as="span" className="text-sm font-medium text-primary self-start hidden sm:inline">
                    {locale === 'ta' ? 'தொடர்க' : 'Continue'}
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