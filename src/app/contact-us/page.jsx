import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import ContactMap from '@/components/contact/ContactMap';
import ContactUsContent from '@/components/contact/ContactUsContent';
import React from 'react';

export const metadata = {
    title: "Hubungi Kami — Konsultasi Pelatihan SDM & Kepemimpinan",
    description: "Hubungi Fasel Consulting untuk konsultasi program pelatihan kepemimpinan, experiential learning, dan corporate outbound team building perusahaan Anda.",
    keywords: [
        "Kontak Fasel Consulting",
        "Konsultasi Pelatihan Kepemimpinan",
        "Hubungi Trainer SDM",
        "Experiential Learning Indonesia",
        "Nomor Telepon Fasel Consulting"
    ],
    alternates: {
        canonical: "https://www.faselconsulting.id/contact-us",
    },
    openGraph: {
        title: "Hubungi Kami — Fasel Consulting | Pelatihan Kepemimpinan & SDM",
        description: "Hubungi tim Fasel Consulting untuk konsultasi pelatihan SDM dan kepemimpinan perusahaan Anda.",
        url: "https://www.faselconsulting.id/contact-us",
        siteName: "Fasel Consulting",
        images: [
            {
                url: "/assets/img/projects/faselevent1.jpg",
                width: 1200,
                height: 630,
                alt: "Hubungi Fasel Consulting — Konsultan Pelatihan Kepemimpinan",
            },
        ],
        locale: "id_ID",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hubungi Kami — Fasel Consulting",
        description: "Konsultasi program pelatihan kepemimpinan dan experiential learning.",
        images: ["/assets/img/projects/faselevent1.jpg"],
    },
};

const ContactUs = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="contact-us" title="Contact Us">
                <ContactUsContent />
                <ContactMap />
            </LayoutStyle7>
        </>
    );
};

export default ContactUs;