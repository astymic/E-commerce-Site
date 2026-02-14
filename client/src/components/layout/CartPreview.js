import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCartItemQuantity, removeItemFromCart } from '../../redux/actions/cartActions';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';

function CartPreview({ onClose }) {
    const dispatch = useDispatch();
    const { items: cartItems, loading } = useSelector(state => state.cart);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const product = item.product;
            if (!product) return total;
            const itemPrice = (product.discountPrice && product.discountPrice < product.price)
                ? product.discountPrice
                : product.price;
            return total + itemPrice * item.quantity;
        }, 0).toFixed(2);
    }

    const handleQuantityChange = (e, productId, newQuantity) => {
        e.stopPropagation();
        if (!productId) return;
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity(productId, newQuantity));
        } else if (newQuantity === 0) {
            dispatch(removeItemFromCart(productId));
        }
    };

    const handleRemoveItem = (e, productId) => {
        e.stopPropagation();
        if (!productId) return;
        dispatch(removeItemFromCart(productId));
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
                backgroundColor: 'rgb(var(--cart-bg))',
                color: 'rgb(var(--cart-text))',
                borderColor: 'rgb(var(--cart-border) / 0.5)'
            }}
            className="absolute top-full right-0 mt-4 w-[24rem] backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border overflow-hidden z-[100]"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <ShoppingBag size={20} className="text-primary-600" />
                        <h3 className="text-lg font-display font-bold">Your Bag</h3>
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"
                            />
                        )}
                    </div>
                    <span className="text-xs font-bold opacity-60 bg-neutral-500/10 px-3 py-1 rounded-full border border-neutral-500/10">
                        {calculateTotalItems()} {calculateTotalItems() === 1 ? 'Item' : 'Items'}
                    </span>
                </div>

                {cartItems.length === 0 && !loading ? (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-neutral-500/5 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                            <ShoppingBag size={32} />
                        </div>
                        <p className="opacity-60 font-medium italic">Your bag is currently empty</p>
                        <Link
                            to="/shop"
                            onClick={onClose}
                            className="mt-6 btn btn-primary px-8 py-3 rounded-2xl text-xs shadow-lg shadow-primary-500/20"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={`max-h-[26rem] overflow-y-auto pr-2 space-y-6 custom-scrollbar transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
                            {cartItems.map((item, idx) => {
                                const hasDiscount = item.product?.discountPrice && item.product.discountPrice < item.product.price;
                                return (
                                    <motion.div
                                        key={item.product?._id || idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex gap-4 group relative"
                                    >
                                        <div className="w-20 h-24 bg-neutral-500/5 rounded-2xl overflow-hidden shrink-0 border border-neutral-500/10">
                                            <img
                                                src={item.product && item.product.images ? item.product.images[0] : '/placeholder.png'}
                                                alt={item.product?.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 py-1">
                                            <h4 className="text-sm font-bold truncate mb-1">
                                                {item.product?.name || 'Unknown Product'}
                                            </h4>
                                            <div className="flex items-center gap-2 mb-3">
                                                {hasDiscount ? (
                                                    <>
                                                        <span className="text-primary-600 font-bold text-sm">
                                                            ${item.product.discountPrice.toFixed(2)}
                                                        </span>
                                                        <span className="text-xs opacity-40 line-through">
                                                            ${item.product.price.toFixed(2)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-primary-600 font-bold text-sm">
                                                        ${item.product?.price?.toFixed(2) || '0.00'}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center bg-neutral-500/5 rounded-full p-1 border border-neutral-500/10">
                                                    <button
                                                        onClick={(e) => handleQuantityChange(e, item.product?._id, item.quantity - 1)}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-neutral-500/10 transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Minus size={12} strokeWidth={3} />
                                                    </button>
                                                    <span className="text-xs font-extrabold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={(e) => handleQuantityChange(e, item.product?._id, item.quantity + 1)}
                                                        className="w-6 h-6 rounded-full flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-neutral-500/10 transition-all shadow-sm active:scale-90"
                                                    >
                                                        <Plus size={12} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleRemoveItem(e, item.product?._id)}
                                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500/10 shadow-lg rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-all border border-red-500/20"
                                        >
                                            <X size={12} strokeWidth={3} />
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-6 border-t border-neutral-500/10 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold opacity-40 uppercase tracking-widest">Subtotal</span>
                                <span className="text-2xl font-display font-extrabold">${calculateTotal()}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    to="/cart"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 py-4 rounded-3xl text-sm font-bold opacity-60 bg-neutral-500/5 hover:bg-neutral-500/10 transition-all active:scale-95"
                                >
                                    View Bag
                                </Link>
                                <Link
                                    to="/checkout"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 py-4 rounded-3xl text-sm font-bold text-white bg-primary-600 shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all active:scale-95"
                                >
                                    Checkout
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
    );
}

export default CartPreview;