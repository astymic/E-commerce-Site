import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, updateCartItemQuantity, removeItemFromCart } from '../../redux/actions/cartActions';

function CartPreview() {
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart);
    const { items: cartItems, loading } = cartState;

    // Fetch cart items when component mounts or wehn not laoding
    useEffect(() => {
        // dispatch(getCart());
    }, [dispatch]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.product && item.product.price ? item.product.price : 0;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2); // Format to 2 decimal places
    }

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


    return (
        <div className="cart-preview">
            <h3>Shopping Cart</h3>
            {loading && <p>Loading Cart...</p>}
            {!loading && cartItems.length === 0 ? (
                <p>Your cart empty</p>
            ) : (
                <>
                    <div className="cart-preview-total">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <ul className="cart-preview-list">
                        {cartItems.map(item => (
                            <li key={item.product?._id} className='cart-preview-item'>
                                <div className="item-image">
                                    <img src={item.product && item.product.images ? item.product.images[0] : '/placeholder.png'} alt={item.product ? item.product.name : 'Product'} />
                                </div>
                                <div className="item-details">
                                    <span className="item-name">{item.product ? item.product.name : 'Product Name'} </span>
                                    <span className="item-price">${item.product && item.product.price ? item.product.price.toFixed(2) : '0.00'}</span>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1)}>+</button>
                                </div>
                                <div className="item-remove">
                                    <button onClick={() => handleRemoveItem(item.product?._id)}>x</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-preview-actions">
                        <Link to='/cart' className="bnt btn-secondary">View Cart</Link>
                        <Link to='/checkout' className="bnt btn-primary">Checkout</Link>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPreview;