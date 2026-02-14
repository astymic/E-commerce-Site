import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminCategories, adminDeleteCategory, adminCreateCategory, adminUpdateCategory } from '../../../redux/actions/adminActions';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Layers, Search, X, Check, ArrowRight, AlertCircle } from 'lucide-react';

function AdminCategoryManagment() {
    const dispatch = useDispatch();
    const { categories, loading, error: categoryError } = useSelector(state => state.category);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', parentCategory: '' });

    useEffect(() => {
        dispatch(getAdminCategories());
    }, [dispatch]);

    const openModal = (category = null) => {
        if (category) {
            setCurrentCategory(category);
            setFormData({
                name: category.name,
                description: category.description || '',
                parentCategory: category.parent?._id || ''
            });
        } else {
            setCurrentCategory(null);
            setFormData({ name: '', description: '', parentCategory: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentCategory(null);
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (currentCategory) {
            dispatch(adminUpdateCategory(currentCategory._id, formData, () => {
                dispatch(getAdminCategories());
                closeModal();
            }));
        } else {
            dispatch(adminCreateCategory(formData, () => {
                dispatch(getAdminCategories());
                closeModal();
            }));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(adminDeleteCategory(id));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">Categories</h2>
                    <p className="text-neutral-500 font-medium">Organize your products into logical groups</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn btn-primary shadow-lg shadow-primary-500/20 px-6 py-3 rounded-2xl flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-neutral-100 shadow-premium overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-neutral-50/30">
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Category Name</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Slug / URL</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">Parent</th>
                                <th className="px-8 py-5 text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {loading ? (
                                [...Array(4)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan="4" className="px-8 py-6">
                                            <div className="h-10 bg-neutral-100 rounded-xl w-full" />
                                        </td>
                                    </tr>
                                ))
                            ) : categories.length > 0 ? (
                                categories.map((cat, idx) => (
                                    <motion.tr
                                        key={cat._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-neutral-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                                                    <Layers size={18} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-neutral-900 truncate">{cat.name}</h3>
                                                    <p className="text-xs text-neutral-400 font-medium truncate max-w-[15rem]">{cat.description || 'No description'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-neutral-500 font-mono text-xs italic">
                                            /{cat.slug}
                                        </td>
                                        <td className="px-8 py-5">
                                            {cat.parent ? (
                                                <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold">
                                                    {cat.parent.name}
                                                </span>
                                            ) : (
                                                <span className="text-neutral-300 text-xs font-bold italic">Top Level</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center justify-end gap-2 text-neutral-400">
                                                <button
                                                    onClick={() => openModal(cat)}
                                                    className="p-2 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-all"
                                                >
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat._id)}
                                                    className="p-2 rounded-lg hover:text-danger hover:bg-danger/5 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-20 text-center text-neutral-400">
                                        No categories found. Start by adding one.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
                        >
                            <div className="p-8 md:p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-display font-bold text-neutral-900">
                                        {currentCategory ? 'Edit Category' : 'New Category'}
                                    </h3>
                                    <button onClick={closeModal} className="text-neutral-400 hover:text-neutral-900 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                {categoryError && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <p className="text-sm font-medium">{categoryError.msg || 'An error occurred. Please try again.'}</p>
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                            <span>Category Name</span>
                                            <span className="text-primary-500 font-bold">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={onChange}
                                            className="input-field"
                                            required
                                            placeholder="e.g., Home Decor"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Parent Category</label>
                                        <select
                                            name="parentCategory"
                                            value={formData.parentCategory}
                                            onChange={onChange}
                                            className="input-field"
                                        >
                                            <option value="">None (Top Level)</option>
                                            {categories.filter(c => c._id !== currentCategory?._id).map(c => (
                                                <option key={c._id} value={c._id}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={onChange}
                                            className="input-field min-h-[6rem] py-3"
                                            placeholder="Briefly describe this category..."
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="flex-1 py-4 text-sm font-bold text-neutral-500 hover:bg-neutral-50 rounded-2xl transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 btn btn-primary py-4 text-sm shadow-lg shadow-primary-500/20 group"
                                        >
                                            {currentCategory ? 'Update' : 'Create'}
                                            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminCategoryManagment;