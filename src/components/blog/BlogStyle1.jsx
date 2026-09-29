"use client";
import React, { useEffect, useState } from 'react';
import SingleBlog1 from './SingleBlog1';

const BlogStyle1 = ({ sectionClass, initialBlogs = [] }) => {
    const [blogs, setBlogs] = useState(initialBlogs);
    const [isLoaded, setIsLoaded] = useState(initialBlogs.length > 0);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();
                if (data.success && Array.isArray(data.data)) {
                    const published = data.data.filter(b => b.status === 'published' || !b.status);
                    setBlogs(published.slice(0, 3));
                }
            } catch (err) {
                console.warn('Could not load dynamic blogs:', err);
            } finally {
                setIsLoaded(true);
            }
        }
        fetchBlogs();
    }, []);

    // Jangan tampilkan section jika tidak ada artikel dari admin
    if (isLoaded && blogs.length === 0) {
        return null;
    }

    return (
        <div className={`home-blog-area default-padding bottom-less ${sectionClass ? sectionClass : ""}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-heading text-center">
                            <h4 className="sub-heading">Wawasan & Berita</h4>
                            <h2 className="title">Artikel & Inspirasi Terkini</h2>
                            <div className="devider"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    {blogs.map((blog) => (
                        <SingleBlog1 blog={blog} key={blog.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogStyle1;