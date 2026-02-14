import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getOrderDetails } from '../../redux/actions/orderActions';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, MapPin, CreditCard, Calendar, ArrowRight, Printer, Share2 } from 'lucide-react';

function OrderSummaryPage() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { order, loading, error } = useSelector(state => state.order);

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId]);

    if (loading || !order) {
        return (
            <div className="pt-40 container text-center">
                <div className="animate-pulse space-y-6 max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-neutral-200 rounded-full mx-auto" />
                    <div className="h-8 bg-neutral-200 rounded-xl w-1/3 mx-auto" />
                    <div className="h-40 bg-neutral-200 rounded-[3rem]" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-40 container text-center">
                <div className="bg-danger/5 p-12 rounded-[3rem] border border-danger/10 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-danger mb-4">Summary Not Found</h2>
                    <p className="text-neutral-500 mb-8">We couldn't retrieve the details for order #{orderId}.</p>
                    <Link to="/" className="btn btn-secondary border-neutral-200 px-8">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-premium border border-neutral-100 overflow-hidden relative"
                >
                    {/* Success Header */}
                    <div className="text-center mb-16 relative z-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12 }}
                            className="w-24 h-24 bg-success-50 text-success-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"
                        >
                            <CheckCircle2 size={48} />
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-neutral-900 mb-4 italic">Congratulations!</h1>
                        <p className="text-neutral-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
                            Your order <span className="text-neutral-900 font-bold">#{order._id.slice(-8).toUpperCase()}</span> has been placed successfully.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
                        {/* Delivery Info */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Package size={14} className="text-primary-600" />
                                <span>Delivery Details</span>
                            </h3>
                            <div className="bg-neutral-50 p-8 rounded-[2.5rem] border border-neutral-100 space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Recipient</p>
                                    <p className="font-bold text-neutral-900">{order.firstName} {order.lastName}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Location</p>
                                    <p className="font-medium text-neutral-600 flex items-start gap-2">
                                        <MapPin size={16} className="shrink-0 mt-1 text-primary-500" />
                                        <span>{order.deliveryCity}, {order.deliveryLocation}</span>
                                    </p>
                                </div>
                                {order.deliveryAddress && (
                                    <p className="text-sm text-neutral-500 italic border-t border-neutral-200/50 pt-4">"{order.deliveryAddress}"</p>
                                )}
                            </div>
                        </div>

                        {/* Payment Info */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <CreditCard size={14} className="text-primary-600" />
                                <span>Payment Summary</span>
                            </h3>
                            <div className="bg-neutral-900 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-neutral-400 text-sm font-medium">Method</span>
                                    <span className="font-bold uppercase tracking-wider text-xs">{order.paymentMethod?.replace(/_/g, ' ')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400 font-medium">Order Date</span>
                                    <span className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="pt-6 border-t border-neutral-800 flex justify-between items-end">
                                    <span className="text-neutral-400 text-sm font-bold uppercase tracking-widest">Total Paid</span>
                                    <span className="text-3xl font-display font-extrabold text-primary-400">${order.totalPrice?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                        <Link to="/" className="btn btn-primary px-10 py-4 group">
                            Continue Shopping
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex gap-2">
                            <button className="btn btn-secondary border-neutral-200 p-4 rounded-2xl hover:bg-neutral-50 transition-colors">
                                <Printer size={20} className="text-neutral-400" />
                            </button>
                            <button className="btn btn-secondary border-neutral-200 p-4 rounded-2xl hover:bg-neutral-50 transition-colors">
                                <Share2 size={20} className="text-neutral-400" />
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                </motion.div>

                <div className="mt-12 text-center text-neutral-400 text-sm font-medium">
                    <p>Having questions? Contact our <Link to="/" className="text-primary-600 font-bold">Support Team</Link></p>
                </div>
            </div>
        </div>
    );
}

export default OrderSummaryPage;