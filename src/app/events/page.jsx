import React from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import Link from "next/link";
import { getEvents } from "@/lib/storage";

// ✅ SEO Komprehensif Halaman Pelatihan & Event
export const metadata = {
  title: "Jadwal Pelatihan & Event Kepemimpinan | Fasel Consulting",
  description:
    "Daftar jadwal pelatihan kepemimpinan, leadership development camp, corporate outbound, dan experiential learning program dari Fasel Consulting Indonesia.",
  keywords: [
    "Pelatihan Kepemimpinan",
    "Jadwal Training SDM",
    "Leadership Camp Indonesia",
    "Experiential Learning Training",
    "Team Building Outbound Bogor",
    "In-House Training Perusahaan",
    "Fasel Consulting"
  ],
  alternates: {
    canonical: "https://faselconsulting.com/events",
  },
  openGraph: {
    title: "Jadwal Pelatihan & Event Kepemimpinan | Fasel Consulting",
    description:
      "Tingkatkan performa tim dan kapasitas manajerial organisasi Anda melalui pelatihan experiential learning terbaik.",
    url: "https://faselconsulting.com/events",
    siteName: "Fasel Consulting",
    images: [
      {
        url: "/assets/img/projects/faselevent1.jpg",
        width: 1200,
        height: 630,
        alt: "Pelatihan & Event Fasel Consulting",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default async function EventsListingPage() {
  // SSR Fetching: Data langsung siap dari server dalam hitungan milidetik
  const result = await getEvents();
  const events = result?.data || [];

  // Schema.org Structured Data ItemList untuk Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": events.map((evt, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Course",
        "name": evt.title,
        "description": evt.short_desc || evt.title,
        "provider": {
          "@type": "Organization",
          "name": "Fasel Consulting",
          "sameAs": "https://faselconsulting.com"
        }
      }
    }))
  };

  return (
    <LayoutStyle7 breadCrumb="Pelatihan & Event" title="Jadwal Pelatihan & Event">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="project-area default-padding">
        <div className="container">
          <div className="row mb-5 text-center">
            <div className="col-lg-8 offset-lg-2">
              <span className="sub-title text-primary fw-bold text-uppercase">Program Unggulan</span>
              <h2 className="title fw-bold mt-2">Tingkatkan Kapasitas SDM & Kepemimpinan Tim Anda</h2>
              <p className="text-muted mt-3">
                Jelajahi program experiential learning, kepemimpinan (leadership), dan team building yang dirancang interaktif untuk memberikan dampak nyata pada kinerja organisasi Anda.
              </p>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-5">
              <h4>Belum ada jadwal pelatihan terbuka saat ini.</h4>
              <p className="text-muted">Hubungi tim kami untuk konsultasi program in-house training khusus perusahaan Anda.</p>
              <a
                href="https://wa.me/6281298319944?text=Halo%20Fasel%20Consulting%2C%20saya%20ingin%20konsultasi%20program%20pelatihan%20in-house"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-theme circle btn-md mt-3"
              >
                <i className="fab fa-whatsapp me-2"></i> Konsultasi via WhatsApp
              </a>
            </div>
          ) : (
            <div className="row g-4">
              {events.map((evt) => {
                const eventUrl = `/project-details/${evt.id}`;
                const imgSrc =
                  evt.thumb?.startsWith("http") || evt.thumb?.startsWith("/") || evt.thumb?.startsWith("data:")
                    ? evt.thumb
                    : `/assets/img/projects/${evt.thumb || "faselevent1.jpg"}`;

                const waMessage = encodeURIComponent(
                  `Halo Fasel Consulting, saya ingin konsultasi / mendaftar program: ${evt.title}`
                );
                const waLink = evt.btn_link && evt.btn_link.startsWith("http")
                  ? evt.btn_link
                  : `https://wa.me/6281298319944?text=${waMessage}`;

                return (
                  <div className="col-lg-4 col-md-6 mb-30" key={evt.id}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white d-flex flex-column">
                      {/* Image Thumbnail */}
                      <div style={{ position: "relative", height: "230px", overflow: "hidden" }}>
                        <Link href={eventUrl}>
                          <img
                            src={imgSrc}
                            alt={evt.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                            className="event-card-img"
                          />
                        </Link>
                        {evt.tag && (
                          <span
                            className="badge bg-primary position-absolute"
                            style={{ top: "15px", left: "15px", padding: "6px 12px", fontSize: "0.8rem", borderRadius: "20px" }}
                          >
                            {evt.tag}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <div className="d-flex align-items-center gap-3 text-muted small mb-2">
                          {evt.date && (
                            <span>
                              <i className="far fa-calendar-alt text-primary me-1"></i> {evt.date}
                            </span>
                          )}
                          {evt.location && (
                            <span>
                              <i className="fas fa-map-marker-alt text-danger me-1"></i> {evt.location}
                            </span>
                          )}
                        </div>

                        <h4 className="fw-bold mb-3" style={{ fontSize: "1.2rem", lineHeight: "1.4" }}>
                          <Link href={eventUrl} className="text-dark text-decoration-none">
                            {evt.title}
                          </Link>
                        </h4>

                        <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                          {evt.short_desc || evt.text || "Program pelatihan interaktif berbasis experiential learning untuk meningkatkan kapasitas SDM organisasi."}
                        </p>

                        <div className="d-flex align-items-center justify-content-between gap-2 pt-3 border-top mt-auto">
                          <Link href={eventUrl} className="btn btn-outline-dark btn-sm rounded-pill px-3">
                            Lihat Rincian <i className="fas fa-arrow-right ms-1"></i>
                          </Link>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success btn-sm rounded-pill px-3 d-flex align-items-center gap-1 shadow-sm"
                          >
                            <i className="fab fa-whatsapp"></i> {evt.btn_text || "Daftar"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </LayoutStyle7>
  );
}
