import React from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import Link from "next/link";
import { getBlogByIdOrSlug } from "@/lib/storage";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }) {
  const blog = await getBlogByIdOrSlug(params.slug);
  if (!blog) {
    return {
      title: "Artikel Tidak Ditemukan | Fasel Consulting",
      description: "Artikel yang Anda cari tidak ditemukan di Fasel Consulting.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faselconsulting.com";
  const cleanExcerpt = (
    blog.excerpt ||
    blog.content?.replace(/<[^>]*>?/gm, "") ||
    "Artikel & Wawasan Fasel Consulting"
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const postUrl = `${siteUrl}/blog/${blog.slug || blog.id}`;
  const imgUrl = blog.thumb?.startsWith("http")
    ? blog.thumb
    : blog.thumb?.startsWith("data:")
      ? `${siteUrl}/assets/img/blog/1.jpg`
      : blog.thumb?.startsWith("/")
        ? `${siteUrl}${blog.thumb}`
        : `${siteUrl}/assets/img/blog/${blog.thumb || "1.jpg"}`;

  return {
    title: `${blog.title} | Fasel Consulting`,
    description: cleanExcerpt,
    keywords: [
      blog.tags,
      "Experiential Learning Indonesia",
      "Leadership Development Program",
      "Pelatihan SDM Perusahaan",
      "Fasel Consulting",
      "Team Building",
    ].filter(Boolean),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: blog.title,
      description: cleanExcerpt,
      url: postUrl,
      siteName: "Fasel Consulting",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.created_at,
      authors: [blog.author || "Fasel Consulting"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: cleanExcerpt,
      images: [imgUrl],
    },
  };
}

export default async function SingleBlogPage({ params }) {
  const { slug } = params;
  const blog = await getBlogByIdOrSlug(slug);

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faselconsulting.com";
  const cleanExcerpt = (
    blog.excerpt ||
    blog.content?.replace(/<[^>]*>?/gm, "") ||
    "Artikel & Wawasan Fasel Consulting"
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const postUrl = `${siteUrl}/blog/${blog.slug || blog.id}`;
  const imgUrl =
    blog.thumb?.startsWith("http") || blog.thumb?.startsWith("/") || blog.thumb?.startsWith("data:")
      ? blog.thumb
      : `/assets/img/blog/${blog.thumb || "1.jpg"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: cleanExcerpt,
    image: [imgUrl.startsWith("http") ? imgUrl : `${siteUrl}${imgUrl}`],
    datePublished: blog.created_at || blog.date,
    dateModified: blog.created_at || blog.date,
    author: {
      "@type": "Person",
      name: blog.author || "Fasel Consulting",
    },
    publisher: {
      "@type": "Organization",
      name: "Fasel Consulting",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/img/logo/fasellogo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
  };

  const waShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    blog.title + "\n\nBaca selengkapnya di:\n" + postUrl
  )}`;

  const waConsultLink = `https://wa.me/6281298319944?text=${encodeURIComponent(
    `Halo Fasel Consulting, saya membaca artikel "${blog.title}" dan ingin konsultasi program pelatihan terkait untuk perusahaan kami.`
  )}`;

  return (
    <LayoutStyle7 breadCrumb="Blog" title={blog.title}>
      {/* Schema.org JSON-LD for Google Rich Search Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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

                    {/* Marketing Call-To-Action Box (Iklan / Konversi Lead) */}
                    <div
                      className="my-5 p-4 rounded-4 text-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
                      style={{
                        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                      }}
                    >
                      <div>
                        <h4 className="text-white fw-bold mb-1">
                          Ingin Menerapkan Program Ini di Perusahaan Anda?
                        </h4>
                        <p className="text-white-50 mb-0 small">
                          Konsultasikan kebutuhan pelatihan, leadership transformation, atau team building tim Anda bersama Master Trainer Fasel Consulting.
                        </p>
                      </div>
                      <a
                        href={waConsultLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success rounded-pill px-4 py-3 fw-bold text-nowrap shadow-sm d-flex align-items-center gap-2"
                      >
                        <i className="fab fa-whatsapp fa-lg"></i>
                        <span>Konsultasi via WhatsApp</span>
                      </a>
                    </div>

                    {/* Post Navigation & Sharing Bar */}
                    <div className="post-footer mt-4 pt-4 border-top d-flex justify-content-between align-items-center flex-wrap gap-3">
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
                          href={waShareLink}
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
