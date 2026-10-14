import { NextResponse } from 'next/server';
import { query, resetDbCircuit } from '@/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET() {
  resetDbCircuit(); // Izinkan pengujian live
  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '3306';
  const user = process.env.DB_USER || 'root';
  const database = process.env.DB_NAME || 'fasel_consulting';
  const hasPassword = Boolean(process.env.DB_PASSWORD);
  const isDefaultHost = !process.env.DB_HOST || process.env.DB_HOST === 'localhost';

  let connected = false;
  let error = null;
  let stats = { blogs: 0, events: 0, users: 0 };

  try {
    const testResult = await query('SELECT 1 as test');
    if (testResult) {
      connected = true;
      try {
        const blogCount = await query('SELECT COUNT(*) as count FROM blogs');
        const eventCount = await query('SELECT COUNT(*) as count FROM events');
        const userCount = await query('SELECT COUNT(*) as count FROM admin_users');
        stats.blogs = blogCount?.[0]?.count ?? 0;
        stats.events = eventCount?.[0]?.count ?? 0;
        stats.users = userCount?.[0]?.count ?? 0;

        const blogCols = await query('SHOW COLUMNS FROM blogs');
        stats.blogColumns = Array.isArray(blogCols) ? blogCols.map(c => c.Field) : [];

        // Jika blogs masih 0, coba seed dan tangkap error jika ada
        if (stats.blogs === 0) {
          try {
            await query(`
              INSERT INTO blogs (title, slug, author, date, thumb, thumb_full, excerpt, content, tags, status, meta_title, meta_description, keywords, canonical_url)
              VALUES 
              (
                'Experiential Learning Indonesia: Strategi Efektif Membangun Budaya & SDM Unggul Perusahaan',
                'experiential-learning-indonesia-transformasi-sdm',
                'Ardian Rangga',
                '10 Oktober 2026',
                '/assets/img/blog/1.jpg',
                '/assets/img/blog/1.jpg',
                'Pelajari bagaimana metode Experiential Learning di Indonesia terbukti mentransformasi karakter kepemimpinan, meningkatkan kekompakan tim, dan memperkuat budaya kerja perusahaan.',
                '<p>Dalam lanskap bisnis modern yang serba cepat dan kompetitif, keberhasilan perusahaan sangat ditentukan oleh kelincahan (agility) dan kualitas sumber daya manusianya. Pendekatan Experiential Learning Indonesia hadir sebagai solusi transformasional terbaik.</p>',
                'Experiential Learning, Leadership, Training',
                'published',
                'Experiential Learning Indonesia: Strategi Efektif SDM Perusahaan',
                'Pelajari bagaimana metode Experiential Learning di Indonesia terbukti mentransformasi karakter kepemimpinan, meningkatkan kekompakan tim, dan budaya kerja perusahaan.',
                'Experiential Learning Indonesia, Pelatihan Kepemimpinan, Corporate Training',
                'https://www.faselconsulting.id/blog/experiential-learning-indonesia-transformasi-sdm'
              )
            `);
            const reCount = await query('SELECT COUNT(*) as count FROM blogs');
            stats.blogs = reCount?.[0]?.count ?? 0;
            stats.seedStatus = 'success';
          } catch (seedErr) {
            stats.seedError = seedErr.message;
          }
        }
      } catch (countErr) {
        stats.tableError = countErr.message;
      }
    }
  } catch (err) {
    error = err.message;
  }

  return NextResponse.json({
    success: true,
    connected,
    config: {
      host,
      port,
      user,
      database,
      hasPassword,
      isDefaultHost,
    },
    stats,
    error,
    timestamp: new Date().toISOString(),
  });
}
