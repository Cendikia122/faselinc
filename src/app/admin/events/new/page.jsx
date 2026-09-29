"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";
import { compressImage } from "@/lib/imageCompressor";

export default function NewEventPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    tag: "Experiential Learning Approach",
    thumb: "faselevent1.jpg",
    date: "Pendaftaran Terbuka",
    location: "Bogor, Jawa Barat",
    short_desc: "",
    description: "",
    btn_text: "Daftar Sekarang",
    btn_link: "https://wa.me/6281298319944",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setUploading(true);
    try {
      const file = await compressImage(rawFile);
      const data = new FormData();
      data.append("file", file);

      const res = await adminFetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setForm((prev) => ({ ...prev, thumb: result.url }));
        toast.success("Foto event berhasil diunggah!");
      } else {
        toast.error(result.message || "Gagal mengunggah foto");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat upload");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Nama pelatihan / event wajib diisi!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await adminFetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Pelatihan / Event berhasil ditambahkan!");
        router.push("/admin/events");
      } else {
        toast.error(data.message || "Gagal menyimpan event");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Tambah Pelatihan / Event Baru">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Title */}
                <div className="col-12">
                  <label className="form-label fw-bold">Nama Pelatihan / Event <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Contoh: Leadforward Leadership Transformation"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category / Tag */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Kategori Program</label>
                  <select
                    name="tag"
                    className="form-select"
                    value={form.tag}
                    onChange={handleChange}
                  >
                    <option value="Experiential Learning Approach">Experiential Learning Approach</option>
                    <option value="Leadership Class">Leadership Class</option>
                    <option value="Team Building">Team Building</option>
                    <option value="Capacity Building">Capacity Building</option>
                    <option value="Consulting & OD">Consulting & Organizational Development</option>
                    <option value="Public Speaking">Public Speaking</option>
                  </select>
                </div>

                {/* Date */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Jadwal / Tanggal Pelaksanaan</label>
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    placeholder="Contoh: 15-17 Oktober 2026 / Pendaftaran Terbuka"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                {/* Location & WhatsApp Link */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Lokasi Pelaksanaan</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
                    placeholder="Contoh: Bogor, Jawa Barat / In-House Client"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Link Pendaftaran / WhatsApp</label>
                  <input
                    type="text"
                    name="btn_link"
                    className="form-control"
                    placeholder="https://wa.me/6281298319944?text=..."
                    value={form.btn_link}
                    onChange={handleChange}
                  />
                  <small className="text-muted">Link otomatis terbuka saat calon peserta menekan tombol daftar.</small>
                </div>

                {/* Thumbnail Image */}
                <div className="col-12">
                  <label className="form-label fw-bold">Foto / Poster Event</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      name="thumb"
                      className="form-control"
                      placeholder="Nama file foto (contoh: faselevent1.jpg) atau upload file baru di bawah"
                      value={form.thumb}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="file"
                      className="form-control form-control-sm"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading && <span className="spinner-border spinner-border-sm text-primary"></span>}
                  </div>
                  {form.thumb && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <img
                        src={
                          form.thumb.startsWith("http") || form.thumb.startsWith("/") || form.thumb.startsWith("data:")
                            ? form.thumb
                            : `/assets/img/projects/${form.thumb}`
                        }
                        alt="Preview"
                        style={{ width: "64px", height: "48px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }}
                        onError={(e) => { e.target.src = "/assets/img/projects/faselevent1.jpg"; }}
                      />
                      <small className="text-success fw-bold"><i className="fas fa-check-circle me-1"></i> Foto terpilih</small>
                    </div>
                  )}
                </div>

                {/* Short Overview */}
                <div className="col-12">
                  <label className="form-label fw-bold">Ringkasan Singkat (Overview)</label>
                  <textarea
                    name="short_desc"
                    className="form-control"
                    rows="3"
                    placeholder="Jelaskan secara ringkas maksud dan tujuan event/pelatihan ini..."
                    value={form.short_desc}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Full Description & Rundown */}
                <div className="col-12">
                  <label className="form-label fw-bold">Rincian Lengkap / Materi & Benefit Pelatihan</label>
                  <textarea
                    name="description"
                    className="form-control font-monospace"
                    rows="8"
                    placeholder="Rincian materi, fasilitas, agenda, dll. (Bisa menggunakan tag HTML <p>, <h3>, <ul>, <li>)"
                    value={form.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Submit Buttons */}
                <div className="col-12 d-flex justify-content-between align-items-center pt-3 border-top">
                  <Link href="/admin/events" className="btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-1"></i> Batal
                  </Link>

                  <button
                    type="submit"
                    className="btn btn-success px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span> Menyimpan...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-check"></i> Simpan Pelatihan / Event
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
