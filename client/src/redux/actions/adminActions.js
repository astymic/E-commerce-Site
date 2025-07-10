import axios from "axios";
import { GET_PRODUCTS, PRODUCTS_ERROR } from "../types";

export const getAdminProducts = () => async dispatch => {
    try {
        const res = await axios.get('/api/admin/products?limit=500');
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PRODUCTS_ERROR,
            payload: { msg: err.response?.statusText, status: err.response?.status }
        });
    }
};