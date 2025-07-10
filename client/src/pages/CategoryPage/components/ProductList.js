import React from 'react';
import { useSelector } from 'react-redux';

function ProductList() {
    const productState = useSelector(state => state.product);
    const { categoryProducts, loading, error } = productState;

    return (
        <section className='product-list-section'>
            <h2>Product Listing</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : error && error?.msg ? (
                <p style={{ color: 'red' }}>Error loading products: {error.msg}</p>
            ) : (
                <ul className='product-grid'>
                    {categoryProducts.map(product => (
                        <li key={product._id} className='product-grid-item'>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}


export default ProductList;