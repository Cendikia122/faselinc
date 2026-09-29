"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { adminFetch } from "@/lib/apiClient";
import { compressImage } from "@/lib/imageCompressor";

export default function EditBlogPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    author: "",
    tags: "",
    date: "",
    thumb: "",
    excerpt: "",
    content: "",
    status: "published",
  });

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await adminFetch(`/api/blogs/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setForm({
            title: data.data.title || "",
            author: data.data.author || "",
            tags: data.data.tags || "",
            date: data.data.date || "",
            thumb: data.data.thumb || "",
            excerpt: data.data.excerpt || "",
            content: data.data.content || "",
            status: data.data.status || "published",
          });
        } else {
          toast.error(data.message || "Artikel tidak ditemukan");
        }
      } catch (err) {
        toast.error("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
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
      const res = await adminFetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Perubahan artikel berhasil disimpan!");
        router.push("/admin/blogs");
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
      <AdminLayout title="Edit Artikel Blog">
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm text-primary me-2"></div>
          Memuat artikel...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={`Edit Artikel: ${form.title}`}>
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label fw-bold">Judul Artikel <span className="text-danger">*</span></label>
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
                  <label className="form-label fw-bold">Penulis</label>
                  <input
                    type="text"
                    name="author"
                    className="form-control"
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
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Tanggal Terbit</label>
                  <input
                    type="text"
                    name="date"
                    className="form-control"
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

                <div className="col-12">
                  <label className="form-label fw-bold">Ringkasan Singkat (Excerpt)</label>
                  <textarea
                    name="excerpt"
                    className="form-control"
                    rows="2"
                    value={form.excerpt}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <label className="form-label fw-bold">Isi Konten Artikel <span className="text-danger">*</span></label>
                  <textarea
                    name="content"
                    className="form-control font-monospace"
                    rows="12"
                    value={form.content}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

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
