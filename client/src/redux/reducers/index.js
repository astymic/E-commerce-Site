import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer  from './cartReducer';
import orderReducer from './orderReducer';

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
});