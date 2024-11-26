import React from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {usePage} from '@inertiajs/react';
import '../../css/home.css';

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
            <Header isAuthenticated={isAuthenticated}/>

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

            <Footer isAuthenticated={isAuthenticated}/>
        </div>
    );
};

export default Home;
