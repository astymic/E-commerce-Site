import {
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAIL,
    GET_CART_SUCCESS,
    GET_CART_FAIL,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    CLEAR_CART_SUCCESS,
    CLEAR_CART_FAIL,
    CART_LOADING,
} from '../types'
import axios from 'axios';


export const getCart = () => async dispatch => {
    dispatch({ type: CART_LOADING });
    try {
        const res = await axios.get('/api/cart');
        dispatch({
            type: GET_CART_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_CART_FAIL,
            payload: err.response ? err.response.data : { msg: 'Error fetching cart' }
        });
    }
};


export const addItemToCart = (productId, quantity = 1) => async dispatch => {
    dispatch({ type: CART_LOADING });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ productId, quantity });

    try {
        const res = await axios.post('/api/cart', body, config);
        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: err.response ? err.response.data : { msg: 'Error adding item to cart' }
        });
    }
};


export const updateCartItemQuantity = (productId, quantity) => async dispatch => {
    dispatch({ type: CART_LOADING });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify({ productId, quantity });

    try {
        const res = await axios.put(`/api/cart/${productId}`, body, config);
        dispatch({
            type: UPDATE_CART_ITEM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_CART_ITEM_FAIL,
            payload: err.response ? err.response.data : { msg: 'Error updating cart item' }
        });
    }
};


export const removeItemFromCart = (productId) => async dispatch => {
    dispatch({ type: CART_LOADING });
    try {
        const res = await axios.delete(`/api/cart/${productId}`);
        dispatch({
            type: REMOVE_CART_ITEM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REMOVE_CART_ITEM_FAIL,
            payload: err.response ? err.response.data : { msg: 'Error removing cart item' }
        });
    }
};



export const clearCart = () => async dispatch => {
    dispatch({ type: CART_LOADING });
    try {
        const res = await axios.delete('/api/cart');
        dispatch({
            type: CLEAR_CART_SUCCESS,
            payload: []
        });
    } catch (err) {
        dispatch({
            type: CLEAR_CART_FAIL,
            payload: err.response ? err.response.data : { msg: 'Error clearing cart' }
        });
    }
};

