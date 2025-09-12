/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Ensure proper handling of static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Disable static optimization for dynamic content
  trailingSlash: false,
}

export default nextConfig
