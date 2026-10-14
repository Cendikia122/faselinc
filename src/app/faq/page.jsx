import LayoutStyle7 from '@/components/Layouts/LayoutStyle7';
import FaqStyle2 from '@/components/faq/FaqStyle2';
import React from 'react';

export const metadata = {
    title: "Pertanyaan Umum (FAQ) — Pelatihan & Program",
    description: "Temukan jawaban lengkap seputar program experiential learning, pelatihan kepemimpinan, corporate training, durasi, dan sertifikasi Fasel Consulting.",
    alternates: {
        canonical: "https://www.faselconsulting.id/faq",
    },
    openGraph: {
        title: "Pertanyaan Umum (FAQ) | Fasel Consulting",
        description: "Temukan jawaban seputar pelatihan kepemimpinan dan experiential learning.",
        url: "https://www.faselconsulting.id/faq",
        siteName: "Fasel Consulting",
        images: ["/assets/img/projects/faselevent1.jpg"],
        locale: "id_ID",
        type: "website",
    },
};

const FaqPage = () => {
    return (
        <>
            <LayoutStyle7 breadCrumb="FAQ" title="Frequently Asked Question">
                <FaqStyle2 fullFaq={true}/>
            </LayoutStyle7>
        </>
    );
};

export default FaqPage;