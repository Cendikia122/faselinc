"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";
import { compressImage } from "@/lib/imageCompressor";

export default function EditEventPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    tag: "",
    thumb: "",
    date: "",
    location: "",
    short_desc: "",
    description: "",
    btn_text: "Daftar Sekarang",
    btn_link: "",
    status: "active",
  });

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await adminFetch(`/api/events/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setForm({
            title: data.data.title || "",
            tag: data.data.tag || "Experiential Learning Approach",
            thumb: data.data.thumb || "",
            date: data.data.date || "",
            location: data.data.location || "",
            short_desc: data.data.short_desc || "",
            description: data.data.description || "",
            btn_text: data.data.btn_text || "Daftar Sekarang",
            btn_link: data.data.btn_link || "",
            status: data.data.status || "active",
          });
        } else {
          toast.error(data.message || "Event tidak ditemukan");
        }
      } catch (err) {
        toast.error("Gagal memuat event");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

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
      const res = await adminFetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Perubahan event berhasil disimpan!");
        router.push("/admin/events");
      } else {
        toast.error(data.message || "Gagal menyimpan perubahan");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Edit Pelatihan / Event">
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm text-success me-2"></div>
          Memuat data pelatihan...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit Event: ${form.title}`}>
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label fw-bold">Nama Pelatihan / Event <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Jadwal / Tanggal Pelaksanaan</label>
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Lokasi Pelaksanaan</label>
                  <input
                    type="text"
                    name="location"
                    className="form-control"
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
                    value={form.btn_link}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Foto / Poster Event</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      name="thumb"
                      className="form-control"
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

                <div className="col-12">
                  <label className="form-label fw-bold">Ringkasan Singkat (Overview)</label>
                  <textarea
                    name="short_desc"
                    className="form-control"
                    rows="3"
                    value={form.short_desc}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Rincian Lengkap / Materi & Benefit Pelatihan</label>
                  <textarea
                    name="description"
                    className="form-control font-monospace"
                    rows="8"
                    value={form.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

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
                        <i className="fas fa-save"></i> Simpan Perubahan
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
