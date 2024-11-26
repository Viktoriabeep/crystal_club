import React from 'react';

const Footer = ({ isAuthenticated }) => {
    return (
        <footer className="section-p1">
            <div className="col">
                <img className="logo" src="/img/white logo.png" alt="White Logo" />
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
                <img src="/img/pay/pay.png" alt="Payment Methods" />
            </div>

            <div className="copyright">
                <p>© {new Date().getFullYear()}, Crystal Club</p>
            </div>
        </footer>
    );
};

export default Footer;
