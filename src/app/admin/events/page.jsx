"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { toast } from "react-toastify";
import { adminFetch } from "@/lib/apiClient";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/events");
      const data = await res.json();
      if (data.success) {
        setEvents(data.data || []);
      }
    } catch (err) {
      toast.error("Gagal memuat daftar pelatihan & event");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus event "${title}"?`)) {
      return;
    }

    try {
      const res = await adminFetch(`/api/events/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Pelatihan / Event berhasil dihapus");
        setEvents(events.filter((e) => e.id !== id));
      } else {
        toast.error(data.message || "Gagal menghapus event");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus event");
    }
  };

  const actionButton = (
    <Link href="/admin/events/new" className="btn btn-success btn-sm fw-bold d-flex align-items-center gap-1 shadow-sm">
      <i className="fas fa-plus"></i> Tambah Pelatihan / Event
    </Link>
  );

  return (
    <AdminLayout title="Kelola Pelatihan & Event" actionButton={actionButton}>
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark">Daftar Pelatihan & Event ({events.length})</span>
          <button onClick={fetchEvents} className="btn btn-outline-secondary btn-sm" title="Refresh">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm text-success me-2"></div>
              Memuat data pelatihan...
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-calendar-alt fa-3x mb-3 text-secondary"></i>
              <p className="mb-2">Belum ada pelatihan atau event yang ditambahkan.</p>
              <Link href="/admin/events/new" className="btn btn-success btn-sm">
                Tambah Event Pertama
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "80px" }} className="ps-3">Foto</th>
                    <th>Nama Pelatihan / Event</th>
                    <th>Kategori</th>
                    <th>Jadwal / Tanggal</th>
                    <th>Lokasi</th>
                    <th>Link Daftar</th>
                    <th style={{ width: "160px" }} className="text-end pe-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((evt) => (
                    <tr key={evt.id}>
                      <td className="ps-3">
                        <div
                          style={{
                            width: "56px",
                            height: "42px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            backgroundColor: "#eee",
                          }}
                        >
                          <img
                            src={
                              evt.thumb?.startsWith("http") || evt.thumb?.startsWith("/") || evt.thumb?.startsWith("data:")
                                ? evt.thumb
                                : `/assets/img/projects/${evt.thumb || "faselevent1.jpg"}`
                            }
                            alt="Thumb"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.src = "/assets/img/projects/faselevent1.jpg";
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{evt.title}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: "350px" }}>
                          {evt.short_desc || "Tidak ada deskripsi singkat"}
                        </small>
                      </td>
                      <td>
                        <span className="badge bg-secondary">{evt.tag}</span>
                      </td>
                      <td className="small text-muted">{evt.date || "Pendaftaran Terbuka"}</td>
                      <td className="small text-muted">{evt.location || "Bogor"}</td>
                      <td>
                        {evt.btn_link ? (
                          <a
                            href={evt.btn_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="badge bg-success text-decoration-none d-inline-flex align-items-center gap-1"
                          >
                            <i className="fab fa-whatsapp"></i> WhatsApp
                          </a>
                        ) : (
                          <span className="text-muted small">-</span>
                        )}
                      </td>
                      <td className="text-end pe-3">
                        <div className="btn-group btn-group-sm">
                          <Link
                            href={`/project-details/${evt.id}`}
                            target="_blank"
                            className="btn btn-outline-secondary"
                            title="Pratinjau"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            href={`/admin/events/edit/${evt.id}`}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(evt.id, evt.title)}
                            className="btn btn-outline-danger"
                            title="Hapus"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
