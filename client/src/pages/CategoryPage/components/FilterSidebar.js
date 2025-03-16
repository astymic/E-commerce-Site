import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategory } from '../../../redux/actions/categoryActions';
import { getFilteredCategoryProducts } from '../../../redux/actions/productActions';

function FilterSidebar() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const categoryState = useSelector(state => state.category);
  const { category, loading, error } = categoryState;

  const [filterValues, setFilterValues] = useState({});

  const handleCheckboxChange = (filterName, optionValue, isChecked) => {
    setFilterValues(prevValues => {
      const currentFilterOption = prevValues[filterName] || [];
      let updateOptions;
      if (isChecked) {
        updateOptions = [...currentFilterOption, optionValue];
      } else {
        updateOptions = currentFilterOption.filter(option => option !== optionValue);
      }
      return {
        ...prevValues,
        [filterName]: updateOptions
      };
    });
  };

  // Dispatch action when filterValues change
  useEffect(() => {
    if (category) {
      dispatch(getFilteredCategoryProducts(categoryId, filterValues));
    }
  }, [dispatch, categoryId, filterValues]);


  useEffect(() => {
    console.log('Selected filters:', filterValues);
  }, [filterValues]);

  return (
    <aside className='filter-sidebar'>
      <h2>Filter Products</h2>
      {loading || !category ? (
        <p>Loading filters...</p>
      ) : error.msg ? (
        <p style={{ color: 'red' }}>Error Loading filters: {error.msg}</p>
      ) : (
        <div className='filters-container'>
          {category.filters && category.filters.map(filter => (
            <div key={filter.name} className='filter-group'>
              <h3>{filter.name}</h3>
              {filter.type === 'checkbox' && filter.options && (
                <ul>
                  {filter.options.map(option => (
                    <li key={option}>
                      <label>
                        <input
                          type="checkbox"
                          name={filter.name}
                          checked={(filterValues[filter.name] || []).includes(option)}
                          onChange={(e) => handleCheckboxChange(filter.name, option, e.target.checked)} 
                        />
                        {option}
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