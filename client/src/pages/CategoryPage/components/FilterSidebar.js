import React from 'react';
import { useSelector } from 'react-redux';


function FilterSidebar({ filterValues = {}, onFilterChange }) {
    const categoryState = useSelector(state => state.category);
    const { category, loading, error } = categoryState;

    const handleCheckboxChange = (filterName, optionValue, isChecked) => {
        const currentFilterOptions = filterValues[filterName] || [];
        let updatedOptions;
        if (isChecked) {
            updatedOptions = [...currentFilterOptions, optionValue];
        } else {
            updatedOptions = currentFilterOptions.filter(option => option !== optionValue);
        }
        onFilterChange({ ...filterValues, [filterName]: updatedOptions });
    };

    const handleInputChange = (filterName, value) => {
        onFilterChange({ ...filterValues, [filterName]: value === "" ? undefined : value });
    };


    return (
        <aside className="filter-sidebar">
            <h2>Filter products</h2>
            {loading || !category ? (
                <p>Loading filters...</p>
            ) : error.msg ? (
                <p style={{ color: 'red' }}>Error loading filters: {error.msg}</p>
            ) : (
                <div className="filters-container">
                    {category && category.filters && category.filters.map(filter => (
                        <div key={filter.name} className="filter-group">
                            <h3>{filter.name}</h3>

                            {/* Checkbox UI */}
                            {filter.type === 'checkbox' && filter.options && (
                                <ul>
                                    {filter.options.map(option => (
                                        <li key={option}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name={filter.name}
                                                    value={option}
                                                    checked={(filterValues[filter.name] || []).includes(option)}
                                                    onChange={(e) => handleCheckboxChange(filter.name, option, e.target.checked)}
                                                />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Range UI */}
                            {filter.type === 'range' && (
                                <div className="range-filter">
                                    <label htmlFor={`${filter.name}-min`}>Min:</label>
                                    <input
                                        type="number"
                                        id={`${filter.name}-min`}
                                        name={`${filter.name}-min`}
                                        placeholder="Min"
                                        value={filterValues[`${filter.name}-min`] || ''}
                                        onChange={(e) => handleInputChange(filter.name + '-min', e.target.value)}
                                    />
                                    <label htmlFor={`${filter.name}-max`}>Max:</label>
                                    <input
                                        type="number"
                                        id={`${filter.name}-max`}
                                        name={`${filter.name}-max`}
                                        placeholder="Max"
                                        value={filterValues[`${filter.name}-max`] || ''}
                                        onChange={(e) => handleInputChange(filter.name + '-max', e.target.value)}
                                    />
                                </div>
                            )}

                            {/* Radio UI */}
                            {filter.type === 'radio' && filter.options && (
                                <ul className="radio-filer">
                                    <li key={`${filter.name}-all`}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={filter.name}
                                                value=""
                                                checked={!filterValues[filter.name]}
                                                onChange={(e) => handleInputChange(filter.name, e.target.value)}
                                            /> All
                                        </label>
                                    </li>
                                    {filter.options.map(option => (
                                        <li key={option}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={filter.name}
                                                value={option}
                                                checked={filterValues[filter.name] === option}
                                                onChange={(e) => handleInputChange(filter.name, e.target.value)}
                                            /> {option}
                                        </label>
                                    </li>
                                    ))}
                                </ul>
                            )}

                            {/* Placeholder for Unimplemented UI */}
                            {filter.type !== 'checkbox' && filter.type !== 'range' && filter.type !== 'radio' && (
                                <p>Filter type: {filter.type} - UI not implemented yet</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </aside>
    );
}

export default FilterSidebar;