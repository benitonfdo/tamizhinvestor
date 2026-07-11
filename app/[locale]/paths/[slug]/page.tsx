import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { notFound } from 'next/navigation';

const pathData: Record<string, { ta: string; en: string; taDesc: string; enDesc: string }> = {
  fundamentals: { ta: 'அடிப்படைகள்', en: 'Fundamentals', taDesc: 'முதலீட்டு அடிப்படைகளை அளவிக்கவும்', enDesc: 'Master investment basics' },
  valuation: { ta: 'மதிப்பீடு', en: 'Valuation', taDesc: 'பங்குகளை மதிப்பிடுவதைப் புரிந்து கொள்ளுங்கள்', enDesc: 'Learn to value stocks' },
  bonds: { ta: 'காண்கள்', en: 'Bonds', taDesc: 'நியமித വരுவாய் முதலீடுகளில் தேர்வுசெய்யவும்', enDesc: 'Fixed income investing' },
  options: { ta: 'விருப்பங்கள்', en: 'Options', taDesc: 'விருப்ப வியாபாரத்தின் அடிப்படைகள்', enDesc: 'Options trading fundamentals' },
  'risk-management': { ta: 'ஆபத்து மேலாண்மை', en: 'Risk Management', taDesc: 'உங்கள் மூலதனத்தை பாதுகாப்பு செய்யவும்', enDesc: 'Protect your capital' },
};

export default async function PathDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const data = pathData[slug];

  if (!data) notFound();

  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-3xl">
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold font-sans-tamil">
            {locale === 'ta' ? data.ta : data.en}
          </Typography>
          <Typography as="lead">
            {locale === 'ta' ? data.taDesc : data.enDesc}
          </Typography>
          <Typography as="p" className="text-muted-foreground">
            {locale === 'ta'
              ? 'இந்த கற்றல் பாதையின் பாடங்கள் விரைவில் வரும்'
              : 'Lessons for this learning path coming soon'}
          </Typography>
        </div>
      </Section>
    </Container>
  );
}