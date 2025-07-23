import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewArrivalsProducts } from '../../../redux/actions/productActions';
import ProductCard from '../../../components/common/ProductCard';

function NewArrivals() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { newArrivalsProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getNewArrivalsProducts());
    }, [dispatch]);

    return (
        <section className="new-arrivals container">
            <h2>New Arrivals</h2>
            {loading ? (
                <p>Loading new arrivals...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading new arrivals: {error.msg}</p>
            ) : (
                <div className='product-grid'>
                    {newArrivalsProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default NewArrivals;