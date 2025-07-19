import axios from "axios";
import { 
    GET_PRODUCTS, 
    PRODUCTS_ERROR,
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAIL,
    GET_CATEGORIES,
    CATEGORIES_ERROR,
    GET_ALL_ORDERS_SUCCESS,
    UPDATE_ORDER_STATUS_SUCCESS,
    ORDER_LOADING,
    CREATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    GET_ALL_ORDERS_FAIL,
    UPDATE_ORDER_STATUS_FAIL,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
    ADMIN_USERS_LOADING,
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
};


// Upload a product image
export const adminUploadImage = (fileData) => async dispatch => {
    dispatch({ type: IMAGE_UPLOAD_REQUEST });
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        const res = await axios.post('/api/admin/upload/product-image', fileData, config);
        dispatch({
            type: IMAGE_UPLOAD_SUCCESS,
            payload: res.data.filePath
        });

    } catch (err) {
        dispatch({
            type: IMAGE_UPLOAD_FAIL,
            payload: { msg: err.response?.data?.msg || 'Image upload failed', status: err.response?.status }
        });
    }
};


// Get All Categories for Admin Panel
export const getAdminCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/categories');
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type: CATEGORIES_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};


// Create a new category
export const adminCreateCategory = (categoryData, navigate) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await axios.post('/api/admin/categories', categoryData, config);

        navigate('/admin/categories');

        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type: CATEGORIES_ERROR,
            payload: { msg: err.response?.data?.msg || 'Failed to create category', status: err.response?.status }
        });
    }
};


// Upadate an existing category
export const adminUpdateCategory = (categoryId, categoryData, navigate) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await axios.put(`/api/admin/categories/${categoryId}`, categoryData, config);

        navigate('/admin/categories');

        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: CATEGORIES_ERROR,
            payload: { msg: err.response?.data?.msg || 'Failed to update category', status: err.response?.status }
        });
    }
};


// Delete a category
export const adminDeleteCategory = (categoryId) => async dispatch => {
    try {
        await axios.delete(`/api/admin/categories/${categoryId}`);

        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: categoryId
        });
    
    } catch (err) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: { msg: err.response?.data?.msg || 'Failed to delete category', status: err.response?.status }
        });
    }
};


// Get All Orders for Admin Panel
export const getAdminOrders = () => async dispatch => {
    dispatch({ type: ORDER_LOADING });
    try {
        const res = await axios.get(`/api/admin/orders`);
        dispatch({
            type: GET_ALL_ORDERS_SUCCESS,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type: GET_ALL_ORDERS_FAIL,
            payload: { msg: err.response?.data?.msg || 'Failed to get all orders', status: err.response?.status }
        });
    }
};


// Update Order Status
export const adminUpdateOrderStatus = (orderId, status) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await axios.put(`/api/admin/orders/${orderId}/status`, { status }, config );
        dispatch({
            type: UPDATE_ORDER_STATUS_SUCCESS,
            payload: res.data
        });
    
    } catch (err) {
        dispatch({
            type: UPDATE_ORDER_STATUS_FAIL,
            payload: { msg: err.response?.data?.msg || 'Failed to update order status', status: err.response?.status }
        });
    }
};


// Get All Users for Admin Panel
export const getAdminUsers = () => async dispatch => {
    dispatch({ type: ADMIN_USERS_LOADING });
    try {
        const res = await axios.get('/api/admin/users');
        dispatch({
            type: GET_ALL_USERS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: GET_ALL_USERS_FAIL,
            payload: { msg: err.response?.data?.msg || 'Failed to load users', status: err.response?.status }
        });
    }
};


// Update User Role
export const adminUpdateUserRole = (userId, role) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        await axios.put(`/api/admin/users/${userId}/role`, { role }, config);
        dispatch({
            type: UPDATE_USER_ROLE_SUCCESS,
            payload: { userId, role }
        });
    
    } catch (err) {
        dispatch({
            type: UPDATE_USER_ROLE_FAIL,
            payload: { msg: err.response?.data?.msg || 'Failed to update user role', status: err.response?.status }
        });
    }
};