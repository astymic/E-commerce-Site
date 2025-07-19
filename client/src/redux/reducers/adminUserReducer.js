import {
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    UPDATE_USER_ROLE_SUCCESS,
    UPDATE_USER_ROLE_FAIL,
    ADMIN_USERS_LOADING,
    LOGOUT
} from '../types';

const initialState = {
    users: [],
    loading: false,
    error: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADMIN_USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                loading: false,
                error: null
            };
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                users: state.users.map(user =>
                    user._id === payload.userId
                    ? { ...user, role: payload.role }
                    : user
                ),
                loading: false
            };
        case GET_ALL_USERS_FAIL:
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case LOGOUT:
            return { 
                ...initialState 
            };
        default:
            return state;
    }
}