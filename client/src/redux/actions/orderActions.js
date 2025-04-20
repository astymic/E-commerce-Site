import {
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    CLEAR_ORDER_STATE,
    CLEAR_CART_SUCCESS,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
} from '../types';
import axios from 'axios';


export const placeOrder = (formData) => async dispatch => {
    dispatch({ type: ORDER_LOADING });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const orderData = {
        shippingDetails: {
            firstName: formData.firstName,
            lastName:  formData.lastName,
            phone: formData.phone,
            type: formData.deliveryType,
            city: formData.deliveryCity,
            location: formData.deliveryLocation,
            // address: formData.deliveryAddress
        },
        paymentMethod: formData.paymentMethod,
        doNotCall: formData.doNotCall,
        deliveryToAnotherPerson: formData.deliveryToAnotherPerson,
        recipientFirstName: formData.recipientFirstName,
        recipientLastName: formData.recipientLastName,
        notes: formData.notes
    };


    try {
        const res = await axios.post('/api/orders', orderData, config);

        dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: res.data
        });

        dispatch({ type: CLEAR_CART_SUCCESS });

        // Add Navigation to order summary
    } catch (err) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: err.response ? err.response.data : { msg: 'Order placement failed' }
        });
    }
};


// Get Order Details by ID
export const getOrderDetails = (orderId) => async dispatch => {
    dispatch({ type: ORDER_LOADING });
    try {
        const res = await axios.get(`/api/orders/${orderId}`);
        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: err.response ? err.response.data : { msg: 'Could not fetch order details' }
        });
    }
};


// Get User Orders
export const getUserOrders = () => async dispatch => {
    dispatch({ type: ORDER_LOADING });
    try {
        const res = await axios.get(`/api/users/orders`);
        dispatch({
            type: GET_USER_ORDERS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_USER_ORDERS_FAIL,
            payload: err.response ? err.response.data : { msg: 'Could not fetch user orders' }
        });
    }
};



export const clearOrderState = () => dispatch => {
    dispatch({ type: CLEAR_ORDER_STATE });
};
