import React, { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Select from 'react-select';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';
import {
    addToCart,
    getCartCount
} from '../../services/cartService';

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const Shop = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const initialProducts = props.products || [];
    const initialCategories = props.categories || [];

    const { data, setData, get } = useForm({
        category: null,
        price: 500,
    });

    const [products, setProducts] = useState(initialProducts);
    const [categories, setCategories] = useState(initialCategories);
    const [cartCount, setCartCount] = useState(getCartCount()); // Ініціалізуємо лічильник кошика
    const [loading, setLoading] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);

    const fetchCategories = async () => {
        if (categories.length === 0) {
            try {
                const response = await fetch('/api/storefront-categories');
                const result = await response.json();
                setCategories([{ id: null, name: 'All' }, ...result.categories]);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        }
    };

    const fetchProducts = debounce(async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `/api/storefront?category=${data.category || ''}&price=${data.price}`
            );
            const result = await response.json();
            setProducts(result.products || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
            setFiltersChanged(false);
        }
    }, 1000);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (filtersChanged) {
            fetchProducts();
        }
    }, [data.category, data.price]);

    const handleCategoryChange = (selectedOption) => {
        setData('category', selectedOption ? selectedOption.value : null);
        setFiltersChanged(true);
    };

    const handlePriceChange = (e) => {
        setData('price', e.target.value);
        setFiltersChanged(true);
    };

    const handleAddToCart = (product) => {
        const newCartCount = addToCart(product); // Додаємо товар у кошик через сервіс
        setCartCount(newCartCount); // Оновлюємо кількість товарів у кошику
    };

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated} cartCount={cartCount} />

            <section id="page-header">
                <h2>#stayhome</h2>
                <p>Save more with coupons & up to 70% off!</p>
            </section>

            <section id="filter-bar" className="section-p1">
                <div className="filter">
                    <h3>Filter by Category</h3>
                    <Select
                        options={categoryOptions}
                        onChange={handleCategoryChange}
                        defaultValue={categoryOptions.find((opt) => opt.value === null)}
                    />
                </div>
                <div className="filter">
                    <h3>Filter by Price</h3>
                    <input
                        type="range"
                        id="price-filter"
                        min="0"
                        max="1000"
                        step="10"
                        value={data.price}
                        onChange={handlePriceChange}
                    />
                    <span id="price-value">₴{data.price}</span>
                </div>
            </section>

            <section id="products1" className="section-p1">
                {loading ? (
                    <p>Loading...</p>
                ) : products.length > 0 ? (
                    <div className="pro-container">
                        {products.map((product) => (
                            <div
                                className="pro"
                                key={product.id}
                                onClick={() => window.location.href = `/product/${product.id}`}
                            >
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-details">
                                    <span className="product-brand">{product.brand}</span>
                                    <h5 className="product-name">{product.name}</h5>
                                    <div className="product-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <i
                                                className={`fa ${i < product.rating ? 'fa-star' : 'fa-star-o'}`}
                                                key={i}
                                            ></i>
                                        ))}
                                    </div>
                                    <h4 className="product-price">₴{product.price}</h4>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    className="add-to-cart"
                                >
                                    <i className="fa fa-shopping-cart"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products found</p>
                )}
            </section>

            <Footer isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default Shop;
