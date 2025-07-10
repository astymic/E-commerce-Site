import { 
    GET_PRODUCTS, 
    GET_PRODUCT, 
    PRODUCTS_ERROR, 
    GET_TOP_SELLING_PRODUCTS, 
    GET_NEW_ARRIVALS_PRODUCTS, 
    GET_PROMOTIONAL_PRODUCTS, 
    GET_CATEGORY_PRODUCTS, 
    GET_FILTERED_CATEGORY_PRODUCTS,
    GET_SIMILAR_PRODUCTS_SUCCESS,
    GET_SIMILAR_PRODUCTS_FAIL
} from '../types';

const initialState = {
    products: [],
    product: null,
    topSellingProducts: [],
    newArrivalsProducts: [],
    promotionalProducts: [],
    categoryProducts: [],
    similarProducts: [],
    loading: true,
    error: null,
    reviewError: null
};

// Helper function for calculate rating
const calculateNewAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, item) => item.rating + acc, 0);
    return totalRating / reviews.length;
}


export default function productReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload,
                loading: false,
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: payload,
                loading: false,
                error: null,
                reviewError: null,
                similarProducts: []
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
        case GET_FILTERED_CATEGORY_PRODUCTS:
            return {
                ...state,
                categoryProducts: payload,
                loading: false
            };
        case GET_SIMILAR_PRODUCTS_SUCCESS:
            return {
                ...state,
                similarProducts: payload
            };
        case GET_SIMILAR_PRODUCTS_FAIL:
            return {
                ...state,
                similarProducts: []
            };
        case 'ADD_REVIEW_SUCCESS':
            return {
                ...state,
                product: state.product && state.product._id === payload.productId
                    ? { ...state.product, reviews: payload.reviews, rating: calculateNewAverageRating(payload.reviews) }
                    : state.product,
                reviewError: null
            };
        case 'ADD_REVIEW_FAIL':
            return {
                ...state,
                reviewError: payload                
            };
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                product: null
            };
        default:
            return state;
    }
}