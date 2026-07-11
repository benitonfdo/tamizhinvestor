import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = locale === 'ta' ? {
    eyebrow: 'சீர்தரமான, வெளிப்படையான, தமிழில்',
    title: 'முதலீட்டு கல்வியின் துவக்கம் இங்கே',
    description: 'பங்கு சந்தை, காண்கள், விருப்பங்கள், நிதி திட்டங்கள் மற்றும் மாறு — அனைத்தையும் தமிழில் கற்கவும்.',
    cta: 'தொடங்குங்கள்',
    comingSoon: 'விரைவில் வருகிறது...',
  } : {
    eyebrow: 'Structured, Transparent, in Tamil',
    title: 'Start Your Investment Education Here',
    description: 'Learn stocks, bonds, options, mutual funds, and more — all in Tamil.',
    cta: 'Get Started',
    comingSoon: 'Coming soon...',
  };

  return (
    <Container size="lg">
      <Section className="min-h-[70vh] flex items-center">
        <div className="w-full max-w-3xl space-y-6">
          <Typography as="p" className="text-sm font-medium text-primary uppercase tracking-wider">
            {t.eyebrow}
          </Typography>
          <Typography as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {t.title}
          </Typography>
          <Typography as="lead">
            {t.description}
          </Typography>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg">
              <Link href={`/${locale}/topics`}>{t.cta}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/paths`}>{locale === 'ta' ? 'கற்றல் பாதைகள்' : 'Learning Paths'}</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section variant="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <Typography as="h2" className="text-2xl sm:text-3xl font-bold">
              {t.comingSoon}
            </Typography>
            <Typography as="p" className="text-muted-foreground max-w-2xl mx-auto">
              {locale === 'ta'
                ? 'தமிழ் முதலீட்டு கல்வி போர்டல் தற்போது உருவாக்கமாகிறது. தலைப்புகள், கற்றல் பாதைகள், சொல்லகராதி மற்றும் சந்தை முன்னோட்டம் விரைவில் சேர்க்கப்படும்.'
                : 'The Tamil investment education portal is under construction. Topics, learning paths, glossary, and market outlook coming soon.'
              }
            </Typography>
          </div>
        </Container>
      </Section>
    </Container>
  );
}