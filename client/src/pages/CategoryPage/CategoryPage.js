import React, { useState } from 'react';
import CategoryBanners from './components/CategoryBanners';
import ProductList from './components/ProductList';
import FilterSidebar from './components/FilterSidebar';
import Breadcrumbs from './components/Breadcrumbs';
import SortOptions from './components/SortOptions';


function CategoryPage() {
    const [sortBy, setSortBy] = useState('');
    const [filtersSelection, setFiltersSelection] = useState({});
    

    const handleSortChange = (sortValue) => {
        setSortBy(sortValue);
    };

    const handleFilterChange = (filters) => {
        console.log(filters);
        setFiltersSelection(filters);
    };


    return (
        <div className='category-page'>
            <Breadcrumbs />
            <CategoryBanners />
            <div className='content-area'>
                <FilterSidebar filters={filtersSelection} onFilterChange={handleFilterChange}/>
                <div className='product-listing-area'>
                    <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
                    <ProductList sortBy={sortBy} filters={filtersSelection}/>
                </div>
            </div>
        </div>
    );
}


export default CategoryPage;