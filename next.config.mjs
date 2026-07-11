import createNextIntlPlugin from 'next-intl/plugin';
import withMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withMdx = withMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
};

export default withNextIntl(withMdx(nextConfig));