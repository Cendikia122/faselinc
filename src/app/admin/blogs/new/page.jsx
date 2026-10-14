"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";
import { compressImage } from "@/lib/imageCompressor";
import QuillHtmlEditor from "@/components/admin/QuillHtmlEditor";
import SeoBoosterPanel from "@/components/admin/SeoBoosterPanel";

export default function NewBlogPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    author: "Ardian Rangga",
    tags: "Experiential Learning, Leadership Training",
    date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    thumb: "1.jpg",
    excerpt: "",
    content: "",
    status: "published",
    meta_title: "",
    meta_description: "",
    keywords: "Experiential Learning Indonesia",
    canonical_url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (contentHtml) => {
    setForm((prev) => ({ ...prev, content: contentHtml }));
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
        toast.success("Artikel blog berhasil disimpan ke database!");
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
          <form onSubmit={handleSubmit}>
            {/* Main Content Card */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
              <div className="row g-4">
                {/* Title */}
                <div className="col-12">
                  <label className="form-label fw-bold">Judul Artikel <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Contoh: Experiential Learning Indonesia untuk Transformasi SDM"
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
                    placeholder="Ardian Rangga / Fasel Consulting"
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
                    placeholder="Contoh: Experiential Learning, Leadership, Team Building"
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
                    placeholder="Contoh: 14 Oktober 2026"
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
                    placeholder="Ringkasan 1-2 kalimat untuk preview di kartu artikel..."
                    value={form.excerpt}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Quill + HTML + Preview Editor */}
                <div className="col-12">
                  <label className="form-label fw-bold">
                    Isi Konten Artikel <span className="text-danger">*</span>
                  </label>
                  <QuillHtmlEditor
                    value={form.content}
                    onChange={handleContentChange}
                    placeholder="Mulai menulis artikel lengkap dengan heading, bullet points, dan kutipan..."
                  />
                </div>

                {/* Status */}
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Status Publikasi</label>
                  <select name="status" className="form-select" value={form.status} onChange={handleChange}>
                    <option value="published">Publikasikan Langsung (Published)</option>
                    <option value="draft">Simpan Sebagai Draf (Draft)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEO Booster Panel */}
            <SeoBoosterPanel form={form} onChange={handleChange} />

            {/* Submit & Action Bar */}
            <div className="d-flex justify-content-between align-items-center pt-4 mt-3">
              <Link href="/admin/blogs" className="btn btn-outline-secondary px-4 py-2">
                <i className="fas fa-arrow-left me-1"></i> Batal
              </Link>

              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-bold shadow d-flex align-items-center gap-2"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span> Menyimpan ke Database...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Publikasikan Artikel ke Database
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
