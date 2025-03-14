import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryProducts } from '../../../redux/actions/productActions';


function ProductList({ sortBy, filters }) {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { categoryProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getCategoryProducts(categoryId, sortBy, filters));
    }, [dispatch, categoryId, sortBy, filters]);

    return (
        <section className='product-list-section'>
            <h2>Product Listing</h2>
            {loading ? (
                <p>Loading products...</p>
            ) : error.msg ? (
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