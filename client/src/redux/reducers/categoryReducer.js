import { 
    GET_CATEGORIES, 
    GET_CATEGORY, 
    CATEGORIES_ERROR,
    CLEAR_CATEGORY_STATE,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    LOGOUT
} from '../types';

const initialState = {
    categories: [],
    category: null,
    loading: true,
    error: {}
};

export default function categoryReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false,
                error: null 
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false,
                error: null
            };
        case CLEAR_CATEGORY_STATE:
            return {
                ...state,
                category: null,
                error: null
            };
        case CATEGORIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(cat => cat._id !== payload),
                loading: false,
                error: null
            };
        case DELETE_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case LOGOUT:
            return {
                ...initialState
            };
        default:
            return state;
    }
}