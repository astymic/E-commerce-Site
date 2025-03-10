import React from 'react';
import CategoryBanners from './components/CategoryBanners';
import ProductList from './components/ProductList';
import FilterSidebar from './components/FilterSidebar';
import Breadcrumbs from './components/Breadcrumbs';
import SortOptions from './components/SortOptions';


function CategoryPage() {
    return (
        <div className='category-page'>
            <Breadcrumbs />
            <CategoryBanners />
            <div className='content-area'>
                <FilterSidebar />
                <div className='product-listing-area'>
                    <SortOptions />
                    <ProductList />
                </div>
            </div>
        </div>
    );
}


export default CategoryPage;