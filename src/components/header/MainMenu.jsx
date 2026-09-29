import React from 'react';
import Link from 'next/link';

const MainMenu = ({ toggleSubMenu, navbarPlacement }) => {
    return (
        <>
            <ul className={`nav navbar-nav ${navbarPlacement || 'navbar-center'} fasel-compact-nav`} data-in="fadeInDown" data-out="fadeOutUp">
                <li><Link href="/">Beranda</Link></li>
                <li className="dropdown">
                    <Link href="/about-us" className="dropdown-toggle" data-toggle="dropdown" onClick={toggleSubMenu}>Tentang Kami</Link>
                    <ul className="dropdown-menu">
                        <li><Link href="/about-us">Profil Fasel Consulting</Link></li>
                        <li><Link href="/team">Tim Fasilitator & Trainer</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link href="/events" className="dropdown-toggle" data-toggle="dropdown" onClick={toggleSubMenu}>Pelatihan & Event</Link>
                    <ul className="dropdown-menu">
                        <li><Link href="/events">Semua Pelatihan & Event</Link></li>
                        <li><Link href="/events">Experiential Learning</Link></li>
                        <li><Link href="/events">Leadership Camp</Link></li>
                    </ul>
                </li>
                <li><Link href="/services">Layanan</Link></li>
                <li><Link href="/blog">Blog & Wawasan</Link></li>
                <li><Link href="/contact-us">Hubungi Kami</Link></li>
            </ul>
        </>
    );
};

export default MainMenu;