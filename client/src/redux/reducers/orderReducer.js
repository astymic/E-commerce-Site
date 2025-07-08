import {
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL,
    CLEAR_ORDER_STATE,
    LOGOUT
} from '../types';

const initialState = {
    order: null,
    orders: [],
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
        case PLACE_ORDER_FAIL:
        case GET_ORDER_FAIL:
        case GET_USER_ORDERS_FAIL:
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
            return {
                ...state,
                order: null,
                orders: [],
                loading: false,
                error: null
            };
        default:
            return state;
    }
}