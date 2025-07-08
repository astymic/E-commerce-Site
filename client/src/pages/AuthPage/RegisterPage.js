import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { register } from '../../redux/actions/authActions';


function RegisterPage() {
    const [fromData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const dispatch = useDispatch();
    const { isAuthenticated, loading, error } = useSelector(state => state.auth);

    const { firstName, lastName, email, password } = fromData;

    const onChange = e => setFormData({ ...fromData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        dispatch(register({ firstName, lastName, email, password }));
    };

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error.msg || 'Registration Failed'}</p>} 
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                    <input type='text' id='firstName' name='firstName' value={firstName} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input type='text' id='lastName' name='lastName' value={lastName} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' value={email} onChange={onChange} required/>
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' id='password' name='password' value={password} onChange={onChange} required minLength="6"/>
                </div>
                <button type='submit' disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;