import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../../css/home.css';
import '../../../css/shop.css';
import {
    getCart,
    removeFromCart,
    clearCart,
    getCartCount,
} from '../../services/cartService';

const Cart = () => {
    const props = usePage().props;
    const isAuthenticated = props.isAuthenticated;

    const [cartItems, setCartItems] = useState(getCart());
    const [cartCount, setCartCount] = useState(getCartCount());
    const [groupedCartItems, setGroupedCartItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderNumber, setOrderNumber] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const groupCartItems = () => {
            const grouped = cartItems.reduce((acc, item) => {
                const key = item.slug || item.name;

                if (!acc[key]) {
                    acc[key] = { ...item, quantity: 0, total: 0 };
                }

                acc[key].quantity += 1;
                acc[key].total = Number(acc[key].total) + Number(item.price);

                return acc;
            }, {});

            setGroupedCartItems(
                Object.values(grouped).map((group) => ({
                    ...group,
                    total: parseFloat(group.total.toFixed(2)), // Коректне округлення
                }))
            );
        };

        const calculateTotal = () => {
            const total = cartItems.reduce(
                (sum, item) => sum + Number(item.price),
                0
            );
            setTotalPrice(parseFloat(total.toFixed(2))); // Округлення загальної суми
        };

        groupCartItems();
        calculateTotal();
    }, [cartItems]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRemoveFromCart = (slug) => {
        const updatedCart = cartItems.filter((item) => item.slug !== slug);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(updatedCart.length);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const customerResponse = await fetch('/api/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const customer = await customerResponse.json();

            const orderResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customer_id: customer.id,
                    total_price: totalPrice,
                }),
            });
            const order = await orderResponse.json();

            await fetch('/api/order-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    groupedCartItems.map((item) => ({
                        order_id: order.id,
                        product_id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                ),
            });

            setOrderNumber(order.id);
            clearCart();
            setCartItems([]);
            setCartCount(0);
        } catch (error) {
            console.error('Checkout failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="store-front">
            <Header isAuthenticated={isAuthenticated} cartCount={cartCount} />

            <section id="cart" className="section-p1">
                {orderNumber ? (
                    <div className="order-success">
                        <h1>Order Successful</h1>
                        <p>Your order number is: <strong>{orderNumber}</strong></p>
                    </div>
                ) : (
                    <div className="cart-container">
                        <div className="cart-items">
                            <h2>Your Cart</h2>
                            {groupedCartItems.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {groupedCartItems.map((item, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '20px',
                                                marginBottom: '20px',
                                                borderBottom: '1px solid #ccc',
                                                paddingBottom: '20px',
                                            }}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{ margin: '0 0 10px' }}>{item.name}</h3>
                                                <p style={{ margin: '0 0 5px' }}>Quantity: {item.quantity}</p>
                                                <p style={{ margin: '0' }}>Total: ₴{item.total.toFixed(2)}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromCart(item.slug || item.name)}
                                                style={{
                                                    backgroundColor: '#ff4d4f',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '10px 15px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {groupedCartItems.length > 0 && (
                            <div className="checkout-form" style={{ marginTop: '40px' }}>
                                <h2>Checkout</h2>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Your Phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Your Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '15px', width: '100%', padding: '10px' }}
                                    />
                                    <h3>Total: ₴{totalPrice.toFixed(2)}</h3>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            backgroundColor: '#007BFF',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '12px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                        }}
                                    >
                                        {loading ? 'Processing...' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </section>

            <Footer isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default Cart;
