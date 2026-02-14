import React from "react";
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

function ProductCard({ product }) {
    if (!product) return null;

    const imageUrl = product.images?.[0] || '/placeholder.png';

    return (
        <Link to={`/product/${product._id}`}>
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-neutral-100 shadow-premium hover:shadow-2xl transition-all duration-500 block h-full"
            >
                {/* Image Section */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top Right Actions */}
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-neutral-400 flex items-center justify-center shadow-lg hover:text-accent-500 hover:bg-white transition-all active:scale-95 group/heart"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Wishlist logic
                            }}
                        >
                            <div className="relative">
                                <Heart size={20} className="group-hover/heart:scale-110 transition-transform" />
                            </div>
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.discountPrice && (
                            <span className="bg-accent-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-accent-600/20">
                                Sale
                            </span>
                        )}
                        {product.isNew && (
                            <span className="bg-primary-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-primary-600/20">
                                New
                            </span>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <div className="flex flex-col gap-1 mb-3">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                            {product.category?.name || "Premium Collection"}
                        </p>
                        <h4 className="text-xl font-display font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                            {product.name}
                        </h4>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                            {product.discountPrice ? (
                                <>
                                    <span className="text-2xl font-bold text-primary-600">${product.discountPrice.toFixed(2)}</span>
                                    <span className="text-sm text-neutral-400 line-through font-medium">${product.price.toFixed(2)}</span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default ProductCard;