import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-modal-video/css/modal-video.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-circular-progressbar/dist/styles.css';
import 'rc-slider/assets/index.css';

import '@/assets/css/animate.css';
import '@/assets/css/font-awesome.min.css';
import '@/assets/css/flaticon-set.css';

import '@/assets/css/nice-select.css';
import '@/assets/css/validnavs.css';
import '@/assets/css/helper.css';
import '@/assets/css/unit-test.css';
import '@/assets/css/style.css';
import '@/assets/css/custom-navbar.css';

import Dependency from '@/components/utilities/Dependency';
import { ToastContainer } from 'react-toastify';
import { Manrope, Outfit } from "next/font/google";
import Script from 'next/script';
import FbPixelClient from '@/components/FbPixelClient';

const manrope = Manrope({ subsets: ["latin"], display: "swap", preload: true });
const outfit = Outfit({ subsets: ["latin"], display: "swap", preload: true });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.faselconsulting.id'),
  title: {
    // ✅ Default title dimulai dengan exact keyword
    default: "Experiential Learning Indonesia | Pelatihan Kepemimpinan & Leadership Development Program — Fasel Consulting",
    template: "%s | Fasel Consulting",
  },
  // ✅ Description 155 karakter, exact keywords tercantum
  description:
    "Fasel Consulting: spesialis Experiential Learning Indonesia, Pelatihan Kepemimpinan, dan Leadership Development Program untuk korporasi & organisasi terbaik.",
  keywords: [
    "Experiential Learning Indonesia",
    "Pelatihan Kepemimpinan",
    "Leadership Development Program",
    "Pelatihan Kepemimpinan Perusahaan",
    "Team Building Bogor",
    "Outbound Training Jakarta",
    "In-House Training Perusahaan",
    "Fasel Consulting",
    "Corporate Training SDM",
    "Pelatihan Karyawan",
    "Konsultan SDM Indonesia",
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

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
  return (
    <html lang="id">
      <body className={`${outfit.className} ${manrope.className}`}>
        {/* ✅ Google Analytics GA4 — fix "Google Analytics Not Found" error */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Meta Pixel - Facebook Ads */}
        <Script id="fb-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1396576578921257');
fbq('track', 'PageView');`}
        </Script>

        {/* Fallback for no-JS */}
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1396576578921257&ev=PageView&noscript=1" />
        </noscript>

        <ToastContainer />
        <Dependency />
        {children}

        {/* Client component to record PageView on client-side route changes */}
        <FbPixelClient />
      </body>
    </html>
  );
}
