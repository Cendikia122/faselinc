import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import shape43 from '@/assets/img/shape/43.png'

const SingleBanner3 = ({ banner, isPriority = false }) => {
    const { bgThumb, subTitle, title, btnText } = banner

    return (
        <>
            <div className="banner-thumb bg-cover" style={{ overflow: 'hidden' }}>
                <Image
                    src={`/assets/img/banner/${bgThumb}`}
                    alt={title || "Pelatihan Kepemimpinan Fasel Consulting"}
                    fill
                    priority={isPriority}
                    fetchPriority={isPriority ? "high" : "low"}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    style={{ objectFit: 'cover' }}
                    quality={75}
                />
            </div>
            <div className="container">
                <div className="row align-center">
                    <div className="col-xl-6 col-lg-7 col-md-10">
                        <div className="content">
                            <div className="sub-title h4">{subTitle}</div>
                            {isPriority ? (
                                <h1>{title}</h1>
                            ) : (
                                <h2>{title}</h2>
                            )}
                            <ul>
                                {banner.listInfo.map(list =>
                                    <li key={list.id}>{list.listData}</li>
                                )}
                            </ul>
                            <div className="button">
                                <Link className="btn btn-theme danger btn-md animation" href="/contact-us">{btnText}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="banner-shape">
                <Image src={shape43} width={464} height={464} alt="Shape" />
            </div>
        </>
    );
};

export default SingleBanner3;