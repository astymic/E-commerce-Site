import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
    if (!category) return null;

    return (
        <div className="product-card category-card">
            <Link to={`/category/${category.slug}`}>
                <img
                    src={category.image || '/placeholder.png'}
                    alt={category.name}
                    className="product-card-image"
                />
                <div className="product-card-body">
                    <h4 className="product-card-title">{category.name}</h4>
                </div>
            </Link>
        </div>
    );
}

export default CategoryCard;