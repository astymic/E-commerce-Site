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
    LOGOUT,
} from '../types'

const initialSate = {
    items: [],
    loading: false,
    error: null
};

export default function cartReducer(state = initialSate, action) {
    const { type, payload } = action;

    switch (type) {
        case CART_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_CART_SUCCESS:
        case ADD_TO_CART_SUCCESS:
        case UPDATE_CART_ITEM_SUCCESS:
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state,
                items: payload,
                loading: false,
                error: null
            };
        case CLEAR_CART_SUCCESS:
        case LOGOUT:
            return {
                ...state,
                items: [],
                loading: false,
                error: null
            };
        case GET_CART_FAIL:
        case ADD_TO_CART_FAIL:
        case UPDATE_CART_ITEM_FAIL:
        case REMOVE_CART_ITEM_FAIL:
        case CLEAR_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
}
