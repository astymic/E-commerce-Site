import {
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAIL,
    CLEAR_IMAGE_PATH,
    ADMIN_IMPORT_DATA_REQUEST,
    ADMIN_IMPORT_DATA_SUCCESS,
    ADMIN_IMPORT_DATA_FAIL,
    GET_PRODUCTS,
    PRODUCTS_ERROR,
    GET_ALL_ORDERS_SUCCESS,
    GET_ALL_ORDERS_FAIL,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAIL,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
    ADMIN_USERS_LOADING,
    ORDER_LOADING
} from '../types';

const initialState = {
    products: [],
    orders: [],
    users: [],
    totalProducts: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    imageLoading: false,
    imagePaths: [],
    importResults: null,
    error: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case IMAGE_UPLOAD_REQUEST:
        case ADMIN_IMPORT_DATA_REQUEST:
            return {
                ...state,
                imageLoading: true
            };
        case ORDER_LOADING:
        case ADMIN_USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: payload.products,
                totalProducts: payload.totalProducts,
                totalPages: payload.totalPages,
                currentPage: payload.page,
                loading: false
            };
        case GET_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload,
                loading: false
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === payload._id ? payload : order
                ),
                loading: false
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false
            };
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === payload.userId ? { ...user, role: payload.role } : user
                ),
                loading: false
            };
        case IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                imagePaths: payload,
                error: null
            };
        case ADMIN_IMPORT_DATA_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                importResults: payload.results,
                error: null
            };
        case IMAGE_UPLOAD_FAIL:
        case ADMIN_IMPORT_DATA_FAIL:
            return {
                ...state,
                imageLoading: false,
                error: payload
            };
        case PRODUCTS_ERROR:
        case GET_ALL_ORDERS_FAIL:
        case UPDATE_ORDER_STATUS_FAIL:
        case GET_ALL_USERS_FAIL:
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case CLEAR_IMAGE_PATH:
            return {
                ...state,
                imagePaths: []
            };
        default:
            return state;
    }
}