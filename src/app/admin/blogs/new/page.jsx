"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";
import { compressImage } from "@/lib/imageCompressor";

export default function NewBlogPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "Fasel Consulting",
    tags: "Training, Experiential Learning",
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    thumb: "1.jpg",
    excerpt: "",
    content: "",
    status: "published",
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
        toast.success("Gambar berhasil diunggah!");
      } else {
        toast.error(result.message || "Gagal mengunggah gambar");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Judul dan isi artikel tidak boleh kosong!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await adminFetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Artikel blog berhasil dipublikasikan!");
        router.push("/admin/blogs");
      } else {
        toast.error(data.message || "Gagal menyimpan artikel");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout title="Tulis Artikel Blog Baru">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Title */}
                <div className="col-12">
                  <label className="form-label fw-bold">Judul Artikel <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Contoh: Pentingnya Experiential Learning untuk Perusahaan"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Author & Tags */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Penulis</label>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
                    placeholder="Fasel Consulting / Nama Trainer"
                    value={form.author}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Kategori / Tag</label>
                  <input
                    type="text"
                    name="tags"
                    className="form-control"
                    placeholder="Contoh: Leadership, Team Building, Training"
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>

                {/* Date & Thumbnail */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Tanggal Terbit</label>
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    placeholder="Contoh: 24 September 2026"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Foto / Thumbnail Artikel</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      name="thumb"
                      className="form-control"
                      placeholder="URL Gambar atau nama file (misal 1.jpg)"
                      value={form.thumb}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="file"
                      id="uploadInput"
                      className="form-control form-control-sm"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                    {uploading && <span className="spinner-border spinner-border-sm text-primary"></span>}
                  </div>
                  <small className="text-muted d-block">Pilih file foto dari komputer Anda untuk upload otomatis.</small>
                  {form.thumb && (
                    <div className="mt-2 d-flex align-items-center gap-2">
                      <img
                        src={
                          form.thumb.startsWith("http") || form.thumb.startsWith("/") || form.thumb.startsWith("data:")
                            ? form.thumb
                            : `/assets/img/blog/${form.thumb}`
                        }
                        alt="Preview"
                        style={{ width: "64px", height: "48px", objectFit: "cover", borderRadius: "6px", border: "1px solid #ddd" }}
                        onError={(e) => { e.target.src = "/assets/img/blog/1.jpg"; }}
                      />
                      <small className="text-success fw-bold"><i className="fas fa-check-circle me-1"></i> Foto terpilih</small>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="col-12">
                  <label className="form-label fw-bold">Ringkasan Singkat (Excerpt)</label>
                  <textarea
                    name="excerpt"
                    className="form-control"
                    rows="2"
                    placeholder="Ringkasan 1-2 kalimat untuk preview di halaman depan..."
                    value={form.excerpt}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Content */}
                <div className="col-12">
                  <label className="form-label fw-bold">Isi Konten Artikel <span className="text-danger">*</span></label>
                  <textarea
                    name="content"
                    className="form-control font-monospace"
                    rows="12"
                    placeholder="Tulis artikel Anda di sini... (Mendukung paragraf HTML seperti <p>, <h3>, <ul>, <li>)"
                    value={form.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <small className="text-muted">Tip: Anda dapat menuliskan teks biasa atau menyisipkan tag HTML sederhana seperti &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;.</small>
                </div>

                {/* Status & Actions */}
                <div className="col-12 d-flex justify-content-between align-items-center pt-3 border-top">
                  <Link href="/admin/blogs" className="btn btn-outline-secondary">
                    <i className="fas fa-arrow-left me-1"></i> Batal
                  </Link>

                  <button
                    type="submit"
                    className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span> Menyimpan...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Publikasikan Artikel
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
