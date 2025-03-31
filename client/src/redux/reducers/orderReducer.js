import {
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    CLEAR_ORDER_STATE,
} from '../types';

const initialState = {
    order: null,
    laoding: false,
    error: null
};

export default function(state = initialState, action) {
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
        case CLEAR_ORDER_STATE:
            return {
                ...state,
                order: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }
}