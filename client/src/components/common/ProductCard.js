import React from "react";
import { Link } from 'react-router-dom';


function ProductCard({ product }) {
    if (!product) return null;

    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                <img 
                    src={product.images?.[0] || '/placeholder.png'}
                    alt={product.name}
                    className="product-card-image"
                />
                <div className="product-card-body">
                    <h4 className="product-card-title">{product.name}</h4>
                    <p className="product-card-price">
                        {product.discountPrice ? (
                            <span><del>${product.price.toFixed(2)}</del> <strong>${product.discountPrice.toFixed(2)}</strong></span>
                        ) : (
                            <span>${product.price.toFixed(2)}</span>
                        )}
                    </p>
                </div>
            </Link>
            {/* Add "Add to Cart" button later */}
        </div>
    );
}

export default ProductCard;