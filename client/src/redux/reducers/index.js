import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
});