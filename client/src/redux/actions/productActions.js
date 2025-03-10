import { GET_PRODUCTS, GET_PRODUCT, PRODUCTS_ERROR, GET_TOP_SELLING_PRODUCTS, GET_NEW_ARRIVALS_PRODUCTS } from '../types';
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