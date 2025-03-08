import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/actions/categoryActions';


function HomePage() {
    const dispatch = useDispatch();
    const categoryState = useSelector(state => state.category);
    const { categories, loading, error } = categoryState;


    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <div>
            <h1>Welcom to the HomePage!</h1>
            <p>Loading Categories: {loading ? 'Yes' : 'No'}</p>
            {error.msg && <p style={{color: 'red' }}>Error: {error.msg}</p>}
            <h2>Categories:</h2>
            <ul>
                {categories.map(category => (
                    <li key={category._id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}


export default HomePage;