import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProduct, clearProductState } from "../../../redux/actions/productActions";
import { adminCreateProduct, adminUpdateProduct, adminUploadImages } from "../../../redux/actions/adminActions";
import { getCategories } from "../../../redux/actions/categoryActions";

import resolveImageUrl from "../../../utils/resolveImageUrl";
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    ArrowLeft,
    Image as ImageIcon,
    X,
    Plus,
    Check,
    AlertCircle,
    CloudUpload,
    ArrowRight
} from 'lucide-react';


function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    const { product, loading, error: productError } = useSelector(state => state.product);
    const { categories } = useSelector(state => state.category);
    const { imagePaths, imageLoading, error: adminError } = useSelector(state => state.admin);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        shortDescription: '',
        price: '',
        discountPrice: '',
        category: '',
        stock: '',
        isPromotion: false,
        isNew: true,
        isTopSelling: false,
    });

    const [images, setImages] = useState([]);
    const isEditing = !!id;

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories());
        }
        if (isEditing) {
            dispatch(getProduct(id));
        }
        return () => {
            dispatch(clearProductState());
        }
    }, [dispatch, id, isEditing, categories.length]);

    useEffect(() => {
        if (isEditing && product && product._id === id) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                shortDescription: product.shortDescription || '',
                price: product.price || '',
                discountPrice: product.discountPrice || '',
                category: product.category?._id || '',
                stock: product.stock || '',
                isPromotion: product.isPromotion || false,
                isNew: product.isNew !== undefined ? product.isNew : false,
                isTopSelling: product.isTopSelling || false,
            });
            setImages(product.images || []);
        }
    }, [product, isEditing, id]);

    useEffect(() => {
        if (imagePaths && imagePaths.length > 0) {
            setImages(prev => [...prev, ...imagePaths]);
        }
    }, [imagePaths]);


    const onFilesChange = e => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const uploadData = new FormData();
            files.forEach(file => {
                uploadData.append('productImages', file);
            });
            dispatch(adminUploadImages(uploadData));
        }
    };

    const removeImage = (imgPath) => {
        setImages(images.filter(img => img !== imgPath));
    };

    const onChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        const finalProductData = {
            ...formData,
            images: images
        };

        if (isEditing) {
            dispatch(adminUpdateProduct(id, finalProductData, navigate));
        } else {
            dispatch(adminCreateProduct(finalProductData, navigate));
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="p-3 rounded-2xl bg-white border border-neutral-100 shadow-md hover:bg-neutral-50 transition-all text-neutral-400 hover:text-neutral-900"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">
                            {isEditing ? 'Edit Product' : 'Create Product'}
                        </h2>
                        <p className="text-neutral-500 font-medium">
                            {isEditing ? 'Update the details of your inventory item' : 'Fill in the information to list a new product'}
                        </p>
                    </div>
                </div>
            </div>

            {(productError || adminError) && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-start gap-4 text-red-600 shadow-sm"
                >
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-1">Action Required</h4>
                        <p className="text-sm font-medium opacity-90">
                            {productError?.msg || adminError?.msg || 'Something went wrong while processing your request. Please check your data and try again.'}
                        </p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={onSubmit} className="space-y-12">
                {/* Images Section */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-neutral-100">
                    <div className="flex items-center gap-3 mb-8">
                        <ImageIcon size={24} className="text-primary-600" />
                        <h3 className="text-xl font-display font-bold">Product Visuals</h3>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <AnimatePresence>
                                {images.map((img, index) => (
                                    <motion.div
                                        key={img}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="w-32 h-32 md:w-40 md:h-40 bg-neutral-100 rounded-3xl overflow-hidden relative group border border-neutral-200"
                                    >
                                        <img src={resolveImageUrl(img)} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(img)}
                                            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-danger opacity-0 group-hover:opacity-100 shadow-lg transition-all active:scale-90"
                                        >
                                            <X size={16} strokeWidth={3} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={imageLoading}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-2 border-dashed border-neutral-200 flex flex-col items-center justify-center gap-3 text-neutral-400 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50/50 transition-all group overflow-hidden"
                            >
                                {imageLoading ? (
                                    <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center group-hover:bg-primary-100/50 transition-colors">
                                            <CloudUpload size={24} className="group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Images</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFilesChange}
                        multiple
                        hidden
                        accept="image/*"
                    />
                    <p className="text-center text-xs text-neutral-400 font-medium">
                        Drag and drop or click to upload multiple high-quality product images (Max 10)
                    </p>
                </div>

                {/* Info Section */}
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-neutral-100">
                    <div className="flex items-center gap-3 mb-10">
                        <Package size={24} className="text-primary-600" />
                        <h3 className="text-xl font-display font-bold">General Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Product Name</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                className="input-field"
                                required
                                placeholder="e.g., Slim-Fit Cotton Blazer"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Category</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={onChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Inventory Stock</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={onChange}
                                className="input-field"
                                required
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Base Price ($)</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={onChange}
                                className="input-field"
                                required
                                step="0.01"
                                placeholder="99.99"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Discount Price ($)</label>
                            <input
                                type="number"
                                name="discountPrice"
                                value={formData.discountPrice}
                                onChange={onChange}
                                className="input-field border-success/20 focus:border-success"
                                step="0.01"
                                placeholder="Optional"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Short Tagline</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <input
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={onChange}
                                className="input-field"
                                required
                                placeholder="Catchy one-liner for search results"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1 flex justify-between">
                                <span>Full Description</span>
                                <span className="text-primary-500 font-bold">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={onChange}
                                className="input-field min-h-[12rem] py-4"
                                required
                                placeholder="Detailed story about the product..."
                            />
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-neutral-100 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 cursor-pointer hover:bg-white hover:border-primary-500 transition-all">
                            <input type="checkbox" name="isNew" checked={formData.isNew} onChange={onChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm font-bold text-neutral-700">New Arrival</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 cursor-pointer hover:bg-white hover:border-primary-500 transition-all">
                            <input type="checkbox" name="isTopSelling" checked={formData.isTopSelling} onChange={onChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm font-bold text-neutral-700">Top Selling</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 cursor-pointer hover:bg-white hover:border-primary-500 transition-all">
                            <input type="checkbox" name="isPromotion" checked={formData.isPromotion} onChange={onChange} className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
                            <span className="text-sm font-bold text-neutral-700">On Promotion</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-12">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-8 py-4 rounded-3xl text-sm font-bold text-neutral-500 hover:text-neutral-900 transition-all"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="submit"
                        disabled={loading || imageLoading}
                        className="btn btn-primary px-10 py-4 text-sm shadow-xl shadow-primary-500/20 group"
                    >
                        {loading ? 'Processing...' : isEditing ? 'Update Records' : 'Publish Product'}
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;