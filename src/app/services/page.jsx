import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import PartnerStyle1 from '@/components/partner/PartnerStyle1';
import PriceStyle1 from '@/components/price/PriceStyle1';
import ProcessStyle1 from '@/components/process/ProcessStyle1';
import RequestCallStyle1 from '@/components/request/RequestCallStyle1';
import ServicesStyle1 from '@/components/services/ServicesStyle1';
import TeamStyle1 from '@/components/team/TeamStyle1';
import React from 'react';

export const metadata = {
    title: "Layanan Pelatihan Kepemimpinan & Experiential Learning",
    description: "Layanan komprehensif Fasel Consulting: Leadership Development Program, Experiential Learning Indonesia, Outbound Training Perusahaan, dan Konsultasi SDM.",
    keywords: [
        "Layanan Fasel Consulting",
        "Pelatihan Kepemimpinan",
        "Leadership Development Program",
        "Experiential Learning Indonesia",
        "Corporate Training Jakarta",
        "Team Building Bogor",
        "In-House Training Perusahaan"
    ],
    alternates: {
        canonical: "https://www.faselconsulting.id/services",
    },
    openGraph: {
        title: "Layanan Pelatihan Kepemimpinan & Experiential Learning | Fasel Consulting",
        description: "Layanan komprehensif Fasel Consulting: Leadership Development Program, Experiential Learning Indonesia, dan Corporate Training.",
        url: "https://www.faselconsulting.id/services",
        siteName: "Fasel Consulting",
        images: [
            {
                url: "/assets/img/projects/faselevent1.jpg",
                width: 1200,
                height: 630,
                alt: "Layanan Fasel Consulting — Pelatihan Kepemimpinan & Experiential Learning",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Layanan Pelatihan Kepemimpinan & Experiential Learning — Fasel Consulting",
        description: "Program pelatihan kepemimpinan, experiential learning, dan corporate training terbaik.",
        images: ["/assets/img/projects/faselevent1.jpg"],
    },
};

const ServicesPage = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="services" title="Our Services">
                <ServicesStyle1 />
                <ProcessStyle1 />
                <PartnerStyle1 sectionClass="default-padding bg-gray" />
                <TeamStyle1 teamTitle={true} />
                <RequestCallStyle1 />
            </LayoutStyle7>
        </>
    );
};

export default ServicesPage;