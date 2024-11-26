import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';
import { addToCart, getCartCount } from '../../services/cartService';

const ProductPage = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const { id } = props;
    const [product, setProduct] = useState(null);
    const [cartCount, setCartCount] = useState(getCartCount());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/store-product/${id}`);
                const result = await response.json();
                setProduct(result.product || null);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = (product) => {
        const newCartCount = addToCart(product);
        setCartCount(newCartCount);
    };

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated} cartCount={cartCount}/>

            <section id="page-header">
                <h2>{loading ? 'Loading...' : product?.name || 'Product Not Found'}</h2>
            </section>

            <section id="products1" className="section-p1">
                {loading ? (
                    <p>Loading...</p>
                ) : product ? (
                    <div
                        className="product-container"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            alignItems: 'center',
                            gap: '40px',
                            maxWidth: '1100px',
                            margin: '40px auto',
                            padding: '20px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '10px',
                            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Галерея зображень */}
                        <div className="product-gallery" style={{textAlign: 'center'}}>
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '450px',
                                    borderRadius: '8px',
                                    objectFit: 'contain',
                                    marginBottom: '20px',
                                }}
                            />
                            {product.image.length > 1 && (
                                <div
                                    className="thumbnail-gallery"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    {product.image.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '6px',
                                                objectFit: 'cover',
                                                cursor: 'pointer',
                                                border: '2px solid #ddd',
                                                transition: 'border-color 0.3s',
                                            }}
                                            onMouseOver={(e) => (e.target.style.borderColor = '#007BFF')}
                                            onMouseOut={(e) => (e.target.style.borderColor = '#ddd')}
                                            onClick={() => {
                                                const mainImage = document.querySelector(
                                                    '.product-gallery img'
                                                );
                                                if (mainImage) mainImage.src = img;
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Інформація про продукт */}
                        <div className="product-info">
                            <h1
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 'bold',
                                    marginBottom: '15px',
                                    color: '#333',
                                }}
                            >
                                {product.name}
                            </h1>
                            <div
                                className="product-description"
                                style={{
                                    fontSize: '16px',
                                    color: '#666',
                                    lineHeight: '1.6',
                                    marginBottom: '20px',
                                }}
                                dangerouslySetInnerHTML={{__html: product.description}}
                            ></div>
                            <h3
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: '20px',
                                }}
                            >
                                ₴{product.price}
                            </h3>
                            <button
                                onClick={() => handleAddToCart(product)}
                                style={{
                                    backgroundColor: '#007BFF',
                                    color: '#FFF',
                                    padding: '12px 20px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#007BFF')}
                            >
                                <i className="fa fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <p>Product not found</p>
                )}
            </section>

            <Footer isAuthenticated={isAuthenticated}/>
        </div>
    );
};

export default ProductPage;
