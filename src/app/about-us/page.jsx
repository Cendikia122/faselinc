import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import AboutStyle1 from '@/components/about/AboutStyle1';
import PartnerStyle1 from '@/components/partner/PartnerStyle1';
import ProcessStyle1 from '@/components/process/ProcessStyle1';
import TeamStyle1 from '@/components/team/TeamStyle1';
import TestimonialStyle1 from '@/components/testimonial/TestimonialStyle1';
import React from 'react';

export const metadata = {
    title: "Tentang Kami — Konsultan Experiential Learning & SDM Indonesia",
    description: "Kenali Fasel Consulting, konsultan pelatihan kepemimpinan dan experiential learning terkemuka di Indonesia. Berkomitmen membentuk pemimpin tangguh dan tim solid.",
    keywords: [
        "Tentang Fasel Consulting",
        "Profil Konsultan SDM",
        "Experiential Learning Indonesia",
        "Pelatihan Kepemimpinan",
        "Leadership Development Program",
        "Team Building Bogor",
        "Ardian Rangga"
    ],
    alternates: {
        canonical: "https://www.faselconsulting.id/about-us",
    },
    openGraph: {
        title: "Tentang Kami — Fasel Consulting | Experiential Learning Indonesia",
        description: "Kenali Fasel Consulting, konsultan pelatihan kepemimpinan dan experiential learning terkemuka di Indonesia.",
        url: "https://www.faselconsulting.id/about-us",
        siteName: "Fasel Consulting",
        images: [
            {
                url: "/assets/img/projects/faselevent1.jpg",
                width: 1200,
                height: 630,
                alt: "Tentang Fasel Consulting — Experiential Learning & Leadership Training",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tentang Kami — Fasel Consulting",
        description: "Konsultan pelatihan kepemimpinan dan experiential learning terkemuka di Indonesia.",
        images: ["/assets/img/projects/faselevent1.jpg"],
    },
};

const AboutUsPage = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="About-us" title="About Us">
                <AboutStyle1 />
                <ProcessStyle1 sectionClass="bg-gray" />
                <PartnerStyle1 sectionClass="default-padding" />
                <TeamStyle1 sectionClass="bg-gray" teamTitle={true} />
                <TestimonialStyle1 />
            </LayoutStyle7>
        </>
    );
};

export default AboutUsPage;