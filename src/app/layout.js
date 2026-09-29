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

const manrope = Manrope({ subsets: ["latin"] });
const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://faselconsulting.com'),
  title: {
    default: "Fasel Consulting | Pelatihan Kepemimpinan & Experiential Learning Indonesia",
    template: "%s | Fasel Consulting",
  },
  description:
    "Fasel Consulting adalah konsultan pelatihan SDM dan kepemimpinan berbasis Experiential Learning terkemuka di Indonesia. Spesialisasi dalam Leadership Transformation, Team Building, dan In-House Training perusahaan.",
  keywords: [
    "Experiential Learning Indonesia",
    "Pelatihan Kepemimpinan Perusahaan",
    "Leadership Development Program",
    "Team Building Bogor",
    "Outbound Training Jakarta",
    "Fasel Consulting",
    "Corporate Training SDM",
    "Pelatihan Karyawan",
  ],
  alternates: {
    canonical: "https://faselconsulting.com",
  },
  openGraph: {
    title: "Fasel Consulting | Experiential Learning & Leadership Transformation",
    description:
      "Tingkatkan kapasitas kepemimpinan dan kekompakan tim perusahaan Anda bersama program Experiential Learning Fasel Consulting.",
    url: "https://faselconsulting.com",
    siteName: "Fasel Consulting",
    images: [
      {
        url: "/assets/img/projects/faselevent1.jpg",
        width: 1200,
        height: 630,
        alt: "Fasel Consulting - Experiential Learning & Leadership Training",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fasel Consulting | Experiential Learning & Leadership Training",
    description:
      "Konsultan pelatihan SDM dan kepemimpinan berbasis Experiential Learning terdepan di Indonesia.",
    images: ["/assets/img/projects/faselevent1.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} ${manrope.className}`}>
        {/* Meta Pixel - initialize after interactive */}
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
