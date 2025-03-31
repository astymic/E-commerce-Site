import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, updateCartItemQuantity, removeItemFromCart } from '../../redux/actions/cartActions';


function CartPage() {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const { items: cartItems, loading , error } = cartState;
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && cartItems.length === 0) {
            dispatch(getCart());
        }
    }, [dispatch, isAuthenticated, cartItems.length]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.product?.price || 0;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (!productId) return;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity(productId, newQuantity));
        } else if (newQuantity === 0) {
            dispatch(removeItemFromCart(productId));
        }
    };

    const handleRemoveItem = (productId) => {
        if (!productId) return;
        dispatch(removeItemFromCart(productId));
    };

    if (!isAuthenticated && !loading ) {
        return <p>Please <Link to="/login">log in</Link> to view your cart</p>;
    }

    return (
        <div className="cart-page container">
            <h1>Your Shopping Cart</h1>
            {loading  && <p>Loading Cart...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error.msg || 'Could not load cart'}</p>}
            {!loading  && !error && cartItems.length === 0 ? (
                <p>Your cart is currently empty <Link to="/">Continue Shopping</Link></p>
            ) : (
                !loading && !error && (
                    <div className="cart-content">
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th colSpan="2">Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map(item => (
                                    <tr key={item.product?._id} className="cart-item-row">
                                        <td>
                                            <img 
                                                src={item.product?.images?.[0] || '/placeholder.png'} 
                                                alt={item.product?.name || 'Product'}
                                                className="cart-item-image" 
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/product/${item.product?._id}`}>
                                                {item.product?.name || 'Product Name'}
                                            </Link>
                                        </td>
                                        <td>${item.product?.price?.toFixed(2) || '0.00'}</td>
                                        <td>
                                            <div className="quantity-control">
                                                <span>{item.quantity} </span>
                                                <button onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1)}>-</button>
                                                <span></span>
                                                <button onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1)}>+</button>
                                            </div>
                                        </td>
                                        <td>${(item.product?.price * item.quantity).toFixed(2) || '0.00'}</td>
                                        <td>
                                            <button className="remove-button" onClick={() => handleRemoveItem(item.product?._id)}>x</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="cart-summary">
                            <h2>Cart Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            {/* Add shipping later */}
                            <div className="summary-row total">
                                <span>Total:</span>
                                <span>${calculateTotal()}</span> {/* Add shipping, taxes if needed */}
                            </div>
                            <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
                            <Link to="/" className="btn btn-secondary btn-block">Continue Shopping</Link>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}


export default CartPage;