import React from "react";
import LayoutStyle7 from "@/components/Layouts/LayoutStyle7";
import ProjectDetailsContent from "@/components/project/ProjectDetailsContent";
import { getEventById } from "@/lib/storage";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const event = await getEventById(params.id);
  if (!event) {
    return {
      title: "Pelatihan Tidak Ditemukan | Fasel Consulting",
      description: "Informasi pelatihan atau event tidak ditemukan.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faselconsulting.com";
  const postUrl = `${siteUrl}/project-details/${event.id}`;
  const cleanExcerpt = (
    event.short_desc ||
    event.description?.replace(/<[^>]*>?/gm, "") ||
    "Program Pelatihan & Event Fasel Consulting"
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const thumbImg = event.thumbFull || event.thumb || "faselevent1.jpg";
  const imgUrl = thumbImg.startsWith("http")
    ? thumbImg
    : thumbImg.startsWith("data:")
      ? `${siteUrl}/assets/img/projects/faselevent1.jpg`
      : thumbImg.startsWith("/")
        ? `${siteUrl}${thumbImg}`
        : `${siteUrl}/assets/img/projects/${thumbImg}`;

  return {
    title: `${event.title} | Pelatihan & Event Fasel Consulting`,
    description: cleanExcerpt,
    keywords: [
      event.tag,
      "Experiential Learning",
      "Leadership Development",
      "Team Building",
      "Pelatihan SDM",
      "Fasel Consulting",
    ].filter(Boolean),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: event.title,
      description: cleanExcerpt,
      url: postUrl,
      siteName: "Fasel Consulting",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: cleanExcerpt,
      images: [imgUrl],
    },
  };
}

export default async function ProjectDetailsPage({ params }) {
  const { id } = params;
  const event = await getEventById(id);

  if (!event) {
    return (
      <LayoutStyle7 breadCrumb="Pelatihan" title="Event Tidak Ditemukan">
        <div className="container py-5 text-center">
          <h2>Maaf, program pelatihan atau event tidak ditemukan.</h2>
          <p className="text-muted">Mungkin jadwal telah berakhir atau dipindahkan.</p>
          <Link href="/events" className="btn btn-theme circle btn-md mt-3">
            Lihat Semua Jadwal Pelatihan
          </Link>
        </div>
      </LayoutStyle7>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://faselconsulting.com";
  const postUrl = `${siteUrl}/project-details/${event.id}`;
  const cleanExcerpt = (
    event.short_desc ||
    event.description?.replace(/<[^>]*>?/gm, "") ||
    "Program Pelatihan & Event Fasel Consulting"
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);

  const thumbImg = event.thumbFull || event.thumb || "faselevent1.jpg";
  const imgUrl = thumbImg.startsWith("http")
    ? thumbImg
    : thumbImg.startsWith("/")
      ? `${siteUrl}${thumbImg}`
      : `${siteUrl}/assets/img/projects/${thumbImg}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: event.title,
    description: cleanExcerpt,
    provider: {
      "@type": "Organization",
      name: "Fasel Consulting",
      url: siteUrl,
    },
    image: [imgUrl.startsWith("http") ? imgUrl : `${siteUrl}${imgUrl}`],
    offers: {
      "@type": "Offer",
      category: event.tag || "Corporate Training",
      url: postUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <LayoutStyle7 breadCrumb="Pelatihan & Event" title={event.title}>
      {/* Schema.org Course/Event Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailsContent projectInfo={event} />
    </LayoutStyle7>
  );
}