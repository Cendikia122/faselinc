import Link from 'next/link';
import React from 'react';

const SocialShare = () => {
    return (
        <>
            <li>
                <Link className="youtube" href="https://www.youtube.com/@faselinc" target="_blank" aria-label="YouTube Fasel Consulting">
                    <i className="fab fa-youtube"></i>
                </Link>
            </li>
            <li>
                <Link className="facebook" href="https://m.facebook.com/fasel.inc/" target="_blank" aria-label="Facebook Fasel Consulting">
                    <i className="fab fa-facebook-f"></i>
                </Link>
            </li>
            <li>
                <Link className="instagram" href="https://www.instagram.com/fasel.inc/" target="_blank" aria-label="Instagram Fasel Consulting">
                    <i className="fab fa-instagram"></i>
                </Link>
            </li>
        </>
    );
};

export default SocialShare;