import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, adminUpdateOrderStatus } from '../../../redux/actions/adminActions';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, CheckCircle2, Truck, Package, Clock, X, ChevronRight, MapPin, User as UserIcon } from 'lucide-react';

const STATUS_CONFIG = {
    processing: { color: 'text-warning bg-warning/10', icon: Clock, label: 'Processing' },
    confirmed: { color: 'text-primary-600 bg-primary-50', icon: CheckCircle2, label: 'Confirmed' },
    shipped: { color: 'text-info bg-info/10', icon: Truck, label: 'Shipped' },
    delivered: { color: 'text-success bg-success/10', icon: Package, label: 'Delivered' },
    canceled: { color: 'text-danger bg-danger/10', icon: X, label: 'Canceled' }
};

function AdminOrderManagment() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.admin);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(getAdminOrders());
    }, [dispatch]);

    const handleStatusUpdate = (orderId, status) => {
        dispatch(adminUpdateOrderStatus(orderId, status));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">Orders</h2>
                    <p className="text-neutral-500 font-medium">Monitor sales and manage order fulfillment</p>
                </div>
                <div className="p-3 bg-neutral-100 rounded-2xl text-neutral-500 font-bold text-xs uppercase tracking-widest">
                    Total: {orders?.length || 0}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-neutral-50/30">
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Order ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Customer</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Total</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="5" className="px-8 py-6"><div className="h-12 bg-neutral-100 rounded-2xl w-full" /></td>
                                    </tr>
                                ))
                            ) : orders && orders.length > 0 ? (
                                orders.map((order, idx) => {
                                    const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.processing;
                                    const StatusIcon = status.icon;

                                    return (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="hover:bg-neutral-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <span className="font-mono text-xs font-bold text-neutral-400">#{order._id.slice(-8).toUpperCase()}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 shrink-0">
                                                        <UserIcon size={16} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-neutral-900 truncate">
                                                            {order.user?.firstName} {order.user?.lastName}
                                                        </h4>
                                                        <p className="text-xs text-neutral-400 font-medium">{order.user?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="font-display font-bold text-neutral-900 text-lg">${order.totalAmount?.toFixed(2)}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full inline-flex ${status.color}`}>
                                                    <StatusIcon size={14} />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">{status.label}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                        className="text-xs font-bold bg-neutral-50 border-none rounded-xl px-3 py-2 cursor-pointer focus:ring-2 focus:ring-primary-500/20"
                                                    >
                                                        {Object.keys(STATUS_CONFIG).map(s => (
                                                            <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="5" className="px-8 py-20 text-center text-neutral-400">No orders yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Detail Side Panel */}
            <AnimatePresence>
                {selectedOrder && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 z-[70] bg-neutral-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                            className="fixed top-0 right-0 z-[80] w-full max-w-xl h-full bg-white shadow-2xl flex flex-col"
                        >
                            <div className="p-8 flex items-center justify-between border-b border-neutral-100">
                                <div>
                                    <h3 className="text-2xl font-display font-bold text-neutral-900">Order Details</h3>
                                    <p className="text-neutral-400 text-sm font-medium">#{selectedOrder._id.toUpperCase()}</p>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-10">
                                {/* Customer & Shipping */}
                                <div className="grid grid-cols-2 gap-8">
                                    <section>
                                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Customer</h4>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-neutral-50 rounded-2xl flex items-center justify-center text-neutral-400">
                                                <UserIcon size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900">{selectedOrder.user?.firstName} {selectedOrder.user?.lastName}</p>
                                                <p className="text-sm text-neutral-500">{selectedOrder.user?.email}</p>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Shipping To</h4>
                                        <div className="flex items-start gap-3">
                                            <MapPin size={20} className="text-neutral-400 mt-0.5" />
                                            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                                                {selectedOrder.shippingDetails?.firstName} {selectedOrder.shippingDetails?.lastName}<br />
                                                {selectedOrder.shippingDetails?.phone}<br />
                                                {selectedOrder.shippingDetails?.location}, {selectedOrder.shippingDetails?.city}
                                            </p>
                                        </div>
                                    </section>
                                </div>

                                {/* Items */}
                                <section>
                                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Ordered Items</h4>
                                    <div className="space-y-4">
                                        {selectedOrder.products?.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 bg-neutral-50 p-3 rounded-2xl border border-neutral-100">
                                                <div className="w-16 h-16 bg-white rounded-xl overflow-hidden border border-neutral-200">
                                                    <img src={item.product?.images?.[0] || '/placeholder.png'} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="font-bold text-neutral-900 text-sm truncate">{item.product?.name}</h5>
                                                    <p className="text-xs text-neutral-400 font-bold tracking-wider uppercase">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right font-display font-bold text-neutral-900">
                                                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="pt-6 border-t border-neutral-100 space-y-2">
                                    <div className="flex justify-between text-neutral-400 font-bold text-xs uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span>${selectedOrder.totalAmount?.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-neutral-900 font-display font-bold text-xl">Total Paid</span>
                                        <span className="text-primary-600 font-display font-bold text-2xl">${selectedOrder.totalAmount?.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-neutral-50 border-t border-neutral-100 grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleStatusUpdate(selectedOrder._id, 'shipped')}
                                    className="btn btn-primary py-4 text-xs tracking-widest uppercase font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center gap-2"
                                >
                                    <Truck size={16} /> Mark Shipped
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedOrder._id, 'delivered')}
                                    className="btn btn-primary py-4 text-xs tracking-widest uppercase font-bold text-white bg-green-600 hover:bg-green-700 rounded-2xl flex items-center justify-center gap-2"
                                >
                                    <CheckCircle2 size={16} /> Mark Delivered
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminOrderManagment;