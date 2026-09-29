import React from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import Link from "next/link";
import { getBlogs } from "@/lib/storage";

export const metadata = {
  title: "Artikel & Wawasan Experiential Learning | Fasel Consulting",
  description:
    "Kumpulan artikel, tips, dan wawasan seputar leadership development, experiential learning, team building, dan strategi pengembangan SDM perusahaan dari Fasel Consulting.",
  keywords: [
    "Experiential Learning Indonesia",
    "Leadership Training",
    "Pelatihan SDM Perusahaan",
    "Team Building Bogor",
    "Fasel Consulting",
    "Corporate Training Jakarta",
  ],
  alternates: {
    canonical: "https://faselconsulting.com/blog",
  },
  openGraph: {
    title: "Artikel & Wawasan Experiential Learning | Fasel Consulting",
    description:
      "Kumpulan artikel, tips, dan wawasan seputar leadership development, experiential learning, team building, dan strategi pengembangan SDM perusahaan dari Fasel Consulting.",
    url: "https://faselconsulting.com/blog",
    siteName: "Fasel Consulting",
    type: "website",
  },
};

export default async function BlogListingPage() {
  const result = await getBlogs();
  const blogs = result?.data || [];

  return (
    <LayoutStyle7 breadCrumb="Blog" title="Artikel & Wawasan">
      <div className="blog-area full-blog default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-content col-xl-10 offset-xl-1 col-md-12">
              {blogs.length === 0 ? (
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
                        <div
                          className="thumb mb-4"
                          style={{ maxHeight: "420px", overflow: "hidden", borderRadius: "10px" }}
                        >
                          <Link href={blogUrl}>
                            <img
                              src={imgUrl}
                              alt={blog.title}
                              style={{ width: "100%", height: "auto", objectFit: "cover" }}
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
                          <p className="text-muted">
                            {blog.excerpt || (blog.content ? blog.content.replace(/<[^>]*>?/gm, "").slice(0, 200) + "..." : "")}
                          </p>
                          <Link href={blogUrl} className="btn-simple">
                            <i className="fas fa-angle-right"></i> Baca Selengkapnya
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
