import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { placeOrder, clearOrderState } from '../../redux/actions/orderActions';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Store, Home, CreditCard, Wallet, Banknote, ShieldCheck, ChevronLeft, MapPin, Phone, User, MessageCircle, AlertCircle } from 'lucide-react';

function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: cartItems, loading: cartLoading } = useSelector(state => state.cart);
    const { user, isAuthenticated, loading: authLoading } = useSelector(state => state.auth);
    const { order: placedOrder, loading: orderLoading, error: orderError } = useSelector(state => state.order);

    const [formData, setformData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        deliveryType: '',
        deliveryCity: '',
        deliveryLocation: '',
        deliveryAddress: '',
        paymentMethod: '',
        doNotCall: false,
        deliveryToAnotherPerson: false,
        recipientFirstName: '',
        recipientLastName: '',
        notes: ''
    });

    const [paymentEnabled, setPaymentEnabled] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (isAuthenticated && user) {
            setformData(prevData => ({
                ...prevData,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
            }));
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        setFormError(orderError ? (orderError.msg || 'Order placement failed') : null);
    }, [orderError]);

    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setformData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'deliveryType') {
            setPaymentEnabled(!!value);
            setformData(prevData => ({ ...prevData, paymentMethod: '' }));
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        setFormError(null);
        dispatch(placeOrder(formData));
    };

    useEffect(() => {
        if (placedOrder && placedOrder._id) {
            navigate(`/order-summary/${placedOrder._id}`);
        }
    }, [placedOrder, navigate]);

    useEffect(() => {
        return () => {
            dispatch(clearOrderState());
        };
    }, [dispatch]);

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

    if (!authLoading && !isAuthenticated) return <Navigate to="/login" />;

    if (!cartLoading && cartItems.length === 0 && !orderLoading && !placedOrder) {
        return (
            <div className="pt-40 container text-center">
                <div className="bg-white p-12 rounded-[3rem] shadow-premium max-w-md mx-auto">
                    <h2 className="text-2xl font-display font-bold mb-4">Your bag is empty</h2>
                    <Link to="/" className="btn btn-primary px-8">Return to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left: Checkout Form */}
                    <div className="flex-1 space-y-8">
                        <div className="mb-4">
                            <Link to="/cart" className="flex items-center gap-2 text-sm font-bold text-neutral-400 hover:text-primary-600 transition-colors">
                                <ChevronLeft size={16} />
                                <span>Return to Bag</span>
                            </Link>
                            <h1 className="text-4xl font-display font-extrabold text-neutral-900 mt-4 leading-tight">Checkout</h1>
                        </div>

                        {formError && (
                            <div className="bg-danger/10 text-danger p-6 rounded-3xl border border-danger/20 flex items-start gap-3">
                                <AlertCircle size={20} className="shrink-0" />
                                <div className="text-sm font-bold">Error: {formError}</div>
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-8">
                            {/* Step 1: Identity */}
                            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-neutral-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold">1</div>
                                    <h2 className="text-2xl font-display font-bold">Personal Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">First Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                            <input type="text" name="firstName" value={formData.firstName} onChange={onChange} className="input-field pl-12" required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={onChange} className="input-field" required />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                            <input type="text" name="phone" value={formData.phone} onChange={onChange} className="input-field pl-12" required />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Step 2: Delivery */}
                            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-neutral-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold">2</div>
                                    <h2 className="text-2xl font-display font-bold">Delivery Method</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    {[
                                        { id: 'store', icon: Store, label: 'Store Pickup' },
                                        { id: 'post', icon: Truck, label: 'Postal Office' },
                                        { id: 'address', icon: Home, label: 'To Address' }
                                    ].map(method => (
                                        <label
                                            key={method.id}
                                            className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.deliveryType === method.id
                                                ? 'bg-primary-50 border-primary-600 text-primary-600'
                                                : 'bg-neutral-50 border-neutral-100 text-neutral-400 hover:border-primary-200'
                                                }`}
                                        >
                                            <input type="radio" name="deliveryType" value={method.id} checked={formData.deliveryType === method.id} onChange={onChange} className="hidden" required />
                                            <method.icon size={28} />
                                            <span className="text-sm font-bold uppercase tracking-widest">{method.label}</span>
                                        </label>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {formData.deliveryType && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-6 pt-4 border-t border-neutral-100"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">City</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                                                    <input type="text" name="deliveryCity" value={formData.deliveryCity} onChange={onChange} className="input-field pl-12" required />
                                                </div>
                                            </div>

                                            {formData.deliveryType === 'store' && (
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Select Store</label>
                                                    <select name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} className="input-field appearance-none" required>
                                                        <option value="">Choose a location...</option>
                                                        <option value="main-square">Main Square Premium Outlet</option>
                                                        <option value="tech-hub">Tech Hub Experience Center</option>
                                                    </select>
                                                </div>
                                            )}

                                            {formData.deliveryType === 'post' && (
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Pickup Point</label>
                                                    <input type="text" name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} placeholder="Enter Postal Point ID or Address" className="input-field" required />
                                                </div>
                                            )}

                                            {formData.deliveryType === 'address' && (
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Address Line 1</label>
                                                        <input type="text" name="deliveryLocation" value={formData.deliveryLocation} onChange={onChange} placeholder="Street, building, apartment" className="input-field" required />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Delivery Notes</label>
                                                        <input type="text" name="deliveryAddress" value={formData.deliveryAddress} onChange={onChange} placeholder="Gate code, floor, etc." className="input-field" />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>

                            {/* Step 3: Payment */}
                            <section className={`bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-neutral-100 transition-opacity ${!paymentEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold">3</div>
                                    <h2 className="text-2xl font-display font-bold">Payment Method</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {(formData.deliveryType === 'store' || formData.deliveryType === 'post') && (
                                        <label className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'cash_on_delivery'
                                            ? 'bg-neutral-900 border-neutral-900 text-white'
                                            : 'bg-neutral-50 border-neutral-100 text-neutral-500 hover:border-neutral-200'
                                            }`}>
                                            <input type="radio" name="paymentMethod" value="cash_on_delivery" checked={formData.paymentMethod === 'cash_on_delivery'} onChange={onChange} className="hidden" required />
                                            <Banknote size={24} />
                                            <span className="font-bold">Pay on Pickup</span>
                                        </label>
                                    )}
                                    <label className={`flex items-center gap-4 p-6 rounded-3xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'prepaid'
                                        ? 'bg-neutral-900 border-neutral-900 text-white'
                                        : 'bg-neutral-50 border-neutral-100 text-neutral-500 hover:border-neutral-200'
                                        }`}>
                                        <input type="radio" name="paymentMethod" value="prepaid" checked={formData.paymentMethod === 'prepaid'} onChange={onChange} className="hidden" required />
                                        <CreditCard size={24} />
                                        <span className="font-bold">Credit Card / Apple Pay</span>
                                    </label>
                                </div>
                            </section>

                            {/* Step 4: Final Options */}
                            <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-neutral-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold">4</div>
                                    <h2 className="text-2xl font-display font-bold">Extra Options</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4 p-6 bg-neutral-50 rounded-3xl border border-neutral-100">
                                        <div className="flex-1 space-y-4">
                                            <label className="flex items-center text-sm font-bold text-neutral-700 cursor-pointer group">
                                                <input type="checkbox" name="doNotCall" checked={formData.doNotCall} onChange={onChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 mr-3" />
                                                Do not call for confirmation
                                            </label>
                                            <label className="flex items-center text-sm font-bold text-neutral-700 cursor-pointer group">
                                                <input type="checkbox" name="deliveryToAnotherPerson" checked={formData.deliveryToAnotherPerson} onChange={onChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 mr-3" />
                                                Gift delivery (Send to another person)
                                            </label>
                                        </div>
                                    </div>

                                    {formData.deliveryToAnotherPerson && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-4 p-6 bg-primary-50 rounded-3xl border border-primary-100">
                                            <input type="text" name="recipientFirstName" placeholder="Recipient First Name" value={formData.recipientFirstName} onChange={onChange} className="input-field bg-white" required />
                                            <input type="text" name="recipientLastName" placeholder="Recipient Last Name" value={formData.recipientLastName} onChange={onChange} className="input-field bg-white" required />
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">
                                            <MessageCircle size={14} />
                                            <span>Order Notes (Optional)</span>
                                        </div>
                                        <textarea name="notes" value={formData.notes} onChange={onChange} placeholder="Any special instructions for us?" className="input-field min-h-[100px] py-4 resize-none"></textarea>
                                    </div>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Right: Order Summary Sticky Card */}
                    <div className="lg:w-96 shrink-0">
                        <div className="sticky top-32 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-neutral-900 text-white rounded-[3rem] p-10 shadow-2xl border border-neutral-800"
                            >
                                <h2 className="text-2xl font-display font-bold mb-8 italic">Final Summary</h2>

                                <div className="space-y-6 mb-10 pb-8 border-b border-neutral-800">
                                    <div className="flex justify-between items-center text-sm font-medium text-neutral-400">
                                        <span>Total Items</span>
                                        <span className="text-white bg-neutral-800 px-3 py-1 rounded-full">{calculateTotalItems()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium text-neutral-400">
                                        <span>Estimated Total</span>
                                        <span className="text-primary-400 text-2xl font-display font-extrabold">${calculateTotal()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    disabled={!formData.paymentMethod || cartLoading || authLoading || orderLoading}
                                    className="btn btn-primary w-full py-5 text-lg shadow-xl shadow-primary-500/20 disabled:opacity-50 disabled:shadow-none transition-all"
                                >
                                    {orderLoading ? 'Finalizing...' : 'Complete Purchase'}
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-2 text-neutral-500">
                                    <ShieldCheck size={18} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Bank Level Security</span>
                                </div>
                            </motion.div>

                            <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex items-start gap-4">
                                <AlertCircle size={20} className="text-primary-600 shrink-0 mt-1" />
                                <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                                    By completing your purchase, you agree to our terms of service. You will receive an email confirmation shortly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;