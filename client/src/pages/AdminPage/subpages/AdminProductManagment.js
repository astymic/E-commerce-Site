import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdminProducts } from '../../../redux/actions/adminActions';
import { motion } from 'framer-motion';
import { Plus, Edit3, Trash2, Package, Search, Filter, MoreVertical, ExternalLink } from 'lucide-react';

function AdminProductManagment() {
    const dispatch = useDispatch();
    const { products: productsData, loading, error } = useSelector(state => state.product);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    const productList = Array.isArray(productsData) ? productsData : productsData?.products || [];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">Products</h2>
                    <p className="text-neutral-500 font-medium">Manage your inventory and product details</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/products/new"
                        className="btn btn-primary shadow-lg shadow-primary-500/20 px-6 py-3 rounded-2xl flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Product
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-premium overflow-hidden">
                <div className="p-6 border-b border-neutral-50 bg-neutral-50/50 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-neutral-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all bg-white"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-3 rounded-xl border border-neutral-200 hover:bg-white hover:shadow-md transition-all text-neutral-600">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-neutral-50/30">
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Product</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Category</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Price</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Stock</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Status</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="6" className="px-8 py-6">
                                            <div className="h-12 bg-neutral-100 rounded-2xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : productList.length > 0 ? (
                                productList.map((product, idx) => (
                                    <motion.tr
                                        key={product._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-neutral-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-16 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-neutral-200">
                                                    <img
                                                        src={product.images?.[0] || '/placeholder.png'}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-neutral-900 truncate">{product.name}</h3>
                                                    <p className="text-xs text-neutral-400 font-medium truncate max-w-[15rem]">{product.shortDescription}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-display font-bold text-neutral-900 text-lg">
                                                ${product.price?.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`} />
                                                <span className="font-bold text-neutral-700">{product.stock}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            {product.stock > 0 ? (
                                                <span className="text-success text-xs font-bold uppercase tracking-wider">In Stock</span>
                                            ) : (
                                                <span className="text-danger text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/admin/products/edit/${product._id}`}
                                                    className="p-2 rounded-lg text-neutral-400 hover:text-primary-600 hover:bg-primary-50 transition-all"
                                                >
                                                    <Edit3 size={18} />
                                                </Link>
                                                <button className="p-2 rounded-lg text-neutral-400 hover:text-danger hover:bg-danger/5 transition-all">
                                                    <Trash2 size={18} />
                                                </button>
                                                <Link
                                                    to={`/product/${product._id}`}
                                                    target="_blank"
                                                    className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
                                                >
                                                    <ExternalLink size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <div className="w-20 h-20 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-200">
                                            <Package size={40} />
                                        </div>
                                        <h4 className="text-neutral-600 font-bold">No products found</h4>
                                        <p className="text-neutral-400 text-sm">Create your first product to get started</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        Showing {productList.length} Products
                    </p>
                    <div className="flex items-center gap-2">
                        {/* Pagination would go here */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProductManagment;