import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPromotionalProducts } from '../../../redux/actions/productActions';

function SpecialOffers() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { promotionalProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getPromotionalProducts());
    }, [dispatch]);

    return (
        <section className="special-offers">
            <h2>Special Offers & Discount</h2>
            {loading ? (
                <p>Loading special offers...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading special offers: {error.msg}</p>
            ) : (
                <ul className='product-list'>
                    {promotionalProducts.map(product => (
                        <li key={product._id} className='product-item'>
                            <h3>{product.name}</h3>
                            <p>Price: <del>${product.price}</del> <strong>${product.discountPrice}</strong></p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default SpecialOffers;