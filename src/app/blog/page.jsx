"use client";
import React, { useEffect, useState } from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import Link from "next/link";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success && data.data) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.error("Error loading blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <LayoutStyle7 breadCrumb="Blog" title="Artikel & Wawasan">
      <div className="blog-area full-blog default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-content col-xl-10 offset-xl-1 col-md-12">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Memuat artikel wawasan...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-5">
                  <h4>Belum ada artikel yang dipublikasikan.</h4>
                  <p className="text-muted">Nantikan tulisan dan wawasan terbaru dari tim Fasel Consulting.</p>
                </div>
              ) : (
                <div className="blog-item-box">
                  {blogs.map((blog) => {
                    const blogUrl = `/blog/${blog.slug || blog.id}`;
                    const imgUrl =
                      blog.thumb?.startsWith("http") || blog.thumb?.startsWith("/") || blog.thumb?.startsWith("data:")
                        ? blog.thumb
                        : `/assets/img/blog/${blog.thumb || "1.jpg"}`;

                    return (
                      <div className="item mb-5 pb-4 border-bottom" key={blog.id}>
                        <div className="thumb mb-4" style={{ maxHeight: "420px", overflow: "hidden", borderRadius: "10px" }}>
                          <Link href={blogUrl}>
                            <img
                              src={imgUrl}
                              alt={blog.title}
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.src = "/assets/img/blog/1.jpg";
                              }}
                            />
                          </Link>
                        </div>
                        <div className="info">
                          <div className="meta mb-2">
                            <ul className="d-flex gap-4 list-unstyled text-muted small">
                              <li>
                                <i className="far fa-calendar-alt text-primary me-1"></i> {blog.date}
                              </li>
                              <li>
                                <i className="far fa-user-circle text-primary me-1"></i> {blog.author}
                              </li>
                              {blog.tags && (
                                <li>
                                  <i className="fas fa-tags text-primary me-1"></i> {blog.tags}
                                </li>
                              )}
                            </ul>
                          </div>
                          <h2 className="mb-3">
                            <Link href={blogUrl} className="text-dark text-decoration-none">
                              {blog.title}
                            </Link>
                          </h2>
                          <p className="text-muted" style={{ lineHeight: "1.8" }}>
                            {blog.excerpt}
                          </p>
                          <Link className="btn btn-theme circle btn-md animation mt-2" href={blogUrl}>
                            Baca Selengkapnya <i className="fas fa-angle-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </LayoutStyle7>
  );
}
