const CART_KEY = 'cart';

export const getCart = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
};

export const updateCartCount = (count) => {
    localStorage.setItem('cart', JSON.stringify(count));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: count }));
};

export const addToCart = (product) => {
    const cartItems = getCart();
    cartItems.push(product);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartItems.length }));

    return cartItems.length;
};

export const removeFromCart = (productId) => {
    let cartItems = getCart();
    cartItems = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));

    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cartItems.length }));

    return cartItems.length;
};


export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};

export const getCartCount = () => {
    return getCart().length;
};
