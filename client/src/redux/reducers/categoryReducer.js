import { 
    GET_CATEGORIES, 
    GET_CATEGORY, 
    CATEGORIES_ERROR 
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
                loading: false
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: payload,
                loading: false,
            };
        case CATEGORIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}