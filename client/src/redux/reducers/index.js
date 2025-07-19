import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer  from './cartReducer';
import orderReducer from './orderReducer';
import addressReducer from './addressReducer';
import adminReducer from './adminReducer';
import adminUserReducer from './adminUserReducer';

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    address: addressReducer,
    admin: adminReducer,
    adminUsers: adminUserReducer,
});