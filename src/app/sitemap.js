import { getBlogs, getEvents } from '@/lib/storage';

export default async function sitemap() {
  const baseUrl = 'https://www.faselconsulting.id';

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
    '/faq',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogRoutes = blogs.map((blog) => ({
    url: blog.canonical_url || `${baseUrl}/blog/${blog.slug || blog.id}`,
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
