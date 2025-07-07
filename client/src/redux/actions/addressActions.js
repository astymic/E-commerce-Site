import axios from 'axios';
import {
    GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAIL,
    ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAIL,
    UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL,
    DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAIL,
    ADDRESS_LOADING
} from '../types'

// Get User Addresses
export const getAddresses = () => async dispatch => {
    dispatch({ type: ADDRESS_LOADING });
    try {
        const res = await axios.get('/api/users/addresses');
        dispatch({ 
            type: GET_ADDRESSES_SUCCESS, 
            payload: res.data 
        });
    } catch (err) { 
        dispatch({ 
            type: GET_ADDRESSES_FAIL, 
            payload: err.responce ? err.responce.data : { msg: 'Error fetching user address' } 
        }); 
    }
}

// Add Address
export const addAddress = (addressData) => async dispatch => {
    dispatch({ type: ADDRESS_LOADING });
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
        const res = await axios.post('/api/users/addresses', addressData, config);
        dispatch({ 
            type: ADD_ADDRESS_SUCCESS, 
            payload: res.data 
        });
    } catch (err) {
        dispatch({
            type: ADD_ADDRESS_FAIL,
            payload: err.responce ? err.responce.data : { msg: 'Error adding address' }
        });
    }
}

// Update Address
export const updateAddress = (addressId, updateData) => async dispatch => {
    dispatch({ type: ADDRESS_LOADING });
    const config = { headers: { 'Content-Type': 'application/json' } };
    try {
        const res = await axios.put(`/api/users/addresses/${addressId}`, updateData, config);
        dispatch({ 
            type: UPDATE_ADDRESS_SUCCESS, 
            payload: res.data 
        });
    } catch (err) {
        dispatch({
            type: UPDATE_ADDRESS_FAIL,
            payload: err.responce ? err.responce.data : { msg: 'Error updating address' }
        });
    }
}

// Delete Address
export const deleteAddress = (addressId) => async dispatch => {
    dispatch({ type: ADDRESS_LOADING });
    try {
        const res = await axios.delete(`/api/users/addresses/${addressId}`);
        dispatch({ 
            type: DELETE_ADDRESS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DELETE_ADDRESS_FAIL,
            payload: err.responce ? err.responce.data : { msg: 'Error delete address' }
        });
    }
}