import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { notFound } from 'next/navigation';

const topicData: Record<string, { ta: string; en: string }> = {
  fundamentals: { ta: 'அடிப்படைகள்', en: 'Fundamentals' },
  valuation: { ta: 'மதிப்பீடு', en: 'Valuation' },
  bonds: { ta: 'காண்கள்', en: 'Bonds' },
  options: { ta: 'விருப்பங்கள்', en: 'Options' },
  'mutual-funds': { ta: 'பகிர்ந்த நிதிகள்', en: 'Mutual Funds' },
  taxation: { ta: 'வரி', en: 'Taxation' },
  'risk-management': { ta: 'ஆபத்து மேலாண்மை', en: 'Risk Management' },
  portfolio: { ta: 'போர்ட்ஃபோலியோ', en: 'Portfolio' },
};

export default async function TopicPage({ params }: { params: Promise<{ locale: string; topic: string }> }) {
  const { locale, topic } = await params;
  const data = topicData[topic];

  if (!data) notFound();

  return (
    <Container size="lg">
      <Section>
        <div className="space-y-6 max-w-2xl">
          <Typography as="h1" className="text-3xl sm:text-4xl font-bold font-sans-tamil">
            {locale === 'ta' ? data.ta : data.en}
          </Typography>
          <Typography as="lead">
            {locale === 'ta'
              ? `${data.ta} பற்றிய கட்டுரைகள் விரைவில் வரும்`
              : `Articles about ${data.en.toLowerCase()} coming soon`}
          </Typography>
        </div>
      </Section>
    </Container>
  );
}