-- Database Schema for Fasel Consulting
-- Hostinger MySQL Database

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------
-- Table: admin_users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) DEFAULT 'Admin Fasel',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Admin User (Bcrypt Encrypted Hash)
INSERT INTO `admin_users` (`username`, `password`, `name`) 
VALUES ('admin', '$2b$10$t1/spFrdJFU1R8Og9z3gjeBICoNdbQ1H029yplkHL31sDgsTrP4iq', 'Admin Fasel Consulting')
ON DUPLICATE KEY UPDATE `password`=VALUES(`password`);

-- -----------------------------------------------------
-- Table: blogs
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `author` VARCHAR(100) DEFAULT 'Fasel Consulting',
  `date` VARCHAR(50) DEFAULT '',
  `thumb` MEDIUMTEXT,
  `thumb_full` MEDIUMTEXT,
  `excerpt` TEXT,
  `content` LONGTEXT,
  `tags` VARCHAR(255) DEFAULT 'Training, Leadership',
  `status` ENUM('published', 'draft') DEFAULT 'published',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Blogs
INSERT INTO `blogs` (`title`, `slug`, `author`, `date`, `thumb`, `thumb_full`, `excerpt`, `content`, `tags`, `status`)
VALUES 
(
  'Pentingnya Experiential Learning untuk Memperkuat Budaya Perusahaan',
  'pentingnya-experiential-learning-budaya-perusahaan',
  'Ardian Rangga',
  '24 September 2026',
  '1.jpg',
  '1.jpg',
  'Experiential learning bukan sekadar pelatihan biasa, melainkan pendekatan pembelajaran berbasis pengalaman langsung yang mengubah cara tim berpikir dan berkolaborasi.',
  '<p>Dalam era bisnis yang dinamis saat ini, metode pelatihan konvensional seperti presentasi satu arah di ruang kelas sering kali kurang efektif dalam menghasilkan perubahan perilaku jangka panjang. Di sinilah <strong>Experiential Learning</strong> memegang peranan krusial.</p><p>Experiential Learning berfokus pada siklus belajar dari pengalaman langsung, refleksi kritis, konseptualisasi ide, hingga aplikasi nyata di tempat kerja. Melalui simulasi tantangan bisnis dan dinamika kelompok, setiap anggota tim dapat mengenali kekuatan serta area pengembangan mereka secara nyata.</p><h3>Manfaat Utama untuk Organisasi:</h3><ul><li>Meningkatkan komunikasi dan rasa saling percaya (trust) antar karyawan.</li><li>Menginternalisasi nilai-nilai inti perusahaan (core values) secara mendalam.</li><li>Mengasah kemampuan pemecahan masalah secara kolaboratif di bawah tekanan.</li></ul><p>Fasel Consulting siap membantu organisasi Anda merancang program pelatihan berbasis pengalaman yang disesuaikan dengan kebutuhan spesifik tim Anda.</p>',
  'Experiential Learning, Training',
  'published'
),
(
  'Membangun Mindset Kepemimpinan Masa Depan (Growth Mindset Leadership)',
  'membangun-mindset-kepemimpinan-masa-depan',
  'Ardian Rangga',
  '18 September 2026',
  '2.jpg',
  '2.jpg',
  'Kepemimpinan bukan tentang gelar atau jabatan, melainkan tentang kemampuan menginspirasi orang lain untuk berkembang dan mencapai potensi terbaik mereka.',
  '<p>Seorang pemimpin yang adaptif adalah mereka yang memiliki <em>Growth Mindset</em>—keyakinan bahwa kemampuan dan kecerdasan dapat terus diasah melalui dedikasi dan kerja keras. Pemimpin dengan mindset ini melihat kegagalan sebagai batu loncatan untuk belajar, bukan sebagai akhir.</p><p>Program <strong>Leadforward Leadership Transformation</strong> dari Fasel Consulting dirancang untuk membekali para pemimpin muda maupun senior dengan kecerdasan emosional (EQ), kemampuan komunikasi strategis, dan ketangguhan mental dalam memimpin tim.</p>',
  'Leadership, Manajemen',
  'published'
),
(
  'Mengapa Team Building Tradisional Sering Gagal dan Cara Mengatasinya',
  'mengapa-team-building-tradisional-sering-gagal',
  'Fasel Consulting',
  '10 September 2026',
  '3.jpg',
  '3.jpg',
  'Banyak perusahaan menghabiskan anggaran besar untuk outbound dan games, namun setelah kembali ke kantor tidak ada dampak nyata. Apa yang salah?',
  '<p>Banyak kegiatan outbound hanya fokus pada kesenangan sesaat (fun) tanpa adanya fasilitasi refleksi dan debriefing yang mendalam. Padahal, inti dari team building yang efektif adalah transfer nilai dari permainan ke realitas kerja sehari-hari.</p><p>Dengan pendekatan terstruktur dan fasilitator tersertifikasi BNSP, Fasel Consulting memastikan setiap sesi team building memiliki output terukur yang membawa dampak positif pada produktivitas tim Anda.</p>',
  'Team Building, Kolaborasi',
  'published'
)
ON DUPLICATE KEY UPDATE `slug`=`slug`;

