import Image from 'next/image';
import React from 'react';
import anim1Thumb from '@/assets/img/shape/anim-1.png'
import anim2Thumb from '@/assets/img/shape/anim-2.png'
import anim3Thumb from '@/assets/img/shape/anim-3.png'
import anim4Thumb from '@/assets/img/shape/anim-4.png'
import aboutThumb from "@/assets/img/about/ranggafasel.png"
import signatureThumb from "@/assets/img/signature.png"
import About1Card from './About1Card';

export const metadata = {
  title: "Fasel Consulting | – Training - Leadership| Experiential Learning Indonesia",
  description:
    "Fasel, Inc adalah perusahaan teknologi yang menyediakan solusi digital inovatif untuk bisnis Anda.",
  keywords: ["Experiental Learning", "Solusi Digital", "Teknologi", "Bisnis"],
  openGraph: {
    title: "Bantu upgrade perusahaan anda dengan Fasel, Inc!",
    description:
      "Fasel, Inc adalah perusahaan teknologi yang menyediakan solusi digital inovatif untuk bisnis Anda.",
    url: "https://www.fasel.com",
    siteName: "Fasel, Inc",
    images: [
      {
        url: "https://www.fasel.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fasel, Inc - Solusi Digital",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasel, Inc",
    description:
      "Fasel, Inc adalah perusahaan teknologi yang menyediakan solusi digital inovatif untuk bisnis Anda.",
    images: ["https://www.fasel.com/images/og-image.jpg"],
  },
};

const AboutStyle1 = () => {
    return (
        <>
            <div className="about-style-one-area default-padding">
                <div className="shape-animated-left">
                    <Image src={anim1Thumb} alt="Experiential Learning Indonesia — Fasel Consulting" />
                    <Image src={anim2Thumb} alt="Pelatihan Kepemimpinan Perusahaan" />
                </div>
                <div className="container">
                    <div className="row align-center">
                        <div className="about-style-one col-xl-6 col-lg-5">
                            <div className="h4 sub-heading">LEARN, LEAD, GROW!</div>
                            <h2 className="title mb-25">Experiential Learning Indonesia untuk Pemimpin yang Berdampak</h2>
                            <p>
                                Fasel Consulting adalah mitra strategis <strong>Pelatihan Kepemimpinan</strong> dan <strong>Experiential Learning Indonesia</strong> terpercaya. Dengan pengalaman mendalam dalam <strong>Leadership Development Program</strong>, corporate training, dan team building, kami telah berkolaborasi dengan ratusan organisasi dan korporasi untuk membangun budaya kepemimpinan yang adaptif dan produktif.
                            </p>
                            <p>
                                Program <strong>Pelatihan Kepemimpinan</strong> kami dirancang berbasis metode <em>Experiential Learning</em> — belajar melalui pengalaman nyata, bukan sekadar teori. Hasilnya: pemimpin yang siap menghadapi tantangan organisasi modern.
                            </p>
                            <div className="owner-info">
                                <div className="left-info">
                                    <h4>Ardian Rangga</h4>
                                    <span>CEO & Founder</span>
                                </div>
                                <div className="right-info">
                                    <Image src={signatureThumb} alt="Image Not Found" />
                                </div>
                            </div>
                        </div>
                        <div className="about-style-one col-xl-5 offset-xl-1 col-lg-6 offset-lg-1">
                            <div className="about-thumb">
                                <Image className="wow fadeInRight" src={aboutThumb} alt="Image Not Found" />
                                <About1Card />
                                <div className="thumb-shape-bottom wow fadeInDown" data-wow-delay="300ms">
                                    <Image src={anim3Thumb} alt="Image Not Found" />
                                    <Image src={anim4Thumb} alt="Image Not Found" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutStyle1;