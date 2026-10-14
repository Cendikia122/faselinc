import Image from 'next/image';
import React from 'react';
import shape7 from '@/assets/img/shape/7.png';
import shape9 from '@/assets/img/shape/9.png';
import logoLight from '@/assets/img/fasel-light.png';
import Link from 'next/link';
import SocialShare from '../utilities/SocialShare';
import FooterNewsLetter from '../form/FooterNewsLetter';

const FooterStyle1 = ({ shape, shapeClass, logo, formStyle }) => {
    return (
        <>
            <footer className="bg-dark text-light">
                <div className="footer-shape">
                    <div className={`item ${shapeClass}`}>
                        {shape ? <Image src={shape} alt="Shape" /> : <Image src={shape7} alt="Shape" />}
                    </div>
                    <div className="item">
                        <Image src={shape9} alt="Shape" />
                    </div>
                </div>
                <div className="container">
                    <div className="f-items relative pt-70 pb-120 pt-xs-0 pb-xs-50">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 footer-item pr-50 pr-xs-15">
                                <div className="f-item about">
                                    <Link href="/">
                                        {logo ? <Image className="logo" src={logo} alt="Fasel Consulting Logo" /> : <Image className="logo" src={logoLight} alt="Fasel Consulting Logo" />}
                                    </Link>
                                    <p>
                                    🚀 Ready to take your team to the next level with FASEL.inc? Let’s create an unforgettable and impactful experience!
                                    </p>
                                    <div className="opening-hours">
                                        <h5>Service Hours</h5>
                                        <ul>
                                            <li>
                                                <div className="working-day">Monday – Saturday:</div>
                                                <div className="marker"></div>
                                                <div className="working-hour">8am – 5pm</div>
                                            </li>
                                            <li>
                                                <div className="working-day">Sunday:</div>
                                                <div className="marker"></div>
                                                <div className="working-hour">Off Day</div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 footer-item">
                                <div className="f-item link">
                                    <h4 className="widget-title">Our Company</h4>
                                    <ul>
                                        <li>
                                            <Link href="/about-us">Company Profile</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact-us">Help Center</Link>
                                        </li>
                                        <li>
                                            <Link href="/about-us">Career</Link>
                                        </li>
                                        <li>
                                            <Link href="/contact-us">Contact</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 footer-item">
                                <div className="f-item link">
                                    <h4 className="widget-title">Our Services</h4>
                                    <ul>
                                        <li>
                                            <Link href="/services">Training</Link>
                                        </li>
                                        <li>
                                            <Link href="/services">Team Building</Link>
                                        </li>
                                        <li>
                                            <Link href="/services">Leadership Class</Link>
                                        </li>
                                        <li>
                                            <Link href="/services">Capacity Building</Link>
                                        </li>
                                        <li>
                                            <Link href="/services">Consulting</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 footer-item">
                                <h4 className="widget-title">Newsletter</h4>
                                <p>
                                    Join our subscribers list to get the latest <br /> news and special offers.
                                </p>
                                <div className={`f-item newsletter ${formStyle}`}>
                                    <FooterNewsLetter />
                                </div>
                                <ul className="footer-social">
                                    <SocialShare />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <p>&copy; Copyright {(new Date().getFullYear())}. All Rights Reserved by <a href="https://www.instagram.com/pramoedyabob/" target='_blank'>cendikia</a></p>
                                <p style={{ fontSize: '11px', marginTop: '4px', opacity: 0.75 }}>
                                    Website dikembangkan oleh{' '}
                                    <a
                                        href="https://www.layanandigital.id"
                                        target="_blank"
                                        rel="noopener"
                                        style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}
                                    >
                                        Ladi (Layanan Digital)
                                    </a>
                                </p>
                            </div>
                            <div className="col-lg-6 text-end">
                                <ul>
                                    <li>
                                        <Link href="/about-us">Terms</Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us">Privacy</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact-us">Support</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterStyle1;