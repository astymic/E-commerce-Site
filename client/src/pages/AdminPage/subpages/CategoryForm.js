import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Layers, ArrowLeft, AlertCircle, ArrowRight } from 'lucide-react';

import { adminCreateCategory, adminUpdateCategory } from '../../../redux/actions/adminActions';
import { getCategory, clearCategoryState, getCategories } from '../../../redux/actions/categoryActions';


function CategoryForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { category, categories, loading, error } = useSelector(state => state.category);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentCategory: ''
    });

    const isEditing = !!id;

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }
        if (isEditing) {
            dispatch(getCategory(id));
        }
        return () => {
            dispatch(clearCategoryState());
        }
    }, [dispatch, id, isEditing, categories.length]);

    useEffect(() => {
        if (isEditing && category && category._id === id) {
            setFormData({
                name: category.name || '',
                description: category.description || '',
                parentCategory: category.parent?._id || ''
            });
        }
    }, [category, isEditing, id]);

    const onChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = e => {
        e.preventDefault();
        if (isEditing) {
            dispatch(adminUpdateCategory(id, formData, navigate));
        } else {
            dispatch(adminCreateCategory(formData, navigate));
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
                <Link
                    to="/admin/categories"
                    className="p-3 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:bg-neutral-50 transition-all text-neutral-400 hover:text-neutral-900"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-3xl font-display font-bold text-neutral-900">
                        {isEditing ? 'Edit Category' : 'New Category'}
                    </h2>
                    <p className="text-neutral-500 font-medium">Define how products are grouped in your store</p>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4 text-red-600 shadow-sm"
                >
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-1">Validation Error</h4>
                        <p className="text-sm font-medium opacity-90">{error.msg || 'Please check your inputs.'}</p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={onSubmit} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-neutral-100 space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <Layers size={20} className="text-primary-600" />
                        <h3 className="font-bold text-neutral-900">Basic Information</h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                            <span>Category Name</span>
                            <span className="text-primary-500 font-bold">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            className="input-field"
                            required
                            placeholder="e.g., Seasonal Accessories"
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
                            <option value="">No Parent (Top Level)</option>
                            {categories
                                .filter(cat => cat._id !== id)
                                .map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            className="input-field min-h-[8rem] py-4"
                            placeholder="Describe what kind of products go into this category..."
                        />
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/categories')}
                        className="px-8 py-4 rounded-2xl text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-all"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary px-10 py-4 text-sm shadow-xl shadow-primary-500/20 group"
                    >
                        {loading ? 'Processing...' : isEditing ? 'Update Category' : 'Create Category'}
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;