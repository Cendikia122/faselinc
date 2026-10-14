export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.faselconsulting.id';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/insurance',
          '/solar-energy',
          '/software-landing',
          '/marketing-agency',
          '/home2',
          '/blog-2-column',
          '/blog-3-column',
          '/blog-standard',
          '/blog-with-sidebar',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
