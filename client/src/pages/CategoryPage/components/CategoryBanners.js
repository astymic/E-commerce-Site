import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/actions/categoryActions';


function CategoryBanners() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.category);
    const { category, loading, error } = categoryState;

    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, [dispatch, categoryId]);

    return (
        <section className='category-banners'>
            <h2>Category Banners</h2>
            {loading || !category ? (
                <p>Loading banner...</p>
            ) : error && error.msg ? (
                <p style={{ color: 'red' }}>Error loading banner: {error.msg}</p>
            ) : (
                category.bannerImage ? (
                    <img src={category.bannerImage} alt={`${category.name} Banner`} style={{ maxWidth: '100%', maxHeight: '300px' }} />
                ) : (
                    <p>No banner image available for this category.</p>
                )
            )}
        </section>
    );
}


export default CategoryBanners;