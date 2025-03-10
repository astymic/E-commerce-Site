import React from 'react';


function SortOptions() {
    return (
        <div className='sort-options'>
            Sort by: <select>
                <option value="relevance">Relevance</option>
                <option value="price-low-to-high">Price (Low to High)</option>
                <option value="price-high-to-low">Price (High to Low)</option>
            </select>
        </div>
    );
}


export default SortOptions;