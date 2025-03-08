import { GET_CATEGORIES, GET_CATEGORY, CATEGORIES_ERROR } from "../types";
import axios from 'axios';

// Get all categories
export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');
        
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORIES_ERROR,
            payload: err.response ? err.response.data : {  msg: 'Network Error' }
        });
    }
};

// Get category by ID
export const getCategory = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/${id}`);
        
        dispatch({
            type: GET_CATEGORY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CATEGORIES_ERROR,
            payload: err.response ? err.response.data : {  msg: 'Network Error' }
        });
    }
};