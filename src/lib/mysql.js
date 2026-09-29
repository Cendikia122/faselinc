import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    const isSsl = process.env.DB_SSL === 'true';
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fasel_consulting',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

let migrated = false;
async function ensureThumbColumns(db) {
  if (migrated) return;
  migrated = true;
  try {
    await db.query('ALTER TABLE blogs MODIFY COLUMN thumb MEDIUMTEXT');
  } catch (e) {}
  try {
    await db.query('ALTER TABLE blogs MODIFY COLUMN thumb_full MEDIUMTEXT');
  } catch (e) {}
  try {
    await db.query('ALTER TABLE events MODIFY COLUMN thumb MEDIUMTEXT');
  } catch (e) {}
}

export async function query(sql, params = []) {
  try {
    const db = getPool();
    if (!migrated) {
      await ensureThumbColumns(db);
    }
    const [rows] = await db.query(sql, params);
    return rows;
  } catch (error) {
    if (process.env.DEBUG_MYSQL === 'true') {
      console.warn('MySQL Offline / Notice:', error.message);
    }
    throw error;
  }
}
