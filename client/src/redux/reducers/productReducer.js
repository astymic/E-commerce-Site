import { GET_PRODUCTS, GET_PRODUCT, PRODUCTS_ERROR } from '../types';

const initialState = {
    products: [],
    product: null,
    loading: true,
    error: {}
};

export default function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false,
            };
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}