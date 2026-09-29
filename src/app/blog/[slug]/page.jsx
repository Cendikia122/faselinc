"use client";
import React, { useEffect, useState } from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import Link from "next/link";
import fallbackBlogs from "@/assets/jsonData/blog/BlogData.json";

export default function SingleBlogPage({ params }) {
  const { slug } = params;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setBlog(data.data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch blog from API, trying fallback:", err);
      }

      // Fallback lookup
      const found = fallbackBlogs.find(
        (b) => b.id.toString() === slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").includes(slug)
      );

      if (found) {
        setBlog({
          id: found.id,
          title: found.title,
          author: found.author || "Fasel Consulting",
          date: found.date || "",
          thumb: found.thumbFull || found.thumb || "1.jpg",
          content: `<p>${found.text}</p>`,
          tags: "Training, Leadership",
        });
      }
      setLoading(false);
    }
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <LayoutStyle7 breadCrumb="Blog" title="Memuat Artikel...">
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </LayoutStyle7>
    );
  }

  if (!blog) {
    return (
      <LayoutStyle7 breadCrumb="Blog" title="Artikel Tidak Ditemukan">
        <div className="container py-5 text-center">
          <h2>Maaf, artikel yang Anda cari tidak ditemukan.</h2>
          <p className="text-muted">Mungkin tautan telah berubah atau artikel telah dipindahkan.</p>
          <Link href="/blog" className="btn btn-theme circle btn-md mt-3">
            Kembali ke Daftar Blog
          </Link>
        </div>
      </LayoutStyle7>
    );
  }

  const imgUrl =
    blog.thumb?.startsWith("http") || blog.thumb?.startsWith("/") || blog.thumb?.startsWith("data:")
      ? blog.thumb
      : `/assets/img/blog/${blog.thumb || "1.jpg"}`;

  return (
    <LayoutStyle7 breadCrumb="Blog" title={blog.title}>
      <div className="blog-area single full-blog default-padding bg-gray-light">
        <div className="container">
          <div className="blog-items">
            <div className="row justify-content-center">
              <div className="blog-content col-xl-10 col-lg-11 col-md-12">
                <article
                  className="card border-0 shadow-sm"
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {/* Featured Thumbnail Header */}
                  {blog.thumb && (
                    <div
                      className="thumb"
                      style={{
                        width: "100%",
                        maxHeight: "460px",
                        overflow: "hidden",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={blog.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          maxHeight: "460px",
                          objectFit: "cover",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "/assets/img/blog/1.jpg";
                        }}
                      />
                    </div>
                  )}

                  {/* Article Content Body with Generous Padding */}
                  <div className="p-4 p-sm-5">
                    {/* Metadata Header */}
                    <div className="meta mb-4 pb-3 border-bottom">
                      <ul className="d-flex flex-wrap gap-4 list-unstyled text-muted small mb-0 align-items-center">
                        <li className="d-flex align-items-center gap-2">
                          <i className="far fa-calendar-alt text-primary"></i>
                          <span>{blog.date}</span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                          <i className="far fa-user-circle text-primary"></i>
                          <span>{blog.author || "Fasel Consulting"}</span>
                        </li>
                        {blog.tags && (
                          <li className="d-flex align-items-center gap-2">
                            <i className="fas fa-tags text-primary"></i>
                            <span className="badge bg-light text-dark border">{blog.tags}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Article Headline */}
                    <h1
                      className="fw-bold text-dark mb-4"
                      style={{
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        lineHeight: "1.35",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {blog.title}
                    </h1>

                    {/* Main HTML Rich Content */}
                    <div
                      className="blog-details-content text-secondary"
                      style={{
                        fontSize: "1.1rem",
                        lineHeight: "1.9",
                        color: "#4a5568",
                      }}
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    ></div>

                    {/* Post Navigation & Sharing Bar */}
                    <div className="post-footer mt-5 pt-4 border-top d-flex justify-content-between align-items-center flex-wrap gap-3">
                      <Link
                        href="/blog"
                        className="btn btn-outline-dark btn-sm rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                      >
                        <i className="fas fa-arrow-left"></i>
                        <span>Kembali Ke Semua Artikel</span>
                      </Link>

                      <div className="share-buttons d-flex align-items-center gap-2">
                        <span className="small fw-bold text-muted">Bagikan:</span>
                        <a
                          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                            blog.title + " - " + (typeof window !== "undefined" ? window.location.href : "")
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-success btn-sm rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
                        >
                          <i className="fab fa-whatsapp fa-lg"></i>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutStyle7>
  );
}
