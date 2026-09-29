import React from 'react';
import SocialShare from '../utilities/SocialShare';

const HeaderTopStyle4 = () => {
    return (
        <>
            <div className="top-bar-area top-bar-style-one bg-dark text-light">
                <div className="container">
                    <div className="row align-center">
                        <div className="col-lg-7">
                            <ul className="item-flex">
                                <li>
                                    <i className="fas fa-map-marker-alt"></i> Bogor, Indonesia
                                </li>
                                <li>
                                    <a href="tel:+6281298319944"><i className="fas fa-phone-alt"></i> +62 812 9831 9944</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-5 text-end">
                            <div className="social">
                                <ul>
                                    <SocialShare />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderTopStyle4;