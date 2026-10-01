"use client"
import React from 'react';
import Banner3Data from '@/assets/jsonData/banner/Banner3Data.json'
import { Autoplay, EffectFade, Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SingleBanner3 from './SingleBanner3';

export const metadata = {
  title: "Fasel, Inc | Solusi Digital Terbaik untuk Bisnis Anda",
  description:
    "Fasel, Inc menyediakan layanan teknologi inovatif untuk membantu bisnis Anda berkembang melalui solusi digital yang efektif dan modern.",
  keywords: [
    "Bussines Consultant Indonesia",
    "Skill",
    "Software Development",
    "Digital Marketing",
    "Fasel Inc",
  ],
  authors: [{ name: "Fasel, Inc", url: "https://www.fasel.com" }],
  creator: "Fasel, Inc",
  publisher: "Fasel, Inc",

  openGraph: {
    title: "Fasel, Inc | Solusi Digital Terbaik",
    description:
      "Solusi digital inovatif yang membantu bisnis Anda berkembang pesat. Teknologi modern untuk hasil maksimal.",
    url: "https://www.fasel.com",
    siteName: "Fasel, Inc",
    images: [
      {
        url: "https://faselconsulting.com/_next/image?url=%2Fassets%2Fimg%2Fgallery%2Ffaselindoor1.jpg&w=1920&q=75",
        width: 1200,
        height: 630,
        alt: "Fasel, Inc - Solusi Business",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Fasel, Inc",
    description: "Solusi digital inovatif untuk bisnis modern.",
    images: ["https://www.fasel.com/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.fasel.com",
  },
};


const BannerStyle3 = () => {
    return (
        <>
            <div className="banner-area zoom-effect bg-gray navigation-circle banner-style-three-area overflow-hidden">
                <div className="banner-style-two-carousel">
                    <div className="swiper-wrapper">
                        <Swiper
                            modules={[Keyboard, Autoplay, EffectFade, Navigation]}
                            direction={"horizontal"}
                            grabCursor={true}
                            loop={true}
                            speed={3000}
                            autoplay={{
                                delay: 5000,
                                stopOnLastSlide: false,
                                disableOnInteraction: false,
                            }}
                            keyboard={{
                                enabled: true,
                            }}
                            effect={'fade'}
                            fadeEffect={{
                                crossFade: true
                            }}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            }}
                        >
                            {Banner3Data.map((banner, index) =>
                                <SwiperSlide key={banner.id} className='banner-style-three'>
                                    <SingleBanner3 banner={banner} isPriority={index === 0} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
        </>
    );
};

export default BannerStyle3;