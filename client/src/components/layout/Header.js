import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartPreview from './CartPreview';
import './Header.css';

function Header() {
    const [ isCartVisible, setIsCartVisible] = useState(false);
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items: cartItems } = useSelector(state => state.cart);

    const toggleCartPreview = () => setIsCartVisible(!isCartVisible);

    return (
        <header className="main-header">
            <div className="header-container container">
                <nav>
                    <Link to="/">HOME ICON</Link> {/* Replace with icon later */}
                    {/* Add Category dropdown later */}
                </nav>
                <div className="header-actions">
                    {isAuthenticated && user ? (
                        <Link to="/profile">Welcome, {user.firstName}</Link>
                    ) : (
                        <Link to="/login">Login</Link>
                    )} 

                    <div className="cart-icon-container">
                        <button className="icon-button" onClick={toggleCartPreview}>
                            CART ICON ({cartItems.length}) {/* Replace with Cart icon later */}
                        </button>
                        {isCartVisible && <CartPreview />}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;