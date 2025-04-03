import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
} from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'; // Will create later
import { getCart } from './cartActions';


// Load User
export const loadUser = () => async dispatch => {
    const token = localStorage.token;

    if (token) {
        setAuthToken(token);
       
        try {
            const res = await axios.get('/api/users/me');
            dispatch({ type: USER_LOADED, payload: res.data });
            dispatch(getCart());
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response ? err.response.data : { msg: 'Authentication Error' }
            });
        }
    } else {
        dispatch({ type: AUTH_ERROR, payload: { msg: 'No token found' } });
    }
};


// Register User
export const register = ({ firstName, lastName, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ firstName, lastName, email, password });

    try {
        const res = await axios.post('/api/users/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response ? err.response.data : { msg: 'Registration Error' }
        })
    }
};


// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response ? err.response.data : { msg: 'Login Error' }
        });
    }
};


// Logout User
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};