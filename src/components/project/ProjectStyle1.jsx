"use client"
import React, { useEffect, useState } from 'react';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Project1Data from "@/assets/jsonData/project/Project1Data.json"
import SingleProject1 from './SingleProject1';

const ProjectStyle1 = ({ initialEvents = [] }) => {
    const [events, setEvents] = useState(initialEvents && initialEvents.length > 0 ? initialEvents : Project1Data);

    useEffect(() => {
        // Jika data sudah di-supply lewat SSR, tidak perlu fetch ulang yang memperlambat halaman
        if (initialEvents && initialEvents.length > 0) return;

        async function fetchEvents() {
            try {
                const res = await fetch('/api/events');
                const data = await res.json();
                if (data.success && data.data && data.data.length > 0) {
                    setEvents(data.data);
                }
            } catch (err) {
                console.warn('Could not load dynamic events, using default:', err);
            }
        }
        fetchEvents();
    }, [initialEvents]);

    return (
        <>
            <div className="project-style-one-area default-padding bg-dark bottom-shape-light">
                <div className="container">
                    <div className="heading-left text-light">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="content-left">
                                    <h5 className="sub-heading">Pelatihan & Event</h5>
                                    <h2 className="heading">Program Pelatihan Unggulan Fasel Consulting</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-style-one-carousel">
                                <div className="swiper-wrapper">
                                    <Swiper
                                        modules={[Keyboard, Autoplay, Pagination, Navigation]}
                                        freeMode={true}
                                        grabCursor={false}
                                        autoplay={false}
                                        loop={events.length > 1}
                                        keyboard={{
                                            enabled: true,
                                        }}
                                        navigation={{
                                            nextEl: '.project-button-next',
                                            prevEl: '.project-button-prev',
                                        }}
                                        pagination={{
                                            el: '.project-pagination',
                                            clickable: true,
                                            type: 'fraction',
                                        }}
                                    >
                                        {events.map(project =>
                                            <SwiperSlide key={project.id}>
                                                <SingleProject1 project={project} />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                                <div className="project-swiper-nav">
                                    <div className="project-pagination"></div>
                                    <div className="project-button-prev"></div>
                                    <div className="project-button-next"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectStyle1;