import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
    return (
        <footer className="main-footer">
            <div className="container">
                <div className="footer-content">
                    <p>@ {new Date().getFullYear()} Your E-commerce Site. All Rights Reserved.</p>
                    <nav className="footer-links">
                        <Link to="/legal/terms-of-service">Terms of Service</Link>
                        <Link to="/legal/privacy-policy">Privacy Policy</Link>
                        <Link to="/legal/shipping-policy">Shipping Policy</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

export default Footer;