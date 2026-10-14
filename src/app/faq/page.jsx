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
    const siteUrl = "https://www.faselconsulting.id";
    const faqSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Apa itu metode Experiential Learning dan apa keunggulannya?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Experiential Learning adalah metodologi pembelajaran berbasis pengalaman langsung di mana peserta mengalami simulasi atau tantangan nyata, merefleksikan prosesnya, mengonseptualisasi insight, dan menerapkannya dalam pekerjaan sehari-hari. Berbeda dengan seminar satu arah, metode ini terbukti meningkatkan retensi pemahaman hingga 80% dan mendorong perubahan perilaku nyata di lingkungan kerja."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Program apa saja yang disediakan oleh Fasel Consulting?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Fasel Consulting menyediakan program komprehensif mencakup Leadership Development Program (LDP), Corporate Team Building & Outbound, Experiential Learning Camp, Public Speaking & Communication Mastery, Creative Problem Solving, serta Konsultasi Pengembangan SDM & Budaya Organisasi."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Apakah program dapat disesuaikan (customized) dengan kebutuhan perusahaan kami?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Ya, tentu saja. Setiap program Fasel Consulting diawali dengan proses Training Needs Analysis (TNA). Kami berdiskusi mendalam dengan tim manajemen/HRD Anda untuk merumuskan tujuan spesifik, tantangan tim yang dihadapi, serta menyusun skenario pelatihan yang paling relevan dengan industri perusahaan Anda."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Di mana lokasi pelaksanaan pelatihan dan berapa durasi idealnya?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Pelatihan dapat dilaksanakan secara In-House di kantor perusahaan, di hotel/resor pilihan Anda di seluruh Indonesia (seperti Bogor, Puncak, Bandung, Bali, Yogyakarta), maupun di lokasi alam terbuka untuk program camp. Durasi program fleksibel mulai dari 1 hari intensif hingga 3 hari 2 malam untuk leadership camp."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Bagaimana cara berkonsultasi dan mendapatkan proposal penawaran?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Anda dapat langsung menghubungi kami melalui WhatsApp resmi di +62 812-9831-9944 atau mengisi formulir di halaman Kontak Kami. Tim konsultan kami akan segera merespons dalam waktu 1x24 jam untuk menjadwalkan sesi konsultasi gratis dan menyusun proposal program yang sesuai."
                        }
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Beranda",
                        "item": siteUrl
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "FAQ",
                        "item": `${siteUrl}/faq`
                    }
                ]
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <LayoutStyle7 breadCrumb="FAQ" title="Pertanyaan yang Sering Diajukan (FAQ)">
                <FaqStyle2 fullFaq={true}/>
            </LayoutStyle7>
        </>
    );
};

export default FaqPage;