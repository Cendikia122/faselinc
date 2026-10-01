import LayoutStyle1 from "@/components/Layouts/LayoutStyle1";
import AboutStyle1 from "@/components/about/AboutStyle1";
import BannerStyle1 from "@/components/banner/BannerStyle3";
import BlogStyle1 from "@/components/blog/BlogStyle1";
import ChooseStyle1 from "@/components/choose/ChooseStyle1";
import PartnerStyle1 from "@/components/partner/PartnerStyle1";
import ProcessStyle1 from "@/components/process/ProcessStyle1";
import ProjectStyle1 from "@/components/project/ProjectStyle1";
import RequestCallStyle1 from "@/components/request/RequestCallStyle1";
import ServicesStyle1 from "@/components/services/ServicesStyle1";
import TeamStyle1 from "@/components/team/TeamStyle1";
import TestimonialStyle1 from "@/components/testimonial/TestimonialStyle1";
import { getBlogs, getEvents } from "@/lib/storage";
import React from "react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// ✅ SEO Komprehensif Beranda Fasel Consulting — Dioptimasi penuh
export const metadata = {
  // ✅ Keyword tepat di awal title (placement fixed), panjang optimal
  title: "Experiential Learning Indonesia — Pelatihan Kepemimpinan & Leadership Development Program | Fasel Consulting",
  // ✅ Description 155 karakter, mengandung ketiga exact keyword
  description:
    "Fasel Consulting: spesialis Experiential Learning Indonesia, Pelatihan Kepemimpinan, dan Leadership Development Program untuk korporasi & organisasi terbaik.",
  // ✅ Meta keywords berisi exact keyword phrase
  keywords: [
    "Experiential Learning Indonesia",
    "Pelatihan Kepemimpinan",
    "Leadership Development Program",
    "Pelatihan Kepemimpinan Perusahaan",
    "Corporate Training Jakarta",
    "Team Building Bogor",
    "Outbound Training Perusahaan",
    "Pengembangan SDM",
    "In-House Training",
    "Pelatihan Karyawan",
    "Konsultan SDM Indonesia",
    "Fasel Consulting",
    "Ardian Rangga",
  ],
  alternates: {
    canonical: "https://www.faselconsulting.id",
  },
  openGraph: {
    title: "Experiential Learning Indonesia | Pelatihan Kepemimpinan — Fasel Consulting",
    description:
      "Fasel Consulting: spesialis Experiential Learning Indonesia, Pelatihan Kepemimpinan, dan Leadership Development Program untuk korporasi & organisasi terbaik.",
    url: "https://www.faselconsulting.id",
    siteName: "Fasel Consulting",
    images: [
      {
        url: "/assets/img/projects/faselevent1.jpg",
        width: 1200,
        height: 630,
        // ✅ Alt image mengandung exact keyword
        alt: "Fasel Consulting — Experiential Learning Indonesia & Pelatihan Kepemimpinan",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experiential Learning Indonesia | Pelatihan Kepemimpinan — Fasel Consulting",
    description:
      "Fasel Consulting: spesialis Experiential Learning Indonesia, Pelatihan Kepemimpinan, dan Leadership Development Program untuk korporasi.",
    images: ["/assets/img/projects/faselevent1.jpg"],
  },
};

const Home1 = async () => {
  // SSR Pre-fetching: Data langsung ada di HTML awal sehingga 0 delay saat buka web dan terbaca penuh oleh Googlebot
  const [blogsRes, eventsRes] = await Promise.all([
    getBlogs(3),
    getEvents(6),
  ]);

  const initialBlogs = blogsRes?.data || [];
  const initialEvents = eventsRes?.data || [];

  // Schema.org Structured Data untuk Google Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Fasel Consulting",
    "url": "https://faselconsulting.com",
    "logo": "https://faselconsulting.com/assets/img/fasellogo.png",
    "image": "https://faselconsulting.com/assets/img/projects/faselevent1.jpg",
    "description": "Konsultan pelatihan kepemimpinan dan experiential learning terkemuka di Indonesia.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bogor",
      "addressRegion": "Jawa Barat",
      "addressCountry": "ID"
    },
    "telephone": "+6281298319944",
    "priceRange": "$$"
  };

  return (
    <LayoutStyle1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BannerStyle1 />
      <AboutStyle1 />
      <ServicesStyle1 />
      <ProcessStyle1 />
      <ChooseStyle1 />
      <PartnerStyle1 sectionClass="default-padding" />
      <TeamStyle1 sectionClass="bg-gray" teamTitle={true} />
      <ProjectStyle1 initialEvents={initialEvents} />
      <RequestCallStyle1 />
      <TestimonialStyle1 />
      <BlogStyle1 sectionClass="bg-gray" initialBlogs={initialBlogs} />
    </LayoutStyle1>
  );
};

export default Home1;
