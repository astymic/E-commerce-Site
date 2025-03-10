import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoryActions';

function CategoryOverview() {
    const dispatch = useDispatch();
    const categorySate = useSelector(state => state.category);
    const { categories, loading, error } = categorySate;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <section className="category-overview">
            <h2>Category Overview</h2>
            {loading ? (
                <p>Loading categories...</p>
            ) : error.msg ? (
                <p style={{ color: 'red' }}>Error loading categories: {error.msg}</p>
            ) : (
                <ul className='category-list'>
                    {categories.map(category => (
                        <li key={category._id} className='category-item'>
                            <h3>{category.name}</h3>
                            <p>{category.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default CategoryOverview;