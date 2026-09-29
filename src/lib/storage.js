import fs from 'fs';
import path from 'path';
import { query } from './mysql.js';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

// Pastikan folder data dan file JSON awal sudah siap (Aman di Serverless Read-Only)
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Seed Blogs jika belum ada
    if (!fs.existsSync(BLOGS_FILE)) {
      const initialBlogs = [
        {
          id: 1,
          title: "Experiential Learning dalam Leadership: Strategi Efektif Mengembangkan Kompetensi Karyawan",
          slug: "experiential-learning-dalam-leadership",
          author: "Ardian Rangga",
          date: "21 September 2026",
          thumb: "ar.jpg",
          thumb_full: "ar.jpg",
          excerpt: "Banyak studi menunjukkan bahwa 70% efektivitas pembelajaran kepemimpinan berasal dari pengalaman langsung (on-the-job learning), bukan dari ruang kelas semata.",
          content: "<p>Dalam era bisnis yang dinamis saat ini, metode pelatihan konvensional seperti presentasi satu arah di ruang kelas sering kali kurang efektif dalam menghasilkan perubahan perilaku jangka panjang. Di sinilah <strong>Experiential Learning</strong> memegang peranan krusial.</p><p>Experiential Learning berfokus pada siklus belajar dari pengalaman langsung, refleksi kritis, konseptualisasi ide, hingga aplikasi nyata di tempat kerja. Melalui simulasi tantangan bisnis dan dinamika kelompok, setiap anggota tim dapat mengenali kekuatan serta area pengembangan mereka secara nyata.</p><h3>Manfaat Utama untuk Organisasi:</h3><ul><li>Meningkatkan komunikasi dan rasa saling percaya (trust) antar karyawan.</li><li>Menginternalisasi nilai-nilai inti perusahaan (core values) secara mendalam.</li><li>Mengasah kemampuan pemecahan masalah secara kolaboratif di bawah tekanan.</li></ul><p>Fasel Consulting siap membantu organisasi Anda merancang program pelatihan berbasis pengalaman yang disesuaikan dengan kebutuhan spesifik tim Anda.</p>",
          tags: "Experiential Learning, Training",
          status: "published",
          created_at: new Date().toISOString(),
        }
      ];
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(initialBlogs, null, 2), 'utf-8');
    }

    // Seed Events jika belum ada
    if (!fs.existsSync(EVENTS_FILE)) {
      const initialEvents = [
        {
          id: 1,
          title: "FASEL Crafting Collaboration & Core Values",
          tag: "Experiential Learning Approach",
          thumb: "faselevent1.jpg",
          date: "Batch Mendatang: Kontak Kami",
          location: "Bogor / In-House Company",
          short_desc: "Perusahaan yang kuat dibangun oleh individu yang memiliki visi, motivasi, dan nilai yang selaras. FASEL Crafting Collaboration dirancang untuk menginternalisasi core values dan mempererat engagement karyawan.",
          description: "<h3>Tentang Program:</h3><p>FASEL Crafting Collaboration adalah event interaktif yang memadukan simulasi experiential learning, dinamika kelompok, dan refleksi mendalam. Program ini bertujuan menyatukan persepsi, mengikis sekat komunikasi antar departemen, dan memicu semangat kerja baru.</p><h3>Fokus Pembelajaran:</h3><ul><li>Internalisasi Core Values Perusahaan</li><li>Peningkatan Kepercayaan & Komunikasi Terbuka</li><li>Problem Solving Kolaboratif</li><li>Penyelarasan Visi & Komitmen Bersama</li></ul>",
          btn_text: "Daftar / Konsultasi",
          btn_link: "https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20saya%20tertarik%20mengikuti%20program%20FASEL%20Crafting%20Collaboration",
          status: "active",
          created_at: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Leadforward: Youth & Emerging Leader Camp",
          tag: "Leadership Class",
          thumb: "training1.jpg",
          date: "Pendaftaran Terbuka",
          location: "Bogor, Jawa Barat",
          short_desc: "Program akselerasi kepemimpinan intensif untuk calon pemimpin masa depan. Fokus pada self-awareness, communication skills, dan emotional resilience.",
          description: "<h3>Program Overview:</h3><p>Leadforward Camp mengombinasikan pelatihan indoor berbobot dan tantangan experiential outdoor yang menguji kepemimpinan dalam kondisi nyata. Dipandu langsung oleh Master Trainer berlisensi BNSP.</p>",
          btn_text: "Info Lebih Lanjut",
          btn_link: "https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20saya%20ingin%20info%20program%20Leadforward",
          status: "active",
          created_at: new Date().toISOString(),
        },
        {
          id: 3,
          title: "Digital Amazing Race & Team Resilience Challenge",
          tag: "Team Building",
          thumb: "training2.jpg",
          date: "Sesuai Jadwal Klien",
          location: "Lokasi Fleksibel (Outdoor / Indoor)",
          short_desc: "Petualangan berbasis aplikasi digital yang memadukan strategi, kecepatan, ketangkasan, dan kekompakan tim dalam menyelesaikan misi-misi menantang.",
          description: "<h3>Keunggulan Digital Amazing Race:</h3><p>Menggunakan platform digital interaktif dengan sistem skor real-time, tantangan augmented puzzle, dan video response yang seru dan memacu adrenalin.</p>",
          btn_text: "Reservasi Tanggal",
          btn_link: "https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20kami%20ingin%20mengadakan%20Digital%20Amazing%20Race",
          status: "active",
          created_at: new Date().toISOString(),
        }
      ];
      fs.writeFileSync(EVENTS_FILE, JSON.stringify(initialEvents, null, 2), 'utf-8');
    }
  } catch (err) {
    // Abaikan write error di container serverless read-only
  }
}

