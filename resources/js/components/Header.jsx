import React, { useEffect, useState } from 'react';
import AccountLink from './AccountLink';
import { getCartCount } from '../services/cartService';

const Header = ({ isAuthenticated }) => {
    const [cartCount, setCartCount] = useState(getCartCount());

    useEffect(() => {
        const handleCartUpdate = (event) => {
            setCartCount(event.detail);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    return (
        <header id="header">
            <a href="/">
                <img src="/img/logo.png" className="logo" alt="Logo" />
            </a>
            <nav>
                <ul id="navbar">
                    <li><a className="active" href="/">Home</a></li>
                    <li><a href="/shop">Shop</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li id="lg-bag">
                        <a href="/cart">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </a>
                    </li>
                    <AccountLink isAuthenticated={isAuthenticated} />
                </ul>
            </nav>
        </header>
    );
};

export default Header;
