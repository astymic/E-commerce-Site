import {
    GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAIL,
    ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAIL,
    UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_FAIL,
    DELETE_ADDRESS_SUCCESS, DELETE_ADDRESS_FAIL,
    ADDRESS_LOADING, LOGOUT
} from '../types';

const initialState = {
    addresses: [],
    loading: false,
    error: null
};

export default function addressReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADDRESS_LOADING: 
            return { 
                ...state, 
                loading: true 
            };
        case GET_ADDRESSES_SUCCESS:
        case ADD_ADDRESS_SUCCESS:
        case UPDATE_ADDRESS_SUCCESS:
        case DELETE_ADDRESS_SUCCESS:
            return {
                ...state, 
                addresses: payload,
                loading: false,
                error: null
            };
        case GET_ADDRESSES_FAIL:
        case ADD_ADDRESS_FAIL:
        case UPDATE_ADDRESS_FAIL:
        case DELETE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case LOGOUT: return { ...initialState };
        default:
            return state;
    }
}