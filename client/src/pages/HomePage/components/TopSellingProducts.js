import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSellingProducts } from '../../../redux/actions/productActions';

function TopSellingProducts() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { topSellingProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getTopSellingProducts());
    }, [dispatch]);

    return (
        <section className="top-selling-products">
            <h2>Top Selling Products</h2>
            {loading ? (
                <p>Loading top selling products...</p>
            ) : error.msg ? (
                <p style={{ color: 'red' }}>Error loading products: {error.msg}</p>
            ) : (
                <ul className='product-list'>
                    {topSellingProducts.map(product => (
                        <li key={product._id} className='product-item'>
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default TopSellingProducts;