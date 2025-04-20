import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';


function LoginPage() {
    const [fromData, setFormData] = useState({ email: '', password: '' });

    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

    const { email, password } = fromData;

    const onChange = e => setFormData({ ...fromData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    const from = location.state?.from?.pathname || "/";

    if (isAuthenticated) {
        return <Navigate tp={from} replace />;
    }
    
    // Add redirect to previosl location after Login / Registration

    return (
        <div>
            <h1>Login</h1>
            {error && error.msg && error.msg !== 'No token found' && (
                <p style={{ color: 'red' }}>{error.msg || 'Login Failed'}</p>
            )}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={password} onChange={onChange} required/>
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Loggin In...' : 'Login'}
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginPage;