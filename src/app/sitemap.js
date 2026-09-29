import { getBlogs, getEvents } from '@/lib/storage';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://faselconsulting.com';

  const [blogsRes, eventsRes] = await Promise.all([
    getBlogs(),
    getEvents(),
  ]);

  const blogs = blogsRes?.data || [];
  const events = eventsRes?.data || [];

  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/events',
    '/project',
    '/blog',
    '/contact-us',
    '/team',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug || blog.id}`,
    lastModified: blog.created_at || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/project-details/${event.id}`,
    lastModified: event.created_at || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...blogRoutes, ...eventRoutes];
}
