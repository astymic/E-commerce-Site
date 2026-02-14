import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartPreview from './CartPreview';

function Header() {
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const cartRef = useRef(null);
    const cartButtonRef = useRef(null);

    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items: cartItems } = useSelector(state => state.cart);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isCartVisible &&
                cartRef.current &&
                !cartRef.current.contains(event.target) &&
                cartButtonRef.current &&
                !cartButtonRef.current.contains(event.target)) {
                setIsCartVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCartVisible]);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleCartPreview = () => setIsCartVisible(!isCartVisible);
    const isHomePage = location.pathname === '/';

    return (
        <header
            className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isScrolled
                ? 'top-4 mx-4 md:mx-8 px-2 py-2 glass rounded-full shadow-2xl border border-white/20'
                : 'top-0 py-6 bg-transparent'
                }`}
        >
            {/* Conditional Backlight for Home Page Top State */}
            {isHomePage && !isScrolled && (
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.2)_0%,transparent_80%)] opacity-100" />
            )}

            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                        <ShoppingCart size={22} strokeWidth={2.5} />
                    </div>
                    <span className={`text-2xl font-display font-black tracking-tight hidden sm:block ${isHomePage && !isScrolled ? 'text-white' : 'text-neutral-900'}`}>
                        Luxe<span className="text-primary-600">Store</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-10">
                    {['Shop', 'Categories', 'Featured', 'About'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className={`text-sm font-bold transition-all relative group ${isHomePage && !isScrolled ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:text-primary-600'}`}
                        >
                            {item}
                            <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full" />
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button className={`p-2.5 rounded-full transition-all md:block hidden shadow-sm border border-transparent ${isHomePage && !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-neutral-600 hover:text-primary-600 hover:bg-white hover:border-neutral-100'}`}>
                        <Search size={20} />
                    </button>

                    <Link
                        to={isAuthenticated ? "/profile" : "/login"}
                        className={`flex items-center space-x-2 p-1.5 pr-4 rounded-full transition-all shadow-sm border border-transparent group ${isHomePage && !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-neutral-600 hover:text-primary-600 hover:bg-white hover:border-neutral-100'}`}
                    >
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isHomePage && !isScrolled ? 'bg-white/10 text-white group-hover:bg-white/20' : 'bg-neutral-100 text-neutral-600 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
                            <User size={18} />
                        </div>
                        {isAuthenticated && user && (
                            <span className={`text-sm font-bold hidden lg:block ${isHomePage && !isScrolled ? 'text-white' : 'text-neutral-800'}`}>Hi, {user.firstName}</span>
                        )}
                    </Link>

                    <div className="relative">
                        <button
                            ref={cartButtonRef}
                            className={`p-2.5 rounded-full transition-all relative shadow-sm border border-transparent ${isHomePage && !isScrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-neutral-600 hover:text-primary-600 hover:bg-white hover:border-neutral-100'}`}
                            onClick={toggleCartPreview}
                        >
                            <ShoppingCart size={20} />
                            {cartItems.reduce((total, item) => total + item.quantity, 0) > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                                >
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </motion.span>
                            )}
                        </button>
                        <AnimatePresence>
                            {isCartVisible && (
                                <div ref={cartRef}>
                                    <CartPreview onClose={() => setIsCartVisible(false)} />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        className={`p-2.5 md:hidden rounded-full transition-all shadow-sm ${isHomePage && !isScrolled ? 'bg-white/10 text-white' : 'bg-white text-neutral-600 hover:text-primary-600'}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 glass border border-neutral-200/50 shadow-2xl rounded-[2rem] py-8 px-6 z-[-1]"
                    >
                        <div className="flex flex-col space-y-6">
                            {['Shop', 'Categories', 'Featured', 'About'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className="text-xl font-bold text-neutral-800 hover:text-primary-600 transition-colors px-4 py-2"
                                >
                                    {item}
                                </Link>
                            ))}
                            <hr className="border-neutral-100" />
                            <Link to="/login" className="btn btn-primary w-full py-4 text-lg">
                                Sign In
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;