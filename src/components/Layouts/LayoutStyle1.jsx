import React from 'react';
import HeaderStyle1 from '../header/HeaderStyle1';
import FooterStyle1 from '../footer/FooterStyle1';

const LayoutStyle1 = ({ children }) => {
    return (
        <>
            <div className="wrapper">
                <HeaderStyle1 />
                <main id="main-content">
                    {children}
                </main>
                <FooterStyle1 />
            </div>
        </>
    );
};

export default LayoutStyle1;