-- -----------------------------------------------------
-- Table: events (Pelatihan & Event)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `tag` VARCHAR(100) DEFAULT 'Experiential Learning Approach',
  `thumb` MEDIUMTEXT,
  `date` VARCHAR(100) DEFAULT '',
  `location` VARCHAR(255) DEFAULT 'Bogor, Jawa Barat',
  `short_desc` TEXT,
  `description` LONGTEXT,
  `btn_text` VARCHAR(50) DEFAULT 'Daftar Sekarang',
  `btn_link` VARCHAR(255) DEFAULT 'https://wa.me/6281298319944?text=Halo%20Fasel%20saya%20ingin%20mendaftar%20event',
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Events
INSERT INTO `events` (`title`, `tag`, `thumb`, `date`, `location`, `short_desc`, `description`, `btn_text`, `btn_link`, `status`)
VALUES
(
  'FASEL Crafting Collaboration & Core Values',
  'Experiential Learning Approach',
  'faselevent1.jpg',
  'Batch Mendatang: Kontak Kami',
  'Bogor / In-House Company',
  'Perusahaan yang kuat dibangun oleh individu yang memiliki visi, motivasi, dan nilai yang selaras. FASEL Crafting Collaboration dirancang untuk menginternalisasi core values dan mempererat engagement karyawan.',
  '<h3>Tentang Program:</h3><p>FASEL Crafting Collaboration adalah event interaktif yang memadukan simulasi experiential learning, dinamika kelompok, dan refleksi mendalam. Program ini bertujuan menyatukan persepsi, mengikis sekat komunikasi antar departemen, dan memicu semangat kerja baru.</p><h3>Fokus Pembelajaran:</h3><ul><li>Internalisasi Core Values Perusahaan</li><li>Peningkatan Kepercayaan & Komunikasi Terbuka</li><li>Problem Solving Kolaboratif</li><li>Penyelarasan Visi & Komitmen Bersama</li></ul>',
  'Daftar / Konsultasi',
  'https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20saya%20tertarik%20mengikuti%20program%20FASEL%20Crafting%20Collaboration',
  'active'
),
(
  'Leadforward: Youth & Emerging Leader Camp',
  'Leadership Class',
  'training1.jpg',
  'Pendaftaran Terbuka',
  'Bogor, Jawa Barat',
  'Program akselerasi kepemimpinan intensif untuk calon pemimpin masa depan. Fokus pada self-awareness, communication skills, dan emotional resilience.',
  '<h3>Program Overview:</h3><p>Leadforward Camp mengombinasikan pelatihan indoor berbobot dan tantangan experiential outdoor yang menguji kepemimpinan dalam kondisi nyata. Dipandu langsung oleh Master Trainer berlisensi BNSP.</p>',
  'Info Lebih Lanjut',
  'https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20saya%20ingin%20info%20program%20Leadforward',
  'active'
),
(
  'Digital Amazing Race & Team Resilience Challenge',
  'Team Building',
  'training2.jpg',
  'Sesuai Jadwal Klien',
  'Lokasi Fleksibel (Outdoor / Indoor)',
  'Petualangan berbasis aplikasi digital yang memadukan strategi, kecepatan, ketangkasan, dan kekompakan tim dalam menyelesaikan misi-misi menantang.',
  '<h3>Keunggulan Digital Amazing Race:</h3><p>Menggunakan platform digital interaktif dengan sistem skor real-time, tantangan augmented puzzle, dan video response yang seru dan memacu adrenalin.</p>',
  'Reservasi Tanggal',
  'https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20kami%20ingin%20mengadakan%20Digital%20Amazing%20Race',
  'active'
)
ON DUPLICATE KEY UPDATE `title`=`title`;
