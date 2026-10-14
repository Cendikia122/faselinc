import Image from 'next/image';
import React from 'react';
import shape17 from '@/assets/img/shape/17.png'

const ChooseStyle1 = () => {
    return (
        <>
            <div className="choose-us-style-one-area default-padding text-light">
                <div className="cover-bg" style={{ backgroundImage: `url(/assets/img/banner/faselvision.jpg)` }}></div>
                <div className="shape-left-top">
                    <Image src={shape17} alt="Shape" />
                </div>
                <div className="text-invisible">Fasel</div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 pr-80 pr-md-15 pr-xs-15">
                            <div className="choose-us-style-one">
                                <h2 className="title mb-35">Our vision and mission!</h2>
                                <ul className="list-item">
                                    <li className="wow fadeInUp">
                                        <h3 className="h4">Our vision</h3>
                                        <p>
                                        Our mission is to provide high-quality and innovative soft skills training services to help individuals and companies achieve their career goals and enhance the skills of their employees
                                        </p>
                                    </li>
                                    <li className="wow fadeInUp" data-wow-delay="300ms">
                                        <h3 className="h4">Our mission</h3>
                                        <p>
                                        Our mission is to provide high-quality and innovative soft skills training services to help individuals and companies achieve their career goals and enhance the skills of their employees
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseStyle1;