import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import TeamStyle1 from '@/components/team/TeamStyle1';
import React from 'react';

export const metadata = {
    title: "Tim Fasilitator & Trainer Profesional",
    description: "Kenali jajaran master trainer, fasilitator experiential learning, dan konsultan leadership profesional di Fasel Consulting yang siap mendampingi tim Anda.",
    keywords: [
        "Tim Fasel Consulting",
        "Trainer Kepemimpinan",
        "Fasilitator Experiential Learning",
        "Master Trainer SDM Indonesia",
        "Ardian Rangga"
    ],
    alternates: {
        canonical: "https://www.faselconsulting.id/team",
    },
    openGraph: {
        title: "Tim Fasilitator & Trainer Profesional | Fasel Consulting",
        description: "Kenali tim master trainer dan fasilitator experiential learning terpercaya di Fasel Consulting.",
        url: "https://www.faselconsulting.id/team",
        siteName: "Fasel Consulting",
        images: [
            {
                url: "/assets/img/projects/faselevent1.jpg",
                width: 1200,
                height: 630,
                alt: "Tim Trainer & Fasilitator Fasel Consulting",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tim Fasilitator & Trainer Profesional — Fasel Consulting",
        description: "Master trainer dan fasilitator experiential learning terbaik di Indonesia.",
        images: ["/assets/img/projects/faselevent1.jpg"],
    },
};

const TeamPage = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="team" title="Team Members">
                <TeamStyle1 fullTeam={true} sectionClass="bg-gray" />
            </LayoutStyle7>
        </>
    );
};

export default TeamPage;