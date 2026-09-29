"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";

export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [dataSource, setDataSource] = useState("loading");
  const [dbStatus, setDbStatus] = useState(null);
  const [checkingDb, setCheckingDb] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkDbConnection() {
    setCheckingDb(true);
    try {
      const res = await adminFetch("/api/db-status");
      const data = await res.json();
      setDbStatus(data);
      if (data.connected) {
        setDataSource("mysql");
      }
    } catch (e) {
      console.warn("Could not check db status", e);
    } finally {
      setCheckingDb(false);
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        const [blogRes, eventRes, dbRes] = await Promise.all([
          adminFetch("/api/blogs?all=true"),
          adminFetch("/api/events?all=true"),
          adminFetch("/api/db-status"),
        ]);
        const blogData = await blogRes.json();
        const eventData = await eventRes.json();
        const dbData = await dbRes.json();

        if (blogData.success) {
          setBlogs(blogData.data || []);
        }
        if (eventData.success) {
          setEvents(eventData.data || []);
        }
        if (dbData.success) {
          setDbStatus(dbData);
          setDataSource(dbData.connected ? "mysql" : (blogData.source || "json"));
        } else {
          setDataSource(blogData.source || "json");
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const isConnected = dataSource === "mysql" || dbStatus?.connected;

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Status Alert Banner */}
      <div className={`alert ${isConnected ? 'alert-success' : 'alert-warning'} border-0 shadow-sm mb-4`}>
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <i className={`fas fa-database fa-2x ${isConnected ? 'text-success' : 'text-warning'}`}></i>
            <div>
              <h6 className="mb-0 fw-bold">Status Penyimpanan Data</h6>
              <div className="small mt-1">
                {isConnected ? (
                  <span className="text-success fw-bold">
                    <i className="fas fa-check-circle me-1"></i> Terhubung langsung ke Database MySQL Hostinger ({dbStatus?.config?.host || 'Hostinger'})
                  </span>
                ) : (
                  <div>
                    <span className="text-dark fw-bold">
                      <i className="fas fa-exclamation-triangle text-warning me-1"></i> Mode Offline / JSON Fallback
                    </span>
                    <span className="text-muted ms-2">
                      {dbStatus?.config?.isDefaultHost 
                        ? "(Variabel DB_HOST Hostinger belum dipasang di Vercel Environment Variables)"
                        : dbStatus?.error 
                          ? `(Error koneksi: ${dbStatus.error})` 
                          : "(Database Hostinger belum terhubung)"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={checkDbConnection}
              disabled={checkingDb}
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1 bg-white"
            >
              <i className={`fas fa-sync-alt ${checkingDb ? 'fa-spin' : ''}`}></i>
              {checkingDb ? "Memeriksa..." : "Tes Ulang Koneksi"}
            </button>
            <a
              href="/database.sql"
              download
              className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1 bg-white"
            >
              <i className="fas fa-download"></i> Unduh database.sql
            </a>
          </div>
        </div>

        {!isConnected && (
          <div className="mt-3 pt-3 border-top border-warning-subtle small text-dark">
            <strong>Cara Menghubungkan ke Hostinger MySQL:</strong>
            <ol className="mb-1 mt-1 ps-3">
              <li>Pastikan di <strong>Hostinger hPanel &rarr; Databases &rarr; Remote MySQL</strong> sudah dibuat izin akses dengan IP: <code>%</code> (Semua Host).</li>
              <li>Buka <strong>Vercel &rarr; Settings &rarr; Environment Variables</strong>, lalu masukkan <code>DB_HOST</code> (<code>srv1762.hstgr.io</code>), <code>DB_USER</code>, <code>DB_PASSWORD</code>, <code>DB_NAME</code>, dan <code>ADMIN_PASSWORD</code>.</li>
              <li>Lakukan <strong>Redeploy</strong> di Vercel agar Environment Variables tersebut aktif.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-bold">TOTAL BLOG / ARTIKEL</span>
                <h2 className="fw-bold mt-2 mb-0 text-dark">{blogs.length}</h2>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#e7f1ff", color: "#0d6efd" }}
              >
                <i className="fas fa-newspaper fa-lg"></i>
              </div>
            </div>
            <div className="mt-3">
              <Link href="/admin/blogs" className="small text-decoration-none fw-bold">
                Kelola Blog <i className="fas fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-bold">PELATIHAN & EVENT</span>
                <h2 className="fw-bold mt-2 mb-0 text-dark">{events.length}</h2>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#e8f7f0", color: "#198754" }}
              >
                <i className="fas fa-calendar-check fa-lg"></i>
              </div>
            </div>
            <div className="mt-3">
              <Link href="/admin/events" className="small text-decoration-none text-success fw-bold">
                Kelola Pelatihan <i className="fas fa-arrow-right ms-1"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-bold">WHATSAPP RESMI</span>
                <h5 className="fw-bold mt-2 mb-0 text-dark">+62 812 9831 9944</h5>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "54px", height: "54px", backgroundColor: "#d1e7dd", color: "#0f5132" }}
              >
                <i className="fab fa-whatsapp fa-lg"></i>
              </div>
            </div>
            <div className="mt-3">
              <span className="badge bg-success">Terkoneksi Form</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small fw-bold">AKSI CEPAT</span>
                <div className="d-flex flex-column gap-2 mt-2">
                  <Link href="/admin/blogs/new" className="btn btn-primary btn-sm fw-bold">
                    <i className="fas fa-plus me-1"></i> Tulis Blog Baru
                  </Link>
                  <Link href="/admin/events/new" className="btn btn-outline-success btn-sm fw-bold">
                    <i className="fas fa-plus me-1"></i> Tambah Pelatihan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Preview Grid */}
      <div className="row g-4">
        {/* Recent Blogs */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-dark">
                <i className="fas fa-newspaper me-2 text-primary"></i> Artikel Blog Terbaru
              </h6>
              <Link href="/admin/blogs" className="btn btn-sm btn-outline-primary">
                Lihat Semua
              </Link>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="p-4 text-center text-muted">Memuat data...</div>
              ) : blogs.length === 0 ? (
                <div className="p-4 text-center text-muted">Belum ada artikel blog.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3">Judul</th>
                        <th>Penulis</th>
                        <th>Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.slice(0, 5).map((blog) => (
                        <tr key={blog.id}>
                          <td className="ps-3 fw-semibold text-truncate" style={{ maxWidth: "220px" }}>
                            {blog.title}
                          </td>
                          <td className="small text-muted">{blog.author}</td>
                          <td className="small text-muted">{blog.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Events / Trainings */}
        <div className="col-12 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 h-100 bg-white">
            <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-bold text-dark">
                <i className="fas fa-calendar-alt me-2 text-success"></i> Pelatihan & Event Terdaftar
              </h6>
              <Link href="/admin/events" className="btn btn-sm btn-outline-success">
                Lihat Semua
              </Link>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="p-4 text-center text-muted">Memuat data...</div>
              ) : events.length === 0 ? (
                <div className="p-4 text-center text-muted">Belum ada pelatihan atau event.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3">Nama Pelatihan / Event</th>
                        <th>Kategori</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.slice(0, 5).map((evt) => (
                        <tr key={evt.id}>
                          <td className="ps-3 fw-semibold text-truncate" style={{ maxWidth: "220px" }}>
                            {evt.title}
                          </td>
                          <td>
                            <span className="badge bg-secondary">{evt.tag}</span>
                          </td>
                          <td>
                            <span className="badge bg-success">Aktif</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
