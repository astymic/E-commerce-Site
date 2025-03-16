import { 
    GET_PRODUCTS, 
    GET_PRODUCT, 
    PRODUCTS_ERROR, 
    GET_TOP_SELLING_PRODUCTS, 
    GET_NEW_ARRIVALS_PRODUCTS, 
    GET_PROMOTIONAL_PRODUCTS, 
    GET_CATEGORY_PRODUCTS,
    GET_FILTERED_CATEGORY_PRODUCTS,
} from '../types';
import axios from 'axios';

// Get all products
export const getProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/products');

        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    }   catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};

// Get product by ID
export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/products/${id}`);

        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });
    }   catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get top-selling products
export const getTopSellingProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/products/top-selling');

        dispatch({
            type: GET_TOP_SELLING_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get new arrival products
export const getNewArrivalsProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/products/new-arrivals');

        dispatch({
            type: GET_NEW_ARRIVALS_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get promotional products
export const getPromotionalProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/products/promotions');

        dispatch({
            type: GET_PROMOTIONAL_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get category products
export const getCategoryProducts = (categoryId, sortBy) => async dispatch => {
    try {
        const res = await axios.get(`/api/categories/${categoryId}/products?${sortBy || ''}`);

        dispatch({
            type: GET_CATEGORY_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.responce.data : { msg: 'Network Error' }
        });
    }
};


export const getFilteredCategoryProducts = (categoryId, filterValues) => async dispatch => {
    try {
        console.log('Dispatch getFilteredCategoryProducts action with filters:', filterValues);

        // const res = await axios.get(`/api/categoriess/${categoryId}/products?filters=${JSON.stringify(filterValues)}`);

        dispatch({
            type: GET_FILTERED_CATEGORY_PRODUCTS,
            payload: []
        });

    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.responce.data : { msg: 'Network Error' }
        });
    }
};