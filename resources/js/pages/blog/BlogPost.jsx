import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';

const BlogPost = ({ slug }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${slug}`);
            const result = await response.json();
            setPost(result);
        } catch (error) {
            console.error('Failed to fetch blog post:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [slug]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid Date';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="store-front">
            <Header />

            <section id="page-header" className="blog-header">
                <h2>#readmore</h2>
                <p>Discover the details of the post!</p>
            </section>

            <section id="products1" className="section-p1">
                {loading ? (
                    <p>Loading...</p>
                ) : post ? (
                    <div className="blog-post">
                        {post.image && (
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    style={{
                                        maxWidth: '100%',
                                        height: 'auto',
                                        borderRadius: '8px',
                                    }}
                                />
                            </div>
                        )}
                        <h1 style={{ marginBottom: '10px', textAlign: 'center' }}>{post.title}</h1>
                        <p style={{ marginBottom: '20px', textAlign: 'center', color: '#555' }}>
                            Published on: {formatDate(post.created_at)}
                        </p>
                        <div
                            style={{ lineHeight: '1.6', fontSize: '16px', color: '#333' }}
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                ) : (
                    <p>Post not found.</p>
                )}
            </section>

            <Footer />
        </div>
    );
};

export default BlogPost;
