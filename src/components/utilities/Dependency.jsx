"use client"
import React, { useEffect } from 'react';
import { ScrollToTop } from 'react-simple-scroll-up';

const Dependency = () => {

  useEffect(() => {
    const initDeps = () => {
      try {
        // Bootstrap Js 
        require('bootstrap/dist/js/bootstrap.bundle.js');

        // WowJs 
        const WOW = require('wowjs/dist/wow.js');
        window.wow = new WOW.WOW({
          live: false,
          mobile: false,
        });

        window.wow.init();
      } catch (err) {
        // Silent catch for SSR or missing DOM
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(initDeps, { timeout: 2000 });
      } else {
        setTimeout(initDeps, 200);
      }
    }
  }, []);

  return (
    <>
      <ScrollToTop symbol={<i className="fal fa-long-arrow-up"></i>} />
    </>
  );
};

export default Dependency;