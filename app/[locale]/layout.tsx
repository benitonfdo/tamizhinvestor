import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { Container } from '@/components/container';
import { Typography } from '@/components/typography';
import { ThemeToggle } from '@/components/theme-toggle';
import { BrandMark } from '@/components/brand-mark';
import Link from 'next/link';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans-tamil antialiased">
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="தமிழ் இன்வெஸ்டர்">
                <BrandMark size={28} />
                <span className="font-semibold text-lg font-sans-tamil">
                  <span className="hidden sm:inline">தமிழ் இன்வெஸ்டர்</span>
                  <span className="sm:hidden">தமிழ் இன்வெஸ்டர்</span>
                </span>
              </Link>
              <nav className="flex items-center gap-4">
                <div className="flex items-center gap-2 hidden sm:flex">
                  <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground hover:text-foreground">முகப்பு</Link>
                  <Link href={`/${locale}/topics`} className="text-sm font-medium text-muted-foreground hover:text-foreground">தலைப்புகள்</Link>
                  <Link href={`/${locale}/paths`} className="text-sm font-medium text-muted-foreground hover:text-foreground">கற்றல் பாதைகள்</Link>
                  <Link href={`/${locale}/glossary`} className="text-sm font-medium text-muted-foreground hover:text-foreground">சொல்லகராதி</Link>
                  <Link href={`/${locale}/market`} className="text-sm font-medium text-muted-foreground hover:text-foreground">சந்தை முன்னோட்டம்</Link>
                </div>
                <ThemeToggle />
                <Link
                  href={locale === 'ta' ? '/en' : '/ta'}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  {locale === 'ta' ? 'English' : 'தமிழ்'}
                </Link>
              </nav>
            </div>
          </Container>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border bg-muted/30">
          <Container className="py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link href={`/${locale}`} className="flex items-center gap-2" aria-label="தமிழ் இன்வெஸ்டர்">
                <BrandMark size={24} />
                <span className="font-semibold font-sans-tamil">தமிழ் இன்வெஸ்டர்</span>
              </Link>
              <Typography as="p" className="text-sm text-muted-foreground text-center">
                முதலீட்டு ஆபத்து உள்ளது. இது முதலீட்டு பரிந்துரை அல்ல.
              </Typography>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}