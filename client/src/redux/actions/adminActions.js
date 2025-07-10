import axios from "axios";
import { 
    GET_PRODUCTS, 
    PRODUCTS_ERROR
} from "../types";

// Get admin products
export const getAdminProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/products?limit=500');
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};


// Create a new product
export const adminCreateProduct = (productData, navigate) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        await axios.post('/api/admin/products', productData, config);

        navigate('/admin/products');

    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: { msg: err.response?.data?.msg || 'Failed to create product', status: err.response?.status }
        });
    }
};


// Update ax existing product
export const adminUpdateProduct = (productId, productData, navigate) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        await axios.put(`/api/admin/products/${productId}`, productData, config);

        navigate('/admin/products');
    
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: { msg: err.response?.data?.msg || 'Failed to update product', status: err.response?.status }
        });
    }
}