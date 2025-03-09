import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
});