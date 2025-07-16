import {
    IMAGE_UPLOAD_REQUEST,
    IMAGE_UPLOAD_SUCCESS,
    IMAGE_UPLOAD_FAIL,
    CLEAR_IMAGE_PATH
} from '../types';

const initialState = {
    imageLoading: false,
    imagePath: null,
    error: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case IMAGE_UPLOAD_REQUEST:
            return {
                ...state,
                imageLoading: true
            };
        case IMAGE_UPLOAD_SUCCESS:
            return {
                ...state,
                imageLoading: false,
                imagePath: payload,
                error: null
            };
        case IMAGE_UPLOAD_FAIL: 
            return {
                ...state,
                imageLoading: false,
                error: payload
            };
        case CLEAR_IMAGE_PATH:
            return {
                ...state,
                imagePath: null
            };
        default:
            return state;
    }
}