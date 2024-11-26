import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';
import {usePage} from "@inertiajs/react";

const Blog = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog/posts');
            const result = await response.json();
            setPosts(result.posts || []);
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const truncateContent = (content, maxLength = 100) => {
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.length > maxLength
            ? `${textContent.substring(0, maxLength)}...`
            : textContent;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated}/>

            <section id="page-header" className="blog-header">
                <h2>#readmore</h2>
                <p>Read all case studies about our products!</p>
            </section>

            <section id="products1" className="section-p1">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div id="blog">
                        {posts.map((post) => (
                            <div className="blog-box" key={post.id} style={{display: 'flex', marginBottom: '20px'}}>
                                <div className="blog-img" style={{marginRight: '20px', position: 'relative'}}>
                                    <h1 style={{
                                        position: 'absolute',
                                        left: '0',
                                        fontSize: '14px',
                                        color: '#555',
                                        margin: '0',
                                    }}>
                                        {formatDate(post.created_at)}
                                    </h1>
                                    {post.image && (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="blog-details" style={{flex: 1}}>
                                    <h4 style={{marginBottom: '10px'}}>{post.title}</h4>
                                    <p style={{marginBottom: '10px', textAlign: 'justify', color: '#555'}}>
                                        {truncateContent(post.content)}
                                    </p>
                                    <a href={`/blog/${post.slug}`} style={{color: '#007BFF', textDecoration: 'none'}}>
                                        CONTINUE READING
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer/>
        </div>
    );
};

export default Blog;
