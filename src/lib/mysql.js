import mysql from 'mysql2/promise';

let pool;
let offlineUntil = 0;

export function markDbOffline(durationMs = 60000) {
  offlineUntil = Date.now() + durationMs;
}

export function isDbCircuitOpen() {
  return Date.now() < offlineUntil;
}

export function resetDbCircuit() {
  offlineUntil = 0;
}

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
      connectTimeout: 2000, // Timeout cepat 2 detik (mencegah loading lambat jika DB offline)
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
    await db.query('ALTER TABLE blogs MODIFY COLUMN thumb_full MEDIUMTEXT');
    await db.query('ALTER TABLE events MODIFY COLUMN thumb MEDIUMTEXT');
  } catch (e) {
    // Abaikan jika kolom sudah sesuai atau tabel belum ada
  }
}

export async function query(sql, params = []) {
  // Jika database baru saja gagal/offline, langsung fail-fast tanpa menunggu timeout lagi
  if (isDbCircuitOpen()) {
    throw new Error('MySQL offline (circuit open)');
  }

  try {
    const db = getPool();
    if (!migrated) {
      await ensureThumbColumns(db);
    }
    const [rows] = await db.query(sql, params);
    return rows;
  } catch (error) {
    // Catat database offline selama 60 detik agar request selanjutnya instan (tidak delay)
    markDbOffline(60000);
    if (process.env.DEBUG_MYSQL === 'true') {
      console.warn('MySQL Offline / Notice:', error.message);
    }
    throw error;
  }
}
