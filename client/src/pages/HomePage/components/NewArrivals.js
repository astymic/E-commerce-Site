import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewArrivalsProducts } from '../../../redux/actions/productActions';

function NewArrivals() {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    const { newArrivalsProducts, loading, error } = productState;

    useEffect(() => {
        dispatch(getNewArrivalsProducts());
    }, [dispatch]);

    return (
        <section className="new-arrivals">
            <h2>New Arrivals</h2>
            {loading ? (
                <p>Loading new arrivals...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading new arrivals: {error.msg}</p>
            ) : (
                <ul className='product-list'>
                    {newArrivalsProducts.map(product => (
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

export default NewArrivals;