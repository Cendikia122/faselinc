import React from 'react';
import Link from 'next/link';

const SingleBlog1 = ({ blog }) => {
    const { id, thumb, date, animationDelay, author, title, btnText, slug } = blog;
    const targetUrl = `/blog/${slug || id}`;
    const imgSrc = thumb?.startsWith('/') || thumb?.startsWith('http') || thumb?.startsWith('data:')
        ? thumb
        : `/assets/img/blog/${thumb || 'ar.jpg'}`;

    return (
        <div className="col-xl-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay={animationDelay ? [animationDelay] : undefined}>
            <div className="blog-style-one">
                <div className="thumb" style={{ height: '240px', overflow: 'hidden' }}>
                    <Link href={targetUrl}>
                        <img
                            src={imgSrc}
                            alt={title || "Blog Thumb"}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Link>
                </div>
                <div className="info">
                    <div className="blog-meta">
                        <ul>
                            <li>
                                <span>By </span>
                                <Link href="#" scroll={false}>{author || 'Fasel Consulting'}</Link>
                            </li>
                            <li>{date}</li>
                        </ul>
                    </div>
                    <h4>
                        <Link href={targetUrl}>{title}</Link>
                    </h4>
                    <Link href={targetUrl} className="btn-simple">
                        <i className="fas fa-angle-right"></i> {btnText || "Baca Selengkapnya"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog1;