import EventsListingPage from '../events/page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Pelatihan & Event Experiential Learning | Fasel Consulting",
  description: "Daftar jadwal program pelatihan kepemimpinan, experiential learning, team building, dan leadership development program dari Fasel Consulting.",
  alternates: {
    canonical: "https://www.faselconsulting.id/project",
  },
  openGraph: {
    title: "Pelatihan & Event Experiential Learning | Fasel Consulting",
    description: "Daftar jadwal program pelatihan kepemimpinan, experiential learning, dan leadership development program.",
    url: "https://www.faselconsulting.id/project",
    siteName: "Fasel Consulting",
    images: ["/assets/img/projects/faselevent1.jpg"],
    locale: "id_ID",
    type: "website",
  },
};

export default function ProjectPage() {
  return <EventsListingPage />;
}