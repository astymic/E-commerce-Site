import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../redux/actions/orderActions';
import { motion } from 'framer-motion';
import { Package, ExternalLink, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

function OrderHistoryPage() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.order);
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserOrders());
        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white animate-pulse rounded-[2.5rem]" />)}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-display font-extrabold text-neutral-900 italic mb-2">Order History</h2>
                <p className="text-sm text-neutral-400 font-medium">Keep track of your luxury investments</p>
            </div>

            {error && (
                <div className="p-6 bg-danger/5 border border-danger/10 rounded-3xl text-danger text-sm font-bold">
                    Error loading orders: {error.msg || 'Could not fetch orders'}
                </div>
            )}

            {!loading && !error && orders?.length === 0 && (
                <div className="bg-white p-20 rounded-[3rem] shadow-premium text-center border border-neutral-100">
                    <Package size={48} className="text-neutral-100 mx-auto mb-6" />
                    <p className="text-neutral-400 font-medium italic">You have not placed any orders yet.</p>
                </div>
            )}

            <div className="space-y-4">
                {orders?.map((order, idx) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-neutral-50 hover:border-primary-100 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-primary-600">
                                <Package size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    Order #{order._id.slice(-8).toUpperCase()}
                                </h4>
                                <div className="flex items-center gap-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={12} />
                                        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle2 size={12} className="text-success-500" />
                                        <span className="text-success-600">{order.status || 'Processed'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0">
                            <div>
                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">Total</p>
                                <p className="text-2xl font-display font-extrabold text-neutral-900">${order.totalAmount?.toFixed(2)}</p>
                            </div>
                            <Link
                                to={`/order-summary/${order._id}`}
                                className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-300 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shrink-0"
                            >
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default OrderHistoryPage;