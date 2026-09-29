"use client";
import React, { useEffect, useState } from 'react';
import BlogData from '@/assets/jsonData/blog/BlogData.json';
import SingleBlog1 from './SingleBlog1';

const BlogStyle1 = ({ sectionClass }) => {
    const [blogs, setBlogs] = useState(BlogData.slice(0, 3));

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();
                if (data.success && data.data && data.data.length > 0) {
                    setBlogs(data.data.slice(0, 3));
                }
            } catch (err) {
                console.warn('Could not load dynamic blogs, using fallback:', err);
            }
        }
        fetchBlogs();
    }, []);

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
                <div className="row">
                    {blogs.map((blog) => (
                        <SingleBlog1 blog={blog} key={blog.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogStyle1;