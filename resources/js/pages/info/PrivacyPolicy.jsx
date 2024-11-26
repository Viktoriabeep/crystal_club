import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';

const PrivacyPolicy = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const [content, setContent] = useState(null);
    const [title, setTitle] = useState(null);

    const fetchContent = async () => {
        try {
            const response = await fetch('/api/info/privacy-policy');
            const result = await response.json();
            setTitle(result.title);
            setContent(result.content);
        } catch (error) {
            console.error('Failed to fetch content:', error);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated} />

            <section id="page-header">
                <h2>#stayhome</h2>
                <p>Save more with coupons & up to 70% off!</p>
            </section>

            <section id="products1" className="section-p1">
                {title && <h2 style={{ marginBottom: '20px' }}>{title}</h2>}
                {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <p>Loading...</p>
                )}
            </section>

            <Footer isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default PrivacyPolicy;