// Helper membaca file JSON lokal
function readJson(filePath) {
  try {
    ensureDataDir();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    // Gagal membaca file JSON
  }
  return [];
}

// Helper menulis file JSON lokal (Aman di Serverless Vercel)
function writeJson(filePath, data) {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Pada Vercel Serverless (read-only filesystem), abaikan file write error
    console.warn('[Storage] File write diabaikan pada serverless read-only:', err.message);
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .substring(0, 100);
}

// In-memory cache for high-speed response (sub-millisecond)
let memoryCache = {
  blogsPublished: null,
  blogsPublishedTime: 0,
  eventsActive: null,
  eventsActiveTime: 0,
};

export function invalidateCache() {
  memoryCache = {
    blogsPublished: null,
    blogsPublishedTime: 0,
    eventsActive: null,
    eventsActiveTime: 0,
  };
}

// ==========================================
// BLOGS CRUD (Hybrid MySQL + JSON Storage)
// ==========================================

export async function getBlogs(limit = null, all = false) {
  // Cek cache memori terlebih dahulu untuk kecepatan maksimal jika hanya butuh published
  if (!all && memoryCache.blogsPublished && (Date.now() - memoryCache.blogsPublishedTime < 60000)) {
    const cached = memoryCache.blogsPublished;
    const result = limit ? cached.slice(0, limit) : cached;
    return { source: 'cache', data: result };
  }

  let finalBlogs = [];
  let source = 'json';

  // 1. Coba ambil dari MySQL
  try {
    let sql = all
      ? 'SELECT * FROM blogs ORDER BY id DESC'
      : 'SELECT * FROM blogs WHERE status = "published" ORDER BY id DESC';
    if (limit) sql += ` LIMIT ${limit}`;
    const rows = await query(sql);
    if (Array.isArray(rows)) {
      finalBlogs = rows;
      source = 'mysql';
    }
  } catch (dbErr) {
    if (process.env.DEBUG_MYSQL === 'true') {
      console.warn('[Storage] MySQL getBlogs offline:', dbErr.message);
    }
  }

  // 2. Fallback ke JSON Storage jika MySQL tidak ada data atau offline
  if (finalBlogs.length === 0 && source !== 'mysql') {
    const blogs = readJson(BLOGS_FILE);
    const filtered = all ? blogs : blogs.filter(b => b.status !== 'draft');
    finalBlogs = limit ? filtered.slice(0, limit) : filtered;
    source = 'json';
  }

  // Simpan ke cache jika mengambil data published
  if (!all && finalBlogs.length > 0 && !limit) {
    memoryCache.blogsPublished = finalBlogs;
    memoryCache.blogsPublishedTime = Date.now();
  }

  return { source, data: finalBlogs };
}

