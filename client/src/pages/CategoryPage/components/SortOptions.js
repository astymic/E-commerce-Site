import React from 'react';


function SortOptions({ sortBy, onSortChange }) {
    
    const handleChange = (e) => {
        onSortChange(e.target.value);
    };
    
    return (
        <div className='sort-options'>
            Sort by: <select value={sortBy} onChange={handleChange}>
                <option value="">Relevance</option>
                <option value="price-low-to-high">Price (Low to High)</option>
                <option value="price-high-to-low">Price (High to Low)</option>
                <option value="newest">Newest Arrivals</option>
            </select>
        </div>
    );
}


export default SortOptions;