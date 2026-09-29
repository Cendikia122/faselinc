"use client"
import React from 'react';
import MainMenu from './MainMenu';
import useStickyMenu from '../hooks/useStickyMenu';
import useSidebarMenu from '../hooks/useSidebarMenu';
import HeaderLogo from './HeaderLogo';
import useSubMenuToggle from '../hooks/useSubMenuToggle';
import Link from 'next/link';
import logo from '@/assets/img/fasellogo.png';
import Image from 'next/image';

const MainHeaderStyle7 = () => {
    const isMenuSticky = useStickyMenu();
    const toggleSubMenu = useSubMenuToggle();
    const { isOpen, openMenu, closeMenu } = useSidebarMenu();

    return (
        <header className="fasel-header-wrapper">
            <nav className={`navbar mobile-sidenav navbar-common navbar-sticky navbar-default validnavs fasel-white-gradient-nav ${isMenuSticky ? 'sticked' : ''} ${isOpen ? "navbar-responsive force-sticky" : ""}`} >
                <div className="container-fluid fasel-nav-container">
                    <div className="fasel-nav-inner">
                        {/* Logo Kiri */}
                        <div className="fasel-nav-logo">
                            <HeaderLogo openMenu={openMenu} />
                        </div>

                        {/* Menu Navigasi Tengah (1 Baris Rata, Anti Numpuk) */}
                        <div className={`collapse navbar-collapse collapse-mobile fasel-nav-menu-wrap ${isOpen ? "show" : ""}`} id="navbar-menu">
                            <Image src={logo} alt="Logo Fasel Consulting" className="fasel-drawer-logo" />
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={closeMenu}>
                                <i className="fa fa-times"></i>
                            </button>
                            <MainMenu navbarPlacement="navbar-center" isOpen={isOpen} closeMenu={closeMenu} toggleSubMenu={toggleSubMenu} />
                        </div>

                        {/* Tombol CTA Kanan */}
                        <div className="fasel-nav-cta">
                            <div className="attr-right">
                                <div className="attr-nav">
                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                        <li className="button">
                                            <Link href="/contact-us" className="fasel-consultant-btn">Get consultant</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`overlay-screen ${isOpen ? "opened" : ""}`} onClick={closeMenu}></div>
                </div>
            </nav>
        </header>
    );
};

export default MainHeaderStyle7;