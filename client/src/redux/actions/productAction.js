import { GET_PRODUCTS, GET_PORDUCT,PRODUCT_ERROR } from '../types';
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
            type: PRODUCT_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};

// Get product by ID
export const getProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/products/${id}`);

        dispatch({
            type: GET_PORDUCT,
            payload: res.data
        });
    }   catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};