import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/actions/categoryActions';


function FilterSidebar() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.category);
    const { category, loading, error } = categoryState;

    const [filtersSelection, setFiltersSelection] = useState({});


    useEffect(() => {
        dispatch(getCategory(categoryId));
    }, [dispatch, categoryId]);

    const handleCheckboxChange = (filterName, optionValue, isChecked) => {
        setFiltersSelection(prevFilters => {
            const updatedFilters = { ...prevFilters };
            if (isChecked) {
                if(!updatedFilters[filterName]) {
                    updatedFilters[filterName] = [];
                }
                updatedFilters[filterName].push(optionValue);
            } else {
                if (updatedFilters[filterName]) {
                    updatedFilters[filterName] = updatedFilters[filterName].filter(opt => opt !== optionValue);
                    if (updatedFilters[filterName].length === 0) {
                        delete updatedFilters[filterName];
                    }
                }
            }
            return updatedFilters;
        });
    };


    useEffect(() => {
        console.log('Current Filter Selections:', filtersSelection);
    }, [filtersSelection]);
    

    return (
        <aside className='filter-sidebar'>
            <h2>Filter Sidebar</h2>
            {loading || !category ? (
                <p>Loading filters...</p>
            ) : error.msg ? (
                <p style={{ color: 'red' }}>Error loading products: {error.msg}</p>
            ) : (
                <div className='filters-container'>
                    {category.filters && category.filters.map(filter => (
                        <div key={filter.name} className="filter-group">
                            <h3>{filter.name}</h3>
                            {filter.type === 'checkbox' && filter.options && (
                                <ul>
                                    {filter.options.map(option => (
                                        <li key={option}>
                                            <label>
                                                <input 
                                                    type="checkbox" 
                                                    name={filter.name} 
                                                    value={option}
                                                    onChange={(e) => handleCheckboxChange(filter.name, option, e.target.checked)}
                                                    checked={filtersSelection[filter.name]?.includes(option) || false}
                                                /> {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {filter.type !== 'checkbox' && <p>Filter type: {filter.type} - UI not implemented yet</p>}
                        </div>
                    ))}
                </div>
            )}
        </aside>
    );
}


export default FilterSidebar;