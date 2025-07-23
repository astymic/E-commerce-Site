import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotionalProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';

function SpecialOffers() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { promotionalProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getPromotionalProducts());
    }, [dispatch]);

    return (
        <section className="special-offers container">
            <h2>Special Offers & Discount</h2>
            {loading ? (
                <p>Loading special offers...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading special offers: {error.msg}</p>
            ) : (
                <div className='product-grid'>
                    {promotionalProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default SpecialOffers;