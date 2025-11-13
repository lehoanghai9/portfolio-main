import { createMDX } from "fumadocs-mdx/next";
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/posts/:path*.md",
        destination: "/api/posts/:path*",
      },
      {
        source: "/llms.txt",
        destination: "/api/llms",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');
export default withMDX(withNextIntl(config));
