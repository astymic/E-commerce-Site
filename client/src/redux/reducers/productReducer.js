import { GET_PRODUCTS, GET_PRODUCT, PRODUCTS_ERROR, GET_TOP_SELLING_PRODUCTS, GET_NEW_ARRIVALS_PRODUCTS, GET_PROMOTIONAL_PRODUCTS, GET_CATEGORY_PRODUCTS } from '../types';

const initialState = {
    products: [],
    product: null,
    topSellingProducts: [],
    newArrivalsProducts: [],
    promotionalProducts: [],
    categoryProducts: [],
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
        case GET_TOP_SELLING_PRODUCTS:
            return {
                ...state,
                topSellingProducts: payload,
                loading: false
            };
        case GET_NEW_ARRIVALS_PRODUCTS:
            return {
                ...state,
                newArrivalsProducts: payload,
                loading: false
            };
        case GET_PROMOTIONAL_PRODUCTS:
            return {
                ...state,
                promotionalProducts: payload,
                loading: false
            };
        case GET_CATEGORY_PRODUCTS:
            return {
                ...state,
                categoryProducts: payload,
                loading: false
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