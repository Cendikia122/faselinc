import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET() {
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
