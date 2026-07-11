'use client';

import Link from 'next/link';
import { Container } from '@/components/container';
import { Section } from '@/components/section';
import { Typography } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'ta';
  const homeHref = locale === 'en' ? '/en' : '/';

  return (
    <Container size="sm">
      <Section variant="default" className="min-h-[60vh] flex items-center justify-center text-center">
        <div className="space-y-6">
          <Typography as="h1" className="text-6xl font-bold text-primary">
            404
          </Typography>
          <Typography as="h2" className="text-2xl sm:text-3xl">
            {locale === 'ta'
              ? 'தெரியாத பக்கம்'
              : 'Page Not Found'}
          </Typography>
          <Typography as="lead">
            {locale === 'ta'
              ? 'நீங்கள் தேடும் பக்கம் இல்லை அல்லது மாற்றப்பட்டுள்ளது.'
              : 'The page you are looking for does not exist or has been moved.'}
          </Typography>
          <Button asChild size="lg">
            <Link href={homeHref}>
              {locale === 'ta' ? 'முகப்புக்கு செல்' : 'Go Home'}
            </Link>
          </Button>
        </div>
      </Section>
    </Container>
  );
}