import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../redux/actions/categoryActions';
import CategoryCard from '../../../components/common/CategoryCard';

function CategoryOverview() {
    const dispatch = useDispatch();
    const categorySate = useSelector(state => state.category);
    const { categories, loading, error } = categorySate;

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <section className="category-overview container">
            <h2>Category Overview</h2>
            {loading ? (
                <p>Loading categories...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading categories: {error.msg}</p>
            ) : (
                <div className='product-grid'>
                    {categories.map(category => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default CategoryOverview;