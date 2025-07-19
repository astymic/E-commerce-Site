import {
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    UPDATE_ORDER_STATUS_SUCCESS,
    CLEAR_ORDER_STATE,
    LOGOUT
} from '../types';

const initialState = {
    order: null,
    orders: [],
    allOrders: [],
    loading: false,
    error: null
};

export default function orderReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ORDER_LOADING:
            return {
                ...state,
                loading: true
            };
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                loading: false,
                error: null
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: payload,
                loading: false,
                error: null
            };
        case GET_USER_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false,
                error: null
            };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                allOrders: payload,
                loading: false,
                error: null
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                allOrders: state.allOrders.map(order =>
                    order._id === payload._id ? payload : order
                ),
                order: state.order && state.order._id === payload._id ? payload : state.order,
                loading: false
            };
        case PLACE_ORDER_FAIL:
        case GET_ORDER_FAIL:
        case GET_USER_ORDERS_FAIL:
        case GET_ALL_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_ORDER_STATE:
            return {
                ...state,
                order: null,
                loading: false,
                error: null
            };
        case LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}