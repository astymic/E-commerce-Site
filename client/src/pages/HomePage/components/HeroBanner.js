import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopSellingProducts } from '../../../redux/actions/productActions';


function HeroBanner() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { topSellingProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getTopSellingProducts());
    }, [dispatch]);

    const bannerProducts = topSellingProducts.slice(0, 3);

    return (
        <section className="hero-banner">
            <h2>Hero Banner Section</h2>
            {loading ? (
                <p>Loading featured products...</p>
            ) : error.msg ? (
                <p style={{ color: 'red' }}>Error loading featured products: {error.msg}</p>
            ) : (
                <div className='banner-carousel'>
                    {bannerProducts.map(product => (
                        <div key={product._id} className='banenr-item'>
                            <h3>Featured: {product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>{[product.shortDescription || 'Short description here...']}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default HeroBanner;