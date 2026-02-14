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
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

function CategoryPage() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    const [sortBy, setSortBy] = useState('');
    const [filterValues, setFilterValues] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(320); // Default width
    const [isResizing, setIsResizing] = useState(false);

    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, [dispatch, categoryId]);

    useEffect(() => {
        dispatch(getFilteredCategoryProducts(categoryId, filterValues, sortBy));
    }, [dispatch, categoryId, filterValues, sortBy]);

    const startResizing = (e) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e) => {
        if (isResizing) {
            const newWidth = e.clientX - 20; // Adjust based on container padding
            if (newWidth > 200 && newWidth < 600) {
                setSidebarWidth(newWidth);
            }
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    return (
        <div className={`pt-24 pb-20 bg-neutral-50 min-h-screen ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
            <div className="container max-w-[1600px]">
                <Breadcrumbs />
                <CategoryBanners />

                <div className="flex flex-col lg:flex-row gap-8 mt-12">
                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden flex items-center justify-center gap-2 btn btn-secondary w-full py-4 shadow-sm"
                    >
                        <SlidersHorizontal size={20} />
                        <span className="font-bold">Filters & Sorting</span>
                    </button>

                    {/* Sidebar Container */}
                    <div className="relative flex group/resize">
                        <aside
                            className={`shrink-0 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}
                            style={{ width: window.innerWidth > 1024 ? `${sidebarWidth}px` : '100%' }}
                        >
                            <div className="sticky top-28 space-y-8">
                                <FilterSidebar
                                    filterValues={filterValues}
                                    onFilterChange={setFilterValues}
                                />
                            </div>
                        </aside>

                        {/* Resize Handle */}
                        <div
                            onMouseDown={startResizing}
                            className={`hidden lg:flex absolute -right-4 top-0 bottom-0 w-2 hover:w-4 transition-all cursor-col-resize z-10 items-center justify-center group-hover/resize:opacity-100 opacity-0 ${isResizing ? 'opacity-100 w-4' : ''}`}
                        >
                            <div className={`w-0.5 h-32 rounded-full transition-all ${isResizing ? 'bg-primary-500 w-1' : 'bg-neutral-200 group-hover:bg-primary-300'}`} />
                        </div>
                    </div>

                    {/* Product Listing Area */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-neutral-100 mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-display font-bold text-neutral-900 mb-1">Products</h3>
                                    <p className="text-sm text-neutral-400">Showing our premium selection</p>
                                </div>
                                <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
                            </div>
                        </div>

                        <ProductList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;