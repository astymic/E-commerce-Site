import React from "react";
import { Link } from 'react-router-dom';
import { Plus } from "lucide-react";
import { Button } from "../ui/Button";


function ProductCard({ product }) {
    if (!product) return null;

    const imageUrl = product.images?.[0] || '/placeholder.png';

    return (
        <Link 
            to={`/product/${product._id}`}
            className="group relative block overflow-hidden rounder-lg bg-white border border-neutral-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        >
            {/* Image Section */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full bg-neutral-100 overflow-hidden">
                <img   
                    src={imageUrl}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover pbject-center transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Discount Badge */}
                {product.discountPrice && (
                    <div className="absolute top-2 right-2 rounded-full bg-danger px-2 py-1 text-xs font-bold text-white shadow-sm">
                        Sale
                    </div> 
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-2">
                <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                    {product.name}
                </h4>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.discountPrice ? (
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-neutral-900">${product.discountPrice.toFixed(2)}</span>
                                <span className="text-xs text-neutral-400 line-through">${product.price.toFixed(2)}</span>
                            </div>
                        ) : (
                            <span className="font-bold text-neutral-900">${product.price.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <div className="opacity-0 transiton-opacity group-hover:opacity-100">
                        <div className="h-8 w-8 flex item-center justify-center rounded-full bg-primary-50 pl-0.5 text-primary-600">
                            <Plus size={18} strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;