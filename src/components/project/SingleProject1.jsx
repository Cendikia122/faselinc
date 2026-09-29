import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SingleProject1 = ({ project }) => {
    const { id, thumb, tag, title, text, short_desc, btnText, btn_text } = project;
    const displayText = text || short_desc;
    const displayBtnText = btnText || btn_text || "Lihat Rincian";
    const imgSrc = thumb?.startsWith('/') || thumb?.startsWith('http') || thumb?.startsWith('data:')
        ? thumb 
        : `/assets/img/projects/${thumb || 'faselevent1.jpg'}`;

    return (
        <>
            <div className="swiper-slide">
                <div className="project-style-one">
                    <div className="row align-bottom">
                        <div className="col-lg-7 pr-0 pr-md-15 pr-xs-15 pl-md-15 pl-xs-15">
                            <div className="thumb">
                                <img src={imgSrc} alt={title || "Event Fasel"} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                            </div>
                        </div>
                        <div className="col-lg-5 pl-0 pl-md-15 pl-xs-15 pr-md-15 pr-xs-15">
                            <div className="info">
                                <span>{tag}</span>
                                <h3><Link href={`/project-details/${id}`}>{title}</Link></h3>
                                <p>{displayText}</p>
                                <Link className="btn-animation dark mt-10" href={`/project-details/${id}`}><i className="fas fa-arrow-right"></i> <span>{displayBtnText}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProject1;