export async function getBlogByIdOrSlug(identifier) {
  const isNumeric = /^\d+$/.test(identifier);

  // 1. Coba ambil dari MySQL
  try {
    const sql = isNumeric ? 'SELECT * FROM blogs WHERE id = ?' : 'SELECT * FROM blogs WHERE slug = ?';
    const rows = await query(sql, [identifier]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL getBlogByIdOrSlug error:', dbErr.message);
  }

  // 2. Fallback ke JSON Storage
  const blogs = readJson(BLOGS_FILE);
  if (isNumeric) {
    return blogs.find(b => b.id === parseInt(identifier)) || null;
  }
  return blogs.find(b => b.slug === identifier) || null;
}

export async function createBlog(item) {
  const baseSlug = slugify(item.title);
  const slug = item.slug || `${baseSlug}-${Date.now().toString().slice(-4)}`;
  const date = item.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const author = item.author || 'Fasel Consulting';
  const thumb = item.thumb || '1.jpg';
  const excerpt = item.excerpt || (item.content ? item.content.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...' : '');
  const tags = item.tags || 'Training, Consulting';
  const status = item.status || 'published';

  let newId = Date.now();
  let savedToMySQL = false;

  // 1. Simpan ke MySQL terlebih dahulu jika MySQL terhubung
  try {
    const res = await query(
      `INSERT INTO blogs (title, slug, author, date, thumb, thumb_full, excerpt, content, tags, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [item.title, slug, author, date, thumb, thumb, excerpt, item.content, tags, status]
    );
    if (res && res.insertId) {
      newId = res.insertId;
      savedToMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL INSERT blogs error:', dbErr.message);
  }

  const newBlog = {
    id: newId,
    title: item.title,
    slug,
    author,
    date,
    thumb,
    thumb_full: thumb,
    excerpt,
    content: item.content,
    tags,
    status,
    created_at: new Date().toISOString()
  };

  // 2. Simpan juga ke JSON lokal (hanya jika writable)
  try {
    const blogs = readJson(BLOGS_FILE);
    blogs.unshift(newBlog);
    writeJson(BLOGS_FILE, blogs);
  } catch (e) {}

  invalidateCache();
  return { success: true, blog: newBlog, id: newBlog.id, slug, savedToMySQL };
}

export async function updateBlog(id, item) {
  const numericId = parseInt(id);
  let updatedInMySQL = false;

  // 1. Update di MySQL
  try {
    const res = await query(
      `UPDATE blogs SET 
        title = COALESCE(?, title),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        author = COALESCE(?, author),
        date = COALESCE(?, date),
        thumb = COALESCE(?, thumb),
        thumb_full = COALESCE(?, thumb_full),
        tags = COALESCE(?, tags),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [item.title, item.excerpt, item.content, item.author, item.date, item.thumb, item.thumb, item.tags, item.status, numericId]
    );
    if (res && res.affectedRows > 0) {
      updatedInMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL UPDATE blogs error:', dbErr.message);
  }

  // 2. Update di JSON lokal jika writable
  try {
    const blogs = readJson(BLOGS_FILE);
    const index = blogs.findIndex(b => b.id === numericId);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...item, id: numericId, updated_at: new Date().toISOString() };
      writeJson(BLOGS_FILE, blogs);
    }
  } catch (e) {}

  invalidateCache();
  return { success: true, message: 'Artikel berhasil diperbarui', updatedInMySQL };
}

export async function deleteBlog(id) {
  const numericId = parseInt(id);
  let deletedFromMySQL = false;

  // 1. Delete di MySQL
  try {
    const res = await query('DELETE FROM blogs WHERE id = ?', [numericId]);
    if (res && res.affectedRows > 0) {
      deletedFromMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL DELETE blogs error:', dbErr.message);
  }

  // 2. Delete di JSON lokal jika writable
  try {
    const blogs = readJson(BLOGS_FILE);
    const filtered = blogs.filter(b => b.id !== numericId);
    writeJson(BLOGS_FILE, filtered);
  } catch (e) {}

  invalidateCache();
  return { success: true, message: 'Artikel berhasil dihapus', deletedFromMySQL };
}

// ==========================================
// EVENTS CRUD (Hybrid MySQL + JSON Storage)
// ==========================================

export async function getEvents(limit = null, all = false) {
  // Cek cache memori terlebih dahulu untuk kecepatan maksimal
  if (!all && memoryCache.eventsActive && (Date.now() - memoryCache.eventsActiveTime < 60000)) {
    const cached = memoryCache.eventsActive;
    const result = limit ? cached.slice(0, limit) : cached;
    return { source: 'cache', data: result };
  }

  let finalEvents = [];
  let source = 'json';

  // 1. Coba ambil dari MySQL
  try {
    let sql = all
      ? 'SELECT * FROM events ORDER BY id DESC'
      : 'SELECT * FROM events WHERE status = "active" ORDER BY id DESC';
    if (limit) sql += ` LIMIT ${limit}`;
    const rows = await query(sql);
    if (Array.isArray(rows)) {
      finalEvents = rows;
      source = 'mysql';
    }
  } catch (dbErr) {
    if (process.env.DEBUG_MYSQL === 'true') {
      console.warn('[Storage] MySQL getEvents offline:', dbErr.message);
    }
  }

  // 2. Fallback ke JSON Storage
  if (finalEvents.length === 0 && source !== 'mysql') {
    const events = readJson(EVENTS_FILE);
    const filtered = all ? events : events.filter(e => e.status !== 'inactive');
    finalEvents = limit ? filtered.slice(0, limit) : filtered;
    source = 'json';
  }

  // Simpan ke cache jika mengambil data active
  if (!all && finalEvents.length > 0 && !limit) {
    memoryCache.eventsActive = finalEvents;
    memoryCache.eventsActiveTime = Date.now();
  }

  return { source, data: finalEvents };
}

export async function getEventById(id) {
  const numericId = parseInt(id);

  // 1. Coba ambil dari MySQL
  try {
    const rows = await query('SELECT * FROM events WHERE id = ?', [numericId]);
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL getEventById error:', dbErr.message);
  }

  // 2. Fallback ke JSON Storage
  const events = readJson(EVENTS_FILE);
  return events.find(e => e.id === numericId) || null;
}

export async function createEvent(item) {
  const tag = item.tag || 'Experiential Learning Approach';
  const thumb = item.thumb || 'faselevent1.jpg';
  const date = item.date || 'Pendaftaran Terbuka';
  const location = item.location || 'Bogor, Jawa Barat';
  const short_desc = item.short_desc || (item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...' : '');
  const description = item.description || `<p>${short_desc}</p>`;
  const btn_text = item.btn_text || 'Daftar Sekarang';
  const btn_link = item.btn_link || `https://wa.me/6281298319944?text=${encodeURIComponent('Halo Fasel, saya ingin mendaftar: ' + item.title)}`;
  const status = item.status || 'active';

  let newId = Date.now();
  let savedToMySQL = false;

  // 1. Simpan ke MySQL terlebih dahulu
  try {
    const res = await query(
      `INSERT INTO events (title, tag, thumb, date, location, short_desc, description, btn_text, btn_link, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [item.title, tag, thumb, date, location, short_desc, description, btn_text, btn_link, status]
    );
    if (res && res.insertId) {
      newId = res.insertId;
      savedToMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL INSERT events error:', dbErr.message);
  }

  const newEvent = {
    id: newId,
    title: item.title,
    tag,
    thumb,
    date,
    location,
    short_desc,
    description,
    btn_text,
    btn_link,
    status,
    created_at: new Date().toISOString()
  };

  // 2. Simpan juga ke JSON lokal jika writable
  try {
    const events = readJson(EVENTS_FILE);
    events.unshift(newEvent);
    writeJson(EVENTS_FILE, events);
  } catch (e) {}

  invalidateCache();
  return { success: true, event: newEvent, id: newEvent.id, savedToMySQL };
}

export async function updateEvent(id, item) {
  const numericId = parseInt(id);
  let updatedInMySQL = false;

  // 1. Update di MySQL
  try {
    const res = await query(
      `UPDATE events SET 
        title = COALESCE(?, title),
        tag = COALESCE(?, tag),
        thumb = COALESCE(?, thumb),
        date = COALESCE(?, date),
        location = COALESCE(?, location),
        short_desc = COALESCE(?, short_desc),
        description = COALESCE(?, description),
        btn_text = COALESCE(?, btn_text),
        btn_link = COALESCE(?, btn_link),
        status = COALESCE(?, status)
       WHERE id = ?`,
      [item.title, item.tag, item.thumb, item.date, item.location, item.short_desc, item.description, item.btn_text, item.btn_link, item.status, numericId]
    );
    if (res && res.affectedRows > 0) {
      updatedInMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL UPDATE events error:', dbErr.message);
  }

  // 2. Update di JSON lokal jika writable
  try {
    const events = readJson(EVENTS_FILE);
    const index = events.findIndex(e => e.id === numericId);
    if (index !== -1) {
      events[index] = { ...events[index], ...item, id: numericId, updated_at: new Date().toISOString() };
      writeJson(EVENTS_FILE, events);
    }
  } catch (e) {}

  invalidateCache();
  return { success: true, message: 'Event berhasil diperbarui', updatedInMySQL };
}

export async function deleteEvent(id) {
  const numericId = parseInt(id);
  let deletedFromMySQL = false;

  // 1. Delete di MySQL
  try {
    const res = await query('DELETE FROM events WHERE id = ?', [numericId]);
    if (res && res.affectedRows > 0) {
      deletedFromMySQL = true;
    }
  } catch (dbErr) {
    console.warn('[Storage] MySQL DELETE events error:', dbErr.message);
  }

  // 2. Delete di JSON lokal jika writable
  try {
    const events = readJson(EVENTS_FILE);
    const filtered = events.filter(e => e.id !== numericId);
    writeJson(EVENTS_FILE, filtered);
  } catch (e) {}

  invalidateCache();
  return { success: true, message: 'Event berhasil dihapus', deletedFromMySQL };
}
