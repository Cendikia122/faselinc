"use client";
import React from 'react';
import logo from '@/assets/img/fasellogo.png';
import Image from 'next/image';
import Link from 'next/link';

const HeaderLogo = ({ openMenu }) => {
    return (
        <div className="navbar-header fasel-logo-wrapper">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu" onClick={openMenu}>
                <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" href="/" style={{ padding: '0', margin: '0', display: 'flex', alignItems: 'center' }}>
                <Image src={logo} className="logo fasel-brand-img" alt="Fasel Consulting Logo" priority />
            </Link>
        </div>
    );
};

export default HeaderLogo;