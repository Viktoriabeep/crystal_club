import React from 'react';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';
import {usePage} from "@inertiajs/react";

const Contact = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Message Sent!',
            text: 'Thank you for contacting us. We will get back to you soon.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated} />

            <section id="page-header">
                <h2>Contact Us</h2>
                <p>LEAVE A MESSAGE, We love to hear from you!</p>
            </section>

            <section id="products1" className="section-p1">
                <div style={{ marginBottom: '40px' }}>
                    <h3>GET IN TOUCH</h3>
                    <p>Visit one of our agency locations or Contact us today</p>
                    <h4>Head Office</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><i className="fa fa-map-marker" aria-hidden="true"></i> Lviv National Polytechnic University</li>
                        <li><i className="fa fa-envelope-o" aria-hidden="true"></i> crystalclubsupport@gmail.com</li>
                        <li><i className="fa fa-phone" aria-hidden="true"></i> +380989717254</li>
                        <li><i className="fa fa-clock-o" aria-hidden="true"></i> Monday to Saturday 9.00am to 9.00pm</li>
                    </ul>
                </div>

                <div className="map" style={{ marginBottom: '40px' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2563.485038712932!2d24.01282851571302!3d49.8396832793931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473addb6d2e60d51%3A0x49b819ff2e1a2f0!2sLviv%20Polytechnic%20National%20University!5e0!3m2!1sen!2sua!4v1699342807410!5m2!1sen!2sua"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3>LEAVE A MESSAGE</h3>
                    <p>We love to hear from you</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '15px' }}
                    ></textarea>
                    <button
                        type="submit"
                        className="normal"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007BFF',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Submit
                    </button>
                </form>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
