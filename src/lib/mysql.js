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
async function ensureDbSchema(db) {
  if (migrated) return;
  migrated = true;

  try {
    // 1. Pastikan kolom gambar berkapasitas besar
    await db.query('ALTER TABLE blogs MODIFY COLUMN thumb MEDIUMTEXT');
    await db.query('ALTER TABLE blogs MODIFY COLUMN thumb_full MEDIUMTEXT');
    await db.query('ALTER TABLE events MODIFY COLUMN thumb MEDIUMTEXT');
  } catch (e) {
    // Abaikan jika tabel belum ada atau sudah sesuai
  }

  try {
    // 2. Tambahkan kolom SEO Booster ke tabel blogs jika belum ada
    const [cols] = await db.query('SHOW COLUMNS FROM blogs');
    const colNames = Array.isArray(cols) ? cols.map((c) => c.Field) : [];

    if (!colNames.includes('meta_title')) {
      await db.query('ALTER TABLE blogs ADD COLUMN meta_title VARCHAR(255) NULL');
    }
    if (!colNames.includes('meta_description')) {
      await db.query('ALTER TABLE blogs ADD COLUMN meta_description TEXT NULL');
    }
    if (!colNames.includes('keywords')) {
      await db.query('ALTER TABLE blogs ADD COLUMN keywords VARCHAR(255) NULL');
    }
    if (!colNames.includes('canonical_url')) {
      await db.query('ALTER TABLE blogs ADD COLUMN canonical_url VARCHAR(255) NULL');
    }

    // 3. Jika tabel blogs di database kosong (0 artikel), masukkan 3 artikel pilar langsung ke database MySQL!
    const [countResult] = await db.query('SELECT COUNT(*) as count FROM blogs');
    const blogCount = countResult?.[0]?.count ?? 0;

    if (blogCount === 0) {
      const seedSql = `
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
          '<p>Dalam lanskap bisnis modern yang serba cepat dan kompetitif, keberhasilan perusahaan sangat ditentukan oleh kelincahan (agility) dan kualitas sumber daya manusianya. Namun, banyak organisasi masih mengandalkan pelatihan konvensional di ruang kelas—di mana peserta hanya mendengarkan paparan teori searah yang 70% di antaranya terlupakan dalam hitungan minggu. Di sinilah pendekatan <strong>Experiential Learning Indonesia</strong> hadir sebagai solusi transformasional terbaik.</p><h2>Apa Itu Metode Experiential Learning?</h2><p>Experiential Learning adalah siklus pembelajaran berbasis pengalaman nyata (learning through action). Berakar pada teori David Kolb, metodologi ini melibatkan 4 tahapan berkesinambungan:</p><ol><li><strong>Concrete Experience (Pengalaman Nyata):</strong> Peserta dihadapkan pada simulasi, dinamika kelompok, atau tantangan bisnis terstruktur yang memicu respons alami mereka.</li><li><strong>Reflective Observation (Refleksi Kritis):</strong> Bersama fasilitator bersertifikasi BNSP, peserta membedah apa yang terjadi, pola komunikasi yang muncul, serta kendala emosional yang dirasakan.</li><li><strong>Abstract Conceptualization (Konseptualisasi):</strong> Menghubungkan temuan simulasi dengan realitas kerja di kantor dan prinsip <em>Leadership Development Program</em>.</li><li><strong>Active Experimentation (Aplikasi Nyata):</strong> Merumuskan komitmen dan rencana aksi konkret untuk diterapkan langsung dalam pekerjaan harian.</li></ol><h2>Mengapa Korporasi Membutuhkan Experiential Learning?</h2><p>Berbagai riset psikologi organisasi membuktikan bahwa pembelajaran berbasis pengalaman mampu meningkatkan retensi pemahaman hingga 80%. Berikut keunggulan utamanya bagi perusahaan:</p><ul><li><strong>Mengikis Silo Antar Departemen:</strong> Simulasi tim melatih komunikasi terbuka dan menghilangkan sekat ego sektoral.</li><li><strong>Menginternalisasi Nilai Inti Perusahaan (Core Values):</strong> Nilai budaya seperti integritas, inovasi, dan kerja sama tidak hanya dihafal, melainkan dirasakan dan dipraktikkan langsung.</li><li><strong>Mempercepat Regenerasi Pemimpin:</strong> Membuka potensi kepemimpinan alami karyawan muda dan manajer lini pertama dalam menghadapi situasi krisis dan tekanan.</li></ul><p>Fasel Consulting hadir mendampingi korporasi di seluruh Indonesia dalam merancang program <strong>Pelatihan Kepemimpinan</strong> dan <strong>Experiential Learning</strong> yang terukur dan berdampak nyata terhadap produktivitas tim Anda.</p>',
          'Experiential Learning, Leadership, Training',
          'published',
          'Experiential Learning Indonesia: Strategi Efektif SDM Perusahaan',
          'Pelajari bagaimana metode Experiential Learning di Indonesia terbukti mentransformasi karakter kepemimpinan, meningkatkan kekompakan tim, dan budaya kerja perusahaan.',
          'Experiential Learning Indonesia, Pelatihan Kepemimpinan, Corporate Training',
          'https://www.faselconsulting.id/blog/experiential-learning-indonesia-transformasi-sdm'
        ),
        (
          'Leadership Development Program: Panduan Membangun Karakter Pemimpin Tangguh di Era Modern',
          'panduan-leadership-development-program-perusahaan',
          'Ardian Rangga',
          '05 Oktober 2026',
          '/assets/img/blog/2.jpg',
          '/assets/img/blog/2.jpg',
          'Panduan komprehensif merancang Leadership Development Program (LDP) yang efektif untuk menciptakan pemimpin yang adaptif, berintegritas, dan solutif di organisasi.',
          '<p>Pemimpin hebat tidak lahir secara kebetulan; mereka dibentuk melalui proses pembinaan yang terencana, konsisten, dan menantang. Di tengah disrupsi teknologi dan perubahan generasi tenaga kerja, kebutuhan akan <strong>Leadership Development Program (LDP)</strong> yang relevan menjadi prioritas utama para pemimpin HR dan Direksi.</p><h2>Pilar Utama Leadership Development Program yang Berhasil</h2><p>Sebuah program pengembangan kepemimpinan tidak boleh hanya berfokus pada hard skills teknis, melainkan harus memperkuat aspek karakter fundamental:</p><h3>1. Self-Awareness & Kecerdasan Emosional (EQ)</h3><p>Seorang pemimpin yang efektif harus mampu mengenali emosi diri sendiri, mengelola stres di bawah tekanan, dan memahami perspektif anggota timnya. Kepemimpinan berbasis empati terbukti menciptakan tim dengan retensi dan loyalitas tertinggi.</p><h3>2. Strategic Thinking & Collaborative Problem Solving</h3><p>Melalui simulasi kepemimpinan berbasis metode <strong>Experiential Learning Indonesia</strong>, para calon pemimpin dilatih untuk melihat gambaran besar (big picture), mengidentifikasi akar masalah bisnis, dan mengambil keputusan cepat dengan risiko terukur.</p><h3>3. Coaching & Mentoring Skills</h3><p>Pemimpin masa kini bukan lagi sekadar mandor yang memberi perintah, melainkan seorang coach yang mampu memberdayakan potensi timnya untuk mencapai performa terbaik secara mandiri.</p><h2>Langkah Implementasi di Perusahaan Anda</h2><p>Untuk memastikan investasi pelatihan menghasilkan ROI (Return on Investment) nyata, Fasel Consulting menerapkan tahapan terstruktur mulai dari <em>Training Needs Analysis (TNA)</em>, perancangan skenario pelatihan custom, pelaksanaan sesi interaktif intensif, hingga evaluasi pasca-training berskala 30-60-90 hari.</p>',
          'Leadership Development, SDM, Corporate Training',
          'published',
          'Leadership Development Program: Panduan Pemimpin Tangguh Era Modern',
          'Panduan komprehensif merancang Leadership Development Program (LDP) yang efektif untuk menciptakan pemimpin yang adaptif, berintegritas, dan solutif di organisasi.',
          'Leadership Development Program, Pelatihan Kepemimpinan Perusahaan, Pengembangan SDM',
          'https://www.faselconsulting.id/blog/panduan-leadership-development-program-perusahaan'
        ),
        (
          'Mengapa Team Building Tradisional Sering Gagal dan Cara Mengatasinya dengan Experiential Training',
          'mengapa-team-building-tradisional-sering-gagal',
          'Fasel Consulting',
          '28 September 2026',
          '/assets/img/blog/3.jpg',
          '/assets/img/blog/3.jpg',
          'Banyak perusahaan menghabiskan puluhan juta rupiah untuk outbound biasa tanpa hasil nyata. Temukan alasan dan cara mengubah team building menjadi katalis produktivitas.',
          '<p>Setiap tahun, ribuan perusahaan di Indonesia menyelenggarakan acara tahunan dengan harapan dapat mempererat kekompakan karyawan. Sayangnya, banyak dari acara tersebut hanya berhenti sebagai rekreasi atau fun games sesaat. Setelah kembali ke kantor di hari Senin, konflik lama, komunikasi yang macet, dan silo departemen kembali terulang seperti semula. Mengapa ini bisa terjadi?</p><h2>Kelemahan Utama Outbound Tradisional</h2><ul><li><strong>Hanya Fokus pada Hura-Hura (Fun Tanpa Makna):</strong> Permainan seru yang tidak memiliki kaitan logis dengan tantangan pekerjaan sehari-hari gagal membentuk refleksi diri.</li><li><strong>Tanpa Fasilitator & Debriefing Terstandar:</strong> Tanpa adanya sesi pembedahan insight (debrief) oleh Master Trainer yang memahami dinamika kelompok, pengalaman tersebut hilang begitu saja tanpa kesimpulan aksi.</li><li><strong>Pendekatan One-Size-Fits-All:</strong> Menggunakan permainan standar tanpa menyesuaikan dengan problem spesifik yang sedang dihadapi divisi atau perusahaan.</li></ul><h2>Solusi: Pendekatan Experiential Team Building</h2><p>Fasel Consulting merancang program <strong>Team Building & Capacity Building</strong> dengan metodologi Experiential Learning yang memadukan keseruan, tantangan fisik-mental, dan sesi coaching mendalam. Setiap permainan memiliki metafora bisnis yang jelas, dirancang untuk membangun rasa saling percaya (trust), keberanian berpendapat, dan komitmen mencapai target bersama.</p><p>Ingin merancang program team building yang berkesan dan memberikan dampak nyata bagi performa perusahaan Anda? Konsultasikan kebutuhan tim Anda bersama para fasilitator berlisensi Fasel Consulting hari ini.</p>',
          'Team Building, Outbound Training, Kolaborasi Tim',
          'published',
          'Mengapa Team Building Tradisional Gagal? Solusi Experiential Training',
          'Banyak perusahaan menghabiskan anggaran besar untuk outbound biasa tanpa hasil nyata. Temukan cara mengubah team building menjadi katalis produktivitas kerja.',
          'Team Building Bogor, Outbound Training Jakarta, Experiential Team Building',
          'https://www.faselconsulting.id/blog/mengapa-team-building-tradisional-sering-gagal'
        );
      `;
      await db.query(seedSql);
    }
  } catch (err) {
    console.warn('[MySQL Schema/Seed Notice]:', err.message);
  }
}

export async function query(sql, params = []) {
  if (isDbCircuitOpen()) {
    throw new Error('MySQL offline (circuit open)');
  }

  try {
    const db = getPool();
    if (!migrated) {
      await ensureDbSchema(db);
    }
    const [rows] = await db.query(sql, params);
    return rows;
  } catch (error) {
    markDbOffline(60000);
    if (process.env.DEBUG_MYSQL === 'true') {
      console.warn('MySQL Offline / Notice:', error.message);
    }
    throw error;
  }
}
