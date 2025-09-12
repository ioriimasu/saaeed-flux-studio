import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Saaed Imam - Platform Architect · RFID · SaaS',
  description: 'Platform Architect specializing in RFID/IoT systems, scalable SaaS platforms, and industrial analytics. Building systems that compound: real-time RFID, mission-critical SaaS, and factory intelligence.',
  keywords: 'platform architect, RFID systems, SaaS architecture, IoT development, industrial analytics, factory intelligence, Next.js, Supabase, Stripe, Python, Bangladesh',
  authors: [{ name: 'Saaed Imam' }],
  openGraph: {
    title: 'Saaed Imam - Platform Architect · RFID · SaaS',
    description: 'Platform Architect specializing in RFID/IoT systems, scalable SaaS platforms, and industrial analytics.',
    url: 'https://saaedimam.dev',
    siteName: 'Saaed Imam Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saaed Imam - Platform Architect Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saaed Imam - Platform Architect · RFID · SaaS',
    description: 'Platform Architect specializing in RFID/IoT systems, scalable SaaS platforms, and industrial analytics.',
    images: ['/og-image.jpg'],
    creator: '@saaedimam',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="theme-color" content="#0f0f23" />
        <meta name="msapplication-TileColor" content="#0f0f23" />
        <link rel="canonical" href="https://saaedimam.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Saaed Imam',
              jobTitle: 'Platform Architect · RFID · SaaS',
              description: 'Platform Architect specializing in RFID/IoT systems, scalable SaaS platforms, and industrial analytics. Building systems that compound: real-time RFID, mission-critical SaaS, and factory intelligence.',
              url: 'https://saaedimam.dev',
              sameAs: [
                'https://github.com/saaedimam',
                'https://linkedin.com/in/saaedimam',
                'https://twitter.com/saaedimam',
              ],
              knowsAbout: [
                'Next.js',
                'Supabase',
                'Stripe',
                'Python',
                'TypeScript',
                'RFID Systems',
                'IoT Development',
                'Industrial Analytics',
                'SaaS Architecture',
                'Factory Intelligence',
              ],
              hasOccupation: {
                '@type': 'Occupation',
                name: 'Platform Architect',
                description: 'Specializing in RFID/IoT systems, scalable SaaS platforms, and industrial analytics',
              },
            }),
          }}
        />
      </head>
      <body className="bg-background text-foreground font-inter overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
