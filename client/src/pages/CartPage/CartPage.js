import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, updateCartItemQuantity, removeItemFromCart } from '../../redux/actions/cartActions';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ChevronLeft } from 'lucide-react';

function CartPage() {
    const dispatch = useDispatch();
    const { items: cartItems, loading, error } = useSelector(state => state.cart);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated && cartItems.length === 0) {
            dispatch(getCart());
        }
    }, [dispatch, isAuthenticated, cartItems.length]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = item.product;
            if (!product) return total;
            const itemPrice = (product.discountPrice && product.discountPrice < product.price)
                ? product.discountPrice
                : product.price;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2);
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
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

    if (!isAuthenticated && !loading) {
        return (
            <div className="pt-40 pb-20 container text-center">
                <div className="bg-white p-12 rounded-[3rem] shadow-premium border border-neutral-100 max-w-md mx-auto">
                    <ShoppingBag size={48} className="text-neutral-300 mx-auto mb-6" />
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">Your cart awaits</h2>
                    <p className="text-neutral-500 mb-8">Please sign in to view your selection and proceed to checkout.</p>
                    <Link to="/login" className="btn btn-primary w-full py-4 shadow-xl shadow-primary-500/20">Sign In to Cart</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-display font-extrabold text-neutral-900 mb-2 italic">Shopping Bag</h1>
                            <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">{calculateTotalItems()} {calculateTotalItems() === 1 ? 'Item' : 'Items'} Selected</p>
                        </div>
                        {loading && cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"
                            />
                        )}
                    </div>
                    <Link to="/" className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                        <ChevronLeft size={18} />
                        <span>Continue Shopping</span>
                    </Link>
                </div>

                {loading && cartItems.length === 0 ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white animate-pulse rounded-3xl" />)}
                    </div>
                ) : cartItems.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-20 rounded-[3rem] shadow-premium border border-neutral-100 text-center"
                    >
                        <ShoppingBag size={64} className="text-neutral-100 mx-auto mb-8" />
                        <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4">Your bag is empty</h2>
                        <p className="text-neutral-400 mb-10 max-w-xs mx-auto font-medium">Looks like you haven't added anything to your collection yet.</p>
                        <Link to="/" className="btn btn-primary px-12 py-4">Explore Collection</Link>
                    </motion.div>
                ) : (
                    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12 transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                        {/* Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence mode="popLayout">
                                {cartItems.map((item, idx) => {
                                    const hasDiscount = item.product?.discountPrice && item.product.discountPrice < item.product.price;
                                    const itemPrice = hasDiscount ? item.product.discountPrice : item.product?.price;

                                    return (
                                        <motion.div
                                            key={item.product?._id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-white p-6 rounded-[2.5rem] shadow-premium border border-neutral-100 flex flex-col sm:flex-row items-center gap-6 group hover:border-primary-100 transition-colors"
                                        >
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-neutral-50 rounded-2xl overflow-hidden shrink-0">
                                                <img
                                                    src={item.product?.images?.[0] || '/placeholder.png'}
                                                    alt={item.product?.name}
                                                    className="w-full h-full object-cover p-2"
                                                />
                                            </div>

                                            <div className="flex-1 text-center sm:text-left">
                                                <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mb-1">
                                                    {item.product?.category?.name || 'Exclusive Asset'}
                                                </p>
                                                <Link to={`/product/${item.product?._id}`} className="text-xl font-display font-bold text-neutral-900 hover:text-primary-600 transition-colors line-clamp-1">
                                                    {item.product?.name}
                                                </Link>
                                                <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                                    {hasDiscount ? (
                                                        <>
                                                            <span className="text-sm font-bold text-primary-600">${item.product.discountPrice.toFixed(2)}</span>
                                                            <span className="text-xs font-medium text-neutral-400 line-through">${item.product.price.toFixed(2)}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-sm font-medium text-neutral-400">${item.product?.price?.toFixed(2)} / unit</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center sm:items-end gap-4">
                                                <div className="flex items-center bg-neutral-50 rounded-full border border-neutral-100 p-1">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:bg-white rounded-full transition-all"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-10 text-center font-display font-bold text-neutral-900">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-primary-600 hover:bg-white rounded-full transition-all"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xl font-bold text-neutral-900">${(itemPrice * item.quantity).toFixed(2)}</span>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.product?._id)}
                                                        className="p-2 text-neutral-300 hover:text-danger hover:bg-danger/5 rounded-full transition-all"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* Summary Column */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-neutral-900 text-white rounded-[3rem] p-10 shadow-2xl sticky top-32 border border-neutral-800"
                            >
                                <h2 className="text-2xl font-display font-bold mb-8 italic">Order Summary</h2>

                                <div className="space-y-6 mb-10 pb-8 border-b border-neutral-800">
                                    <div className="flex justify-between items-center text-neutral-400 font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-white">${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-neutral-400 font-medium">
                                        <span>Estimated Shipping</span>
                                        <span className="text-success-400">Calculated later</span>
                                    </div>
                                    <div className="flex justify-between items-center text-neutral-400 font-medium">
                                        <span>Taxes</span>
                                        <span className="text-white">Included</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mb-10">
                                    <span className="text-lg font-bold">Total Payable</span>
                                    <span className="text-3xl font-display font-extrabold text-primary-400">${calculateTotal()}</span>
                                </div>

                                <Link to="/checkout" className="btn btn-primary w-full py-5 text-lg group flex items-center justify-center">
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest text-center mt-6">
                                    Secure checkout powered by E-Shop
                                </p>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;