import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Tamil } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-sans-tamil',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'தமிழ் இன்வெஸ்டர் | முதலீட்டு கல்வி',
    template: '%s | தமிழ் இன்வெஸ்டர்',
  },
  description: 'தமிழில் முதலீட்டு கல்வி — பங்கு சந்தை, காண்கள், விருப்பங்கள் மற்றும் மேல்.',
  keywords: ['முதலீடு', 'பங்கு சந்தை', 'கல்வி', 'தமிழ்', 'investment', 'stock market', 'education', 'tamil'],
  authors: [{ name: 'Tamil Investor' }],
  creator: 'Tamil Investor',
  publisher: 'Tamil Investor',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ta_IN',
    url: 'https://tamizhinvestor.in',
    siteName: 'தமிழ் இன்வெஸ்டர்',
    title: 'தமிழ் இன்வெஸ்டர் | முதலீட்டு கல்வி',
    description: 'தமிழில் முதலீட்டு கல்வி — பங்கு சந்தை, காண்கள், விருப்பங்கள் மற்றும் மேல்.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'தமிழ் இன்வெஸ்டர்' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'தமிழ் இன்வெஸ்டர் | முதலீட்டு கல்வி',
    description: 'தமிழில் முதலீட்டு கல்வி — பங்கு சந்தை, காண்கள், விருப்பங்கள் மற்றும் மேல்.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://tamizhinvestor.in',
    languages: {
      ta: 'https://tamizhinvestor.in',
      en: 'https://tamizhinvestor.in/en',
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ta" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${notoSansTamil.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}