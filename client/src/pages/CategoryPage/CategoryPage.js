import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../redux/actions/categoryActions';
import { getFilteredCategoryProducts } from '../../redux/actions/productActions';
import CategoryBanners from './components/CategoryBanners';
import ProductList from './components/ProductList';
import FilterSidebar from './components/FilterSidebar';
import Breadcrumbs from './components/Breadcrumbs';
import SortOptions from './components/SortOptions';

function CategoryPage() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const [sortBy, setSortBy] = useState('');
    const [filterValues, setFilterValues] = useState({});

    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, [dispatch, categoryId]);

    useEffect(() => {
        dispatch(getFilteredCategoryProducts(categoryId, filterValues, sortBy));
    }, [dispatch, categoryId, filterValues, sortBy]); 

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
    };

    const handleFilterChange = (newFilterValues) => {
        setFilterValues(newFilterValues);
    };


    return (
        <div className="category-page">
            <Breadcrumbs /> 
            <CategoryBanners /> 
            <div className="content-area">
                <FilterSidebar filterValues={filterValues} onFilterChange={handleFilterChange} />
                <div className="product-listing-area">
                    <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
                    <ProductList />
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;