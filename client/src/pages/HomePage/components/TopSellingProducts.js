import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSellingProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';

function TopSellingProducts() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { topSellingProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getTopSellingProducts());
    }, [dispatch]);

    return (
        <section className="top-selling-products container">
            <h2>Top Selling Products</h2>
            {loading ? (
                <p>Loading top selling products...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading products: {error.msg}</p>
            ) : (
                <ul className='product-grid'>
                    {topSellingProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </ul>
            )}
        </section>
    );
}

export default TopSellingProducts;