import analyze from '@next/bundle-analyzer';

const withAnalyze = analyze({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Security headers
  async headers() {
    return [
      // Security for all routes
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // Add CSP once external domains are known:
          // { key: 'Content-Security-Policy', value: "default-src 'self'; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://api.example.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'" },
        ],
      },
      // Aggressive caching for Next's static assets
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Public assets from /public
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|ico|woff2?)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  // Ensure proper handling of static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable static optimization for dynamic content
  trailingSlash: false,
}

export default withAnalyze(nextConfig)
