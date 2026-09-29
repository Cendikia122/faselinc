"use client";
import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Link from "next/link";
import { toast } from "react-toastify";
import Image from "next/image";
import { adminFetch } from "@/lib/apiClient";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await adminFetch("/api/blogs?all=true");
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data || []);
      }
    } catch (err) {
      toast.error("Gagal memuat artikel blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      return;
    }

    try {
      const res = await adminFetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Artikel berhasil dihapus");
        setBlogs(blogs.filter((b) => b.id !== id));
      } else {
        toast.error(data.message || "Gagal menghapus artikel");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan saat menghapus artikel");
    }
  };

  const actionButton = (
    <Link href="/admin/blogs/new" className="btn btn-primary btn-sm fw-bold d-flex align-items-center gap-1 shadow-sm">
      <i className="fas fa-plus"></i> Tulis Artikel Baru
    </Link>
  );

  return (
    <AdminLayout title="Kelola Artikel Blog" actionButton={actionButton}>
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark">Daftar Artikel ({blogs.length})</span>
          <button onClick={fetchBlogs} className="btn btn-outline-secondary btn-sm" title="Refresh">
            <i className="fas fa-sync-alt"></i> Refresh
          </button>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              <div className="spinner-border spinner-border-sm text-primary me-2"></div>
              Memuat data artikel...
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="fas fa-newspaper fa-3x mb-3 text-secondary"></i>
              <p className="mb-2">Belum ada artikel yang ditambahkan.</p>
              <Link href="/admin/blogs/new" className="btn btn-primary btn-sm">
                Tulis Artikel Pertama
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "80px" }} className="ps-3">Foto</th>
                    <th>Judul Artikel</th>
                    <th>Penulis</th>
                    <th>Kategori / Tag</th>
                    <th>Tanggal</th>
                    <th style={{ width: "160px" }} className="text-end pe-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="ps-3">
                        <div
                          style={{
                            width: "56px",
                            height: "42px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            backgroundColor: "#eee",
                            position: "relative",
                          }}
                        >
                          <img
                            src={
                              blog.thumb?.startsWith("http") || blog.thumb?.startsWith("/") || blog.thumb?.startsWith("data:")
                                ? blog.thumb
                                : `/assets/img/blog/${blog.thumb || "1.jpg"}`
                            }
                            alt="Thumb"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.src = "/assets/img/blog/1.jpg";
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{blog.title}</div>
                        <small className="text-muted text-truncate d-block" style={{ maxWidth: "400px" }}>
                          {blog.excerpt || "Tidak ada ringkasan..."}
                        </small>
                      </td>
                      <td className="small text-muted">{blog.author || "Fasel"}</td>
                      <td>
                        <span className="badge bg-light text-dark border">{blog.tags || "Training"}</span>
                      </td>
                      <td className="small text-muted">{blog.date}</td>
                      <td className="text-end pe-3">
                        <div className="btn-group btn-group-sm">
                          <Link
                            href={`/blog/${blog.slug || blog.id}`}
                            target="_blank"
                            className="btn btn-outline-secondary"
                            title="Pratinjau"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                          <Link
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="btn btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(blog.id, blog.title)}
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
