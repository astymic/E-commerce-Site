import React from 'react';
import { ChevronDown } from 'lucide-react';

function SortOptions({ sortBy, onSortChange }) {

    const handleChange = (e) => {
        onSortChange(e.target.value);
    };

    return (
        <div className="relative inline-flex items-center">
            <span className="text-sm font-bold text-neutral-400 mr-3 uppercase tracking-wider">Sort:</span>
            <div className="relative group">
                <select
                    value={sortBy}
                    onChange={handleChange}
                    className="input-field py-2.5 px-6 rounded-full text-sm font-bold text-neutral-900 border border-neutral-100 focus:bg-white focus:border-primary-500 transition-all cursor-pointer shadow-sm min-w-[200px]"
                >
                    <option value="">Featured Relevance</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </select>
            </div>
        </div>
    );
}

export default SortOptions;