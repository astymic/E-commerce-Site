import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/actions/categoryActions';


function FilterSidebar() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.category);
    const { category, loading, error } = categoryState;

    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, [dispatch, categoryId]);

    const generateBreadcrumbs = (currentCategory, path = []) => {
        if (!currentCategory) return path;

        const updatedPath = [{
            name: currentCategory.name,
            link: `/category/${currentCategory.slug}`
        }, ...path];

        if (currentCategory.parent) {
            return generateBreadcrumbs(currentCategory.parent, updatedPath);
        } else {
            return updatedPath;
        }
    };

    const breadcrumbPath = category ? generateBreadcrumbs(category) : [];

    return (
        <nav className='breadcrumbs'>
            <span><Link to="/">Home</Link></span> &gt;
            <span><Link to="/catalog">Catalog</Link></span> &gt;
            {loading || !breadcrumbPath ? (
                <span>Loading breadcrumbs...</span>
            ) : error && error.msg ? (
                <span style={{ color: 'red' }}>Error loading breadcrumbs</span>
            ) : (
                breadcrumbPath.map((crumb, index) => (
                    <span key={index}>
                        <Link to={crumb.link}>{crumb.name}</Link>
                        {index < breadcrumbPath.length - 1 && ' > '}
                    </span>
                ))
            )}
        </nav>
    );
}


export default FilterSidebar;