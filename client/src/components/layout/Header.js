import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartPreview from './CartPreview';


function Header() {
    const [ isCartVisible, setIsCartVisible] = useState(false);
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const toggleCartPreview = () => {
        setIsCartVisible(!isCartVisible)
    };

    return (
        <header className="main-header">
            <nav>
                <Link to="/">Home</Link>
            </nav>
        <div className="header-actions">
            {/* Placeholder for User Account Icon */}
            {/* <button className="icon-button">User</button> */}

            { isAuthenticated && user ? (
                <Link to="/profile" className="icon-button">
                    {user.firstName}
                </Link>
            ) : (
                <Link to="/login" className="icon-button">Login</Link>
            )} 

            {/* Cart Icon and Preview */}
            <div className="cart-icon-container">
                <button className="icon-button" onClick={toggleCartPreview}>
                    Cart {/* Replace with Cart icon later */}
                    {/* Optionaly display item count badge here */}
                </button>
                {isCartVisible && <CartPreview />}
            </div>
        </div>
        </header>
    );
}

export default Header;