// import Product from '../../../../server/models/Product';
import { 
    GET_PRODUCTS, 
    GET_PRODUCT, 
    PRODUCTS_ERROR, 
    GET_TOP_SELLING_PRODUCTS, 
    GET_NEW_ARRIVALS_PRODUCTS, 
    GET_PROMOTIONAL_PRODUCTS, 
    GET_CATEGORY_PRODUCTS,
    GET_FILTERED_CATEGORY_PRODUCTS,
    ADD_REVIEW_FAIL,
    GET_SIMILAR_PRODUCTS_SUCCESS,
    GET_SIMILAR_PRODUCTS_FAIL
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
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get filtered category products
export const getFilteredCategoryProducts = (categoryId, filterValues, sortBy = '') => async dispatch => {
    try {
        let queryParams = new URLSearchParams();

        for (const filterName in filterValues) {
            const value = filterValues[filterName];

            if (value === null | value === undefined || value === '') continue;

            if (Array.isArray(value)) {
                if (value.length > 0) {
                    queryParams.append(filterName, value.join(','));
                }
            } else {
                queryParams.append(filterName, value);
            }
        }
        
        if (sortBy) {
            queryParams.append('sortBy', sortBy);
        }

        const queryString = queryParams.toString();
        const res = await axios.get(`/api/categories/${categoryId}/products?${queryString}`);

        dispatch({
            type: GET_FILTERED_CATEGORY_PRODUCTS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: err.response ? err.response.data : { msg: 'Network Error' }
        });
    }
};


// Get similar products
export const getSimilarProducts = (productId) => async dispatch => {
    try {
        const res = await axios.get(`/api/products/${productId}/similar`);
        dispatch({
            type: GET_SIMILAR_PRODUCTS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_SIMILAR_PRODUCTS_FAIL,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};


// Add product review
export const addProductReview = (productId, reviewData) => async dispatch => {
    try {
        const config = { 
            headers: {
                 'Content-Type': 'application/json' 
            } 
        };

        const res = await axios.post(`/api/products/${productId}/reviews`, reviewData, config);
        
        dispatch({
            type: 'ADD_REVIEW_SUCCESS',
            payload: { 
                productId: productId, reviews: res.data }
        });

    } catch (err) {
        dispatch({
            type: ADD_REVIEW_FAIL,
            payload: {
                msg: err.response?.statusText || 'Server Error',
                status: err.response?.status || 500,
                errors: err.response?.data?.errors || [{ msg: err.response?.data?.msg || 'Could not add review' }]
            }
        });
    }
}