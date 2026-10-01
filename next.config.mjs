/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Compress output HTML/JS/CSS
  compress: true,

  // ✅ Image optimization — konversi otomatis ke WebP, lazy load, resize
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // cache 24 jam
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    dangerouslyAllowSVG: true,
  },

  // ✅ Headers: cache static assets aggressively — fix "efficient cache lifetimes"
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/image/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  // ✅ Experimental: CSS & package optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['swiper', 'react-icons'],
  },
};

export default nextConfig;

