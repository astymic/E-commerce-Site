import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../../components/common/ProductCard';

function ProductList() {
    const productState = useSelector(state => state.product);
    const { categoryProducts, loading, error } = productState;

    return (
        <section className='product-list-section'>
            {loading ? (
                <p>Loading products...</p>
            ) : error && error?.msg ? (
                <p style={{ color: 'red' }}>Error loading products: {error.msg}</p>
            ) : (
                <ul className='product-grid'>
                    {categoryProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </ul>
            )}
        </section>
    );
}


export default ProductList;