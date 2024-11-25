import React from 'react';
import Swal from 'sweetalert2';
import AccountLink from '../components/AccountLink';
import '../../css/home.css';
import {usePage} from '@inertiajs/react';

const Home = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const handleFakeSubscription = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Thank You!',
            text: 'You have successfully subscribed to our newsletter!',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    };

    return (
        <div className="store-front">
            <header id="header">
                <a href="/">
                    <img src="/img/logo.png" className="logo" alt="Logo"/>
                </a>
                <nav>
                    <ul id="navbar">
                        <li><a className="active" href="/">Home</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li id="lg-bag">
                            <a href="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i></a>
                        </li>
                        <AccountLink isAuthenticated={isAuthenticated}/>
                    </ul>
                </nav>
            </header>

            <section id="hero" style={{backgroundImage: 'url(/img/hero4.png)'}}>
                <h4>Crystal Club.</h4>
                <h2>Openmind collection out now!</h2>
                <h1>shop here</h1>
                <p>Save more with coupons & up to 70% off!</p>
                <button>
                    <a href="/shop">Shop Now</a>
                </button>
            </section>

            <section id="newletter" className="section-p1 section-m1">
                <div className="newtext">
                    <h4>Sign Up For Newsletters</h4>
                    <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
                </div>
                <form className="form" onSubmit={handleFakeSubscription}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        required
                    />
                    <button className="normal" type="submit">Sign Up</button>
                </form>
            </section>

            <footer className="section-p1">
                <div className="col">
                    <img className="logo" src="/img/white logo.png" alt="White Logo"/>
                    <h4>Contact</h4>
                    <p><strong>Address:</strong> Lviv Polytechnic National University</p>
                    <p><strong>Phone:</strong> +380 989717254</p>
                    <p><strong>Hours:</strong> 10:00 - 10:00, Mon-Sat</p>
                    <div className="follow">
                        <h4>Follow us</h4>
                        <div className="icon">
                            <i className="fa fa-facebook-square" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                            <i className="fa fa-twitter-square" aria-hidden="true"></i>
                            <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <h4>About</h4>
                    <a href="/about">About us</a>
                    <a href="/delivery-information">Delivery Information</a>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-conditions">Terms & Conditions</a>
                    <a href="/contact">Contact us</a>
                </div>

                <div className="col">
                    <h4>My Account</h4>
                    {!isAuthenticated && (
                        <>
                            <a href="/en/login">Sign In</a>
                            <a href="/en/register">Sign Up</a>
                        </>
                    )}
                    <a href="/cart">View Cart</a>
                    <a href="#">My Wishlist</a>
                    <a href="https://t.me/CheckurcheckBot" target="_blank">Track My Order</a>
                    <a href="#">Help</a>
                </div>

                <div className="col install">
                    <p>Secured Payment Gateways</p>
                    <img src="/img/pay/pay.png" alt="Payment Methods"/>
                </div>

                <div className="copyright">
                    <p>© {new Date().getFullYear()}, Crystal Club</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
