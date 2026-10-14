import React from 'react';
import BreadCrumb from '../breadCrumb/BreadCrumb';
import FooterStyle1 from '../footer/FooterStyle1';
import HeaderStyle7 from '../header/HeaderStyle7';

const LayoutStyle7 = ({ children, breadCrumb, title }) => {
    return (
        <>
            <HeaderStyle7 />
            <main id="main-content">
                {breadCrumb && <BreadCrumb breadCrumb={breadCrumb} title={title} />}
                {children}
            </main>
            <FooterStyle1 />
        </>
    );
};

export default LayoutStyle7;